import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { Post, Comment } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`Firestore Error [${operationType}] on ${path}: ${errorMessage}`);
  throw new Error(`Firestore operation '${operationType}' failed.`);
}

export const firebaseService = {
  // Posts
  getPosts: async (onlyPublished = true): Promise<Post[]> => {
    const path = 'posts';
    console.log(`Fetching posts from path: ${path}, onlyPublished: ${onlyPublished}`);
    try {
      const snapshot = await getDocs(collection(db, path));
      console.log(`Fetched ${snapshot.docs.length} documents from ${path}`);
      const allPosts = snapshot.docs.map(doc => doc.data() as Post);
      if (onlyPublished) {
        return allPosts.filter(p => p.status === 'published');
      }
      return allPosts;
    } catch (error) {
      console.error(`Error fetching posts from ${path}:`, error);
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  subscribeToPosts: (callback: (posts: Post[]) => void, onlyPublished = true) => {
    const path = 'posts';
    console.log(`Subscribing to posts at path: ${path}, onlyPublished: ${onlyPublished}`);
    const q = collection(db, path);
      
    return onSnapshot(q, (snapshot) => {
      console.log(`onSnapshot triggered for ${path}, docs: ${snapshot.docs.length}`);
      const allPosts = snapshot.docs.map(doc => doc.data() as Post);
      if (onlyPublished) {
        callback(allPosts.filter(p => p.status === 'published'));
      } else {
        callback(allPosts);
      }
    }, (error) => {
      console.error(`onSnapshot error for ${path}:`, error);
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  savePost: async (post: Post) => {
    const path = `posts/${post.id}`;
    console.log(`Saving post to ${path}:`, post.title);
    try {
      await setDoc(doc(db, 'posts', post.id), post);
      console.log(`Successfully saved post: ${post.id}`);
    } catch (error) {
      console.error(`Error saving post to ${path}:`, error);
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  updatePost: async (post: Post) => {
    const path = `posts/${post.id}`;
    console.log(`Updating post at ${path}:`, post.title);
    try {
      await setDoc(doc(db, 'posts', post.id), post);
      console.log(`Successfully updated post: ${post.id}`);
    } catch (error) {
      console.error(`Error updating post at ${path}:`, error);
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  deletePost: async (id: string) => {
    const path = `posts/${id}`;
    try {
      await deleteDoc(doc(db, 'posts', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Comments
  getComments: async (onlyApproved = true): Promise<Comment[]> => {
    const path = 'comments';
    console.log(`Fetching comments from path: ${path}, onlyApproved: ${onlyApproved}`);
    try {
      const snapshot = await getDocs(collection(db, path));
      console.log(`Fetched ${snapshot.docs.length} documents from ${path}`);
      const allComments = snapshot.docs.map(doc => doc.data() as Comment);
      if (onlyApproved) {
        return allComments.filter(c => c.isApproved === true);
      }
      return allComments;
    } catch (error) {
      console.error(`Error fetching comments from ${path}:`, error);
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  subscribeToComments: (callback: (comments: Comment[]) => void, onlyApproved = true) => {
    const path = 'comments';
    console.log(`Subscribing to comments at path: ${path}, onlyApproved: ${onlyApproved}`);
    const q = collection(db, path);
      
    return onSnapshot(q, (snapshot) => {
      console.log(`onSnapshot triggered for ${path}, docs: ${snapshot.docs.length}`);
      const allComments = snapshot.docs.map(doc => doc.data() as Comment);
      if (onlyApproved) {
        callback(allComments.filter(c => c.isApproved === true));
      } else {
        callback(allComments);
      }
    }, (error) => {
      console.error(`onSnapshot error for ${path}:`, error);
      handleFirestoreError(error, OperationType.LIST, path);
    });
  },

  addComment: async (comment: Comment) => {
    const path = `comments/${comment.id}`;
    console.log(`Adding comment to ${path}:`, comment.authorName);
    try {
      await setDoc(doc(db, 'comments', comment.id), comment);
      console.log(`Successfully added comment: ${comment.id}`);
    } catch (error) {
      console.error(`Error adding comment to ${path}:`, error);
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  updateCommentStatus: async (id: string, isApproved: boolean) => {
    const path = `comments/${id}`;
    try {
      const commentRef = doc(db, 'comments', id);
      await updateDoc(commentRef, { isApproved });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  deleteComment: async (id: string) => {
    const path = `comments/${id}`;
    try {
      await deleteDoc(doc(db, 'comments', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Connection Test
  testConnection: async () => {
    console.log('Testing Firebase connection to database:', db.app.options.projectId, 'databaseId:', (db as any).databaseId);
    try {
      const testDoc = doc(db, 'test', 'connection');
      await setDoc(testDoc, { timestamp: new Date().toISOString() });
      const snap = await getDoc(testDoc);
      if (snap.exists()) {
        console.log("Firebase connection test successful. Data read back:", snap.data());
      } else {
        console.error("Firebase connection test failed: Document does not exist after write.");
      }
    } catch (error) {
      console.error("Firebase connection test failed with error:", error);
      if(error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration: client is offline.");
      }
    }
  }
};
