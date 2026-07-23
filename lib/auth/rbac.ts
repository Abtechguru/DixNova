import { Role } from "@prisma/client"
import { SessionPayload } from "./session"

// Hierarchy of permissions
const roleHierarchy: Record<Role, number> = {
  SUPER_ADMIN: 100,
  ORG_ADMIN: 90,
  PROJECT_MANAGER: 80,
  DATA_ANALYST: 70,
  BUSINESS_ANALYST: 60,
  DASHBOARD_MANAGER: 50,
  CONTENT_EDITOR: 40,
  VIEWER: 10,
  JUDGE: 5,
}

/**
 * Checks if a user has a specific role or higher within an Organization context
 */
export function hasOrgPermission(
  session: SessionPayload,
  orgId: string,
  requiredRole: Role
): boolean {
  if (!session) return false

  // Check if they are a SUPER_ADMIN globally
  const isSuperAdmin = session.roles.some((r) => r.role === "SUPER_ADMIN" && !r.organizationId)
  if (isSuperAdmin) return true

  // Find their role in this specific org
  const orgRole = session.roles.find((r) => r.organizationId === orgId)
  if (!orgRole) return false

  return roleHierarchy[orgRole.role as Role] >= roleHierarchy[requiredRole]
}

/**
 * Checks if a user has a specific role or higher within a Project context
 */
export function hasProjectPermission(
  session: SessionPayload,
  orgId: string,
  projectId: string,
  requiredRole: Role
): boolean {
  if (!session) return false

  // If they have org-level access high enough, they inherently have project access
  if (hasOrgPermission(session, orgId, requiredRole)) return true

  // Find their role in this specific project
  const projectRole = session.roles.find((r) => r.projectId === projectId)
  if (!projectRole) return false

  return roleHierarchy[projectRole.role as Role] >= roleHierarchy[requiredRole]
}
