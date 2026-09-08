'use client';

import { useEffect, useRef } from 'react';
import { useEditor, EditorContent, type JSONContent } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import { tiptapExtensions } from '@/lib/tiptapExtensions';
import { supabase } from '@/lib/supabaseClient';

interface EditorProps {
  content: JSONContent | null;
  onChange: (json: JSONContent) => void;
  editable?: boolean;
}

const YOUTUBE_RE = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/;

export default function Editor({ content, onChange, editable = true }: EditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      ...tiptapExtensions,
      Placeholder.configure({ placeholder: 'Start writing…' }),
    ],
    content: content && content.content?.length ? content : { type: 'doc', content: [{ type: 'paragraph' }] },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    immediatelyRender: false,
    editable,
    editorProps: {
      attributes: {
        class: 'post-editor-content',
      },
    },
  });

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable, editor]);

  async function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !editor || !supabase) return;

    const ext = file.name.split('.').pop() || 'png';
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('post-images').upload(path, file);
    if (error) {
      alert('Image upload failed: ' + error.message);
      return;
    }
    const { data } = supabase.storage.from('post-images').getPublicUrl(path);
    editor.chain().focus().setImage({ src: data.publicUrl, alt: file.name }).run();
  }

  async function handleInsertLink() {
    if (!editor) return;
    const url = window.prompt('Paste a URL (YouTube embeds automatically; anything else gets a preview card)');
    if (!url) return;

    const yt = url.match(YOUTUBE_RE);
    if (yt) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
      return;
    }

    if (!supabase) {
      editor.chain().focus().insertLinkPreview({ url }).run();
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('fetch-link-preview', {
        body: { url },
      });
      if (error) throw error;
      editor
        .chain()
        .focus()
        .insertLinkPreview({
          url,
          platform: data?.platform ?? null,
          title: data?.title ?? null,
          description: data?.description ?? null,
          image: data?.image_url ?? null,
        })
        .run();
    } catch {
      // Edge function not deployed yet, or the fetch failed — still insert
      // a bare card linking to the URL rather than losing the paste.
      editor.chain().focus().insertLinkPreview({ url }).run();
    }
  }

  if (!editor) return null;

  return (
    <div>
      <style>{`
        .post-editor-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          padding: 10px;
          border: 1px solid var(--grey);
          border-bottom: none;
          background: #0d0d0d;
        }
        .post-editor-toolbar button {
          font-family: var(--font-body);
          font-size: 12px;
          padding: 6px 10px;
          background: transparent;
          border: 1px solid var(--grey);
          color: rgba(245,240,232,0.6);
          cursor: pointer;
        }
        .post-editor-toolbar button.is-active {
          color: var(--orange);
          border-color: var(--orange);
        }
        .post-editor-content {
          min-height: 400px;
          padding: 24px;
          border: 1px solid var(--grey);
          color: rgba(245,240,232,0.85);
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.8;
        }
        .post-editor-content:focus { outline: none; }
        .post-editor-content h2 { font-family: var(--font-display); font-size: 28px; margin: 24px 0 12px; color: var(--white); }
        .post-editor-content p { margin: 0 0 14px; }
        .post-editor-content ul { margin: 0 0 14px; padding-left: 20px; }
        .post-editor-content img { max-width: 100%; display: block; margin: 16px 0; }
        .post-editor-content p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: rgba(245,240,232,0.25);
          float: left;
          pointer-events: none;
          height: 0;
        }
        .link-preview-card {
          display: block;
          border: 1px solid var(--grey);
          text-decoration: none;
          color: inherit;
          margin: 16px 0;
          overflow: hidden;
        }
        .lp-image { width: 100%; aspect-ratio: 2/1; background-size: cover; background-position: center; }
        .lp-body { padding: 14px 16px; }
        .lp-platform { display: block; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--orange); margin-bottom: 6px; }
        .lp-title { display: block; font-size: 14px; color: var(--white); margin-bottom: 4px; }
        .lp-desc { font-size: 12px; color: rgba(245,240,232,0.5); margin: 4px 0; }
        .lp-url { font-size: 11px; color: rgba(245,240,232,0.3); }
      `}</style>

      {editable && (
        <>
          <div className="post-editor-toolbar">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>B</button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>I</button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>H2</button>
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>List</button>
            <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>Quote</button>
            <button type="button" onClick={() => fileInputRef.current?.click()}>Image</button>
            <button type="button" onClick={handleInsertLink}>Link / Embed</button>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImagePick} style={{ display: 'none' }} />
        </>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
