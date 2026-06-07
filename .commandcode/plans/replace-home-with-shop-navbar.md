# Plan: Replace Home with Shop in Navbar

## Context
- The current navbar renders `navItems` (DB-driven) and includes a styled `Home` link (brand green) in both desktop and mobile navs.
- The "Shop" target exists at `/products` (`src/app/products/page.tsx`) — lists published products with categories, prices, and WhatsApp buy buttons.
- The user wants clients to buy available products directly from the navbar, so `Home` should be replaced with `Shop`.

## Approach
Filter out the `Home` item from `navItems` at render time and prepend a hard-coded `Shop` link pointing to `/products` in both the desktop and mobile navs. No DB/migration changes — `Home` stays in the database (other surfaces like admin nav manager or footers are unaffected) but is hidden in the public navbar.

This keeps the change small, reversible, and doesn't require touching `NavItem` model or admin nav editor.

## Files to Modify

### `src/components/layout/Header.tsx`

**Desktop nav** (around the existing `menuItems.map` block):
- Add a static `<Link href="/products">Shop</Link>` styled with `text-[#009050]` (brand green) to signal the new primary entry.
- Filter the `menuItems.map` to `menuItems.filter((item) => item.label !== "Home")` and drop the now-dead `item.label === "Home" && "text-[#009050]"` branch in the className.

**Mobile nav** (inside the `mobileMenuOpen` panel, before the existing `menuItems.map`):
- Add the same static `Shop` link matching the mobile link style (`block px-4 py-3 text-sm font-medium hover:bg-white/10 rounded-lg`).
- Filter the `menuItems.map` to exclude `Home`.

## Verification
1. `npm run dev`, load `/` — confirm desktop navbar shows `Shop` first (in green) and no `Home` item.
2. Resize to mobile width, open hamburger menu — confirm `Shop` appears in the list and `Home` is absent.
3. Click `Shop` — should land on `/products` and render the product grid.
4. Hover/click any other nav item (e.g. `Services`, `About`) — confirm normal navigation still works and no regressions in the mega-menu.
5. Check `/admin/navigation` — `Home` should still be visible/editable there (DB untouched).
