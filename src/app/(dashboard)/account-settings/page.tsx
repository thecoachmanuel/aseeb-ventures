"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : Promise.resolve({ user: null })))
      .then((data) => {
        if (!data.user) {
          router.push("/login?redirect=/account-settings");
          return;
        }
        setUser(data.user);
        setName(data.user.name || "");
        setCompany(data.user.company || "");
        setPhone(data.user.phone || "");
        setLoading(false);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save profile");
      } else {
        setSuccess("Profile updated successfully");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setChangingPassword(true);

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      setChangingPassword(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/me/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to change password");
      } else {
        setSuccess("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="animate-pulse h-80 bg-gray-100 rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/dashboard" className="text-crop-green text-sm font-medium hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <form className="space-y-4" onSubmit={handleSaveProfile}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company / Farm</label>
                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="bg-crop-green text-white px-6 py-3 rounded-lg font-medium hover:bg-crop-green-dark transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form className="space-y-4" onSubmit={handleChangePassword}>
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={changingPassword}
              className="bg-crop-green text-white px-6 py-3 rounded-lg font-medium hover:bg-crop-green-dark transition-colors disabled:opacity-50"
            >
              {changingPassword ? "Changing password..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
