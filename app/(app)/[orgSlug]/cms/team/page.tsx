"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { TeamMembersGrid, TeamMemberItem } from "@/components/cms/TeamMembersGrid"
import { Icons } from "@/lib/utils/icons"

export default function AdminTeamCMSPage() {
  const [members, setMembers] = React.useState<TeamMemberItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editingId, setEditingId] = React.useState<string | null>(null)

  // Form State
  const [name, setName] = React.useState("")
  const [role, setRole] = React.useState("")
  const [avatarUrl, setAvatarUrl] = React.useState("")
  const [message, setMessage] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/cms/team-members")
      const data = await res.json()
      if (data.success) {
        setMembers(data.data)
      }
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchMembers()
  }, [])

  const resetForm = () => {
    setEditingId(null)
    setName("")
    setRole("")
    setAvatarUrl("")
  }

  const handleEdit = (m: TeamMemberItem) => {
    setEditingId(m.id || null)
    setName(m.name)
    setRole(m.role)
    setAvatarUrl(m.avatarUrl || "")
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const payload = {
      id: editingId,
      name,
      role,
      avatarUrl: avatarUrl.trim() || null,
      order: editingId ? undefined : members.length + 1
    }

    const method = editingId ? "PUT" : "POST"

    try {
      const res = await fetch("/api/cms/team-members", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      const data = await res.json()

      if (data.success) {
        setMessage(`✓ Team member ${editingId ? "updated" : "added"} successfully!`)
        resetForm()
        fetchMembers()
      } else {
        setMessage("Error: " + data.error)
      }
    } catch (err: any) {
      setMessage("Failed to submit form.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return

    try {
      const res = await fetch(`/api/cms/team-members?id=${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        setMessage("✓ Team member deleted.")
        fetchMembers()
      }
    } catch (e) {}
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-surface pb-6">
        <div>
          <Badge variant="default" className="mb-2">Admin CMS Editor</Badge>
          <h1 className="text-3xl font-display font-extrabold text-foreground">Team Members Manager</h1>
          <p className="text-sm text-foreground-secondary">Add, edit, or update team member profiles rendered on the public portal and presentation slides.</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${message.startsWith("✓") ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-danger/10 text-danger border border-danger/30"}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Card */}
        <Card className="shadow-soft lg:col-span-1">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Team Member" : "Add New Team Member"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Member Name</label>
                <Input 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="e.g. Teddy Yu" 
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Role / Title</label>
                <Input 
                  value={role} 
                  onChange={e => setRole(e.target.value)} 
                  placeholder="e.g. Lead Graphic Designer" 
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Avatar Photo URL</label>
                <Input 
                  value={avatarUrl} 
                  onChange={e => setAvatarUrl(e.target.value)} 
                  placeholder="https://images.unsplash.com/..." 
                />
                <span className="text-[10px] text-foreground-secondary">Optional. Leaves initial placeholder if blank.</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={saving} className="flex-1">
                  {saving ? "Saving..." : editingId ? "Update Member" : "Add Member"}
                </Button>

                {editingId && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Existing Members Table / List */}
        <Card className="shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Team Members ({members.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="p-8 text-center text-sm text-foreground-secondary">Loading members...</div>
            ) : members.length === 0 ? (
              <div className="p-8 text-center text-sm text-foreground-secondary">No team members found.</div>
            ) : (
              <div className="space-y-3">
                {members.map((m) => (
                  <div key={m.id} className="p-3 rounded-xl border border-surface bg-background flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden border border-surface bg-card flex-none relative">
                        {m.avatarUrl ? (
                          <img src={m.avatarUrl} alt={m.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center font-bold text-xs">
                            {m.name[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold font-display">{m.name}</h4>
                        <p className="text-xs text-foreground-secondary">{m.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(m)}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-danger hover:text-danger" onClick={() => m.id && handleDelete(m.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Live Component Preview */}
      <div className="space-y-3 pt-6 border-t border-surface">
        <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
          <Icons.dashboard className="h-5 w-5 text-primary" /> Live Template Preview
        </h3>
        <TeamMembersGrid members={members} />
      </div>
    </div>
  )
}
