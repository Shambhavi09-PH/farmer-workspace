import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MapPin, Calendar, History } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Access frequently used features and tools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/knowledge">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4 w-full bg-transparent">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Disease Library</span>
            </Button>
          </Link>

          <Link href="/experts">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4 w-full bg-transparent">
              <MapPin className="h-6 w-6" />
              <span className="text-sm">Find Experts</span>
            </Button>
          </Link>

          <Link href="/reminders">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4 w-full bg-transparent">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Set Reminders</span>
            </Button>
          </Link>

          <Link href="/history">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4 w-full bg-transparent">
              <History className="h-6 w-6" />
              <span className="text-sm">Treatment History</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
