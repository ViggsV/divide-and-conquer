"use client";

import { useState } from "react";
import { ApiClient } from "../../../api/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserRegisterPage() {
    const [name, setName] = useState('');
    const [form, setForm] = useState({ email: "", password: "", name: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password || !form.name) {
            setError("Please enter an email, password and a name.");
            return;
        }
        setLoading(true);
        try {
            const apiClient = new ApiClient();
            const response = await apiClient.register(form.email, form.password, form.name);

            if (response && response.accessToken) {
                //router.push("/chores");
                window.location.href = "/chores"
                return;
            } else {
                setError("Registration successful but no token received.");
            }
        } catch (err) {
            console.error("Register error:", err.response || err);
            setError(
                err.response?.data?.message || "Could not register. Please try again."
            );
        } finally {
            setLoading(false);
        }

    };

    return (
      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
            <header className="bg-rose-500 text-white p-6 shadow-md">
                <div className="max-w-5xl mx-auto">
                    <Link href="/" className="text-3xl font-extrabold tracking-tight">All Your Chores</Link>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Create a new account
                    </h2>


                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                               <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your name"
                            required
                        />
                    </div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="example@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="*********"
                                required
                            />
                        </div>


                          
                            {error && (
                                <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
                            )}

                            
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-rose-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 disabled:opacity-60"
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </form>





                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-600">
                                Already have an account?
                            </p>
                            <Link href="/login">
                                <button className="text-rose-500 hover:underline font-medium">
                                    Log in
                                </button>
                            </Link>
                        </div>
                </div>
            </main>

            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; 2025 Chores App Project</p>
            </footer>
        </div>
    );
}
