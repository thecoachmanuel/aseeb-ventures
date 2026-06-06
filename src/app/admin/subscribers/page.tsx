"use client";

import { AdminContentManager } from "@/components/admin/AdminContentManager";

export default function AdminSubscribersPage() {
  return <AdminContentManager resource="subscribers" title="Newsletter Subscribers" canCreate={false} />;
}
