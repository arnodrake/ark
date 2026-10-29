/** Desktop: align #future so only a thin strip of the next section shows at the bottom. */
const FUTURE_BOTTOM_GAP_PX = 14;

/** Section to scroll to after client navigation lands on the home page; keeps the URL free of #hashes. */
export const PENDING_SECTION_KEY = "ark-pending-section";

export function getHashScrollTop(id: string, el: HTMLElement): number {
  if (id === "future" && window.matchMedia("(min-width: 768px)").matches) {
    return el.offsetTop + el.offsetHeight - window.innerHeight + FUTURE_BOTTOM_GAP_PX;
  }
  return el.offsetTop;
}

/** Unknown ids (e.g. "top") scroll to the top of the page. */
export function scrollToSection(id: string, smooth = true) {
  const el = document.getElementById(id);
  const top = el ? Math.max(0, getHashScrollTop(id, el)) : 0;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
}
