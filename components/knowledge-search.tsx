"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, BookOpen, Leaf, Bug, Droplets } from "lucide-react"

export function KnowledgeSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Topics", icon: BookOpen },
    { id: "diseases", label: "Plant Diseases", icon: Leaf },
    { id: "pests", label: "Pest Control", icon: Bug },
    { id: "treatments", label: "Treatments", icon: Droplets },
  ]

  const popularSearches = [
    "Early Blight",
    "Tomato Diseases",
    "Organic Fungicides",
    "Pest Identification",
    "Soil Health",
    "Crop Rotation",
    "Nutrient Deficiency",
    "Integrated Pest Management",
  ]

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search diseases, treatments, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h3 className="font-medium">Browse by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="cursor-pointer gap-2 py-2 px-4"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Popular Searches */}
        <div className="space-y-3">
          <h3 className="font-medium">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
