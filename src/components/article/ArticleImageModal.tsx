"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ArticleImageModalProps {
  images: string[];
  selectedIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ArticleImageModal({
  images,
  selectedIndex,
  onClose,
  onNext,
  onPrevious,
}: ArticleImageModalProps) {
  const isOpen = selectedIndex !== null;
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasMultipleImages) {
        onPrevious();
      } else if (e.key === "ArrowRight" && hasMultipleImages) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hasMultipleImages, onNext, onPrevious]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/95" />
        <DialogContent
          className="max-w-screen max-h-screen w-screen h-screen border-0 p-0 bg-transparent shadow-none"
          showCloseButton={false}
        >
          {selectedIndex !== null && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </Button>

              {hasMultipleImages && (
                <>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    onClick={onPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon-lg"
                    onClick={onNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </>
              )}

              <div className="w-full h-full flex items-center justify-center p-16">
                <img
                  src={images[selectedIndex]}
                  alt={`Image ${selectedIndex + 1} of ${images.length}`}
                  className="max-w-full max-h-full object-contain"
                  loading="eager"
                />
              </div>

              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
                  {selectedIndex + 1} / {images.length}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
