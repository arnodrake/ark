export default function SiteFooter() {
  return (
    <footer className="bg-neutral-950 py-10 text-white">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-sm text-white/70">Ark Automation Inc. — Built for the Future</p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <nav className="flex gap-4 text-sm text-white/70">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </nav>
          <span className="text-sm text-white/70">© 2025 Ark Automation Inc.<br className="sm:hidden" /> All rights reserved.</span>
        </div>
      </div>
      {/* iOS safe area bottom padding to avoid white strip when overscrolling */}
      <div style={{ height: 'env(safe-area-inset-bottom)' }} className="bg-neutral-950" />
    </footer>
  );
}


