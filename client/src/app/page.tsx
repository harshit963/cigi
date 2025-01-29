export default function HomePage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Welcome to My App</h1>
        <p className="text-gray-600 mt-4">A Next.js + Tailwind CSS project.</p>
        <div className="mt-8 space-x-4">
          <a
            href="/signup"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </a>
          <a
            href="/signin"
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Sign In
          </a>
          <a
            href="/locations"
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Location
          </a>
        </div>
      </div>
    );
  }
  