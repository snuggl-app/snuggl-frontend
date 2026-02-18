import { NextResponse } from "next/server";

type Payload = {
  email: string;
  firstName?: string;
  consent?: boolean;
};

export async function POST(req: Request) {
  try {
    const { email, firstName } = (await req.json()) as Payload;

    const cleanEmail = (email || "").trim().toLowerCase();
    if (!cleanEmail) {
      return NextResponse.json({ error: "Email mancante" }, { status: 400 });
    }

    const res = await fetch(
      "https://api.brevo.com/v3/contacts/doubleOptinConfirmation",
      {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY!,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          attributes: {
            ...(firstName ? { FIRSTNAME: firstName } : {}),
          },
          includeListIds: [Number(process.env.BREVO_LIST_ID)],
          templateId: Number(process.env.BREVO_DOI_TEMPLATE_ID),
          redirectionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter-confirmed`,
        }),
      }
    );

    // 204 = successo senza body per questo endpoint
    if (!res.ok && res.status !== 204) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Errore Brevo", details: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
