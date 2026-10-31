import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  DEMO_EMPLOYEES,
  DEMO_REQUESTS,
  DEMO_CRM_PROPERTIES,
  DEMO_TASKS,
  DEMO_INTERACTIONS,
  DEMO_CAMPAIGNS,
  newId,
  type Employee,
  type Customer,
  type CustomerRequest,
  type CrmProperty,
  type Task,
  type Interaction,
  type Campaign,
  type Role,
} from '@/data/crm';
import { fetchClients, insertClient, updateClient } from '@/lib/clientsApi';

interface CrmContextValue {
  employees: Employee[];
  customers: Customer[];
  requests: CustomerRequest[];
  crmProperties: CrmProperty[];
  tasks: Task[];
  interactions: Interaction[];
  campaigns: Campaign[];

  customersLoading: boolean;
  customersError: string | null;
  reloadCustomers: () => void;

  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentEmployeeId: string;
  setCurrentEmployeeId: (id: string) => void;

  addCustomer: (c: Omit<Customer, 'id' | 'createdAt' | 'sentPropertyIds'>) => Promise<Customer>;
  updateCustomer: (id: string, patch: Partial<Customer>) => Promise<void>;

  addRequest: (r: Omit<CustomerRequest, 'id' | 'createdAt' | 'presentedPropertyIds'>) => CustomerRequest;
  updateRequest: (id: string, patch: Partial<CustomerRequest>) => void;

  addCrmProperty: (p: Omit<CrmProperty, 'id' | 'createdAt'>) => CrmProperty;
  updateCrmProperty: (id: string, patch: Partial<CrmProperty>) => void;

  addTask: (t: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => Task;
  updateTask: (id: string, patch: Partial<Task>) => void;

  addInteraction: (i: Omit<Interaction, 'id' | 'createdAt'>) => Interaction;

  addCampaign: (c: Omit<Campaign, 'id' | 'createdAt'>) => Campaign;
  updateCampaign: (id: string, patch: Partial<Campaign>) => void;

  presentPropertyToCustomer: (customerId: string, propertyId: string) => void;
  linkCampaignInquiry: (campaignId: string, customerId: string) => void;
}

const CrmContext = createContext<CrmContextValue | null>(null);

export function CrmProvider({ children }: { children: ReactNode }) {
  const [employees] = useState<Employee[]>(DEMO_EMPLOYEES);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersLoading, setCustomersLoading] = useState(true);
  const [customersError, setCustomersError] = useState<string | null>(null);
  const [requests, setRequests] = useState<CustomerRequest[]>(DEMO_REQUESTS);
  const [crmProperties, setCrmProperties] = useState<CrmProperty[]>(DEMO_CRM_PROPERTIES);
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [interactions, setInteractions] = useState<Interaction[]>(DEMO_INTERACTIONS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(DEMO_CAMPAIGNS);

  const [currentRole, setCurrentRole] = useState<Role>('admin');
  const [currentEmployeeId, setCurrentEmployeeId] = useState<string>('emp-001');

  const reloadCustomers = async () => {
    setCustomersLoading(true);
    setCustomersError(null);
    const { data, error } = await fetchClients();
    if (error) {
      setCustomersError(error);
      setCustomersLoading(false);
      return;
    }
    setCustomers(data);
    setCustomersLoading(false);
  };

  useEffect(() => {
    reloadCustomers();
  }, []);

  const value = useMemo<CrmContextValue>(() => ({
    employees,
    customers,
    requests,
    crmProperties,
    tasks,
    interactions,
    campaigns,
    customersLoading,
    customersError,
    reloadCustomers,
    currentRole,
    setCurrentRole,
    currentEmployeeId,
    setCurrentEmployeeId,

    addCustomer: async (c) => {
      const { data, error } = await insertClient(c);
      if (error || !data) {
        throw new Error(error ?? 'Failed to add customer');
      }
      setCustomers((prev) => [data, ...prev]);
      return data;
    },
    updateCustomer: async (id, patch) => {
      const { data, error } = await updateClient(id, patch);
      if (error || !data) {
        throw new Error(error ?? 'Failed to update customer');
      }
      setCustomers((prev) => prev.map((c) => (c.id === id ? data : c)));
    },

    addRequest: (r) => {
      const req: CustomerRequest = {
        ...r,
        id: newId('req'),
        createdAt: new Date().toISOString(),
        presentedPropertyIds: [],
      };
      setRequests((prev) => [req, ...prev]);
      return req;
    },
    updateRequest: (id, patch) => {
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    },

    addCrmProperty: (p) => {
      const prop: CrmProperty = {
        ...p,
        id: newId('crm-prop'),
        createdAt: new Date().toISOString(),
      };
      setCrmProperties((prev) => [prop, ...prev]);
      return prop;
    },
    updateCrmProperty: (id, patch) => {
      setCrmProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    },

    addTask: (t) => {
      const task: Task = {
        ...t,
        id: newId('task'),
        createdAt: new Date().toISOString(),
        completedAt: null,
      };
      setTasks((prev) => [task, ...prev]);
      return task;
    },
    updateTask: (id, patch) => {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    },

    addInteraction: (i) => {
      const inter: Interaction = {
        ...i,
        id: newId('int'),
        createdAt: new Date().toISOString(),
      };
      setInteractions((prev) => [inter, ...prev]);
      return inter;
    },

    addCampaign: (c) => {
      const camp: Campaign = {
        ...c,
        id: newId('camp'),
        createdAt: new Date().toISOString(),
      };
      setCampaigns((prev) => [camp, ...prev]);
      return camp;
    },
    updateCampaign: (id, patch) => {
      setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    },

    presentPropertyToCustomer: (customerId, propertyId) => {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === customerId && !c.sentPropertyIds.includes(propertyId)
            ? { ...c, sentPropertyIds: [...c.sentPropertyIds, propertyId] }
            : c
        )
      );
      const cust = customers.find((c) => c.id === customerId);
      if (cust && !cust.sentPropertyIds.includes(propertyId)) {
        updateClient(customerId, { sentPropertyIds: [...cust.sentPropertyIds, propertyId] });
      }
    },

    linkCampaignInquiry: (campaignId, customerId) => {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === campaignId && !c.inquiryCustomerIds.includes(customerId)
            ? { ...c, inquiryCustomerIds: [...c.inquiryCustomerIds, customerId] }
            : c
        )
      );
    },
  }), [employees, customers, requests, crmProperties, tasks, interactions, campaigns, currentRole, currentEmployeeId, customersLoading, customersError]);

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
}

export function useCrm(): CrmContextValue {
  const ctx = useContext(CrmContext);
  if (!ctx) throw new Error('useCrm must be used within CrmProvider');
  return ctx;
}
