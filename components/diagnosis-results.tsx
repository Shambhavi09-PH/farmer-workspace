"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, CheckCircle, Info, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

interface DiagnosisResultsProps {
  imageId: string
}

export function DiagnosisResults({ imageId }: DiagnosisResultsProps) {
  const router = useRouter()

  // Mock diagnosis data - in real app, this would come from API
  const diagnosisData = {
    primaryDiagnosis: {
      disease: "Early Blight (Alternaria solani)",
      confidence: 92,
      severity: "Moderate",
      cropType: "Tomato",
      affectedParts: ["Leaves", "Lower stems"],
      stage: "Active infection",
    },
    alternativeDiagnoses: [
      { disease: "Late Blight", confidence: 15, severity: "Mild" },
      { disease: "Bacterial Spot", confidence: 8, severity: "Unknown" },
    ],
    diseaseInfo: {
      description:
        "Early blight is a common fungal disease that affects tomatoes and potatoes. It typically starts on older, lower leaves and progresses upward.",
      symptoms: [
        "Dark brown spots with concentric rings",
        "Yellow halos around spots",
        "Leaf yellowing and drop",
        "Stem lesions near soil line",
      ],
      causes: ["High humidity and warm temperatures", "Poor air circulation", "Overhead watering", "Plant stress"],
      spread: "Spreads through wind, water splash, and contaminated tools",
    },
    riskFactors: {
      environmental: "High",
      spread: "Medium",
      yieldImpact: "Moderate",
    },
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return "bg-yellow-500"
      case "moderate":
        return "bg-orange-500"
      case "severe":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return <Info className="h-4 w-4" />
      case "moderate":
        return <AlertTriangle className="h-4 w-4" />
      case "severe":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const handleViewTreatment = () => {
    router.push(`/treatment/${imageId}`)
  }

  return (
    <div className="space-y-6">
      {/* Primary Diagnosis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Primary Diagnosis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{diagnosisData.primaryDiagnosis.disease}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{diagnosisData.primaryDiagnosis.cropType}</Badge>
                <Badge
                  variant="secondary"
                  className={`text-white ${getSeverityColor(diagnosisData.primaryDiagnosis.severity)}`}
                >
                  {getSeverityIcon(diagnosisData.primaryDiagnosis.severity)}
                  {diagnosisData.primaryDiagnosis.severity}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{diagnosisData.primaryDiagnosis.confidence}%</div>
              <div className="text-sm text-muted-foreground">Confidence</div>
            </div>
          </div>

          <Progress value={diagnosisData.primaryDiagnosis.confidence} className="h-2" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Affected Parts:</span>
              <p className="font-medium">{diagnosisData.primaryDiagnosis.affectedParts.join(", ")}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Disease Stage:</span>
              <p className="font-medium">{diagnosisData.primaryDiagnosis.stage}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Diagnoses */}
      <Card>
        <CardHeader>
          <CardTitle>Alternative Possibilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {diagnosisData.alternativeDiagnoses.map((alt, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{alt.disease}</p>
                  <p className="text-sm text-muted-foreground">Severity: {alt.severity}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{alt.confidence}%</div>
                  <Progress value={alt.confidence} className="h-1 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disease Information */}
      <Card>
        <CardHeader>
          <CardTitle>Disease Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{diagnosisData.diseaseInfo.description}</p>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Common Symptoms</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {diagnosisData.diseaseInfo.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {symptom}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Common Causes</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {diagnosisData.diseaseInfo.causes.map((cause, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {cause}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">How it Spreads</h4>
            <p className="text-sm text-muted-foreground">{diagnosisData.diseaseInfo.spread}</p>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-destructive">{diagnosisData.riskFactors.environmental}</div>
              <div className="text-sm text-muted-foreground">Environmental Risk</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-500">{diagnosisData.riskFactors.spread}</div>
              <div className="text-sm text-muted-foreground">Spread Risk</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-500">{diagnosisData.riskFactors.yieldImpact}</div>
              <div className="text-sm text-muted-foreground">Yield Impact</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="flex-1" onClick={handleViewTreatment}>
          View Treatment Options
        </Button>
        <Button variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          Learn More
        </Button>
      </div>
    </div>
  )
}
