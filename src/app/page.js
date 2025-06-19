import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
<div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
  {/* Header */}
  <header className="bg-rose-500 text-white p-6 shadow-md">
    <div className="max-w-5xl mx-auto">
      <Link href="/" className="text-3xl font-extrabold tracking-tight">All Your Chores</Link>
    </div>
  </header>

  {/* Main Content */}
  <main className="flex-grow">
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

      {/* Hero */}
      <section className="text-center space-y-6">
        <h2 className="text-5xl font-bold tracking-tight">
          Organise Your Life, One Chore at a Time
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From household tasks to bills and appointments — All Your Chores helps you stay on top of everything.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="/login"
            className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-6 rounded-md shadow-md transition"
          >
            Schedule a Chore
          </Link>
          <Link
            href="/chores"
            className="bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 font-medium py-2 px-6 rounded-md shadow-md transition"
          >
            View Upcoming Tasks
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-100">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Quick Scheduling</h3>
          <p className="text-gray-600">Add chores in seconds with intuitive forms and smart defaults.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-100">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Family-Friendly</h3>
          <p className="text-gray-600">Assign chores to family members and keep everyone in sync.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-100">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Reminders & Tracking</h3>
          <p className="text-gray-600">Get notified when tasks are due — and track what’s been completed.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-emerald-500 rounded-xl p-10 text-center text-white space-y-4">
        <h3 className="text-2xl font-bold">Ready to Get Organised?</h3>
        <p className="max-w-xl mx-auto text-emerald-100">
          Join other households managing their tasks with ease using All Your Chores.
        </p>
        <Link
          href="/register"
          className="bg-white text-emerald-600 hover:bg-rose-400 font-medium py-2 px-6 rounded-md shadow-md transition"
        >
          Get Started For Free
        </Link>
      </section>
    </div>
  </main>

  {/* Footer */}
  <footer className="bg-gray-900 text-gray-300 text-center p-4 mt-12">
    <p>&copy; 2025 All Your Chores. All rights reserved.</p>
  </footer>
</div>
    
  );
}

