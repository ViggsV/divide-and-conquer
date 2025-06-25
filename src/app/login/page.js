"use client";

import { useState, useEffect } from "react";
import { ApiClient } from "../../../api/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (window)
      window.location.href = "/chores"
    }
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const apiClient = new ApiClient();
      const response = await apiClient.login(form.email, form.password);

      if (response && response.accessToken) {
        window.location.href = "/chores"
      } else {
        setError("Login successful but no token received");
      }
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError(
        err.response?.data?.message || "Invalid credentials or server error."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
  {/* Header */}
  <header className="bg-rose-500 text-white p-6 shadow-md">
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="text-3xl font-extrabold tracking-tight">
        All Your Chores
      </Link>
    </div>
  </header>

  {/* Main */}
  <main className="flex-grow flex items-center justify-center px-4">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Log in to your account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-400 focus:border-rose-400"
            placeholder="example@email.com"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-400 focus:border-rose-400"
            placeholder="*********"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
        )}

        {/* Remember Me & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-rose-500 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Register Link */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">Don't have an account?</p>
        <Link href="/register">
          <button className="text-rose-500 hover:underline font-medium">
            Register
          </button>
        </Link>
      </div>
    </div>
  </main>

  {/* Footer */}
  <footer className="bg-gray-900 text-gray-300 text-center p-4">
    <p>&copy; 2025 Chores App Project</p>
  </footer>
</div>
  );
}
