import type { ReactNode } from 'react';
import type { Role } from '@/data/crm';
import { useCrm } from '@/lib/crmContext';

export type { Role } from '@/data/crm';

export const ROLE_LABELS: Record<Role, { en: string; ar: string }> = {
  admin: { en: 'Admin', ar: 'مدير' },
  employee: { en: 'Team Member', ar: 'عضو الفريق' },
  ai_agent: { en: 'AI Agent', ar: 'وكيل الذكاء الاصطناعي' },
};

export const ROLE_ORDER: Role[] = ['admin', 'employee', 'ai_agent'];

interface RoleGateProps {
  allow: Role[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGate({ allow, children, fallback = null }: RoleGateProps) {
  const { currentRole } = useCrm();
  if (allow.includes(currentRole)) return <>{children}</>;
  return <>{fallback}</>;
}
