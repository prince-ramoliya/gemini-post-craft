import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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
  Clock
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
  { id: 'ai', name: 'AI & Machine Learning', icon: Bot },
  { id: 'business', name: 'Business Strategy', icon: Briefcase },
  { id: 'technology', name: 'Technology', icon: Code2 },
  { id: 'marketing', name: 'Digital Marketing', icon: TrendingUp },
  { id: 'leadership', name: 'Leadership', icon: Users },
  { id: 'trends', name: 'Industry Trends', icon: Globe },
  { id: 'innovation', name: 'Innovation', icon: Lightbulb },
];

const topicsByCategory = {
  ai: [
    'How AI is Transforming Customer Service',
    'The Future of AI in Healthcare',
    'Machine Learning Best Practices for Startups',
    'Ethical AI Development Guidelines',
  ],
  business: [
    'Building Resilient Business Models',
    'Remote Work Strategy for 2024',
    'Scaling Your Startup Effectively',
    'Digital Transformation ROI',
  ],
  technology: [
    'Cloud Computing Security Trends',
    'The Rise of Edge Computing',
    'DevOps Best Practices',
    'Cybersecurity for Small Businesses',
  ],
  marketing: [
    'Content Marketing ROI Measurement',
    'Social Media Strategy for B2B',
    'Email Marketing Automation',
    'SEO Trends for 2024',
  ],
  leadership: [
    'Building High-Performing Teams',
    'Leadership in Crisis Management',
    'Effective Communication Strategies',
    'Managing Remote Teams',
  ],
  trends: [
    'Sustainability in Business',
    'The Future of Work',
    'Digital Banking Revolution',
    'E-commerce Evolution',
  ],
  innovation: [
    'Design Thinking in Product Development',
    'Innovation Culture Building',
    'Disruptive Technology Adoption',
    'Creative Problem Solving',
  ],
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
  
  const { toast } = useToast();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedTitle('');
    setGeneratedContent('');
    setIsLoadingTitles(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoadingTitles(false);
    }, 750);
  };

  const generateContent = async () => {
    if (!selectedTitle) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const content = `🚀 ${selectedTitle}

In today's rapidly evolving digital landscape, this topic has become more crucial than ever. Here's what industry leaders need to know:

✨ Key insights:
• Innovation drives competitive advantage
• Strategic implementation is essential
• Measurable outcomes matter most

💡 The bottom line: Success comes from combining cutting-edge technology with human-centered design principles.

What's your experience with this? Share your thoughts below! 👇

#Innovation #Technology #Business #Leadership #Growth`;
      
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
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
    <div className="flex h-screen bg-dashboard-bg">
      {/* Categories Column */}
      <div className="w-80 bg-dashboard-sidebar border-r border-border p-6">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Categories</h2>
        <div className="space-y-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card hover:bg-secondary text-card-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Topics Column */}
      <div className="w-96 bg-dashboard-content border-r border-border p-6">
        <h2 className="text-xl font-semibold mb-6 text-foreground">
          {selectedCategory ? 'Article Topics' : 'Select a Category'}
        </h2>
        
        {!selectedCategory ? (
          <p className="text-muted-foreground">Choose a category to see available topics</p>
        ) : isLoadingTitles ? (
          <SkeletonLoader />
        ) : (
          <div className="space-y-4">
            {topicsByCategory[selectedCategory as keyof typeof topicsByCategory]?.map((title) => (
              <button
                key={title}
                onClick={() => setSelectedTitle(title)}
                className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                  selectedTitle === title
                    ? 'border-primary bg-accent-light text-foreground'
                    : 'border-transparent bg-card hover:bg-secondary text-card-foreground'
                }`}
              >
                <h3 className="font-medium">{title}</h3>
              </button>
            ))}
            
            {selectedTitle && (
              <Button
                onClick={generateContent}
                disabled={isGenerating}
                className="w-full mt-6"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Content'
                )}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Content Review Column */}
      <div className="flex-1 bg-dashboard-content p-6">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Review & Post</h2>
        
        <div className="space-y-6">
          {/* Generated Content */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Generated Content
            </label>
            <textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              placeholder="Your AI-generated content will appear here..."
              className="w-full h-64 p-4 border border-input rounded-xl bg-card text-card-foreground resize-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Attach File (Optional)
            </label>
            
            {!uploadedFile ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-xl cursor-pointer bg-card hover:bg-secondary transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload image or document</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </label>
            ) : (
              <Card className="p-4 flex items-center gap-3">
                {uploadedFile.type.startsWith('image/') ? (
                  <Image className="w-10 h-10 text-primary" />
                ) : (
                  <FileText className="w-10 h-10 text-primary" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-sm">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUploadedFile(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => handlePost(false)}
              disabled={!generatedContent}
              className="flex-1"
              size="lg"
            >
              Post Now
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowSchedule(!showSchedule)}
              disabled={!generatedContent}
              size="lg"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>

          {/* Schedule Input */}
          {showSchedule && (
            <Card className="p-4 animate-fade-in">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full p-2 border border-input rounded-lg bg-card"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full p-2 border border-input rounded-lg bg-card"
                  />
                </div>
              </div>
              <Button
                onClick={() => handlePost(true)}
                disabled={!scheduleDate || !scheduleTime}
                className="w-full"
              >
                <Clock className="w-4 h-4 mr-2" />
                Confirm Schedule
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};