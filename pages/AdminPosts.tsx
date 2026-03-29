
import React, { useState, useEffect } from 'react';
import { firebaseService } from '../services/firebaseService';
import { geminiService } from '../services/geminiService';
import { Post, Category } from '../types';

const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importText, setImportText] = useState('');
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);

  useEffect(() => {
    console.log('AdminPosts mounted, subscribing to all posts...');
    const unsubscribe = firebaseService.subscribeToPosts((allPosts) => {
      console.log(`AdminPosts received ${allPosts.length} posts from Firebase.`);
      setPosts(allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, false);
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await firebaseService.deletePost(id);
    }
  };

  const handleImport = async () => {
    if (!importText.trim()) return;
    setIsImporting(true);
    const result = await geminiService.analyzeArticle(importText);
    setIsImporting(false);

    if (result) {
      const newPost: Post = {
        id: Date.now().toString(),
        title: result.title,
        excerpt: result.excerpt,
        content: result.content,
        author: 'Noel Chiagorom',
        date: new Date().toISOString().split('T')[0],
        category: result.category as Category || Category.EDITORIAL,
        imageUrl: `https://picsum.photos/seed/${Date.now()}/800/600`,
        readTime: result.readTime,
        status: 'draft'
      };
      setEditingPost(newPost);
      setImportText('');
    } else {
      alert('Failed to extract content with AI. Please try again.');
    }
  };

  const savePost = async () => {
    if (editingPost && editingPost.title) {
      await firebaseService.savePost(editingPost as Post);
      setEditingPost(null);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">Manage Articles</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => { setEditingPost(null); setIsModalOpen(true); }}
            className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 border border-slate-300"
          >
            <i className="fas fa-robot mr-2"></i> AI Importer
          </button>
          <button 
             onClick={() => { setEditingPost({ id: Date.now().toString(), status: 'draft', author: 'Noel Chiagorom', date: new Date().toISOString().split('T')[0] } as Post); setIsModalOpen(true); }}
             className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-700 shadow-lg shadow-red-200"
          >
            <i className="fas fa-plus mr-2"></i> Manual Entry
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Article</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <img src={post.imageUrl} className="w-12 h-12 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 line-clamp-1">{post.title}</p>
                      <p className="text-xs text-slate-400">By {post.author}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{post.category}</span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {post.date}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => { setEditingPost(post); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600"><i className="fas fa-edit"></i></button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-600"><i className="fas fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {editingPost?.id ? 'Edit Article' : 'Import from Facebook'}
              </h3>
              <button onClick={() => { setIsModalOpen(false); setEditingPost(null); }} className="text-slate-400 hover:text-slate-600"><i className="fas fa-times"></i></button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-6">
              {!editingPost ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500">Paste the long write-up from a Facebook post. Gemini will extract the headline, category, and content for you.</p>
                  <textarea 
                    rows={12}
                    className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 font-mono text-sm"
                    placeholder="Paste article content here..."
                    value={importText}
                    onChange={e => setImportText(e.target.value)}
                  ></textarea>
                  <button 
                    onClick={handleImport}
                    disabled={isImporting}
                    className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center"
                  >
                    {isImporting ? <><i className="fas fa-spinner fa-spin mr-2"></i> Analyzing with AI...</> : 'Process with Gemini'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Title</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                      value={editingPost.title || ''}
                      onChange={e => setEditingPost({...editingPost, title: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
                      <select 
                        className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        value={editingPost.category || Category.EDITORIAL}
                        onChange={e => setEditingPost({...editingPost, category: e.target.value as Category})}
                      >
                        {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Status</label>
                      <select 
                        className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        value={editingPost.status || 'draft'}
                        onChange={e => setEditingPost({...editingPost, status: e.target.value as any})}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Excerpt</label>
                    <textarea 
                      rows={2}
                      className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                      value={editingPost.excerpt || ''}
                      onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})}
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Content</label>
                    <textarea 
                      rows={10}
                      className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                      value={editingPost.content || ''}
                      onChange={e => setEditingPost({...editingPost, content: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="flex space-x-4 pt-6">
                    <button 
                      onClick={() => setEditingPost(null)}
                      className="flex-1 bg-slate-100 text-slate-700 p-3 rounded-lg font-bold"
                    >
                      Back
                    </button>
                    <button 
                      onClick={savePost}
                      className="flex-2 bg-red-600 text-white p-3 rounded-lg font-bold flex-grow hover:bg-red-700"
                    >
                      Save Article
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
