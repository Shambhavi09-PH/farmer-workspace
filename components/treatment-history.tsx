"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, TrendingUp, Download, Filter } from "lucide-react"

export function TreatmentHistory() {
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock treatment history data
  const treatments = [
    {
      id: 1,
      cropType: "Tomato",
      disease: "Early Blight",
      treatmentType: "Organic",
      treatment: "Copper Fungicide",
      startDate: "2024-01-10",
      endDate: "2024-01-24",
      status: "completed",
      effectiveness: 85,
      cost: "$45",
      notes: "Significant improvement after 2 weeks. Will continue monitoring.",
      images: ["/tomato-leaf-disease.jpg"],
      applications: 3,
      duration: "14 days",
    },
    {
      id: 2,
      cropType: "Corn",
      disease: "Corn Smut",
      treatmentType: "Cultural",
      treatment: "Gall Removal + Rotation",
      startDate: "2024-01-05",
      endDate: "2024-01-15",
      status: "completed",
      effectiveness: 92,
      cost: "$0",
      notes: "Manual removal of galls was effective. Planning crop rotation.",
      images: ["/corn-disease.jpg"],
      applications: 1,
      duration: "10 days",
    },
    {
      id: 3,
      cropType: "Wheat",
      disease: "Wheat Rust",
      treatmentType: "Chemical",
      treatment: "Systemic Fungicide",
      startDate: "2024-01-15",
      endDate: null,
      status: "in-progress",
      effectiveness: 70,
      cost: "$120",
      notes: "Treatment ongoing. Showing good initial response.",
      images: ["/wheat-rust-disease.jpg"],
      applications: 2,
      duration: "Ongoing",
    },
    {
      id: 4,
      cropType: "Tomato",
      disease: "Bacterial Spot",
      treatmentType: "Organic",
      treatment: "Neem Oil",
      startDate: "2023-12-20",
      endDate: "2024-01-03",
      status: "partially-effective",
      effectiveness: 60,
      cost: "$25",
      notes: "Moderate improvement. May need stronger treatment.",
      images: ["/tomato-leaf-disease.jpg"],
      applications: 4,
      duration: "14 days",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "partially-effective":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <TrendingUp className="h-4 w-4" />
      case "partially-effective":
        return <AlertTriangle className="h-4 w-4" />
      case "failed":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 80) return "text-green-600"
    if (effectiveness >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredTreatments = treatments.filter((treatment) => {
    const matchesStatus = selectedStatus === "all" || treatment.status === selectedStatus
    // Add period filtering logic here if needed
    return matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Treatment History</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="partially-effective">Partially Effective</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Cards */}
      <div className="space-y-4">
        {filteredTreatments.map((treatment) => (
          <Card key={treatment.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Treatment Image */}
                <div className="lg:w-32 lg:h-32 w-full h-48 flex-shrink-0">
                  <img
                    src={treatment.images[0] || "/placeholder.svg"}
                    alt={`${treatment.disease} treatment`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Treatment Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{treatment.disease}</h3>
                      <p className="text-muted-foreground">
                        {treatment.cropType} • {treatment.treatment}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{treatment.treatmentType}</Badge>
                        <Badge variant="secondary" className={`text-white ${getStatusColor(treatment.status)}`}>
                          {getStatusIcon(treatment.status)}
                          {treatment.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getEffectivenessColor(treatment.effectiveness)}`}>
                        {treatment.effectiveness}%
                      </div>
                      <div className="text-sm text-muted-foreground">Effectiveness</div>
                    </div>
                  </div>

                  <Progress value={treatment.effectiveness} className="h-2" />

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Start Date:</span>
                      <p className="font-medium">{new Date(treatment.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{treatment.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Applications:</span>
                      <p className="font-medium">{treatment.applications}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost:</span>
                      <p className="font-medium">{treatment.cost}</p>
                    </div>
                  </div>

                  {treatment.notes && (
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm">{treatment.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Repeat Treatment
                    </Button>
                    <Button variant="outline" size="sm">
                      Add Notes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTreatments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No treatments found</h3>
              <p className="text-muted-foreground">
                No treatments match your current filters. Try adjusting the filters or start a new treatment.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
