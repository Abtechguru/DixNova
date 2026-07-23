import { PublicLayout } from "@/components/layout/PublicLayout"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"

export default function DesignSystemPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto py-12 px-4 space-y-16">
        <div>
          <h1 className="font-display text-4xl font-bold mb-4">Design System</h1>
          <p className="text-foreground-secondary text-lg max-w-2xl">
            A comprehensive reference for the SmartMove Nigeria Transport Intelligence Platform UI components and tokens.
          </p>
        </div>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold border-b border-surface pb-2">Typography</h2>
          <div className="space-y-4">
            <h1 className="font-display text-5xl font-bold">Display Heading 1</h1>
            <h2 className="font-display text-4xl font-bold">Display Heading 2</h2>
            <h3 className="font-display text-3xl font-semibold">Heading 3</h3>
            <h4 className="font-display text-2xl font-semibold">Heading 4</h4>
            <p className="font-sans text-lg">Body Large: The quick brown fox jumps over the lazy dog.</p>
            <p className="font-sans text-base">Body: The quick brown fox jumps over the lazy dog.</p>
            <p className="font-sans text-sm text-foreground-secondary">Caption / Small Text: The quick brown fox jumps over the lazy dog.</p>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold border-b border-surface pb-2">Buttons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="lg">Large</Button>
            <Button size="default">Default</Button>
            <Button size="sm">Small</Button>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold border-b border-surface pb-2">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Danger</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>

        {/* Forms */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold border-b border-surface pb-2">Forms</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
            <div className="space-y-2">
              <label className="text-sm font-medium">Standard Input</label>
              <Input placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-danger">Error Input</label>
              <Input placeholder="Invalid email" error />
              <p className="text-sm text-danger">Email is required</p>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold border-b border-surface pb-2">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistic Card</CardTitle>
                <CardDescription>Monthly passenger count.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">124,592</div>
              </CardContent>
              <CardFooter>
                <Badge variant="success">+12.5% from last month</Badge>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
                <CardDescription>System status check.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">All systems are operating normally. Real-time telemetry is connected.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Logs</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Tables */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold border-b border-surface pb-2">Tables</h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Active Vehicles</TableHead>
                  <TableHead className="text-right">Avg. Delay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">R-102 (Lagos Mainland)</TableCell>
                  <TableCell><Badge variant="success">Active</Badge></TableCell>
                  <TableCell>42</TableCell>
                  <TableCell className="text-right">2m 14s</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">R-205 (Island Express)</TableCell>
                  <TableCell><Badge variant="warning">Heavy Traffic</Badge></TableCell>
                  <TableCell>28</TableCell>
                  <TableCell className="text-right">18m 30s</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">R-099 (Airport Shuttle)</TableCell>
                  <TableCell><Badge variant="destructive">Suspended</Badge></TableCell>
                  <TableCell>0</TableCell>
                  <TableCell className="text-right">-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </section>
      </div>
    </PublicLayout>
  )
}
