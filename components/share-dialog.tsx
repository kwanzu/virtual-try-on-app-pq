'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Share2, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  screenshotUrl?: string;
  productName: string;
  productPrice: number;
}

export function ShareDialog({
  open,
  onOpenChange,
  screenshotUrl,
  productName,
  productPrice,
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareText = `Check out this ${productName} ($${productPrice}) that I tried on with VirtualFit! See how it looks before you buy.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleShareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const handleShareViaEmail = () => {
    const mailtoLink = `mailto:?subject=${encodeURIComponent(`Check out this ${productName}`)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
    window.location.href = mailtoLink;
  };

  const handleShareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Try-On</DialogTitle>
          <DialogDescription>
            Share this amazing try-on experience with your friends!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Share Link */}
          <div>
            <label className="text-sm font-medium mb-2 block">Share Link</label>
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                title={copied ? 'Copied!' : 'Copy link'}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            {copied && <p className="text-xs text-green-600 mt-1">Link copied to clipboard!</p>}
          </div>

          {/* Share Buttons */}
          <div>
            <label className="text-sm font-medium mb-2 block">Share To</label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={handleShareToTwitter} className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" onClick={handleShareToFacebook} className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button variant="outline" onClick={handleShareViaEmail} className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" onClick={handleShareViaWhatsApp} className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Share Message */}
          <div>
            <label className="text-sm font-medium mb-2 block">Share Message</label>
            <textarea
              className="w-full p-2 border rounded text-sm"
              rows={3}
              value={shareText}
              readOnly
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
