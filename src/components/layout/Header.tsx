"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    id: "home",
    label: "Home",
    href: "/",
    hasMega: false,
  },
  {
    id: "about",
    label: "About Us",
    href: "/about",
    hasMega: false,
  },
  {
    id: "services",
    label: "Services",
    href: "#",
    hasMega: true,
    megaContent: [
      {
        icon: "/icons/lab_services.svg",
        title: "Laboratory Services",
        description: "We offer wide range, state of the art tests in Agricultural…",
        href: "/services/laboratory-services",
      },
      {
        icon: "/icons/advisory_services.svg",
        title: "Farm Advisory Services",
        description: "Best Technical off Farm and On Farm Advice on soil…",
        href: "/services/farm-advisory-services",
      },
      {
        icon: "/icons/agTech_services.svg",
        title: "AgTech Solutions",
        description: "We offer wide range of technologies and techniques…",
        href: "/services/agtech-solutions",
      },
    ],
  },
  {
    id: "articles",
    label: "Articles",
    href: "#",
    hasMega: true,
    megaContent: [
      {
        icon: "/icons/agrnonomy_articles.svg",
        title: "Agronomy Articles",
        description: "Articles on crop disease, protection, soil science…",
        href: "/blog/category/agronomy-articles",
      },
      {
        icon: "/icons/nutrition_knowledge.svg",
        title: "Nutritional Knowledge",
        description: "Plants balance nutrition with a healthy dose of macronutrients…",
        href: "/nutritional-knowledge",
      },
      {
        icon: "/icons/how_to_videos.svg",
        title: "How to Videos",
        description: "Handy videos about crop trials, crop protection and best farming…",
        href: "/blog/category/how-to-videos",
      },
      {
        icon: "/icons/success_stories.svg",
        title: "Success Stories",
        description: "Real stories, real farmers success with a little help from Aseeb Ventures…",
        href: "/success-stories",
      },
      {
        icon: "/icons/faqs.svg",
        title: "FAQs",
        description: "Aseeb Ventures help desk. Search the knowledge base…",
        href: "https://aseeb-ventures.vercel.app",
      },
      {
        icon: "/icons/news_events.svg",
        title: "News & Events",
        description: "Latest news about Aseeb Ventures, learn of upcoming events, trainings…",
        href: "/blog/category/news",
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    hasMega: false,
  },
  {
    id: "contact",
    label: "Contact Us",
    href: "/contact",
    hasMega: false,
  },
];

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);
  const megaPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : Promise.resolve({ user: null })))
      .then((data) => {
        setUser(data.user);
        setUserLoaded(true);
      })
      .catch(() => setUserLoaded(true));
  }, []);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }, [router]);

  const handleMegaEnter = (id: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setActiveMegaMenu(id);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMegaMenu(null), 300);
  };

  const handlePanelEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
  };

  const handlePanelLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMegaMenu(null), 300);
  };

  const activeMegaItem = menuItems.find((item) => item.id === activeMegaMenu);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?s=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#009050] text-white text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-end gap-6 py-1.5">
            <a href="https://aseeb-ventures.vercel.app/" target="_blank" rel="noopener" className="hover:underline">Help Center</a>
            <a href="tel:+2349157728554" className="hover:underline">+234 915 772 8554</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1 p-2"
              aria-label="Toggle menu"
            >
              <span className={cn("block w-5 h-0.5 bg-[#009050] transition-transform", mobileMenuOpen && "rotate-45 translate-y-1.5")} />
              <span className={cn("block w-5 h-0.5 bg-[#009050] transition-opacity", mobileMenuOpen && "opacity-0")} />
              <span className={cn("block w-5 h-0.5 bg-[#009050] transition-transform", mobileMenuOpen && "-rotate-45 -translate-y-1.5")} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img src="/icons/cropnuts.svg" alt="Aseeb Ventures" className="h-10 lg:h-12 w-auto" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.hasMega ? handleMegaEnter(item.id) : setActiveMegaMenu(null)}
                  onMouseLeave={() => item.hasMega && handleMegaLeave()}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#009050] transition-colors rounded-md",
                      item.id === "home" && "text-[#009050]"
                    )}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-[#009050] transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {!userLoaded ? (
                <div className="hidden lg:block w-24 h-9" />
              ) : user ? (
                <div className="hidden lg:flex items-center gap-2">
                  <Link
                    href={user.role === "admin" ? "/admin" : "/dashboard"}
                    className="text-sm font-medium text-gray-700 hover:text-[#009050] transition-colors"
                  >
                    {user.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden lg:inline-flex items-center gap-2 bg-[#009050] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#007a40] transition-colors"
                >
                  Portal Login
                  <svg className="w-3 h-3" viewBox="0 0 90 15" fill="currentColor">
                    <path d="M90,7.706 L90.01,7.716 L90,7.726 L90,8 L89.726,8 L82.716,15.01 L81.99,14.284 L88.273,8 L0,8 L0,7 L88.273,7 L81.99,0.716 L82.716,-0.01 L89.726,7 L90,7 L90,7.274 L90.01,7.284 L90,7.294 L90,7.706 Z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Full-width mega menu panel */}
        {activeMegaMenu && activeMegaItem?.megaContent && (
          <div
            ref={megaPanelRef}
            className="bg-white border-t border-gray-200 shadow-lg"
            onMouseEnter={handlePanelEnter}
            onMouseLeave={handlePanelLeave}
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className={cn(
                "grid gap-6",
                activeMegaItem.id === "articles" ? "grid-cols-3" : "grid-cols-3"
              )}>
                {activeMegaItem.megaContent.map((sub, idx) => (
                  <Link
                    key={idx}
                    href={sub.href}
                    onClick={() => setActiveMegaMenu(null)}
                    className="group flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#e8f5ed] rounded-lg flex items-center justify-center">
                      <img src={sub.icon} alt="" className="w-7 h-7" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm mb-1 text-gray-800 group-hover:text-[#009050] transition-colors">{sub.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{sub.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search overlay */}
        {searchOpen && (
          <div className="absolute left-0 right-0 top-full bg-white shadow-lg border-t z-50">
            <div className="max-w-3xl mx-auto px-4 py-4">
              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009050] focus:border-transparent"
                  autoFocus
                />
                <button type="submit" className="bg-[#009050] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#007a40] transition-colors">
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-[#009050] text-white overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <img src="/images/logo.jpg" alt="Aseeb Ventures" className="h-8 w-auto rounded" />
                <button onClick={() => setMobileMenuOpen(false)} className="text-white p-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    {item.hasMega ? (
                      <div>
                        <div className="px-4 py-3 font-medium text-sm opacity-70 uppercase tracking-wide">{item.label}</div>
                        <div className="space-y-1 ml-2">
                          {item.megaContent?.map((sub, idx) => (
                            <Link
                              key={idx}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2.5 text-sm hover:bg-white/10 rounded-lg"
                            >
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-medium hover:bg-white/10 rounded-lg"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-6 px-4">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href={user.role === "admin" ? "/admin" : "/dashboard"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center bg-white/20 text-white py-3 rounded-lg font-semibold"
                    >
                      {user.name}
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      className="block w-full text-center text-white/70 py-2 text-sm hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-white text-[#009050] py-3 rounded-lg font-semibold"
                  >
                    Portal Login
                  </Link>
                )}
              </div>
              <div className="mt-6 px-4 text-xs text-white/60">
                © {new Date().getFullYear()} Aseeb Ventures
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
  </>
  );
}
