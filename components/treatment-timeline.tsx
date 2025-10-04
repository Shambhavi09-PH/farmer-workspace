"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"

interface TreatmentTimelineProps {
  diagnosisId: string
}

export function TreatmentTimeline({ diagnosisId }: TreatmentTimelineProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  // Mock timeline data - in real app, this would come from API
  const timelineData = [
    {
      id: "1",
      date: "Today",
      time: "6:00 AM",
      task: "First copper fungicide application",
      status: "pending",
      type: "treatment",
      notes: "Apply in early morning when dew is present",
    },
    {
      id: "2",
      date: "Today",
      time: "Evening",
      task: "Remove affected leaves",
      status: "pending",
      type: "cultural",
      notes: "Dispose of leaves away from garden area",
    },
    {
      id: "3",
      date: "Jan 22",
      time: "6:00 AM",
      task: "Second copper fungicide application",
      status: "scheduled",
      type: "treatment",
      notes: "Check weather conditions before application",
    },
    {
      id: "4",
      date: "Jan 25",
      time: "Any time",
      task: "Monitor plant progress",
      status: "scheduled",
      type: "monitoring",
      notes: "Take photos to track improvement",
    },
    {
      id: "5",
      date: "Jan 29",
      time: "6:00 AM",
      task: "Third copper fungicide application",
      status: "scheduled",
      type: "treatment",
      notes: "Final application in treatment cycle",
    },
    {
      id: "6",
      date: "Feb 1",
      time: "Any time",
      task: "Treatment evaluation",
      status: "scheduled",
      type: "evaluation",
      notes: "Assess treatment effectiveness and plan next steps",
    },
  ]

  const handleCheckItem = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems)
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId)
    } else {
      newCheckedItems.add(itemId)
    }
    setCheckedItems(newCheckedItems)
  }

  const getStatusIcon = (status: string, isChecked: boolean) => {
    if (isChecked) return <CheckCircle className="h-4 w-4 text-primary" />
    if (status === "pending") return <AlertCircle className="h-4 w-4 text-orange-500" />
    return <Clock className="h-4 w-4 text-muted-foreground" />
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "treatment":
        return "bg-primary"
      case "cultural":
        return "bg-secondary"
      case "monitoring":
        return "bg-blue-500"
      case "evaluation":
        return "bg-purple-500"
      default:
        return "bg-muted"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "treatment":
        return "Treatment"
      case "cultural":
        return "Cultural"
      case "monitoring":
        return "Monitor"
      case "evaluation":
        return "Evaluate"
      default:
        return "Task"
    }
  }

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Treatment Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {checkedItems.size} of {timelineData.length} tasks completed
            </div>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Items */}
      <Card>
        <CardContent className="p-0">
          <div className="space-y-0">
            {timelineData.map((item, index) => {
              const isChecked = checkedItems.has(item.id)
              const isLast = index === timelineData.length - 1

              return (
                <div key={item.id} className="relative">
                  <div className="flex items-start gap-4 p-4">
                    {/* Timeline Line */}
                    {!isLast && <div className="absolute left-8 top-12 w-px h-16 bg-border" />}

                    {/* Checkbox */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background relative z-10">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleCheckItem(item.id)}
                        className="w-4 h-4"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium ${isChecked ? "line-through text-muted-foreground" : ""}`}>
                              {item.task}
                            </h4>
                            <Badge variant="secondary" className={`text-white text-xs ${getTypeColor(item.type)}`}>
                              {getTypeLabel(item.type)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.time}
                            </span>
                          </div>
                          {item.notes && <p className="text-sm text-muted-foreground">{item.notes}</p>}
                        </div>

                        <div className="flex items-center gap-2">{getStatusIcon(item.status, isChecked)}</div>
                      </div>
                    </div>
                  </div>

                  {!isLast && <div className="border-b" />}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Set Reminder
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Clock className="h-4 w-4 mr-2" />
            Schedule Next Treatment
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Treatment Complete
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
