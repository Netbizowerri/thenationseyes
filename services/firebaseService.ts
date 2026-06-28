import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Post, Comment } from '../types';

function log(...args: unknown[]) {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
}

function logError(...args: unknown[]) {
  if (import.meta.env.DEV) {
    console.error(...args);
  }
}

export const firebaseService = {
  // Posts
  getPosts: async (onlyPublished = true): Promise<Post[]> => {
    const postsRef = collection(db, 'posts');
    try {
      const snapshot = await getDocs(query(postsRef, orderBy('date', 'desc')));
      let allPosts = snapshot.docs.map(doc => doc.data() as Post);
      if (onlyPublished) {
        allPosts = allPosts.filter(p => p.status === 'published');
      }
      return allPosts;
    } catch (error) {
      logError('Error fetching posts:', error);
      throw error;
    }
  },

  subscribeToPosts: (callback: (posts: Post[]) => void, onlyPublished = true) => {
    const postsRef = collection(db, 'posts');

    return onSnapshot(query(postsRef, orderBy('date', 'desc')), (snapshot) => {
      let allPosts = snapshot.docs.map(doc => doc.data() as Post);
      if (onlyPublished) {
        allPosts = allPosts.filter(p => p.status === 'published');
      }
      callback(allPosts);
    }, (error) => {
      logError('Firestore subscription error:', error);
      callback([]);
    });
  },

  subscribeToComments: (callback: (comments: Comment[]) => void, onlyApproved = true) => {
    const commentsRef = collection(db, 'comments');

    return onSnapshot(query(commentsRef, orderBy('date', 'desc')), (snapshot) => {
      const allComments = snapshot.docs.map(doc => doc.data() as Comment);
      callback(onlyApproved ? allComments.filter(c => c.isApproved === true) : allComments);
    }, (error) => {
      logError('Firestore comments subscription error:', error);
      callback([]);
    });
  },

  savePost: async (post: Post) => {
    try {
      await setDoc(doc(db, 'posts', post.id), post);
    } catch (error) {
      logError('Error saving post:', error);
      throw error;
    }
  },

  updatePost: async (post: Post) => {
    try {
      await setDoc(doc(db, 'posts', post.id), post);
    } catch (error) {
      logError('Error updating post:', error);
      throw error;
    }
  },

  deletePost: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
    } catch (error) {
      logError('Error deleting post:', error);
      throw error;
    }
  },

  // Comments
  getComments: async (onlyApproved = true): Promise<Comment[]> => {
    const commentsRef = collection(db, 'comments');
    try {
      const snapshot = await getDocs(query(commentsRef, orderBy('date', 'desc')));
      const allComments = snapshot.docs.map(doc => doc.data() as Comment);
      return onlyApproved ? allComments.filter(c => c.isApproved === true) : allComments;
    } catch (error) {
      logError('Error fetching comments:', error);
      throw error;
    }
  },

  addComment: async (comment: Comment) => {
    try {
      await setDoc(doc(db, 'comments', comment.id), comment);
    } catch (error) {
      logError('Error adding comment:', error);
      throw error;
    }
  },

  updateCommentStatus: async (id: string, isApproved: boolean) => {
    try {
      const commentRef = doc(db, 'comments', id);
      await updateDoc(commentRef, { isApproved });
    } catch (error) {
      logError('Error updating comment status:', error);
      throw error;
    }
  },

  deleteComment: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'comments', id));
    } catch (error) {
      logError('Error deleting comment:', error);
      throw error;
    }
  },
};
