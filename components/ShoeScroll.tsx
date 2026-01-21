"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import clsx from "clsx";

const FRAME_COUNT = 158; // 1 to 158 based on file list
const IMAGES_FOLDER = "/shoe_sequence";
const STRICT_BG_COLOR = "#0c0c0c";

export default function ShoeScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // Using strict color provided by user
  const backgroundColor = STRICT_BG_COLOR;

  // Scroll mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map 0-1 scroll to frame index 0-(FRAME_COUNT-1)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    let imagesLoaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(5, "0");
        img.src = `${IMAGES_FOLDER}/${paddedIndex}.jpg`;

        await new Promise<void>((resolve) => {
          img.onload = () => {
            imagesLoaded++;
            setLoadingProgress(Math.round((imagesLoaded / FRAME_COUNT) * 100));
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image ${i}`);
            // Still resolve to continue processing
            resolve();
          };
        });
        loadedImages[i - 1] = img;
      }
      setImages(loadedImages);

      setIsLoaded(true);
    };

    loadImages();
  }, []);

  // Draw to canvas
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = images[index];

    if (!canvas || !ctx || !img) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;

    // Set canvas dimensions to match viewport (fullscreen)
    // We update this on resize/frame render to ensure it's always correct
    const rect = canvas.getBoundingClientRect();

    // Only update logical size if it changed to avoid layout thrashing
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    // Clear with dynamic color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw Image - Cover Fit
    const targetRatio = rect.width / rect.height;
    const imageRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imageRatio > targetRatio) {
      // Image is wider than container - matches height, crops width (center align)
      drawHeight = rect.height;
      drawWidth = rect.height * imageRatio;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Image is taller than container - matches width, crops height (center align)
      drawWidth = rect.width;
      drawHeight = rect.width / imageRatio;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Subscribe to scroll changes to render
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isLoaded) return;
    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest)));
    requestAnimationFrame(() => renderFrame(index));
  });

  // Initial render when loaded
  useEffect(() => {
    if (isLoaded) {
      renderFrame(0);
    }
  }, [isLoaded]);

  // Handle resize
  useEffect(() => {
    if (!isLoaded) return;
    const handleResize = () => {
      // Force re-render of current frame
      const currentIdx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(frameIndex.get())));
      renderFrame(currentIdx);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);


  return (
    <div ref={containerRef} className="h-[400vh] relative bg-[#0c0c0c]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#ECECEC]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
            <p className="mt-4 text-sm font-medium text-white/40 tracking-tight">
              Loading WpDev sequence... {loadingProgress}%
            </p>
          </div>
        )}

        {/* The Canvas */}
        <canvas
          ref={canvasRef}
          className="h-full w-full block"
        />

        {/* Watermark Mask (Bottom Right) - Increased Size */}
        <div
          className="absolute bottom-0 right-0 z-50 w-48 h-24 pointer-events-none"
          style={{ backgroundColor }}
        />

        {/* Text Overlays */}
        {/* 0% - Centered */}
        <OverlaySection scrollYProgress={scrollYProgress} start={0} end={0.15} align="center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-2">
            WpDev Keyboard.
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-medium tracking-tight">
            Engineered clarity.
          </p>
        </OverlaySection>

        {/* 25% - Left Aligned */}
        <OverlaySection scrollYProgress={scrollYProgress} start={0.2} end={0.35} align="left">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2">
            Built for Precision.
          </h2>
          <p className="text-lg md:text-xl text-white/60 font-medium tracking-tight">
            Every detail, measured.
          </p>
        </OverlaySection>

        {/* 60% - Right Aligned */}
        <OverlaySection scrollYProgress={scrollYProgress} start={0.55} end={0.7} align="right">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2">
            Layered Engineering.
          </h2>
          <p className="text-lg md:text-xl text-white/60 font-medium tracking-tight">
            See what’s inside.
          </p>
        </OverlaySection>

        {/* 90% - Centered CTA */}
        <OverlaySection scrollYProgress={scrollYProgress} start={0.85} end={1.0} align="center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Assembled. Ready.
          </h2>
          <p className="text-lg md:text-xl text-white/60 font-medium tracking-tight">
            Scroll back to replay.
          </p>
        </OverlaySection>

      </div>
    </div>
  );
}

// Sub-component for individual text sections
function OverlaySection({
  children,
  scrollYProgress,
  start,
  end,
  align = 'center'
}: {
  children: React.ReactNode;
  scrollYProgress: any;
  start: number;
  end: number;
  align?: 'left' | 'center' | 'right';
}) {
  const opacity = useTransform(scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [20, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className={clsx(
        "absolute inset-0 flex flex-col justify-center px-8 md:px-20 pointer-events-none",
        {
          "items-center text-center": align === 'center',
          "items-start text-left": align === 'left',
          "items-end text-right": align === 'right',
        }
      )}
    >
      {/* We need to re-export motion from a separate client file or import it here. 
          For simplicity, assuming 'motion' is imported from framer-motion in the parent or this file.
      */}
      {children}
    </motion.div>
  );
}

// Need to import motion properly
import { motion } from "framer-motion";
