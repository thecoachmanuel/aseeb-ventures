import { Metadata } from "next";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <img src="/icons/cropnuts.svg" alt="Cropnuts" className="h-10 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-gray-500 text-sm mt-1">Join Cropnuts today</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input id="name" type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input id="password" type="password" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company / Farm (Optional)</label>
              <input id="company" type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent" />
            </div>
            <button type="submit" className="w-full bg-crop-green text-white py-3 rounded-lg font-semibold hover:bg-crop-green-dark transition-colors">
              Create Account
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="/login" className="text-sm text-crop-green hover:underline">Already have an account? Sign in</a>
          </div>
        </div>
      </div>
    </section>
  );
}
