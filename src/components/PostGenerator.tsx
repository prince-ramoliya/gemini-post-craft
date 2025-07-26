import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ContentPreviewModal } from '@/components/ContentPreviewModal';
import { 
  Bot, 
  Briefcase, 
  Code2, 
  TrendingUp, 
  Users, 
  Globe, 
  Lightbulb,
  Upload,
  FileText,
  Image,
  X,
  Loader2,
  Calendar,
  Clock,
  Maximize2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface PostGeneratorProps {
  posts: Post[];
  onPostCreated: (post: Post) => void;
}

const categories = [
  { id: 'ai', name: 'AI', icon: Bot },
  { id: 'programming', name: 'Programming & Development', icon: Code2 },
  { id: 'webdev', name: 'Web Development', icon: Globe },
  { id: 'mobile', name: 'Mobile Development', icon: TrendingUp },
  { id: 'devops', name: 'DevOps & Cloud', icon: Briefcase },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: Users },
  { id: 'datascience', name: 'Data Science & Analytics', icon: TrendingUp },
  { id: 'ux', name: 'UI/UX Design', icon: Lightbulb },
  { id: 'technews', name: 'Tech News & Trends', icon: Globe },
  { id: 'architecture', name: 'Software Architecture', icon: Code2 },
  { id: 'hardware', name: 'Hardware & Systems', icon: Bot },
  { id: 'itmanagement', name: 'IT Management', icon: Briefcase },
  { id: 'education', name: 'Tech Education & Learning', icon: Lightbulb },
  { id: 'startups', name: 'Tech Business & Startups', icon: TrendingUp },
];

const redditUrls = {
  ai: 'https://www.reddit.com/r/ArtificialIntelligence/top.json?limit=10&t=day',
  programming: 'https://www.reddit.com/r/programming/top.json?limit=10&t=day',
  webdev: 'https://www.reddit.com/r/webdev/top.json?limit=10&t=day',
  mobile: 'https://www.reddit.com/r/androiddev/top.json?limit=10&t=day',
  devops: 'https://www.reddit.com/r/devops/top.json?limit=10&t=day',
  cybersecurity: 'https://www.reddit.com/r/cybersecurity/top.json?limit=10&t=day',
  datascience: 'https://www.reddit.com/r/datascience/top.json?limit=10&t=day',
  ux: 'https://www.reddit.com/r/userexperience/top.json?limit=10&t=day',
  technews: 'https://www.reddit.com/r/technology/top.json?limit=10&t=day',
  architecture: 'https://www.reddit.com/r/softwarearchitecture/top.json?limit=10&t=day',
  hardware: 'https://www.reddit.com/r/hardware/top.json?limit=10&t=day',
  itmanagement: 'https://www.reddit.com/r/sysadmin/top.json?limit=10&t=day',
  education: 'https://www.reddit.com/r/learnprogramming/top.json?limit=10&t=day',
  startups: 'https://www.reddit.com/r/startups/top.json?limit=10&t=day',
};

const SkeletonLoader = () => (
  <div className="space-y-3">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="h-16 bg-muted rounded-lg animate-shimmer"
        style={{
          background: 'linear-gradient(90deg, hsl(var(--muted)) 25%, hsl(var(--muted-foreground) / 0.1) 50%, hsl(var(--muted)) 75%)',
          backgroundSize: '200px 100%',
        }}
      />
    ))}
  </div>
);

