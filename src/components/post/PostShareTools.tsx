
import { Button } from "@/components/ui/button";
import { Share, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { event } from "@/lib/analytics";

export default function PostShareTools({ title, description, url }: { title: string, description: string, url: string }) {
  // Share functionality
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: title || 'BlogRecomenda',
        text: description || '',
        url: url,
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(url);
      toast.success('Link copiado para a área de transferência!');
    }

    // Track sharing event
    event({
      action: 'share_content',
      category: 'engagement',
      label: title,
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copiado para a área de transferência!');
    
    // Track copy link event
    event({
      action: 'copy_link',
      category: 'engagement',
      label: title,
    });
  };

  return (
    <div className="mt-12 flex items-center justify-between border-t border-b border-border py-6">
      <div>
        <span className="font-medium">Compartilhe:</span>
      </div>
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={sharePost}
          aria-label="Compartilhar"
        >
          <Share size={16} />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={copyLink}
          aria-label="Copiar Link"
        >
          <LinkIcon size={16} />
        </Button>
      </div>
    </div>
  );
}
