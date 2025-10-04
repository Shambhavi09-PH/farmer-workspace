import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

const mockDiagnoses = [
  {
    id: 1,
    cropType: "Tomato",
    disease: "Early Blight",
    severity: "Moderate",
    confidence: 87,
    date: "2 hours ago",
    status: "treated",
    image: "/tomato-leaf-disease.jpg",
  },
  {
    id: 2,
    cropType: "Corn",
    disease: "Corn Smut",
    severity: "Severe",
    confidence: 92,
    date: "1 day ago",
    status: "pending",
    image: "/corn-disease.jpg",
  },
  {
    id: 3,
    cropType: "Wheat",
    disease: "Rust",
    severity: "Mild",
    confidence: 78,
    date: "3 days ago",
    status: "monitoring",
    image: "/wheat-rust-disease.jpg",
  },
]

export function RecentDiagnoses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Diagnoses</CardTitle>
        <CardDescription>Your latest crop health assessments and treatment status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockDiagnoses.map((diagnosis) => (
            <div key={diagnosis.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img
                src={diagnosis.image || "/placeholder.svg"}
                alt={`${diagnosis.cropType} diagnosis`}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{diagnosis.disease}</h4>
                  <Badge variant="outline">{diagnosis.cropType}</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Confidence: {diagnosis.confidence}%</span>
                  <span>Severity: {diagnosis.severity}</span>
                  <span>{diagnosis.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {diagnosis.status === "treated" && (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Treated
                  </Badge>
                )}
                {diagnosis.status === "pending" && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Action Needed
                  </Badge>
                )}
                {diagnosis.status === "monitoring" && (
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    Monitoring
                  </Badge>
                )}

                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
