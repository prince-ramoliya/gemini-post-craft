import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PostGenerator } from '@/components/PostGenerator';
import { MyPostsView } from '@/components/MyPostsView';
import { FileText, Plus } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  status: 'Published' | 'Scheduled';
  timestamp: string;
  file?: {
    name: string;
    size: string;
    type: string;
  };
}

const Index = () => {
  const [activeView, setActiveView] = useState<'generator' | 'posts'>('generator');
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">AI Post Generator</h1>
              </div>
            </div>
            
            <nav className="flex items-center gap-2">
              <Button
                variant={activeView === 'generator' ? 'default' : 'ghost'}
                onClick={() => setActiveView('generator')}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Post
              </Button>
              <Button
                variant={activeView === 'posts' ? 'default' : 'ghost'}
                onClick={() => setActiveView('posts')}
                className="gap-2"
              >
                <FileText className="w-4 h-4" />
                My Posts ({posts.length})
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {activeView === 'generator' ? (
          <PostGenerator 
            posts={posts} 
            onPostCreated={handlePostCreated} 
          />
        ) : (
          <MyPostsView posts={posts} />
        )}
      </main>
    </div>
  );
};

export default Index;
