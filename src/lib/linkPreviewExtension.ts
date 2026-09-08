import { Node, mergeAttributes } from '@tiptap/core';

// A generic "unfurled link" card — used for anything pasted that isn't a
// YouTube URL (Tiptap's own Youtube extension handles those as real
// embeds). Renders identically whether it's produced by generateHTML()
// for a public post, or displayed live inside the editor — it's an atom
// node, so no separate React NodeView is needed for basic display.
export interface LinkPreviewAttrs {
  url: string;
  platform?: string | null;
  title?: string | null;
  description?: string | null;
  image?: string | null;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    linkPreview: {
      insertLinkPreview: (attrs: LinkPreviewAttrs) => ReturnType;
    };
  }
}

const LinkPreview = Node.create({
  name: 'linkPreview',
  group: 'block',
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      url: { default: null },
      platform: { default: null },
      title: { default: null },
      description: { default: null },
      image: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: 'a[data-link-preview]' }];
  },

  renderHTML({ HTMLAttributes, node }) {
    const { url, title, description, image, platform } = node.attrs as LinkPreviewAttrs;
    const children: unknown[] = [];

    if (image) {
      children.push(['div', { class: 'lp-image', style: `background-image:url('${image}')` }]);
    }
    children.push([
      'div',
      { class: 'lp-body' },
      ['span', { class: 'lp-platform' }, (platform || 'link').toString().toUpperCase()],
      ['strong', { class: 'lp-title' }, title || url],
      ...(description ? [['p', { class: 'lp-desc' }, description]] : []),
      ['span', { class: 'lp-url' }, safeHost(url)],
    ]);

    return [
      'a',
      mergeAttributes(HTMLAttributes, {
        'data-link-preview': 'true',
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'link-preview-card',
        contenteditable: 'false',
      }),
      ...children,
    ] as never;
  },

  addCommands() {
    return {
      insertLinkPreview:
        (attrs: LinkPreviewAttrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    };
  },
});

function safeHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default LinkPreview;
