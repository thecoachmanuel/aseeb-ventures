"use client";

import { AdminContentManager } from "@/components/admin/AdminContentManager";

export default function AdminContactsPage() {
  return <AdminContentManager resource="contacts" title="Contact Messages" canCreate={false} />;
}
