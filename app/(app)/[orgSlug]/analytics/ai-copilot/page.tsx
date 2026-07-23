import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export default async function AICopilotPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">AI Decision Intelligence Suite</h1>
          <p className="text-foreground-secondary">Generate executive reports, narrate dashboards, and query transport data in natural language.</p>
        </div>
        <Badge variant="success" className="px-3 py-1 text-sm">
          <Icons.sparkles className="h-4 w-4 mr-1 inline" /> AI Engine Online
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer shadow-soft">
          <CardHeader>
            <div className="p-3 bg-primary/10 text-primary w-fit rounded-xl mb-2">
              <Icons.reports className="h-6 w-6" />
            </div>
            <CardTitle className="text-lg font-bold">AI Executive Report Writer</CardTitle>
            <CardDescription>Generate formal PDF/Word briefs from verified platform datasets.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">Generate Brief</Button>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer shadow-soft">
          <CardHeader>
            <div className="p-3 bg-primary/10 text-primary w-fit rounded-xl mb-2">
              <Icons.dashboard className="h-6 w-6" />
            </div>
            <CardTitle className="text-lg font-bold">Dashboard AI Narration</CardTitle>
            <CardDescription>Produce key takeaway bullet points for executive presentations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">Narrate Active View</Button>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer shadow-soft">
          <CardHeader>
            <div className="p-3 bg-primary/10 text-primary w-fit rounded-xl mb-2">
              <Icons.insights className="h-6 w-6" />
            </div>
            <CardTitle className="text-lg font-bold">Natural Language Transport Queries</CardTitle>
            <CardDescription>Ask questions like "Which corridor has highest farebox yield?"</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">Ask Copilot</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
