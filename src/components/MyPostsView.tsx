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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      <div className="max-w-5xl mx-auto p-8">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              My Posts
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              View and manage your published and scheduled content. Track your social media presence and engagement.
            </p>
          </div>
        </div>

        {posts.length === 0 ? (
          <Card className="p-16 text-center bg-card/50 backdrop-blur-sm border-2 border-dashed border-border/50 shadow-xl">
            <div className="text-muted-foreground">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">No posts yet</h3>
              <p className="text-lg mb-6">Start creating amazing content to see your posts here!</p>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-hover rounded-full mx-auto"></div>
            </div>
          </Card>
        ) : (
          <div className="grid gap-8">
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className="p-8 animate-fade-in bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={post.status === 'Published' ? 'default' : 'secondary'}
                      className={`px-4 py-2 text-sm font-semibold rounded-full shadow-md ${
                        post.status === 'Published' 
                          ? 'bg-gradient-to-r from-success to-success/80 text-success-foreground border-success/20' 
                          : 'bg-gradient-to-r from-warning to-warning/80 text-warning-foreground border-warning/20'
                      }`}
                    >
                      {post.status === 'Published' ? '✅ Published' : '⏰ Scheduled'}
                    </Badge>
                    <div className="h-6 w-px bg-border"></div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {post.timestamp}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <div className="bg-muted/30 rounded-2xl p-6 border border-border/30">
                      <p className="text-foreground whitespace-pre-wrap leading-relaxed text-base">
                        {truncateContent(post.content, 300)}
                      </p>
                      {post.content.length > 300 && (
                        <div className="mt-4 text-center">
                          <span className="text-primary font-medium">... read more</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {post.file && (
                    <div className="bg-gradient-to-r from-accent/20 to-primary/10 rounded-2xl p-6 border border-primary/20">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          {post.file.type.startsWith('image/') ? (
                            <Image className="w-8 h-8 text-primary" />
                          ) : (
                            <FileText className="w-8 h-8 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground mb-1">{post.file.name}</p>
                          <p className="text-sm text-muted-foreground">{post.file.size}</p>
                        </div>
                        <div className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                          {post.file.type.startsWith('image/') ? 'Image' : 'Document'}
                        </div>
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