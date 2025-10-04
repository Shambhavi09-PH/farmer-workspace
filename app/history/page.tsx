import { TreatmentHistory } from "@/components/treatment-history"
import { ProgressTracking } from "@/components/progress-tracking"
import { DashboardHeader } from "@/components/dashboard-header"

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Treatment History & Progress</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your crop treatments, monitor progress, and analyze the effectiveness of different approaches.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Treatment History */}
            <div className="lg:col-span-2">
              <TreatmentHistory />
            </div>

            {/* Progress Tracking */}
            <div>
              <ProgressTracking />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
