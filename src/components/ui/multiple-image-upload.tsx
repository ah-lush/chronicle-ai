"use client"

import * as React from "react"
import { X, Upload, Crop } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ImageCropDialog } from "@/components/ui/image-crop-dialog"

interface MultipleImageUploadProps {
  value?: string[]
  onChange?: (value: string[]) => void
  onFilesChange?: (files: File[]) => void
  maxImages?: number
  className?: string
  id?: string
  aspect?: number
}

export function MultipleImageUpload({
  value = [],
  onChange,
  onFilesChange,
  maxImages = 10,
  className,
  id,
  aspect = 16 / 9,
}: MultipleImageUploadProps) {
  const [previews, setPreviews] = React.useState<string[]>(value)
  const [files, setFiles] = React.useState<File[]>([])
  const [cropDialogOpen, setCropDialogOpen] = React.useState(false)
  const [cropImageIndex, setCropImageIndex] = React.useState<number | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])

    if (selectedFiles.length + previews.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`)
      return
    }

    const newPreviews: string[] = []
    const newFiles: File[] = []

    selectedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        newPreviews.push(result)

        if (newPreviews.length === selectedFiles.length) {
          const updatedPreviews = [...previews, ...newPreviews]
          const updatedFiles = [...files, ...selectedFiles]
          setPreviews(updatedPreviews)
          setFiles(updatedFiles)
          onChange?.(updatedPreviews)
          onFilesChange?.(updatedFiles)
        }
      }
      reader.readAsDataURL(file)
    })

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const handleRemove = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index)
    const updatedFiles = files.filter((_, i) => i !== index)
    setPreviews(updatedPreviews)
    setFiles(updatedFiles)
    onChange?.(updatedPreviews)
    onFilesChange?.(updatedFiles)
  }

  const handleCropClick = (index: number) => {
    setCropImageIndex(index)
    setCropDialogOpen(true)
  }

  const handleCropComplete = (croppedImage: string) => {
    if (cropImageIndex !== null) {
      const updatedPreviews = [...previews]
      updatedPreviews[cropImageIndex] = croppedImage
      setPreviews(updatedPreviews)
      onChange?.(updatedPreviews)
      setCropImageIndex(null)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-800"
              />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={() => handleCropClick(index)}
                >
                  <Crop className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {previews.length < maxImages && (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          className="w-full h-32 border-dashed"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Click to upload images ({previews.length}/{maxImages})
            </span>
          </div>
        </Button>
      )}

      {cropImageIndex !== null && (
        <ImageCropDialog
          open={cropDialogOpen}
          onOpenChange={setCropDialogOpen}
          imageSrc={previews[cropImageIndex]}
          onCropComplete={handleCropComplete}
          aspect={aspect}
        />
      )}
    </div>
  )
}
