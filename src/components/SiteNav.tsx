import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Case study" },
  { to: "/prototype/a", label: "Prototype A" },
  { to: "/prototype/b", label: "Prototype B" },
  { to: "/test", label: "Run a test" },
  { to: "/results", label: "Results" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-300 bg-ink-100/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-basket-600 text-sm text-white">
            🧺
          </span>
          Basket — Smart Reorder
        </NavLink>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {links.slice(1).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 font-medium transition ${
                  isActive ? "bg-basket-600 text-white" : "text-ink-700 hover:bg-ink-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
