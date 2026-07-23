import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"

export default async function ContactStoryPage() {
  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <StoryHeader 
          chapterNumber={11}
          title="Contact & Enterprise Onboarding"
          subtitle="Partner with DixNova to deploy SmartMove Intelligence for your transport agency."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Schedule an Enterprise Demo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Hon. Ministry Delegate" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Official Email</label>
                <Input type="email" placeholder="delegate@lagosstate.gov.ng" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization / Agency</label>
                <Input placeholder="Lagos State Ministry of Transportation" />
              </div>
              <Button className="w-full" size="lg">Submit Inquiry</Button>
            </CardContent>
          </Card>

          <div className="space-y-6 flex flex-col justify-center">
            <div className="rounded-2xl border border-surface bg-card p-6 space-y-2">
              <h3 className="font-display font-bold text-lg">DixNova Intelligence HQ</h3>
              <p className="text-sm text-foreground-secondary">Victoria Island, Lagos, Nigeria</p>
              <p className="text-sm text-foreground-secondary">Email: contact@dixnova.com</p>
            </div>
            <div className="rounded-2xl border border-surface bg-card p-6 space-y-2">
              <h3 className="font-display font-bold text-lg">Multi-Tenant Onboarding</h3>
              <p className="text-sm text-foreground-secondary">
                Deploy instance for state transport ministries, logistics corporations, and fleet management operators.
              </p>
            </div>
          </div>
        </div>

        <PageNavigationFooter 
          prevTitle="Meet the Team"
          prevSlug="/p/team"
          nextTitle="Fullscreen Presentation Deck"
          nextSlug="/presentation"
        />
      </div>
    </PublicLayout>
  )
}
