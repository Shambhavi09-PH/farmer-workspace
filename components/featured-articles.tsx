import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, ArrowRight, Bookmark } from "lucide-react"

export function FeaturedArticles() {
  const articles = [
    {
      id: 1,
      title: "Complete Guide to Tomato Disease Management",
      description:
        "Learn how to identify, prevent, and treat the most common tomato diseases including early blight, late blight, and bacterial spot.",
      author: "Dr. Sarah Johnson",
      readTime: "8 min read",
      category: "Disease Management",
      image: "/tomato-leaf-disease.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Organic Pest Control Methods for Vegetable Gardens",
      description:
        "Discover effective organic solutions for controlling common garden pests without harmful chemicals.",
      author: "Maria Rodriguez",
      readTime: "6 min read",
      category: "Pest Control",
      image: "/corn-disease.jpg",
      featured: true,
    },
    {
      id: 3,
      title: "Understanding Soil Health and Nutrient Management",
      description: "Essential guide to maintaining healthy soil and managing nutrients for optimal crop production.",
      author: "Dr. James Wilson",
      readTime: "10 min read",
      category: "Soil Health",
      image: "/wheat-rust-disease.jpg",
      featured: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Featured Articles</h2>
        <Button variant="outline">View All Articles</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary">{article.category}</Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{article.title}</CardTitle>
              <CardDescription className="line-clamp-3">{article.description}</CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </div>
                </div>
              </div>

              <Button variant="ghost" className="w-full justify-between p-0 h-auto font-medium">
                Read Article
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
