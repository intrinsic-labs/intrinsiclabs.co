import Link from 'next/link'

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sorry, there was an error with your authentication. This could be due to:
          </p>
          <ul className="mt-4 text-sm text-gray-600 text-left space-y-2">
            <li>• The authentication code was invalid or expired</li>
            <li>• There was a network error during authentication</li>
            <li>• The OAuth configuration is incorrect</li>
          </ul>
          <div className="mt-8">
            <Link
              href="/auth/signin"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 