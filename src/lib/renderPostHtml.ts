import { generateHTML } from '@tiptap/html/server';
import type { JSONContent } from '@tiptap/core';
import { tiptapExtensions } from './tiptapExtensions';

export function renderPostHtml(bodyJson: JSONContent | null | undefined): string {
  if (!bodyJson || !bodyJson.content || bodyJson.content.length === 0) return '';
  try {
    return generateHTML(bodyJson, tiptapExtensions);
  } catch {
    return '';
  }
}
