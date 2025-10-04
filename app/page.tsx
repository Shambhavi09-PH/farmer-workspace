import { AuthForm } from "@/components/auth-form"
import { Sprout, Leaf, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
              <Sprout className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CropCare AI
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-6 text-balance">
            Diagnose Crop Diseases with AI – Anytime, Anywhere
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance mb-8">
            Your smart assistant for crop health management. Upload images, get AI-powered diagnoses, and receive expert
            treatment recommendations from agricultural professionals.
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-secondary"
          >
            Start Diagnosis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group bg-card p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1">
            <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Leaf className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">AI Disease Detection</h3>
            <p className="text-muted-foreground leading-relaxed">
              Upload crop images and get instant AI-powered disease identification with confidence scores and detailed
              analysis
            </p>
          </div>

          <div className="group bg-card p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1">
            <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Treatment Plans</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get customized organic and chemical treatment recommendations with precise dosages, timing, and
              application methods
            </p>
          </div>

          <div className="group bg-card p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1">
            <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sprout className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Expert Network</h3>
            <p className="text-muted-foreground leading-relaxed">
              Connect with nearby agricultural extension officers and plant doctors for professional consultation and
              support
            </p>
          </div>
        </div>

        {/* Authentication Form */}
        <div className="max-w-md mx-auto">
          <AuthForm />
        </div>
      </div>
    </div>
  )
}
