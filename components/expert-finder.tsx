"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Locate, Filter } from "lucide-react"

export function ExpertFinder() {
  const [location, setLocation] = useState("")
  const [radius, setRadius] = useState("10")
  const [expertType, setExpertType] = useState("all")
  const [isLocating, setIsLocating] = useState(false)

  const handleGetLocation = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`)
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
        },
      )
    } else {
      setIsLocating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Find Experts Near You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Input */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Your Location</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter city, state, or coordinates"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={handleGetLocation}
                disabled={isLocating}
                className="flex-shrink-0 bg-transparent"
              >
                <Locate className={`h-4 w-4 ${isLocating ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="radius">Search Radius</Label>
            <Select value={radius} onValueChange={setRadius}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 miles</SelectItem>
                <SelectItem value="10">10 miles</SelectItem>
                <SelectItem value="25">25 miles</SelectItem>
                <SelectItem value="50">50 miles</SelectItem>
                <SelectItem value="100">100 miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Label>Expert Type</Label>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "All Experts" },
              { value: "extension", label: "Extension Officers" },
              { value: "plant-doctor", label: "Plant Doctors" },
              { value: "crop-specialist", label: "Crop Specialists" },
              { value: "soil-expert", label: "Soil Experts" },
              { value: "pest-control", label: "Pest Control" },
            ].map((type) => (
              <Badge
                key={type.value}
                variant={expertType === type.value ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setExpertType(type.value)}
              >
                {type.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <Button className="w-full" size="lg">
          <Search className="h-4 w-4 mr-2" />
          Find Experts
        </Button>
      </CardContent>
    </Card>
  )
}
