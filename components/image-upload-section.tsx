"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface UploadedImage {
  id: string
  file: File
  preview: string
  status: "uploading" | "uploaded" | "analyzing" | "complete"
  progress: number
}

export function ImageUploadSection() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const router = useRouter()

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return

    const newImages: UploadedImage[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: "uploading",
      progress: 0,
    }))

    setUploadedImages((prev) => [...prev, ...newImages])

    // Simulate upload progress
    newImages.forEach((image) => {
      simulateUpload(image.id)
    })
  }, [])

  const simulateUpload = (imageId: string) => {
    const interval = setInterval(() => {
      setUploadedImages((prev) =>
        prev.map((img) => {
          if (img.id === imageId) {
            const newProgress = Math.min(img.progress + 10, 100)
            const newStatus = newProgress === 100 ? "analyzing" : "uploading"

            if (newProgress === 100) {
              setTimeout(() => {
                setUploadedImages((current) =>
                  current.map((i) => (i.id === imageId ? { ...i, status: "complete" } : i)),
                )
              }, 2000)
            }

            return { ...img, progress: newProgress, status: newStatus }
          }
          return img
        }),
      )
    }, 200)

    setTimeout(() => clearInterval(interval), 2000)
  }

  const removeImage = (imageId: string) => {
    setUploadedImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === imageId)
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview)
      }
      return prev.filter((img) => img.id !== imageId)
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleViewAnalysis = (imageId: string) => {
    router.push(`/analysis/${imageId}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Upload Crop Images
        </CardTitle>
        <CardDescription>
          Upload clear images of your crop leaves, stems, or fruits for AI-powered disease detection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-muted rounded-full">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium">Drop images here or click to upload</p>
              <p className="text-sm text-muted-foreground">Supports JPG, PNG, WebP up to 10MB each</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const input = document.createElement("input")
                  input.type = "file"
                  input.multiple = true
                  input.accept = "image/*"
                  input.onchange = (e) => {
                    const target = e.target as HTMLInputElement
                    handleFileSelect(target.files)
                  }
                  input.click()
                }}
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
              <Button variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
        </div>

        {/* Uploaded Images */}
        {uploadedImages.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Uploaded Images ({uploadedImages.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <Card className="overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={image.preview || "/placeholder.svg"}
                        alt="Uploaded crop"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium truncate">{image.file.name}</p>
                        <Badge
                          variant={
                            image.status === "complete"
                              ? "default"
                              : image.status === "analyzing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {image.status === "uploading" && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                          {image.status === "analyzing" && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                          {image.status === "complete" && <ImageIcon className="h-3 w-3 mr-1" />}
                          {image.status === "uploading"
                            ? "Uploading"
                            : image.status === "analyzing"
                              ? "Analyzing"
                              : "Ready"}
                        </Badge>
                      </div>
                      {image.status !== "complete" && <Progress value={image.progress} className="h-2" />}
                      {image.status === "complete" && (
                        <Button size="sm" className="w-full mt-2" onClick={() => handleViewAnalysis(image.id)}>
                          View Analysis
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
