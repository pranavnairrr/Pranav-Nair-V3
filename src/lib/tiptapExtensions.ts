import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Link from '@tiptap/extension-link';
import LinkPreview from './linkPreviewExtension';

// Shared between the admin composer (client) and the public post renderer
// (server) so the editor and the published output always agree on how a
// document is structured and displayed.
export const tiptapExtensions = [
  StarterKit,
  Image,
  Youtube.configure({
    nocookie: true,
    modestBranding: true,
    HTMLAttributes: { class: 'post-youtube-embed' },
  }),
  Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener noreferrer nofollow' } }),
  LinkPreview,
];
