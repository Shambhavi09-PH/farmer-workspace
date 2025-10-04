import { ExpertFinder } from "@/components/expert-finder"
import { ExpertList } from "@/components/expert-list"
import { DashboardHeader } from "@/components/dashboard-header"

export default function ExpertsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Find Agricultural Experts</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with nearby agricultural extension officers, plant doctors, and crop specialists for expert
              guidance and support.
            </p>
          </div>

          {/* Expert Finder */}
          <ExpertFinder />

          {/* Expert List */}
          <ExpertList />
        </div>
      </main>
    </div>
  )
}
