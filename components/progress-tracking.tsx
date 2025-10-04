"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Calendar, Target } from "lucide-react"

export function ProgressTracking() {
  // Mock progress data
  const progressData = {
    overallSuccess: 78,
    treatmentsThisMonth: 5,
    activeTreatments: 2,
    completedTreatments: 12,
    trends: {
      successRate: { value: 78, change: +5, trend: "up" },
      avgDuration: { value: 12, change: -2, trend: "down" },
      costEfficiency: { value: 85, change: +8, trend: "up" },
    },
    recentProgress: [
      {
        id: 1,
        disease: "Early Blight",
        crop: "Tomato",
        progress: 90,
        daysRemaining: 2,
        status: "completing",
      },
      {
        id: 2,
        disease: "Wheat Rust",
        crop: "Wheat",
        progress: 65,
        daysRemaining: 8,
        status: "in-progress",
      },
    ],
    monthlyStats: [
      { month: "Oct", treatments: 3, success: 85 },
      { month: "Nov", treatments: 4, success: 75 },
      { month: "Dec", treatments: 2, success: 90 },
      { month: "Jan", treatments: 5, success: 78 },
    ],
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Progress Overview</h2>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{progressData.overallSuccess}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{progressData.activeTreatments}</div>
            <div className="text-sm text-muted-foreground">Active Treatments</div>
          </CardContent>
        </Card>
      </div>

      {/* Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Trends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Success Rate</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${getTrendColor(progressData.trends.successRate.trend)}`}>
                  {progressData.trends.successRate.change > 0 ? "+" : ""}
                  {progressData.trends.successRate.change}%
                </span>
                {getTrendIcon(progressData.trends.successRate.trend)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Avg Duration</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${getTrendColor(progressData.trends.avgDuration.trend)}`}>
                  {progressData.trends.avgDuration.change} days
                </span>
                {getTrendIcon(progressData.trends.avgDuration.trend)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Cost Efficiency</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${getTrendColor(progressData.trends.costEfficiency.trend)}`}>
                  +{progressData.trends.costEfficiency.change}%
                </span>
                {getTrendIcon(progressData.trends.costEfficiency.trend)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Treatments Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Treatments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {progressData.recentProgress.map((treatment) => (
            <div key={treatment.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{treatment.disease}</p>
                  <p className="text-xs text-muted-foreground">{treatment.crop}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{treatment.progress}%</div>
                  <div className="text-xs text-muted-foreground">{treatment.daysRemaining} days left</div>
                </div>
              </div>
              <Progress value={treatment.progress} className="h-2" />
              <Badge variant="outline" className="text-xs">
                {treatment.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Monthly Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {progressData.monthlyStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{stat.month}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{stat.treatments} treatments</span>
                  <span className="text-sm font-medium">{stat.success}% success</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button className="w-full text-left p-2 hover:bg-muted rounded-lg transition-colors">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="text-sm">Set Treatment Goals</span>
            </div>
          </button>
          <button className="w-full text-left p-2 hover:bg-muted rounded-lg transition-colors">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Schedule Review</span>
            </div>
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
