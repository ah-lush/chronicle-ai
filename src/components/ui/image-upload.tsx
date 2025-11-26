"use client"

import * as React from "react"
import { X, Upload, Crop } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ImageCropDialog } from "@/components/ui/image-crop-dialog"

interface ImageUploadProps {
  value?: string
  onChange?: (value: string | undefined) => void
  onFileChange?: (file: File | undefined) => void
  className?: string
  id?: string
  aspect?: number
}

export function ImageUpload({
  value,
  onChange,
  onFileChange,
  className,
  id,
  aspect = 16 / 9,
}: ImageUploadProps) {
  const [preview, setPreview] = React.useState<string | undefined>(value)
  const [cropDialogOpen, setCropDialogOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onChange?.(result)
      }
      reader.readAsDataURL(file)
      onFileChange?.(file)
    }
  }

  const handleRemove = () => {
    setPreview(undefined)
    onChange?.(undefined)
    onFileChange?.(undefined)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const handleCropComplete = (croppedImage: string) => {
    setPreview(croppedImage)
    onChange?.(croppedImage)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="max-h-64 rounded-lg border border-gray-200 dark:border-gray-800"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => setCropDialogOpen(true)}
            >
              <Crop className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          className="w-full h-32 border-dashed"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Click to upload image
            </span>
          </div>
        </Button>
      )}

      {preview && (
        <ImageCropDialog
          open={cropDialogOpen}
          onOpenChange={setCropDialogOpen}
          imageSrc={preview}
          onCropComplete={handleCropComplete}
          aspect={aspect}
        />
      )}
    </div>
  )
}
