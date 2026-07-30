export type PlanId = "free" | "starter" | "pro" | "business";

export interface PlanConfig {
  id: PlanId;
  label: string;
  price: number;
  description: string;
  maxAccounts: number;
  maxPostsPerDay: number;
  advancedAnalytics: boolean;
  teamMembers: number;
  customScheduling: boolean;
  aiSuggestions: boolean;
  apiAccess: boolean;
}

export const PLANS: Record<PlanId, PlanConfig> = {
  free: {
    id: "free",
    label: "Gratis",
    price: 0,
    description: "Coba fitur dasar sosial media management",
    maxAccounts: 5,
    maxPostsPerDay: 10,
    advancedAnalytics: false,
    teamMembers: 1,
    customScheduling: false,
    aiSuggestions: false,
    apiAccess: false,
  },
  starter: {
    id: "starter",
    label: "Starter",
    price: 49_000,
    description: "Untuk content creator & small business",
    maxAccounts: 10,
    maxPostsPerDay: 30,
    advancedAnalytics: false,
    teamMembers: 2,
    customScheduling: true,
    aiSuggestions: false,
    apiAccess: false,
  },
  pro: {
    id: "pro",
    label: "Pro",
    price: 99_000,
    description: "Untuk tim marketing & agency kecil",
    maxAccounts: 25,
    maxPostsPerDay: 100,
    advancedAnalytics: true,
    teamMembers: 5,
    customScheduling: true,
    aiSuggestions: true,
    apiAccess: true,
  },
  business: {
    id: "business",
    label: "Business",
    price: 249_000,
    description: "Untuk agency & enterprise",
    maxAccounts: 100,
    maxPostsPerDay: -1,
    advancedAnalytics: true,
    teamMembers: 15,
    customScheduling: true,
    aiSuggestions: true,
    apiAccess: true,
  },
};
