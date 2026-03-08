'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { initModels, detectAll, getFeatureAnchor, type Detection } from '@/lib/ar-detection';
import { Loader2, Camera, Download, Share2, Home } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  model_url: string;
  brand: string;
}

interface TryOnStudioProps {
  product: Product;
  onCapture?: (screenshot: Blob) => void;
}

export default function TryOnStudio({ product, onCapture }: TryOnStudioProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [detection, setDetection] = useState<Detection | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    initializeCamera();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stopCamera();
    };
  }, []);

  const initializeCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load AR models
      await initModels();

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsStreaming(true);
          startDetection();
        };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to access camera';
      setError(message);
      console.error('[v0] Camera error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const startDetection = () => {
    const detect = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      try {
        const detections = await detectAll(videoRef.current);
        
        // Use the most relevant detection based on product category
        let activeDetection: Detection | null = null;
        if (product.category === 'glasses' && detections.face) {
          activeDetection = detections.face;
        } else if (product.category === 'clothing' && detections.pose) {
          activeDetection = detections.pose;
        } else if (['jewelry', 'watches'].includes(product.category) && detections.hand) {
          activeDetection = detections.hand;
        } else if (['hats', 'headwear'].includes(product.category) && detections.face) {
          activeDetection = detections.face;
        }

        setDetection(activeDetection);
        renderTryOn();
      } catch (err) {
        console.error('[v0] Detection error:', err);
      }

      animationFrameRef.current = requestAnimationFrame(detect);
    };

    detect();
  };

  const renderTryOn = () => {
    if (!videoRef.current || !canvasRef.current || !detection) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Draw video frame
    ctx.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    // Get anchor point for product placement
    const anchor = getFeatureAnchor(detection, product.category);
    if (!anchor) return;

    // Draw product visualization (placeholder for 3D model)
    ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(anchor.x, anchor.y, 50 * anchor.scale, 0, Math.PI * 2);
    ctx.fill();

    // Draw crosshair for alignment
    ctx.strokeStyle = 'rgba(100, 200, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(anchor.x - 20, anchor.y);
    ctx.lineTo(anchor.x + 20, anchor.y);
    ctx.moveTo(anchor.x, anchor.y - 20);
    ctx.lineTo(anchor.x, anchor.y + 20);
    ctx.stroke();

    // Draw product label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(anchor.x - 60, anchor.y - 80, 120, 30);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(product.name, anchor.x, anchor.y - 58);
  };

  const captureScreenshot = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob(blob => {
      if (blob && onCapture) {
        onCapture(blob);
      }
    });
  };

  if (error) {
    return (
      <Card className="p-6 bg-destructive/10 border-destructive">
        <p className="text-destructive font-semibold mb-4">{error}</p>
        <Button onClick={initializeCamera}>Try Again</Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
              <p className="text-white text-sm">Loading AR models...</p>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          className="hidden"
          playsInline
        />

        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="w-full h-full object-cover"
        />

        {detection && (
          <div className="absolute top-4 right-4 bg-green-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Detection Active
          </div>
        )}
      </div>

      {/* Product Info */}
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <p className="text-base font-semibold mt-2">${product.price}</p>
          </div>
          <span className="text-xs bg-secondary px-3 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
      </Card>

      {/* Controls */}
      <div className="flex gap-3">
        <Button
          onClick={captureScreenshot}
          disabled={isLoading || !isStreaming}
          className="flex-1"
          size="lg"
        >
          <Camera className="w-4 h-4 mr-2" />
          Capture
        </Button>
        <Button variant="outline" size="lg" className="flex-1">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button variant="ghost" size="lg" asChild>
          <Link href="/">
            <Home className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
