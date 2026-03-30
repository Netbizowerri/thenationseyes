import { Post } from '../types';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'it', 'as', 'be', 'was', 'were',
  'been', 'are', 'this', 'that', 'these', 'those', 'has', 'have', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'not', 'no', 'so', 'if', 'then', 'than', 'too', 'very', 'just', 'about',
  'up', 'out', 'into', 'over', 'after', 'before', 'between', 'under',
  'again', 'further', 'once', 'here', 'there', 'when', 'where', 'why',
  'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
  'some', 'such', 'only', 'own', 'same', 'also', 'any', 'its', 'he', 'she',
  'they', 'we', 'you', 'i', 'me', 'him', 'her', 'us', 'them', 'my', 'your',
  'his', 'our', 'their', 'what', 'which', 'who', 'whom', 'while', 'during',
]);

export function extractKeywords(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^\w\s'-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

function computeRelevanceScore(post: Post, keywords: string[]): number {
  let score = 0;
  const titleLower = post.title.toLowerCase();
  const excerptLower = post.excerpt.toLowerCase();
  const contentLower = post.content.toLowerCase();
  const categoryLower = post.category.toLowerCase();
  const authorLower = post.author.toLowerCase();

  for (const keyword of keywords) {
    const kw = keyword.toLowerCase();

    // Title matches (highest weight)
    if (titleLower.includes(kw)) {
      score += 10;
      if (titleLower.startsWith(kw)) score += 5;
      // Exact word match bonus
      const titleWords = titleLower.split(/\s+/);
      if (titleWords.some(w => w === kw)) score += 5;
    }

    // Category matches
    if (categoryLower.includes(kw)) score += 8;

    // Excerpt matches
    if (excerptLower.includes(kw)) {
      score += 4;
      const excerptWords = excerptLower.split(/\s+/);
      if (excerptWords.some(w => w === kw)) score += 3;
    }

    // Content matches
    if (contentLower.includes(kw)) {
      score += 2;
      // Count occurrences for density
      const occurrences = (contentLower.match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      score += Math.min(occurrences - 1, 3); // Cap bonus at 3 extra
    }

    // Author matches
    if (authorLower.includes(kw)) score += 3;
  }

  // Multi-keyword proximity bonus
  if (keywords.length > 1) {
    const combined = `${titleLower} ${excerptLower}`;
    const allPresent = keywords.every(kw => combined.includes(kw));
    if (allPresent) score += 15;
  }

  return score;
}

export function searchPosts(posts: Post[], query: string): Post[] {
  const keywords = extractKeywords(query);
  if (keywords.length === 0) return [];

  return posts
    .map(post => ({ post, score: computeRelevanceScore(post, keywords) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.post);
}
