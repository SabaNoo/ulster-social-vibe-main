import { useState } from "react";
import { Heart, Share2, User, Mail, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VideoCardProps {
  videoId: string;
  title: string;
}

const VideoCard = ({ videoId, title }: VideoCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from likes" : "Added to likes",
      duration: 1500,
    });
  };

  const handleShare = (platform: string) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    switch (platform) {
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(videoUrl)}`;
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, '_blank');
        break;
      case 'instagram':
        // Since Instagram doesn't have a direct share URL, we'll copy to clipboard
        navigator.clipboard.writeText(videoUrl);
        toast({
          title: "Link copied! Share it on Instagram",
          duration: 1500,
        });
        break;
      default:
        navigator.clipboard.writeText(videoUrl);
        toast({
          title: "Copied link to clipboard",
          duration: 1500,
        });
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following Ulster University",
      duration: 1500,
    });
  };

  const handleVideoClick = () => {
    // Pause all other videos before playing this one
    document.querySelectorAll('iframe').forEach((iframe) => {
      if (iframe.src.includes('autoplay=1')) {
        iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
      }
    });
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg mb-6 animate-video-scroll">
      <div className="aspect-video rounded-t-lg overflow-hidden" onClick={handleVideoClick}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}${isPlaying ? '?autoplay=1' : ''}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-ulster-gray mb-3 line-clamp-2">{title}</h3>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              Like
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleShare('email')}>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare('facebook')}>
                  <Facebook className="mr-2 h-4 w-4" />
                  <span>Facebook</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare('instagram')}>
                  <Instagram className="mr-2 h-4 w-4" />
                  <span>Instagram</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Button
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            className={`flex items-center gap-2 ${
              isFollowing ? 'border-ulster-blue text-ulster-blue' : 'bg-ulster-blue hover:bg-ulster-light'
            }`}
            onClick={handleFollow}
          >
            <User className="w-4 h-4" />
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;