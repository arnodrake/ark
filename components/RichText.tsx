import Link from "next/link";
import { Fragment, type ReactNode } from "react";

export const CONTACT_EMAIL = "info@arkautomationgroup.com";

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\{email\}|\n)/g;

/** Renders the inline markup used in dictionary strings: **bold**, [label](/href), {email}, and line breaks. */
export default function RichText({ text, emailClassName }: { text: string; emailClassName?: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i): ReactNode => {
        if (part === "\n") return <br key={i} />;
        if (part === "{email}")
          return (
            <a key={i} href={`mailto:${CONTACT_EMAIL}`} className={emailClassName}>
              {CONTACT_EMAIL}
            </a>
          );
        if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link)
          return (
            <Link key={i} href={link[2]}>
              {link[1]}
            </Link>
          );
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
