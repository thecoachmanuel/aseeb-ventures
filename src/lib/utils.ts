export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text;
  return text.substring(0, length).replace(/\s+\S*$/, "") + "...";
}

export function getImageUrl(path: string | undefined, fallback: string = "/images/placeholder.svg") {
  if (!path) return fallback;
  if (path.startsWith("http")) return path;
  return path;
}
