import { KnowledgeSearch } from "@/components/knowledge-search"
import { DiseaseLibrary } from "@/components/disease-library"
import { FeaturedArticles } from "@/components/featured-articles"
import { DashboardHeader } from "@/components/dashboard-header"

export default function KnowledgePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Knowledge Base</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive disease library, treatment guides, and agricultural resources for better crop management.
            </p>
          </div>

          {/* Search */}
          <KnowledgeSearch />

          {/* Featured Articles */}
          <FeaturedArticles />

          {/* Disease Library */}
          <DiseaseLibrary />
        </div>
      </main>
    </div>
  )
}
