"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Tipos para os planos da API
interface PlanFeatures {
  rag?: boolean;
  streaming?: boolean;
  templates?: boolean;
  priority_support?: boolean;
}

export interface Plan {
  planCode: string;
  name: string;
  description: string;
  interactionsPerPeriod: number;
  priceCents: number;
  billingPeriod: "month" | "year";
  features: PlanFeatures;
}

interface PlansContextType {
  plans: Plan[];
  loading: boolean;
  error: boolean;
  hasPlans: boolean;
}

const PlansContext = createContext<PlansContextType>({
  plans: [],
  loading: true,
  error: false,
  hasPlans: false,
});

function toFiniteNumber(value: unknown, fallback = 0) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizePlan(rawPlan: unknown): Plan | null {
  if (!rawPlan || typeof rawPlan !== "object") {
    return null;
  }

  const plan = rawPlan as Record<string, unknown>;
  const planCode = typeof plan.planCode === "string" ? plan.planCode : "";

  if (!planCode) {
    return null;
  }

  const rawFeatures =
    plan.features && typeof plan.features === "object"
      ? (plan.features as Record<string, unknown>)
      : {};

  return {
    planCode,
    name:
      typeof plan.name === "string" && plan.name.trim().length > 0
        ? plan.name
        : planCode,
    description: typeof plan.description === "string" ? plan.description : "",
    interactionsPerPeriod: toFiniteNumber(plan.interactionsPerPeriod),
    priceCents: toFiniteNumber(plan.priceCents),
    billingPeriod: plan.billingPeriod === "year" ? "year" : "month",
    features: {
      rag: Boolean(rawFeatures.rag),
      streaming: Boolean(rawFeatures.streaming),
      templates: Boolean(rawFeatures.templates),
      priority_support: Boolean(rawFeatures.priority_support),
    },
  };
}

export function PlansProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await fetch(`${API_URL}/subscriptions/plans`);
        if (!response.ok) {
          throw new Error("Failed to fetch plans");
        }
        const data = await response.json();
        if (data && Array.isArray(data) && data.length > 0) {
          const normalizedPlans = data
            .map(normalizePlan)
            .filter((plan): plan is Plan => plan !== null);

          if (normalizedPlans.length === 0) {
            throw new Error("No valid plans returned from API");
          }

          // Ordenar: free primeiro, depois pro_monthly, depois pro_annual
          const sorted = normalizedPlans.sort((a: Plan, b: Plan) => {
            const order: Record<string, number> = {
              free: 0,
              pro_monthly: 1,
              pro_annual: 2,
            };
            return (order[a.planCode] ?? 99) - (order[b.planCode] ?? 99);
          });
          setPlans(sorted);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  const hasPlans = !loading && !error && plans.length > 0;

  return (
    <PlansContext.Provider value={{ plans, loading, error, hasPlans }}>
      {children}
    </PlansContext.Provider>
  );
}

export function usePlans() {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error("usePlans must be used within a PlansProvider");
  }
  return context;
}

