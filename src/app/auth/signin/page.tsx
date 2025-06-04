'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { FaGoogle, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa'
import Image from 'next/image'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/client'

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
      setError('Failed to sign in with Google. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen neuro-bg flex items-center justify-center p-4">
      {/* Main Content */}
      <div className="w-full max-w-md mx-auto">
        {/* Main Neuro Card */}
        <div className="neuro-card neuro-rounded-z-lg p-8 space-y-8">
          {/* Logo Section */}
          <div className="text-center space-y-6">
            <div className="neuro-raised neuro-rounded-z p-4 inline-block">
              <Image 
                src="/images/ground-control/logo-v1.png" 
                alt="Intrinsic Labs Logo" 
                width={120} 
                height={120} 
                className="w-20 h-20 sm:w-24 sm:h-24"
                quality={100}
              />
            </div>
            
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-calling-code neuro-text-primary leading-tight">
                <span className="neuro-text-secondary">il/</span>
                <span className="neuro-text-accent">ground-control</span>
              </h1>
              <p className="neuro-text-secondary font-medium text-base sm:text-lg">
                Prepare to launch. Orbit in style.
              </p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="neuro-pressed neuro-rounded-z p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <FaExclamationTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium neuro-text-primary">
                    Authentication Error
                  </h3>
                  <p className="mt-1 text-sm neuro-text-secondary">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sign In Button */}
          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`neuro-button-accent neuro-rounded-z w-full py-4 px-6 text-white font-medium text-lg flex items-center justify-center space-x-3 ${
                isLoading ? 'neuro-pulse' : ''
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Launching...</span>
                </>
              ) : (
                <>
                  <FaGoogle className="w-5 h-5" />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Back to Home Link */}
            <div className="text-center">
              <Link
                href="/"
                className="neuro-text-secondary hover:neuro-text-primary text-sm font-medium transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <FaArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Neuro Elements for Visual Interest
        <div className="mt-8 flex justify-center space-x-4">
          <div className="neuro-raised neuro-rounded-full w-12 h-12 flex items-center justify-center">
            <div className="w-2 h-2 neuro-text-muted rounded-full bg-current" />
          </div>
          <div className="neuro-raised neuro-rounded-full w-12 h-12 flex items-center justify-center">
            <div className="w-2 h-2 neuro-text-accent rounded-full bg-current" />
          </div>
          <div className="neuro-raised neuro-rounded-full w-12 h-12 flex items-center justify-center">
            <div className="w-2 h-2 neuro-text-secondary rounded-full bg-current" />
          </div>
        </div> */}

        {/* Status Indicator */}
        <div className="mt-6 text-center">
          <div className="neuro-flat p-3 inline-block">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="neuro-text-muted text-xs font-medium">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 