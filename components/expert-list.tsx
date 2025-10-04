"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, MapPin, Clock, Star, MessageCircle, Calendar, ExternalLink, Navigation } from "lucide-react"

export function ExpertList() {
  // Mock expert data - in real app, this would come from API
  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Agricultural Extension Officer",
      organization: "County Agricultural Extension",
      specialties: ["Tomato Diseases", "Organic Farming", "Soil Health"],
      rating: 4.8,
      reviews: 127,
      distance: "2.3 miles",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@extension.gov",
      whatsapp: "+1 (555) 123-4567",
      availability: "Mon-Fri 8AM-5PM",
      languages: ["English", "Spanish"],
      experience: "15 years",
      avatar: "/farmer-avatar.png",
      address: "123 Agricultural Center Dr, Farmville, ST 12345",
      description:
        "Specializing in sustainable farming practices and integrated pest management with over 15 years of field experience.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Plant Pathologist",
      organization: "State University Extension",
      specialties: ["Disease Diagnosis", "Fungal Infections", "Plant Health"],
      rating: 4.9,
      reviews: 89,
      distance: "4.7 miles",
      phone: "+1 (555) 234-5678",
      email: "m.chen@university.edu",
      whatsapp: "+1 (555) 234-5678",
      availability: "Tue-Thu 9AM-4PM",
      languages: ["English", "Mandarin"],
      experience: "12 years",
      avatar: "/farmer-avatar.png",
      address: "456 Research Blvd, University Town, ST 12346",
      description: "Expert in plant disease diagnosis and management, with extensive research in fungal pathology.",
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      title: "Crop Specialist",
      organization: "Regional Farming Cooperative",
      specialties: ["Vegetable Crops", "Pest Control", "Crop Rotation"],
      rating: 4.7,
      reviews: 156,
      distance: "6.1 miles",
      phone: "+1 (555) 345-6789",
      email: "maria.r@farmcoop.org",
      whatsapp: "+1 (555) 345-6789",
      availability: "Mon-Sat 7AM-6PM",
      languages: ["English", "Spanish"],
      experience: "20 years",
      avatar: "/farmer-avatar.png",
      address: "789 Cooperative Way, Rural Valley, ST 12347",
      description:
        "Experienced crop specialist with focus on sustainable vegetable production and integrated farming systems.",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      title: "Soil Health Expert",
      organization: "Agricultural Research Institute",
      specialties: ["Soil Testing", "Nutrient Management", "Soil Conservation"],
      rating: 4.6,
      reviews: 73,
      distance: "8.9 miles",
      phone: "+1 (555) 456-7890",
      email: "j.wilson@agresearch.org",
      whatsapp: null,
      availability: "Wed-Fri 10AM-3PM",
      languages: ["English"],
      experience: "18 years",
      avatar: "/farmer-avatar.png",
      address: "321 Research Park Dr, Science City, ST 12348",
      description:
        "Leading researcher in soil health and sustainable agriculture practices with focus on soil conservation.",
    },
  ]

  const handleContact = (method: string, contact: string) => {
    switch (method) {
      case "phone":
        window.open(`tel:${contact}`)
        break
      case "email":
        window.open(`mailto:${contact}`)
        break
      case "whatsapp":
        window.open(`https://wa.me/${contact.replace(/[^\d]/g, "")}`)
        break
      case "directions":
        window.open(`https://maps.google.com/?q=${encodeURIComponent(contact)}`)
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Available Experts ({experts.length})</h2>
        <div className="text-sm text-muted-foreground">Sorted by distance</div>
      </div>

      <div className="grid gap-6">
        {experts.map((expert) => (
          <Card key={expert.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Expert Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={expert.avatar || "/placeholder.svg"} alt={expert.name} />
                      <AvatarFallback>
                        {expert.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{expert.name}</h3>
                          <p className="text-muted-foreground">{expert.title}</p>
                          <p className="text-sm text-muted-foreground">{expert.organization}</p>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{expert.rating}</span>
                            <span className="text-sm text-muted-foreground">({expert.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {expert.distance}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{expert.description}</p>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2">
                        {expert.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      {/* Details */}
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{expert.availability}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Experience:</span>
                            <span>{expert.experience}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Languages:</span>
                            <span>{expert.languages.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{expert.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator orientation="vertical" className="hidden lg:block" />

                {/* Contact Actions */}
                <div className="lg:w-64 space-y-4">
                  <h4 className="font-medium">Contact Options</h4>

                  <div className="space-y-2">
                    <Button
                      variant="default"
                      className="w-full justify-start"
                      onClick={() => handleContact("phone", expert.phone)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => handleContact("email", expert.email)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>

                    {expert.whatsapp && (
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => handleContact("whatsapp", expert.whatsapp)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => handleContact("directions", expert.address)}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button variant="secondary" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Visit
                    </Button>

                    <Button variant="secondary" className="w-full justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>

                  {/* Contact Info */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {expert.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{expert.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Experts</Button>
      </div>
    </div>
  )
}
