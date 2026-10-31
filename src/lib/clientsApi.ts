import { getSupabase } from '@/lib/supabase';
import type { Customer, CustomerStatus, PreferredContact, LeadSource } from '@/data/crm';

/** Raw row shape from the Supabase `clients` table. */
interface ClientRow {
  id: string;
  name: string;
  name_ar: string | null;
  phone: string;
  email: string | null;
  preferred_contact: string;
  status: string;
  assigned_employee_id: string | null;
  lead_source: string;
  lead_source_detail: string | null;
  notes: string;
  next_follow_up_at: string | null;
  sent_property_ids: string[];
  created_at: string;
}

function rowToCustomer(row: ClientRow): Customer {
  return {
    id: row.id,
    name: row.name,
    nameAr: row.name_ar ?? undefined,
    phone: row.phone,
    email: row.email ?? undefined,
    preferredContact: row.preferred_contact as PreferredContact,
    status: row.status as CustomerStatus,
    assignedEmployeeId: row.assigned_employee_id ?? null,
    leadSource: row.lead_source as LeadSource,
    leadSourceDetail: row.lead_source_detail ?? undefined,
    notes: row.notes ?? '',
    nextFollowUpAt: row.next_follow_up_at ?? null,
    createdAt: row.created_at,
    sentPropertyIds: row.sent_property_ids ?? [],
  };
}

function customerToRow(c: Omit<Customer, 'id' | 'createdAt' | 'sentPropertyIds'>): Omit<ClientRow, 'id' | 'created_at'> {
  return {
    name: c.name,
    name_ar: c.nameAr ?? null,
    phone: c.phone,
    email: c.email ?? null,
    preferred_contact: c.preferredContact,
    status: c.status,
    assigned_employee_id: c.assignedEmployeeId,
    lead_source: c.leadSource,
    lead_source_detail: c.leadSourceDetail ?? null,
    notes: c.notes,
    next_follow_up_at: c.nextFollowUpAt,
    sent_property_ids: [],
  };
}

export interface NewClientInput {
  name: string;
  nameAr?: string;
  phone: string;
  email?: string;
  preferredContact: PreferredContact;
  status: CustomerStatus;
  assignedEmployeeId: string | null;
  leadSource: LeadSource;
  leadSourceDetail?: string;
  notes: string;
  nextFollowUpAt: string | null;
}

export type ClientPatch = Partial<Omit<Customer, 'id' | 'createdAt'>>;

/** Fetches all clients from Supabase, ordered by most recent first. */
export async function fetchClients(): Promise<{ data: Customer[]; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: [], error: 'Supabase is not configured. Add credentials in CRM Settings.' };
  }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { data: [], error: error.message };
  }
  return { data: (data as ClientRow[]).map(rowToCustomer), error: null };
}

/** Inserts a new client into the Supabase table. */
export async function insertClient(input: NewClientInput): Promise<{ data: Customer | null; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: 'Supabase is not configured. Add credentials in CRM Settings.' };
  }

  const row = customerToRow(input);
  const { data, error } = await supabase.from('clients').insert(row).select('*').single();

  if (error) {
    return { data: null, error: error.message };
  }
  return { data: rowToCustomer(data as ClientRow), error: null };
}

/** Updates an existing client by id. */
export async function updateClient(id: string, patch: ClientPatch): Promise<{ data: Customer | null; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: 'Supabase is not configured.' };
  }

  const update: Record<string, unknown> = {};
  if (patch.name !== undefined) update.name = patch.name;
  if (patch.nameAr !== undefined) update.name_ar = patch.nameAr ?? null;
  if (patch.phone !== undefined) update.phone = patch.phone;
  if (patch.email !== undefined) update.email = patch.email ?? null;
  if (patch.preferredContact !== undefined) update.preferred_contact = patch.preferredContact;
  if (patch.status !== undefined) update.status = patch.status;
  if (patch.assignedEmployeeId !== undefined) update.assigned_employee_id = patch.assignedEmployeeId;
  if (patch.leadSource !== undefined) update.lead_source = patch.leadSource;
  if (patch.leadSourceDetail !== undefined) update.lead_source_detail = patch.leadSourceDetail ?? null;
  if (patch.notes !== undefined) update.notes = patch.notes;
  if (patch.nextFollowUpAt !== undefined) update.next_follow_up_at = patch.nextFollowUpAt;
  if (patch.sentPropertyIds !== undefined) update.sent_property_ids = patch.sentPropertyIds;

  const { data, error } = await supabase.from('clients').update(update).eq('id', id).select('*').single();

  if (error) {
    return { data: null, error: error.message };
  }
  return { data: rowToCustomer(data as ClientRow), error: null };
}

/** Seeds the Supabase table with the existing demo customers (skip rows that already exist). */
export async function seedSampleClients(demoCustomers: Customer[]): Promise<{ inserted: number; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { inserted: 0, error: 'Supabase is not configured.' };
  }

  const { data: existing } = await supabase.from('clients').select('phone');
  const existingPhones = new Set((existing ?? []).map((r: { phone: string }) => r.phone));

  const toInsert = demoCustomers
    .filter((c) => !existingPhones.has(c.phone))
    .map((c) => ({
      name: c.name,
      name_ar: c.nameAr ?? null,
      phone: c.phone,
      email: c.email ?? null,
      preferred_contact: c.preferredContact,
      status: c.status,
      assigned_employee_id: c.assignedEmployeeId,
      lead_source: c.leadSource,
      lead_source_detail: c.leadSourceDetail ?? null,
      notes: c.notes,
      next_follow_up_at: c.nextFollowUpAt,
      sent_property_ids: c.sentPropertyIds,
    }));

  if (toInsert.length === 0) {
    return { inserted: 0, error: null };
  }

  const { error } = await supabase.from('clients').insert(toInsert);
  if (error) {
    return { inserted: 0, error: error.message };
  }
  return { inserted: toInsert.length, error: null };
}
