import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Image } from 'lucide-react';

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

interface MyPostsViewProps {
  posts: Post[];
}

export const MyPostsView: React.FC<MyPostsViewProps> = ({ posts }) => {
  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Posts</h1>
          <p className="text-muted-foreground">
            View and manage your published and scheduled posts
          </p>
        </div>

        {posts.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-muted-foreground">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
              <p>Start creating content to see your posts here!</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="p-6 animate-fade-in">
                <div className="flex justify-between items-start mb-4">
                  <Badge 
                    variant={post.status === 'Published' ? 'default' : 'secondary'}
                    className={
                      post.status === 'Published' 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-warning text-warning-foreground'
                    }
                  >
                    {post.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {post.timestamp}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="prose max-w-none">
                    <p className="text-foreground whitespace-pre-wrap">
                      {truncateContent(post.content)}
                    </p>
                  </div>

                  {post.file && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      {post.file.type.startsWith('image/') ? (
                        <Image className="w-6 h-6 text-primary" />
                      ) : (
                        <FileText className="w-6 h-6 text-primary" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{post.file.name}</p>
                        <p className="text-xs text-muted-foreground">{post.file.size}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};