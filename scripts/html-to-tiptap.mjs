// One-off converter: turns the simple HTML used in the old blog.ts posts
// (p / h2 / ul>li / strong / em only) into Tiptap JSON, so they can be
// seeded into the new `posts` table. Not part of the shipped app.

function parseInline(text) {
  // Splits on <strong>...</strong> and <em>...</em>, returns Tiptap text nodes.
  const nodes = [];
  const re = /<(strong|em)>(.*?)<\/\1>/gs;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) {
      const plain = text.slice(last, m.index);
      if (plain) nodes.push({ type: 'text', text: decodeEntities(plain) });
    }
    const mark = m[1] === 'strong' ? 'bold' : 'italic';
    nodes.push({ type: 'text', text: decodeEntities(m[2]), marks: [{ type: mark }] });
    last = re.lastIndex;
  }
  if (last < text.length) {
    const plain = text.slice(last);
    if (plain) nodes.push({ type: 'text', text: decodeEntities(plain) });
  }
  if (nodes.length === 0) return [{ type: 'text', text: decodeEntities(text).trim() }];
  // Only trim the outer edges of the whole run, not internal segments.
  nodes[0].text = nodes[0].text.replace(/^\s+/, '');
  nodes[nodes.length - 1].text = nodes[nodes.length - 1].text.replace(/\s+$/, '');
  return nodes.filter((n) => n.text.length > 0);
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

export function htmlToTiptapJson(html) {
  const content = [];
  const blockRe = /<h2>(.*?)<\/h2>|<p>(.*?)<\/p>|<ul>(.*?)<\/ul>/gs;
  let m;
  while ((m = blockRe.exec(html))) {
    if (m[1] !== undefined) {
      content.push({ type: 'heading', attrs: { level: 2 }, content: parseInline(m[1].trim()) });
    } else if (m[2] !== undefined) {
      const text = m[2].trim();
      if (text) content.push({ type: 'paragraph', content: parseInline(text) });
    } else if (m[3] !== undefined) {
      const liRe = /<li>(.*?)<\/li>/gs;
      const items = [];
      let li;
      while ((li = liRe.exec(m[3]))) {
        items.push({
          type: 'listItem',
          content: [{ type: 'paragraph', content: parseInline(li[1].trim()) }],
        });
      }
      content.push({ type: 'bulletList', content: items });
    }
  }
  return { type: 'doc', content };
}
