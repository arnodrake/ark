"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { PENDING_SECTION_KEY, scrollToSection } from "@/lib/scroll-to-hash";

export function useGoToSection() {
  const pathname = usePathname();
  const router = useRouter();
  return (section: string) => {
    if (pathname === "/") {
      scrollToSection(section, true);
      return;
    }
    sessionStorage.setItem(PENDING_SECTION_KEY, section);
    router.push("/");
  };
}

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { section: string };

/** Links to a home-page section without putting a #hash in the URL. */
export default function SectionLink({ section, onClick, ...rest }: SectionLinkProps) {
  const goToSection = useGoToSection();
  return (
    <Link
      {...rest}
      href="/"
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        goToSection(section);
      }}
    />
  );
}
