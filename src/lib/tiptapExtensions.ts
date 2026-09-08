import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import LinkPreview from './linkPreviewExtension';

// Shared between the admin composer (client) and the public post renderer
// (server) so the editor and the published output always agree on how a
// document is structured and displayed.
//
// StarterKit (v3) already bundles Link — configuring it here instead of
// adding a separate Link extension avoids a duplicate-extension warning.
export const tiptapExtensions = [
  StarterKit.configure({
    link: { openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener noreferrer nofollow' } },
  }),
  Image,
  Youtube.configure({
    nocookie: true,
    modestBranding: true,
    HTMLAttributes: { class: 'post-youtube-embed' },
  }),
  LinkPreview,
];
