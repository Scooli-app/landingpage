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
  rag: boolean;
  streaming: boolean;
  templates: boolean;
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
          // Ordenar: free primeiro, depois pro_monthly, depois pro_annual
          const sorted = data.sort((a: Plan, b: Plan) => {
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

