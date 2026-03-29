import { Post, Comment, User } from '../types';
import { INITIAL_POSTS } from '../constants';
import { firebaseService } from './firebaseService';

const POSTS_KEY = 'nations_eyes_posts_v17';
const COMMENTS_KEY = 'nations_eyes_comments';
const AUTH_KEY = 'nations_eyes_auth';

export const storageService = {
  // Migration logic
  migrateToFirebase: async () => {
    try {
      console.log('Checking for existing posts in Firebase...');
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
          // Ensure status is set
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

      // Migrate comments if none exist
      console.log('Checking for existing comments in Firebase...');
      const existingComments = await firebaseService.getComments(false);
      console.log(`Found ${existingComments.length} comments in Firebase.`);
      
      if (existingComments.length === 0) {
        const localComments = storageService.getComments();
        if (localComments.length > 0) {
          console.log(`Migrating ${localComments.length} local comments to Firebase...`);
          for (const comment of localComments) {
            if (comment.isApproved === undefined) comment.isApproved = true;
            await firebaseService.addComment(comment);
          }
          console.log('Comments migration complete.');
        }
      }
    } catch (error) {
      console.error('Migration failed with error:', error);
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
  },

  getAuth: (): User | null => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  setAuth: (user: User | null) => {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }
};
