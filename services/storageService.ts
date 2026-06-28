import { Post, Comment, User } from '../types';
import { INITIAL_POSTS } from '../constants';
import { firebaseService } from './firebaseService';

const POSTS_KEY = 'nations_eyes_posts_v18';
const COMMENTS_KEY = 'nations_eyes_comments';

export const storageService = {
  // Migration logic
  migrateToFirebase: async () => {
    console.log('Migration started...');
    const existingPosts = await firebaseService.getPosts(false);
    console.log(`Found ${existingPosts.length} posts in Firebase.`);
    
    const localPosts = storageService.getPosts();
    console.log(`Local posts to consider for migration: ${localPosts.length}`);
    
    // Migrate posts that don't exist in Firebase
    let migratedCount = 0;
    for (const post of localPosts) {
      const exists = existingPosts.some(p => p.id === post.id);
      if (!exists) {
        console.log(`Migrating post: ${post.title} (${post.id})`);
        if (!post.status) post.status = 'published';
        await firebaseService.savePost(post);
        migratedCount++;
      }
    }
    
    if (migratedCount > 0) {
      console.log(`Migrated ${migratedCount} new posts to Firebase.`);
    } else {
      console.log('No new posts to migrate.');
    }
  },

  getPosts: (): Post[] => {
    const data = localStorage.getItem(POSTS_KEY);
    if (!data) {
      console.log('No local posts found, using INITIAL_POSTS');
      localStorage.setItem(POSTS_KEY, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    const posts = JSON.parse(data);
    let changed = false;
    for (const initPost of INITIAL_POSTS) {
      if (!posts.some(p => p.id === initPost.id)) {
        posts.push(initPost);
        changed = true;
      }
    }
    if (changed) {
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    }
    console.log(`Local posts found: ${posts.length}`);
    return posts;
  },

  savePost: (post: Post) => {
    const posts = storageService.getPosts();
    const index = posts.findIndex(p => p.id === post.id);
    if (index > -1) {
      posts[index] = post;
    } else {
      posts.unshift(post);
    }
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },

  deletePost: (id: string) => {
    const posts = storageService.getPosts().filter(p => p.id !== id);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },

  getComments: (): Comment[] => {
    const data = localStorage.getItem(COMMENTS_KEY);
    if (!data) {
      console.log('No local comments found.');
      return [];
    }
    const comments = JSON.parse(data);
    console.log(`Local comments found: ${comments.length}`);
    return comments;
  },

  addComment: (comment: Comment) => {
    const comments = storageService.getComments();
    comments.push(comment);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  },

  updateCommentStatus: (id: string, isApproved: boolean) => {
    const comments = storageService.getComments();
    const index = comments.findIndex(c => c.id === id);
    if (index > -1) {
      comments[index].isApproved = isApproved;
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
    }
  },

  deleteComment: (id: string) => {
    const comments = storageService.getComments().filter(c => c.id !== id);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  }
};
