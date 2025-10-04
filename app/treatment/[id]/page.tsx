import { TreatmentPlan } from "@/components/treatment-plan"
import { TreatmentTimeline } from "@/components/treatment-timeline"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface TreatmentPageProps {
  params: {
    id: string
  }
}

export default function TreatmentPage({ params }: TreatmentPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href={`/analysis/${params.id}`}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Analysis
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Treatment Plan */}
          <div className="lg:col-span-2">
            <TreatmentPlan diagnosisId={params.id} />
          </div>

          {/* Treatment Timeline */}
          <div>
            <TreatmentTimeline diagnosisId={params.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
