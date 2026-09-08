import { supabase } from './supabaseClient';
import type { JSONContent } from '@tiptap/core';

export interface PublicPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  body_json: JSONContent;
  cover_image_url: string | null;
  published_at: string;
}

export interface PublicNote {
  id: string;
  slug: string;
  body_json: JSONContent;
  published_at: string;
}

export async function getPublicNotes(): Promise<PublicNote[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('posts')
    .select('id, slug, body_json, published_at')
    .eq('visibility', 'public')
    .eq('type', 'note')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });
  return data ?? [];
}

export async function getPublicPosts(): Promise<PublicPost[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('posts')
    .select('id, slug, title, excerpt, category, body_json, cover_image_url, published_at')
    .eq('visibility', 'public')
    .eq('type', 'article')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });
  return data ?? [];
}

export async function getPublicPostBySlug(slug: string): Promise<PublicPost | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from('posts')
    .select('id, slug, title, excerpt, category, body_json, cover_image_url, published_at')
    .eq('visibility', 'public')
    .eq('type', 'article')
    .not('published_at', 'is', null)
    .eq('slug', slug)
    .maybeSingle();
  return data;
}

export async function getPageViewCount(path: string): Promise<number> {
  if (!supabase) return 0;
  const { data } = await supabase.rpc('get_page_view_count', { p_path: path });
  return typeof data === 'number' ? data : 0;
}

export function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function estimateReadTime(body: JSONContent): string {
  let words = 0;
  function walk(node: JSONContent) {
    if (node.text) words += node.text.trim().split(/\s+/).filter(Boolean).length;
    node.content?.forEach(walk);
  }
  walk(body);
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
