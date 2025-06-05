import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (

    <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold">All Your Chores</h1>

        </div>
      </header>

      {/* Main */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
          {/* Hero */}
          <section className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Organize Your Chores {" "}
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              From household tasks to bills and appointments — All Your Chores helps you stay on top of everything.
            </p>


            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow">
                Schedule a Chore
              </Link>
              <button className="bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 font-semibold py-2 px-6 rounded shadow">
                View Upcoming Tasks
              </button>
            </div>
          </section>

          {/* Features */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Quick Scheduling</h3>
              <p className="text-gray-600">Add chores in seconds with intuitive forms and smart defaults.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Family-Friendly</h3>
              <p className="text-gray-600">Assign chores to family members and keep everyone in sync.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Reminders & Tracking</h3>
              <p className="text-gray-600">Get notified when tasks are due — and track what’s been completed.</p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-blue-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Ready to Get Organized?</h3>
            <p className="mb-4 max-w-xl mx-auto">
              Join other households managing their tasks with ease using All Your Chores.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded shadow">
              Get Started Free
            </button>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 All Your Chores</p>
      </footer>

    </div>
  );
}