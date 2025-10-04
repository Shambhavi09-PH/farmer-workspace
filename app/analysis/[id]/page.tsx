import { DiagnosisResults } from "@/components/diagnosis-results"
import { ImageAnalysisView } from "@/components/image-analysis-view"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface AnalysisPageProps {
  params: {
    id: string
  }
}

export default function AnalysisPage({ params }: AnalysisPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Analysis View */}
          <ImageAnalysisView imageId={params.id} />

          {/* Diagnosis Results */}
          <DiagnosisResults imageId={params.id} />
        </div>
      </main>
    </div>
  )
}
