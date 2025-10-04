import { ReminderManager } from "@/components/reminder-manager"
import { UpcomingReminders } from "@/components/upcoming-reminders"
import { DashboardHeader } from "@/components/dashboard-header"

export default function RemindersPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Treatment Reminders</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Set up and manage reminders for treatments, monitoring, and follow-up activities.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upcoming Reminders */}
            <div className="lg:col-span-2">
              <UpcomingReminders />
            </div>

            {/* Reminder Manager */}
            <div>
              <ReminderManager />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
