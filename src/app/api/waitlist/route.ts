import { NextResponse } from "next/server";

type WaitlistEntry = {
  email: string;
  nome?: string;
  createdAt: string;
  source?: string;
};

const submissions: WaitlistEntry[] = [];

export async function POST(req: Request) {
  try {
    const { email, nome, source } = (await req.json()) as {
      email?: string;
      nome?: string;
      source?: string;
    };

    if (!email || !/.+@.+\..+/.test(email)) {
      return NextResponse.json(
        { error: "Email inválido. Tente novamente." },
        { status: 400 }
      );
    }

    const entry: WaitlistEntry = {
      email: email.toLowerCase(),
      nome,
      source: source || "marketing-site",
      createdAt: new Date().toISOString(),
    };

    submissions.push(entry);

    if (process.env.WAITLIST_DESTINATION) {
      // Placeholder para integrar com destinos externos (Supabase, Resend, etc.)
      console.warn(
        `Waitlist ready to forward to ${process.env.WAITLIST_DESTINATION}`
      );
    }

    return NextResponse.json({ ok: true, message: "Adicionado à lista." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao guardar o pedido." },
      { status: 500 }
    );
  }
}
