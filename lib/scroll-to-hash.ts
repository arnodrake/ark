/** Desktop: align #future so only a thin strip of the next section shows at the bottom. */
const FUTURE_BOTTOM_GAP_PX = 14;

export function getHashScrollTop(id: string, el: HTMLElement): number {
  if (id === "future" && window.matchMedia("(min-width: 768px)").matches) {
    return el.offsetTop + el.offsetHeight - window.innerHeight + FUTURE_BOTTOM_GAP_PX;
  }
  return el.offsetTop;
}

export function scrollToHash(hash: string, smooth = true) {
  const id = hash.replace(/^#/, "");
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;

  const top = Math.max(0, getHashScrollTop(id, el));
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
}
