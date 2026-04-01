
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { firebaseService } from '../services/firebaseService';
import { geminiService } from '../services/geminiService';
import { Post, Category } from '../types';
import { processImageForUpload, estimateBase64SizeBytes, formatBytes, isBase64Image } from '../utils/imageUtils';

const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isImportMode, setIsImportMode] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importText, setImportText] = useState('');
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        id: crypto.randomUUID(),
        title: result.title,
        excerpt: result.excerpt,
        content: result.content,
        author: 'Noel Chiagorom',
        date: new Date().toISOString().split('T')[0],
        category: result.category as Category || Category.EDITORIAL,
        imageUrl: '',
        readTime: result.readTime,
        status: 'draft'
      };
      setEditingPost(newPost);
      setImportText('');
      setShowAiPanel(false);
      setIsEditorOpen(true);
    } else {
      alert('Failed to extract content with AI. Please try again.');
    }
  };

  const savePost = async () => {
    if (editingPost && editingPost.title) {
      await firebaseService.savePost(editingPost as Post);
      setEditingPost(null);
      setIsEditorOpen(false);
    }
  };

  const openManualEditor = () => {
    setEditingPost({
      id: crypto.randomUUID(),
      status: 'draft',
      author: 'Noel Chiagorom',
      date: new Date().toISOString().split('T')[0],
      title: '',
      excerpt: '',
      content: '',
      category: Category.EDITORIAL,
      imageUrl: '',
      readTime: '5 min'
    } as Post);
    setIsEditorOpen(true);
  };

  const openAiImporter = () => {
    setShowAiPanel(true);
    setEditingPost(null);
    setImportText('');
  };

  const wordCount = useMemo(() => {
    if (!editingPost?.content) return 0;
    return editingPost.content.trim().split(/\s+/).filter(Boolean).length;
  }, [editingPost?.content]);

  const estimatedReadTime = useMemo(() => {
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min`;
  }, [wordCount]);

  const autoSetReadTime = () => {
    if (editingPost) {
      setEditingPost({ ...editingPost, readTime: estimatedReadTime });
    }
  };

  const handleImageFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setImageUploadError('');

    try {
      const base64 = await processImageForUpload(file);
      setEditingPost(prev => prev ? { ...prev, imageUrl: base64 } : prev);
    } catch (err) {
      setImageUploadError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const imageUrlSize = useMemo(() => {
    if (!editingPost?.imageUrl) return 0;
    if (isBase64Image(editingPost.imageUrl)) {
      return estimateBase64SizeBytes(editingPost.imageUrl);
    }
    return 0;
  }, [editingPost?.imageUrl]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">Manage Articles</h2>
        <div className="flex space-x-3">
          <button
            onClick={openAiImporter}
            className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 border border-slate-300"
          >
            <i className="fas fa-robot mr-2"></i> AI Importer
          </button>
          <button
            onClick={openManualEditor}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-700 shadow-lg shadow-red-200"
          >
            <i className="fas fa-plus mr-2"></i> New Article
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Article</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase hidden md:table-cell">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase hidden md:table-cell">Date</th>
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
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{post.category}</span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 hidden md:table-cell">
                  {post.date}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => { setEditingPost(post); setIsEditorOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600"><i className="fas fa-edit"></i></button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-600"><i className="fas fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Import Panel */}
      {showAiPanel && !isEditorOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Import with AI</h3>
                <p className="text-sm text-slate-500 mt-1">Paste Facebook content and let Gemini extract the article</p>
              </div>
              <button onClick={() => setShowAiPanel(false)} className="text-slate-400 hover:text-slate-600 p-2">
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <textarea
                rows={12}
                className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 font-mono text-sm resize-none"
                placeholder="Paste article content here..."
                value={importText}
                onChange={e => setImportText(e.target.value)}
              ></textarea>
              <button
                onClick={handleImport}
                disabled={isImporting || !importText.trim()}
                className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center transition-colors"
              >
                {isImporting ? <><i className="fas fa-spinner fa-spin mr-2"></i> Analyzing with AI...</> : <><i className="fas fa-wand-magic-sparkles mr-2"></i> Process with Gemini</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WordPress-like Full Editor */}
      {isEditorOpen && editingPost && (
        <div className="fixed inset-0 bg-[#f1f5f9] z-50 flex flex-col overflow-hidden">
          {/* Editor Top Bar */}
          <div className="bg-white border-b border-slate-200 px-4 lg:px-8 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => { setIsEditorOpen(false); setEditingPost(null); }}
                className="text-slate-500 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  {posts.find(p => p.id === editingPost.id) ? 'Edit Article' : 'New Article'}
                </h3>
                <p className="text-xs text-slate-400">
                  {editingPost.status === 'published' ? (
                    <span className="text-green-600"><i className="fas fa-circle text-[6px] mr-1"></i>Published</span>
                  ) : (
                    <span className="text-slate-400"><i className="fas fa-circle text-[6px] mr-1"></i>Draft</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setEditingPost({ ...editingPost, status: editingPost.status === 'published' ? 'draft' : 'published' })}
                className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${editingPost.status === 'published' ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
              >
                {editingPost.status === 'published' ? 'Published' : 'Draft'}
              </button>
              <button
                onClick={savePost}
                disabled={!editingPost.title?.trim()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <i className="fas fa-check mr-2"></i>Publish
              </button>
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
            {/* Main Content Area */}
            <div className="flex-1 lg:overflow-y-auto p-4 lg:p-8">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Title */}
                <div>
                  <input
                    type="text"
                    className="w-full text-3xl lg:text-4xl font-black text-slate-900 border-0 outline-none bg-transparent placeholder-slate-300 leading-tight"
                    placeholder="Article title..."
                    value={editingPost.title || ''}
                    onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                  />
                </div>

                {/* Excerpt */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    <i className="fas fa-align-left mr-2 text-slate-400"></i>Excerpt
                  </label>
                  <textarea
                    rows={2}
                    className="w-full p-0 border-0 outline-none resize-none text-slate-700 text-sm placeholder-slate-300 bg-transparent"
                    placeholder="Brief summary of the article..."
                    value={editingPost.excerpt || ''}
                    onChange={e => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  ></textarea>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="border-b border-slate-100 px-5 py-3 flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <i className="fas fa-pen mr-2 text-slate-400"></i>Content
                    </label>
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <span>{wordCount} words</span>
                      <span>~{estimatedReadTime} read</span>
                      {editingPost.readTime !== estimatedReadTime && (
                        <button
                          onClick={autoSetReadTime}
                          className="text-red-500 hover:text-red-700 font-bold"
                          title="Auto-set read time"
                        >
                          <i className="fas fa-clock mr-1"></i>Update
                        </button>
                      )}
                    </div>
                  </div>
                  <textarea
                    rows={18}
                    className="w-full p-5 border-0 outline-none resize-none text-slate-800 leading-relaxed text-sm placeholder-slate-300 bg-transparent"
                    placeholder="Write your article content here...&#10;&#10;Use > at the start of a line for blockquotes.&#10;Short lines become headings."
                    value={editingPost.content || ''}
                    onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Sidebar Settings Panel */}
            <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-slate-200 bg-white lg:overflow-y-auto flex-shrink-0">
              <div className="p-4 lg:p-6 space-y-6">
                {/* Featured Image */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <i className="fas fa-image mr-2 text-slate-400"></i>Featured Image
                  </label>
                  {editingPost.imageUrl ? (
                    <div className="relative group rounded-xl overflow-hidden border border-slate-200">
                      <img
                        src={editingPost.imageUrl}
                        alt="Featured"
                        className="w-full h-40 object-cover"
                        onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Invalid+URL'; }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-white text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-50"
                        >
                          <i className="fas fa-exchange-alt mr-1"></i>Replace
                        </button>
                        <button
                          onClick={() => setEditingPost({ ...editingPost, imageUrl: '' })}
                          className="bg-white text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-50"
                        >
                          <i className="fas fa-trash mr-1"></i>Remove
                        </button>
                      </div>
                      {imageUrlSize > 0 && (
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                          <i className="fas fa-database mr-1"></i>{formatBytes(imageUrlSize)} stored in Firestore
                        </div>
                      )}
                      {isBase64Image(editingPost.imageUrl) && (
                        <div className="absolute top-2 right-2 bg-green-500/90 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                          <i className="fas fa-check-circle mr-1"></i>Base64
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50/50 cursor-pointer hover:border-red-300 hover:bg-red-50/30 transition-colors"
                    >
                      {isUploadingImage ? (
                        <>
                          <i className="fas fa-spinner fa-spin text-2xl text-red-400 mb-2"></i>
                          <p className="text-xs text-slate-500 font-medium">Compressing & converting...</p>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-cloud-upload-alt text-2xl text-slate-300 mb-2"></i>
                          <p className="text-xs text-slate-500 font-medium">Click to upload from device</p>
                          <p className="text-[10px] text-slate-400 mt-1">JPG, PNG, WebP — auto-compressed</p>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handleImageFileSelect}
                  />
                  {imageUploadError && (
                    <p className="text-xs text-red-500 font-medium">
                      <i className="fas fa-exclamation-circle mr-1"></i>{imageUploadError}
                    </p>
                  )}
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-3 text-[10px] text-slate-400 uppercase font-bold">or paste URL</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>
                  <input
                    type="url"
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-xs"
                    placeholder="https://example.com/image.jpg"
                    value={isBase64Image(editingPost.imageUrl || '') ? '' : editingPost.imageUrl || ''}
                    onChange={e => setEditingPost({ ...editingPost, imageUrl: e.target.value })}
                  />
                  <p className="text-[10px] text-slate-400">
                    Images are stored as Base64 in Firestore — no Firebase Storage needed.
                    For large images, host on <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">imgbb.com</a> and paste the URL.
                  </p>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <i className="fas fa-tag mr-2 text-slate-400"></i>Category
                  </label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white"
                    value={editingPost.category || Category.EDITORIAL}
                    onChange={e => setEditingPost({ ...editingPost, category: e.target.value as Category })}
                  >
                    {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <i className="fas fa-user mr-2 text-slate-400"></i>Author
                  </label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    value={editingPost.author || ''}
                    onChange={e => setEditingPost({ ...editingPost, author: e.target.value })}
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <i className="fas fa-calendar mr-2 text-slate-400"></i>Publish Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    value={editingPost.date || ''}
                    onChange={e => setEditingPost({ ...editingPost, date: e.target.value })}
                  />
                </div>

                {/* Read Time */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <i className="fas fa-clock mr-2 text-slate-400"></i>Read Time
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="flex-1 p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      placeholder="5 min"
                      value={editingPost.readTime || ''}
                      onChange={e => setEditingPost({ ...editingPost, readTime: e.target.value })}
                    />
                    <button
                      onClick={autoSetReadTime}
                      className="p-2.5 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-colors"
                      title="Auto-calculate from content"
                    >
                      <i className="fas fa-magic text-xs"></i>
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400">Estimated: {estimatedReadTime} based on {wordCount} words</p>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <i className="fas fa-signal mr-2 text-slate-400"></i>Status
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingPost({ ...editingPost, status: 'draft' })}
                      className={`flex-1 p-2.5 rounded-lg text-xs font-bold border transition-colors ${editingPost.status === 'draft' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                    >
                      Draft
                    </button>
                    <button
                      onClick={() => setEditingPost({ ...editingPost, status: 'published' })}
                      className={`flex-1 p-2.5 rounded-lg text-xs font-bold border transition-colors ${editingPost.status === 'published' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                    >
                      Published
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-slate-100" />

                {/* Quick Actions */}
                <div className="space-y-2">
                  <button
                    onClick={savePost}
                    disabled={!editingPost.title?.trim()}
                    className="w-full bg-red-600 text-white p-3 rounded-lg font-bold text-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <i className="fas fa-check mr-2"></i>Save Article
                  </button>
                  <button
                    onClick={() => { setIsEditorOpen(false); setEditingPost(null); }}
                    className="w-full bg-slate-100 text-slate-600 p-3 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors"
                  >
                    <i className="fas fa-times mr-2"></i>Discard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
