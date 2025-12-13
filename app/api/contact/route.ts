import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "admin@arkautomationgroup.com";
const RESEND_FROM = process.env.RESEND_FROM || "onboarding@resend.dev";

function toPlain(obj: Record<string, unknown>): string {
  return Object.entries(obj)
    .filter(([, v]) => typeof v !== "undefined" && v !== null && String(v).trim() !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

export async function POST(req: NextRequest) {
  try {
    // 支援 JSON 與 multipart/form-data 兩種提交
    const contentType = req.headers.get("content-type") || "";
    let payload: Record<string, unknown> = {};
    if (contentType.includes("multipart/form-data")) {
      const fd = await req.formData();
      for (const [k, v] of fd.entries()) {
        if (typeof v === "string") {
          payload[k] = v;
        } else {
          // 暫不處理附件上傳寄送，僅記錄檔名
          payload[k] = (v as File).name;
        }
      }
    } else {
      payload = await req.json();
    }

    // 直接回應成功於開發模式（沒有 API key 時不嘗試寄送）
    if (!resend) {
      return NextResponse.json({ ok: true, skipped: "no_resend_api_key" });
    }

    const subject =
      (payload.mode === "careers" ? "Career Inquiry" : "Project Inquiry") + " — Ark Automation";

    const textBody = toPlain({
      Name: payload.name,
      CompanyOrOccupation: payload.company,
      Email: payload.email,
      State: payload.state,
      "Project Scope": payload.scope,
      Details: payload.details,
      Resume: payload.resume, // 若是 careers，這裡會是檔名
    });

    await resend.emails.send({
      from: RESEND_FROM,
      to: CONTACT_TO_EMAIL,
      reply_to: typeof payload.email === "string" ? payload.email : undefined,
      subject,
      text: textBody,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "failed_to_send" }, { status: 500 });
  }
}



