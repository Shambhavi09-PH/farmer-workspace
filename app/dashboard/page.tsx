import { DashboardHeader } from "@/components/dashboard-header"
import { ImageUploadSection } from "@/components/image-upload-section"
import { RecentDiagnoses } from "@/components/recent-diagnoses"
import { QuickActions } from "@/components/quick-actions"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-50/20 dark:to-green-950/10">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Image Upload Section */}
        <ImageUploadSection />

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Diagnoses */}
        <RecentDiagnoses />
      </main>
    </div>
  )
}
