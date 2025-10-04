"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Leaf, Droplets, Clock, Thermometer, AlertTriangle, CheckCircle, Calendar, Shield } from "lucide-react"

interface TreatmentPlanProps {
  diagnosisId: string
}

export function TreatmentPlan({ diagnosisId }: TreatmentPlanProps) {
  const [selectedTreatment, setSelectedTreatment] = useState<"organic" | "chemical">("organic")

  // Mock treatment data - in real app, this would come from API
  const treatmentData = {
    disease: "Early Blight (Alternaria solani)",
    severity: "Moderate",
    organic: {
      primary: {
        name: "Copper-based Fungicide (Organic)",
        activeIngredient: "Copper sulfate",
        dosage: "2-3 tablespoons per gallon of water",
        frequency: "Every 7-10 days",
        duration: "3-4 weeks",
        application: "Foliar spray in early morning or evening",
        cost: "$15-25 per treatment",
        effectiveness: 75,
      },
      secondary: [
        {
          name: "Baking Soda Solution",
          dosage: "1 tablespoon per gallon + 1 tsp dish soap",
          frequency: "Every 5-7 days",
          effectiveness: 60,
        },
        {
          name: "Neem Oil",
          dosage: "2 tablespoons per gallon",
          frequency: "Every 7 days",
          effectiveness: 70,
        },
      ],
      cultural: [
        "Remove affected leaves and dispose properly",
        "Improve air circulation around plants",
        "Water at soil level, avoid wetting leaves",
        "Apply mulch to prevent soil splash",
        "Rotate crops next season",
      ],
    },
    chemical: {
      primary: {
        name: "Chlorothalonil Fungicide",
        activeIngredient: "Chlorothalonil 54%",
        dosage: "1.5-2 fl oz per gallon of water",
        frequency: "Every 7-14 days",
        duration: "4-6 weeks",
        application: "Foliar spray, ensure complete coverage",
        cost: "$25-35 per treatment",
        effectiveness: 90,
      },
      secondary: [
        {
          name: "Mancozeb",
          dosage: "2 tablespoons per gallon",
          frequency: "Every 10-14 days",
          effectiveness: 85,
        },
        {
          name: "Azoxystrobin",
          dosage: "1 fl oz per gallon",
          frequency: "Every 14 days",
          effectiveness: 88,
        },
      ],
      precautions: [
        "Wear protective equipment (gloves, mask, long sleeves)",
        "Do not spray during windy conditions",
        "Follow pre-harvest interval (PHI) guidelines",
        "Avoid spraying during bloom to protect pollinators",
        "Read and follow all label instructions",
      ],
    },
    conditions: {
      temperature: "60-75°F (15-24°C)",
      humidity: "Below 85%",
      wind: "Less than 10 mph",
      timing: "Early morning (6-9 AM) or evening (6-8 PM)",
    },
    prevention: [
      "Plant resistant varieties when available",
      "Ensure proper plant spacing for air circulation",
      "Use drip irrigation instead of overhead watering",
      "Remove plant debris at end of season",
      "Practice crop rotation (3-4 year cycle)",
    ],
  }

  const currentTreatment = treatmentData[selectedTreatment]

  return (
    <div className="space-y-6">
      {/* Treatment Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Treatment Plan for {treatmentData.disease}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Severity: {treatmentData.severity}</Badge>
            <Badge variant="secondary">Treatable</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Treatment Options */}
      <Card>
        <CardHeader>
          <CardTitle>Treatment Options</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={selectedTreatment}
            onValueChange={(value) => setSelectedTreatment(value as "organic" | "chemical")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="organic" className="gap-2">
                <Leaf className="h-4 w-4" />
                Organic Treatment
              </TabsTrigger>
              <TabsTrigger value="chemical" className="gap-2">
                <Droplets className="h-4 w-4" />
                Chemical Treatment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="organic" className="space-y-6 mt-6">
              {/* Primary Organic Treatment */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Primary Treatment</h3>
                <Card className="border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-primary">{currentTreatment.primary.name}</h4>
                        <p className="text-sm text-muted-foreground">{currentTreatment.primary.activeIngredient}</p>
                      </div>
                      <Badge variant="secondary">{currentTreatment.primary.effectiveness}% Effective</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Dosage:</span>
                        </div>
                        <p className="text-muted-foreground ml-6">{currentTreatment.primary.dosage}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Frequency:</span>
                        </div>
                        <p className="text-muted-foreground ml-6">{currentTreatment.primary.frequency}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Duration:</span>
                        </div>
                        <p className="text-muted-foreground ml-6">{currentTreatment.primary.duration}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Cost:</span>
                        </div>
                        <p className="text-muted-foreground ml-6">{currentTreatment.primary.cost}</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h5 className="font-medium mb-2">Application Method</h5>
                      <p className="text-sm text-muted-foreground">{currentTreatment.primary.application}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alternative Organic Treatments */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Alternative Options</h3>
                <div className="grid gap-4">
                  {treatmentData.organic.secondary.map((treatment, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{treatment.name}</h4>
                          <Badge variant="outline">{treatment.effectiveness}% Effective</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Dosage:</span>
                            <p className="text-muted-foreground">{treatment.dosage}</p>
                          </div>
                          <div>
                            <span className="font-medium">Frequency:</span>
                            <p className="text-muted-foreground">{treatment.frequency}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Cultural Practices */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cultural Practices</h3>
                <Card>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {treatmentData.organic.cultural.map((practice, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="chemical" className="space-y-6 mt-6">
              {/* Chemical Treatment Warning */}
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Chemical treatments require proper safety equipment and adherence to label instructions. Consider
                  organic options first for sustainable farming practices.
                </AlertDescription>
              </Alert>

              {/* Primary Chemical Treatment */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Primary Treatment</h3>
                <Card className="border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-orange-700">{currentTreatment.primary.name}</h4>
                        <p className="text-sm text-muted-foreground">{currentTreatment.primary.activeIngredient}</p>
                      </div>
                      <Badge variant="secondary">{currentTreatment.primary.effectiveness}% Effective</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Dosage:</span>
                        </div>
                        <p className="text-muted-foreground ml-6">{currentTreatment.primary.dosage}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Frequency:</span>
                        </div>
                        <p className="text-muted-foreground ml-6">{currentTreatment.primary.frequency}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Duration:</span>
                        </div>
                        <p className="text-muted-foreground ml-6">{currentTreatment.primary.duration}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Cost:</span>
                        </div>
                        <p className="text-muted-foreground ml-6">{currentTreatment.primary.cost}</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h5 className="font-medium mb-2">Application Method</h5>
                      <p className="text-sm text-muted-foreground">{currentTreatment.primary.application}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alternative Chemical Treatments */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Alternative Options</h3>
                <div className="grid gap-4">
                  {treatmentData.chemical.secondary.map((treatment, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{treatment.name}</h4>
                          <Badge variant="outline">{treatment.effectiveness}% Effective</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Dosage:</span>
                            <p className="text-muted-foreground">{treatment.dosage}</p>
                          </div>
                          <div>
                            <span className="font-medium">Frequency:</span>
                            <p className="text-muted-foreground">{treatment.frequency}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Safety Precautions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Safety Precautions</h3>
                <Card className="border-red-200">
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {treatmentData.chemical.precautions.map((precaution, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {precaution}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Application Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Optimal Application Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Temperature:</span>
                <span className="text-muted-foreground">{treatmentData.conditions.temperature}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Humidity:</span>
                <span className="text-muted-foreground">{treatmentData.conditions.humidity}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">Wind Speed:</span>
                <span className="text-muted-foreground">{treatmentData.conditions.wind}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Best Time:</span>
                <span className="text-muted-foreground">{treatmentData.conditions.timing}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prevention Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Future Prevention</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {treatmentData.prevention.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="flex-1">Start Treatment Plan</Button>
        <Button variant="outline">Save for Later</Button>
        <Button variant="outline">Share with Expert</Button>
      </div>
    </div>
  )
}
