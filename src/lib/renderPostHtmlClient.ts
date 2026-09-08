'use client';

import { generateHTML } from '@tiptap/html';
import type { JSONContent } from '@tiptap/core';
import { tiptapExtensions } from './tiptapExtensions';

// Browser counterpart to renderPostHtml.ts (which uses `@tiptap/html/server`
// and only works in Node). Used by the client-rendered /read page, where
// content is fetched over the network after an access check — never
// bundled statically — so there's nothing for a crawler to see either way.
export function renderPostHtmlClient(bodyJson: JSONContent | null | undefined): string {
  if (!bodyJson || !bodyJson.content || bodyJson.content.length === 0) return '';
  try {
    return generateHTML(bodyJson, tiptapExtensions);
  } catch {
    return '';
  }
}
