"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Bell, AlertTriangle, CheckCircle, Trash2, Edit } from "lucide-react"

export function UpcomingReminders() {
  const [checkedReminders, setCheckedReminders] = useState<Set<number>>(new Set())

  // Mock reminder data
  const reminders = [
    {
      id: 1,
      title: "Apply copper fungicide to tomatoes",
      type: "treatment",
      date: "2024-01-20",
      time: "06:00",
      priority: "high",
      crop: "Tomato",
      disease: "Early Blight",
      notes: "Second application in treatment cycle",
      daysUntil: 0,
      status: "due",
    },
    {
      id: 2,
      title: "Monitor wheat rust progress",
      type: "monitoring",
      date: "2024-01-21",
      time: "08:00",
      priority: "medium",
      crop: "Wheat",
      disease: "Wheat Rust",
      notes: "Check for improvement after fungicide application",
      daysUntil: 1,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Remove corn smut galls",
      type: "treatment",
      date: "2024-01-22",
      time: "07:00",
      priority: "high",
      crop: "Corn",
      disease: "Corn Smut",
      notes: "Manual removal of newly formed galls",
      daysUntil: 2,
      status: "upcoming",
    },
    {
      id: 4,
      title: "Weekly crop inspection",
      type: "inspection",
      date: "2024-01-23",
      time: "09:00",
      priority: "medium",
      crop: "All Crops",
      disease: null,
      notes: "General health check and early disease detection",
      daysUntil: 3,
      status: "upcoming",
    },
    {
      id: 5,
      title: "Apply organic fertilizer",
      type: "fertilizer",
      date: "2024-01-25",
      time: "06:30",
      priority: "low",
      crop: "Vegetable Garden",
      disease: null,
      notes: "Monthly fertilizer application",
      daysUntil: 5,
      status: "upcoming",
    },
  ]

  const handleCheckReminder = (reminderId: number) => {
    const newCheckedReminders = new Set(checkedReminders)
    if (newCheckedReminders.has(reminderId)) {
      newCheckedReminders.delete(reminderId)
    } else {
      newCheckedReminders.add(reminderId)
    }
    setCheckedReminders(newCheckedReminders)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-blue-500"
      case "low":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string, isChecked: boolean) => {
    if (isChecked) return <CheckCircle className="h-4 w-4 text-green-500" />
    if (status === "due") return <AlertTriangle className="h-4 w-4 text-red-500" />
    return <Bell className="h-4 w-4 text-blue-500" />
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "treatment":
        return "💊"
      case "monitoring":
        return "👁️"
      case "inspection":
        return "🔍"
      case "fertilizer":
        return "🌱"
      case "harvest":
        return "🌾"
      default:
        return "📅"
    }
  }

  const getDaysUntilText = (daysUntil: number) => {
    if (daysUntil === 0) return "Due today"
    if (daysUntil === 1) return "Due tomorrow"
    return `Due in ${daysUntil} days`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Upcoming Reminders</h2>
        <div className="text-sm text-muted-foreground">
          {checkedReminders.size} of {reminders.length} completed
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{reminders.filter((r) => r.status === "due").length}</div>
            <div className="text-sm text-muted-foreground">Due Today</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">
              {reminders.filter((r) => r.daysUntil <= 3 && r.status !== "due").length}
            </div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">
              {reminders.filter((r) => r.priority === "high" || r.priority === "urgent").length}
            </div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </CardContent>
        </Card>
      </div>

      {/* Reminder List */}
      <Card>
        <CardHeader>
          <CardTitle>All Reminders</CardTitle>
          <CardDescription>Manage your upcoming tasks and treatments</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {reminders.map((reminder, index) => {
              const isChecked = checkedReminders.has(reminder.id)
              const isLast = index === reminders.length - 1

              return (
                <div key={reminder.id} className="relative">
                  <div className="flex items-start gap-4 p-4">
                    {/* Checkbox */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background relative z-10">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleCheckReminder(reminder.id)}
                        className="w-4 h-4"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getTypeIcon(reminder.type)}</span>
                            <h4 className={`font-medium ${isChecked ? "line-through text-muted-foreground" : ""}`}>
                              {reminder.title}
                            </h4>
                            <Badge
                              variant="secondary"
                              className={`text-white text-xs ${getPriorityColor(reminder.priority)}`}
                            >
                              {reminder.priority}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(reminder.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {reminder.time}
                            </span>
                            <span className="font-medium">{getDaysUntilText(reminder.daysUntil)}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{reminder.crop}</Badge>
                            {reminder.disease && <Badge variant="outline">{reminder.disease}</Badge>}
                          </div>

                          {reminder.notes && <p className="text-sm text-muted-foreground">{reminder.notes}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                          {getStatusIcon(reminder.status, isChecked)}
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isLast && <div className="border-b ml-16" />}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 bg-transparent">
          Mark All Complete
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Snooze Selected
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Delete Completed
        </Button>
      </div>
    </div>
  )
}
