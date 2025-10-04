"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, AlertTriangle, Info, CheckCircle, Leaf, Bug, Droplets } from "lucide-react"

export function DiseaseLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")

  const diseases = [
    {
      id: 1,
      name: "Early Blight",
      scientificName: "Alternaria solani",
      crops: ["Tomato", "Potato"],
      severity: "Moderate",
      category: "Fungal",
      symptoms: ["Dark brown spots with concentric rings", "Yellow halos around spots", "Leaf yellowing"],
      causes: ["High humidity", "Warm temperatures", "Poor air circulation"],
      treatments: ["Copper fungicide", "Crop rotation", "Improved ventilation"],
      prevention: ["Resistant varieties", "Proper spacing", "Drip irrigation"],
      image: "/tomato-leaf-disease.jpg",
      commonality: "Very Common",
      seasonality: "Late summer, early fall",
    },
    {
      id: 2,
      name: "Late Blight",
      scientificName: "Phytophthora infestans",
      crops: ["Tomato", "Potato"],
      severity: "Severe",
      category: "Oomycete",
      symptoms: ["Water-soaked lesions", "White fuzzy growth", "Rapid plant death"],
      causes: ["Cool, wet weather", "High humidity", "Poor drainage"],
      treatments: ["Systemic fungicides", "Remove infected plants", "Improve drainage"],
      prevention: ["Resistant varieties", "Good air circulation", "Avoid overhead watering"],
      image: "/tomato-leaf-disease.jpg",
      commonality: "Common",
      seasonality: "Cool, wet seasons",
    },
    {
      id: 3,
      name: "Corn Smut",
      scientificName: "Ustilago maydis",
      crops: ["Corn"],
      severity: "Moderate",
      category: "Fungal",
      symptoms: ["Large galls on ears and stalks", "Black spore masses", "Distorted growth"],
      causes: ["Mechanical injury", "High nitrogen", "Wet conditions"],
      treatments: ["Remove galls", "Balanced fertilization", "Crop rotation"],
      prevention: ["Avoid plant injury", "Proper nutrition", "Good drainage"],
      image: "/corn-disease.jpg",
      commonality: "Occasional",
      seasonality: "Mid to late summer",
    },
    {
      id: 4,
      name: "Wheat Rust",
      scientificName: "Puccinia triticina",
      crops: ["Wheat"],
      severity: "Severe",
      category: "Fungal",
      symptoms: ["Orange-red pustules", "Leaf yellowing", "Reduced grain quality"],
      causes: ["Humid conditions", "Moderate temperatures", "Wind dispersal"],
      treatments: ["Fungicide application", "Resistant varieties", "Early harvest"],
      prevention: ["Resistant cultivars", "Crop rotation", "Field sanitation"],
      image: "/wheat-rust-disease.jpg",
      commonality: "Common",
      seasonality: "Spring and early summer",
    },
    {
      id: 5,
      name: "Bacterial Spot",
      scientificName: "Xanthomonas vesicatoria",
      crops: ["Tomato", "Pepper"],
      severity: "Moderate",
      category: "Bacterial",
      symptoms: ["Small dark spots", "Yellow halos", "Fruit lesions"],
      causes: ["Warm, wet weather", "Overhead irrigation", "Contaminated seeds"],
      treatments: ["Copper sprays", "Bactericides", "Cultural practices"],
      prevention: ["Certified seeds", "Drip irrigation", "Crop rotation"],
      image: "/tomato-leaf-disease.jpg",
      commonality: "Common",
      seasonality: "Warm, humid weather",
    },
    {
      id: 6,
      name: "Powdery Mildew",
      scientificName: "Erysiphe cichoracearum",
      crops: ["Cucumber", "Squash", "Melon"],
      severity: "Mild",
      category: "Fungal",
      symptoms: ["White powdery coating", "Leaf distortion", "Reduced photosynthesis"],
      causes: ["High humidity", "Poor air circulation", "Crowded plants"],
      treatments: ["Sulfur sprays", "Baking soda solution", "Neem oil"],
      prevention: ["Proper spacing", "Good ventilation", "Resistant varieties"],
      image: "/corn-disease.jpg",
      commonality: "Very Common",
      seasonality: "Late summer, fall",
    },
  ]

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return <Info className="h-4 w-4 text-yellow-500" />
      case "moderate":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "severe":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "fungal":
        return <Leaf className="h-4 w-4" />
      case "bacterial":
        return <Bug className="h-4 w-4" />
      case "viral":
        return <Droplets className="h-4 w-4" />
      default:
        return <Leaf className="h-4 w-4" />
    }
  }

  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.crops.some((crop) => crop.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCrop =
      selectedCrop === "all" || disease.crops.some((crop) => crop.toLowerCase() === selectedCrop.toLowerCase())

    const matchesSeverity =
      selectedSeverity === "all" || disease.severity.toLowerCase() === selectedSeverity.toLowerCase()

    return matchesSearch && matchesCrop && matchesSeverity
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Disease Library</h2>
        <div className="text-sm text-muted-foreground">
          {filteredDiseases.length} of {diseases.length} diseases
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search diseases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Crops" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                <SelectItem value="tomato">Tomato</SelectItem>
                <SelectItem value="potato">Potato</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="pepper">Pepper</SelectItem>
                <SelectItem value="cucumber">Cucumber</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Disease Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((disease) => (
          <Card key={disease.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img
                src={disease.image || "/placeholder.svg"}
                alt={disease.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge variant="secondary" className="gap-1">
                  {getCategoryIcon(disease.category)}
                  {disease.category}
                </Badge>
                <Badge variant="outline" className="gap-1 bg-white/90">
                  {getSeverityIcon(disease.severity)}
                  {disease.severity}
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{disease.name}</CardTitle>
              <CardDescription className="italic">{disease.scientificName}</CardDescription>
              <div className="flex flex-wrap gap-1">
                {disease.crops.map((crop, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {crop}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Tabs defaultValue="symptoms" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="symptoms" className="text-xs">
                    Symptoms
                  </TabsTrigger>
                  <TabsTrigger value="treatment" className="text-xs">
                    Treatment
                  </TabsTrigger>
                  <TabsTrigger value="prevention" className="text-xs">
                    Prevention
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="symptoms" className="space-y-2">
                  <ul className="text-sm space-y-1">
                    {disease.symptoms.slice(0, 3).map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="treatment" className="space-y-2">
                  <ul className="text-sm space-y-1">
                    {disease.treatments.slice(0, 3).map((treatment, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                        {treatment}
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="prevention" className="space-y-2">
                  <ul className="text-sm space-y-1">
                    {disease.prevention.slice(0, 3).map((prevention, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                        {prevention}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{disease.commonality}</span>
                <span>{disease.seasonality}</span>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                View Full Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No diseases found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCrop("all")
                  setSelectedSeverity("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
