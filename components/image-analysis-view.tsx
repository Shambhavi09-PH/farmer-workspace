"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react"

interface ImageAnalysisViewProps {
  imageId: string
}

export function ImageAnalysisView({ imageId }: ImageAnalysisViewProps) {
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)

  // Mock image data - in real app, this would come from API
  const imageData = {
    id: imageId,
    url: "/tomato-leaf-disease.jpg",
    filename: "tomato_leaf_sample.jpg",
    uploadDate: "2024-01-15T10:30:00Z",
    size: "2.4 MB",
    dimensions: "1920x1080",
    detectedRegions: [
      { x: 45, y: 30, width: 25, height: 20, confidence: 0.92, label: "Early Blight Lesion" },
      { x: 70, y: 55, width: 15, height: 12, confidence: 0.78, label: "Secondary Infection" },
    ],
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Image Analysis</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">AI Processed</Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={handleRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Image Container */}
        <div className="relative border rounded-lg overflow-hidden bg-muted">
          <div
            className="relative transition-transform duration-200"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: "center",
            }}
          >
            <img src={imageData.url || "/placeholder.svg"} alt="Crop analysis" className="w-full h-auto" />

            {/* Detection Overlays */}
            {imageData.detectedRegions.map((region, index) => (
              <div
                key={index}
                className="absolute border-2 border-destructive bg-destructive/10"
                style={{
                  left: `${region.x}%`,
                  top: `${region.y}%`,
                  width: `${region.width}%`,
                  height: `${region.height}%`,
                }}
              >
                <div className="absolute -top-6 left-0 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded whitespace-nowrap">
                  {region.label} ({Math.round(region.confidence * 100)}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Filename:</span>
            <p className="font-medium">{imageData.filename}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Size:</span>
            <p className="font-medium">{imageData.size}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Dimensions:</span>
            <p className="font-medium">{imageData.dimensions}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Upload Date:</span>
            <p className="font-medium">{new Date(imageData.uploadDate).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
