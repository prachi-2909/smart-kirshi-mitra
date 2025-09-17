import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useVoice } from '@/context/VoiceContext';
import { 
  ArrowLeft, 
  Plus, 
  ThumbsUp, 
  MessageCircle, 
  Camera, 
  User, 
  Award,
  Sprout,
  Users,
  MapPin,
  Volume2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: string;
  author: string;
  avatar: string;
  badge?: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  tags: string[];
}

const Community = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const { location } = useLocation();
  const { speak } = useVoice();
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const [posts] = useState<Post[]>([
    {
      id: '1',
      author: 'Ramesh Kumar',
      avatar: 'RK',
      badge: 'Expert Farmer',
      timestamp: '2 hours ago',
      content: `Just harvested organic tomatoes in ${location?.city || 'our area'}! The yield this season has been exceptional. Using drip irrigation and natural fertilizers really made a difference.`,
      image: '/placeholder.svg',
      likes: 24,
      comments: 8,
      tags: ['Organic', 'Tomatoes', 'Irrigation']
    },
    {
      id: '2',
      author: 'Priya Sharma',
      avatar: 'PS',
      badge: 'Sustainable Farming',
      timestamp: '4 hours ago',
      content: `Weather forecast for ${location?.city || 'our area'} shows rain for the next 3 days. Perfect timing for planting monsoon crops. Who else in ${location?.state || 'the region'} is planning to start sowing?`,
      likes: 18,
      comments: 12,
      tags: ['Weather', 'Monsoon', 'Planting']
    },
    {
      id: '3',
      author: 'Suresh Patel',
      avatar: 'SP',
      badge: 'Cotton Specialist',
      timestamp: '6 hours ago',
      content: `Cotton prices in ${location?.state || 'Maharashtra'} markets are looking good! ₹6,800 per quintal. Planning to sell 50% of my stock at nearby mandi.`,
      likes: 31,
      comments: 15,
      tags: ['Cotton', 'Market', 'Prices']
    },
    {
      id: '4',
      author: 'Maya Devi',
      avatar: 'MD',
      timestamp: '1 day ago',
      content: `Started a small kitchen garden here in ${location?.city || 'the city'}. Even small spaces can yield fresh produce for the family! Happy to share tips with neighbors.`,
      image: '/placeholder.svg',
      likes: 45,
      comments: 22,
      tags: ['Kitchen Garden', 'Herbs', 'Family']
    },
    {
      id: '5',
      author: 'Local Farmer Group',
      avatar: 'LFG',
      badge: 'Community Leader',
      timestamp: '2 days ago',
      content: `${location?.city || 'Local'} farmers meeting this Sunday at 10 AM. Discussing new government schemes and group buying of seeds. All welcome!`,
      likes: 67,
      comments: 34,
      tags: ['Meeting', 'Government Schemes', 'Seeds']
    }
  ]);

  const badges = [
    { name: 'Expert Farmer', color: 'bg-primary', icon: Award },
    { name: 'Eco-friendly Farmer', color: 'bg-success', icon: Sprout },
    { name: 'Community Helper', color: 'bg-accent', icon: Users },
    { name: 'Sustainable Farmer', color: 'bg-secondary', icon: Sprout }
  ];

  const handleNewPost = () => {
    if (newPostContent.trim()) {
      // In real app, this would send to backend
      setNewPostContent('');
      setShowNewPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-4 shadow-3d">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Users className="w-8 h-8 animate-floating" />
            <div>
              <h1 className="text-xl font-bold">{translate('localCommunity')}</h1>
              <div className="flex items-center gap-1 text-sm text-white/80">
                <MapPin className="w-3 h-3" />
                <span>{location?.city || 'Loading location...'}, {location?.state}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => speak(`Welcome to ${location?.city || 'local'} farming community. Connect with nearby farmers and share knowledge.`)}
              className="text-white hover:bg-white/20"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowNewPost(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Post
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* New Post Form */}
        {showNewPost && (
          <Card className="card-3d animate-slide-up border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-lg">Share with Community</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share your farming experience, ask questions, or help others..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-[100px]"
              />
              
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setShowNewPost(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleNewPost}
                    className="glow-effect"
                    disabled={!newPostContent.trim()}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievement Badges */}
        <Card className="card-3d animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto">
              {badges.map((badge, index) => (
                <div key={index} className={`flex items-center gap-2 ${badge.color} text-white px-3 py-2 rounded-full text-sm whitespace-nowrap`}>
                  <badge.icon className="w-4 h-4" />
                  <span>{badge.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="card-3d animate-slide-up">
              <CardContent className="p-4">
                {/* Post Header */}
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{post.author}</span>
                      {post.badge && (
                        <Badge variant="secondary" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          {post.badge}
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                  </div>
                </div>

                {/* Post Content */}
                <p className="mb-3 leading-relaxed">{post.content}</p>

                {/* Post Image */}
                {post.image && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      <span>{post.likes}</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="glow-effect">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Community;