export const PostGenerator: React.FC<PostGeneratorProps> = ({ posts, onPostCreated }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [redditTopics, setRedditTopics] = useState<string[]>([]);
  
  const { toast } = useToast();

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedTitle('');
    setGeneratedContent('');
    setIsLoadingTitles(true);
    setRedditTopics([]);
    
    try {
      const url = redditUrls[categoryId as keyof typeof redditUrls];
      const response = await fetch(url);
      const data = await response.json();
      
      const topics = data.data.children
        .slice(0, 5)
        .map((post: any) => post.data.title)
        .filter((title: string) => title.length < 100); // Filter out very long titles
      
      setRedditTopics(topics);
    } catch (error) {
      console.error('Error fetching Reddit topics:', error);
      toast({
        title: "Error fetching topics",
        description: "Using fallback topics instead.",
        variant: "destructive",
      });
      // Fallback topics
      setRedditTopics([
        'How to Scale Your Tech Business',
        'Best Practices for Modern Development',
        'The Future of Technology Trends',
        'Building Better User Experiences',
        'Innovation in the Digital Age'
      ]);
    } finally {
      setIsLoadingTitles(false);
    }
  };

  const generateContent = async () => {
    if (!selectedTitle) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const content = generateLinkedInPost(selectedTitle);
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  const generateLinkedInPost = (topic: string) => {
    const hooks = [
      "The biggest mistake tech leaders make?",
      "Here's what 10 years in tech taught me:",
      "Most startups fail because of this one thing:",
      "The reality of scaling a tech business:",
      "Why traditional approaches don't work anymore:"
    ];
    
    const hook = hooks[Math.floor(Math.random() * hooks.length)];
    
    return `${hook}

${topic} isn't just a buzzword—it's reshaping how we build and scale technology businesses.

**The reality:**
Most companies approach this wrong. They focus on tools over strategy.

**The solution:**
Start with your users. Build backwards from their actual needs.

**The result:**
Products that don't just function—they transform businesses.

What's your take on this approach?`;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePost = (isScheduled: boolean = false) => {
    if (!generatedContent) return;
    
    const timestamp = isScheduled 
      ? `${scheduleDate} ${scheduleTime}`
      : new Date().toLocaleString();
    
    const newPost: Post = {
      id: Date.now().toString(),
      content: generatedContent,
      status: isScheduled ? 'Scheduled' : 'Published',
      timestamp,
      file: uploadedFile ? {
        name: uploadedFile.name,
        size: formatFileSize(uploadedFile.size),
        type: uploadedFile.type,
      } : undefined,
    };

    onPostCreated(newPost);
    
    // Reset form
    setGeneratedContent('');
    setUploadedFile(null);
    setShowSchedule(false);
    setScheduleDate('');
    setScheduleTime('');
    
    toast({
      title: isScheduled ? "Post scheduled!" : "Post published!",
      description: isScheduled 
        ? `Your post will be published on ${scheduleDate} at ${scheduleTime}`
        : "Your post has been published and saved to your history.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      <div className="flex h-screen">
        {/* Categories Column */}
        <div className="w-80 bg-card/50 backdrop-blur-sm border-r border-border p-8 shadow-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Categories</h2>
            <p className="text-sm text-muted-foreground">Choose your content focus</p>
          </div>
          
          <div className="space-y-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`group w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-300 shadow-sm hover:shadow-md ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary-hover text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]'
                      : 'bg-card hover:bg-accent/50 text-card-foreground hover:scale-[1.01] border border-border/50'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20' : 'bg-primary/10'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm">{category.name}</span>
                    <div className={`h-1 w-0 group-hover:w-full transition-all duration-300 rounded-full mt-1 ${
                      isActive ? 'bg-white/40' : 'bg-primary'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topics Column */}
        <div className="w-96 bg-card/30 backdrop-blur-sm border-r border-border p-8 shadow-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {selectedCategory ? 'Article Topics' : 'Select Category'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedCategory ? 'Pick a topic to generate content' : 'Choose a category to see available topics'}
            </p>
          </div>
          
          {!selectedCategory ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground">Start by selecting a category</p>
            </div>
          ) : isLoadingTitles ? (
            <SkeletonLoader />
          ) : (
            <div className="space-y-4">
              {redditTopics.map((title) => (
                <button
                  key={title}
                  onClick={() => setSelectedTitle(title)}
                  className={`group w-full p-5 rounded-2xl text-left transition-all duration-300 shadow-sm hover:shadow-md border ${
                    selectedTitle === title
                      ? 'border-primary bg-gradient-to-r from-accent/20 to-primary/10 shadow-lg shadow-primary/10 scale-[1.02]'
                      : 'border-border/50 bg-card hover:bg-accent/30 hover:scale-[1.01]'
                  }`}
                >
                  <h3 className="font-semibold text-sm text-foreground mb-1">{title}</h3>
                  <div className={`h-1 w-0 group-hover:w-full transition-all duration-300 rounded-full ${
                    selectedTitle === title ? 'bg-primary w-full' : 'bg-primary/60'
                  }`} />
                </button>
              ))}
              
              {selectedTitle && (
                <Button
                  onClick={generateContent}
                  disabled={isGenerating}
                  className="w-full mt-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Generating Magic...
                    </>
                  ) : (
                    <>
                      <Bot className="w-5 h-5 mr-3" />
                      Generate Content
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Content Review Column */}
        <div className="flex-1 bg-card/20 backdrop-blur-sm p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Review & Publish</h2>
            <p className="text-sm text-muted-foreground">Perfect your content and share with the world</p>
          </div>
          
          <div className="space-y-8">
            {/* Generated Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-lg font-semibold text-foreground mb-1">
                    Generated Content
                  </label>
                  <p className="text-sm text-muted-foreground">Review and edit your AI-generated post</p>
                </div>
                {generatedContent && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreviewModal(true)}
                    className="gap-2 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Maximize2 className="w-4 h-4" />
                    Full View
                  </Button>
                )}
              </div>
              <div className="relative">
                <textarea
                  value={generatedContent}
                  onChange={(e) => setGeneratedContent(e.target.value)}
                  placeholder="Your AI-generated content will appear here..."
                  className="w-full h-72 p-6 border border-border rounded-2xl bg-card/80 backdrop-blur-sm text-card-foreground resize-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 shadow-sm font-medium leading-relaxed"
                />
                {!generatedContent && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground/60">Content will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-foreground mb-1">
                  Media Attachment
                </label>
                <p className="text-sm text-muted-foreground">Add an image or document (optional)</p>
              </div>
              
              {!uploadedFile ? (
                <label className="group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border/50 rounded-2xl cursor-pointer bg-card/50 hover:bg-accent/30 transition-all duration-300 hover:border-primary/50">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground mb-1">Click to upload</span>
                    <span className="text-xs text-muted-foreground">Images, PDFs, or documents</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                </label>
              ) : (
                <Card className="p-6 bg-gradient-to-r from-accent/20 to-primary/10 border-primary/20 shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      {uploadedFile.type.startsWith('image/') ? (
                        <Image className="w-8 h-8 text-primary" />
                      ) : (
                        <FileText className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => handlePost(false)}
                disabled={!generatedContent}
                className="flex-1 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <span className="mr-2">🚀</span>
                Publish Now
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowSchedule(!showSchedule)}
                disabled={!generatedContent}
                size="lg"
                className="px-8 h-14 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule
              </Button>
            </div>

            {/* Schedule Input */}
            {showSchedule && (
              <Card className="p-6 animate-fade-in bg-gradient-to-r from-accent/10 to-primary/5 border-primary/20 shadow-lg">
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-1">Schedule Publication</h3>
                  <p className="text-sm text-muted-foreground">Choose when to publish your post</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full p-3 border border-input rounded-xl bg-card focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Time</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full p-3 border border-input rounded-xl bg-card focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handlePost(true)}
                  disabled={!scheduleDate || !scheduleTime}
                  className="w-full h-12 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Confirm Schedule
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Content Preview Modal */}
      <ContentPreviewModal
        content={generatedContent}
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
      />
    </div>
  );
};