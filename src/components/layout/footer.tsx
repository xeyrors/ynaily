export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-6 mt-12">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-[#52525b]">
            ynaily — Thumbnail research library
          </p>
          <div className="flex items-center gap-5 text-xs text-[#52525b]">
            <a href="/about" className="hover:text-[#a1a1aa] transition-colors">
              About
            </a>
            <a href="/submit" className="hover:text-[#a1a1aa] transition-colors">
              Submit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
