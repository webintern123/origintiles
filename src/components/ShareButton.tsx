import { Share2, Facebook, Twitter, Linkedin, Mail, Link, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  url?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

export function ShareButton({ 
  title, 
  url = window.location.href,
  variant = "outline",
  size = "default",
  showLabel = true 
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check this out: ${url}`)}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied!", {
      description: "Share link has been copied to clipboard"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    toast.info(`Sharing on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={variant} size={size} className="focus-ring-accent">
          <Share2 className={`icon-md ${showLabel ? 'mr-2' : ''}`} />
          {showLabel && 'Share'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <h4 className="font-semibold mb-3">Share this</h4>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="justify-start focus-ring-accent"
            >
              <Facebook className="icon-sm mr-2 text-blue-600" />
              Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="justify-start focus-ring-accent"
            >
              <Twitter className="icon-sm mr-2 text-sky-500" />
              Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="justify-start focus-ring-accent"
            >
              <Linkedin className="icon-sm mr-2 text-blue-700" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('email')}
              className="justify-start focus-ring-accent"
            >
              <Mail className="icon-sm mr-2 text-neutral-600" />
              Email
            </Button>
          </div>
          <div className="pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="w-full justify-start focus-ring-accent"
            >
              {copied ? (
                <>
                  <Check className="icon-sm mr-2 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Link className="icon-sm mr-2" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
