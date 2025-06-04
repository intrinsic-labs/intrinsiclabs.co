import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ClientDocuments() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/signin')
  }

  // Mock documents data - replace with actual data from your database
  const documents = [
    {
      id: 1,
      name: 'Project Specification Document',
      type: 'PDF',
      size: '2.4 MB',
      lastModified: '2024-01-15',
      description: 'Detailed project requirements and specifications'
    },
    {
      id: 2,
      name: 'Contract Agreement',
      type: 'PDF',
      size: '1.8 MB',
      lastModified: '2024-01-10',
      description: 'Signed contract and terms of service'
    },
    {
      id: 3,
      name: 'Project Timeline',
      type: 'PDF',
      size: '850 KB',
      lastModified: '2024-01-20',
      description: 'Project milestones and delivery schedule'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Project Documents
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Access your project specifications, contracts, and deliverables
                </p>
              </div>
              <Link
                href="/client"
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="mt-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {documents.map((document) => (
                <li key={document.id}>
                  <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-10 w-10 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {document.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {document.description}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {document.type} • {document.size} • Modified {document.lastModified}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                        View
                      </button>
                      <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Empty State (if no documents) */}
        {documents.length === 0 && (
          <div className="mt-6">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
              <p className="mt-1 text-sm text-gray-500">
                Your project documents will appear here once they're available.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 