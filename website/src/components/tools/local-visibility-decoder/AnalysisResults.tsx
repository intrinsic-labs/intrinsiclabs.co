"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import Link from 'next/link';

interface Platform {
  found: boolean;
  consistent: boolean;
  issues: string[];
}

interface GooglePlatform extends Platform {
  searchRank: number;
  mapsRank: number;
}

interface Review {
  count: number;
  rating: string;
  lastReviewDate: string;
}

interface Reviews {
  google: Review;
  yelp: Review;
  facebook: Review;
  other: {
    count: number;
    platforms: string[];
  };
}

interface SearchRanking {
  keyword: string;
  googleSearch: number;
  googleMaps: number;
  bing: number;
  estimatedMonthlySearches: number;
}

interface Competitor {
  name: string;
  rankDifference: number;
  reviewCount: number;
  rating: string;
}

interface RevenueLoss {
  monthly: {
    low: number;
    average: number;
    high: number;
  };
  annual: {
    low: number;
    average: number;
    high: number;
  };
}

interface BusinessInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website: string;
  category: string;
  email: string;
  annualRevenue?: string;
  primaryKeywords?: string;
  competitors?: string;
}

interface AnalysisResultsProps {
  results: {
    visibilityScore: number;
    platforms: {
      google: GooglePlatform;
      yelp: Platform;
      facebook: Platform;
      bingPlaces: Platform;
      appleMaps: Platform;
    };
    businessInfo: {
      name: string;
      address: string;
      phone: string;
      website: string;
      category: string;
    };
    reviews: Reviews;
    searchRankings: SearchRanking[];
    competitors: Competitor[];
    revenueLoss: RevenueLoss;
    estimatedCustomerLoss: number;
    priorityFixes: string[];
  };
  businessInfo: BusinessInfo;
}

const AnalysisResults = ({ results, businessInfo }: AnalysisResultsProps) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Calculate consistency percentage
  const getTotalConsistency = () => {
    const platforms = Object.values(results.platforms);
    const foundPlatforms = platforms.filter(p => p.found);
    if (foundPlatforms.length === 0) return 0;
    
    const consistentPlatforms = foundPlatforms.filter(p => p.consistent);
    return Math.round((consistentPlatforms.length / foundPlatforms.length) * 100);
  };
  
  // Calculate missing platforms count
  const getMissingPlatformsCount = () => {
    return Object.values(results.platforms).filter(p => !p.found).length;
  };
  
  // Get all issues across platforms
  const getAllIssues = () => {
    const issues: string[] = [];
    Object.values(results.platforms).forEach(platform => {
      if (platform.issues.length > 0) {
        issues.push(...platform.issues);
      }
    });
    return issues;
  };
  
  const consistency = getTotalConsistency();
  const missingPlatforms = getMissingPlatformsCount();
  const allIssues = getAllIssues();
  
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Your Local Visibility Analysis</h2>
            <p className="paragraph-serif text-xl max-w-2xl mx-auto">
              Here's how {results.businessInfo.name} appears to local customers searching online.
            </p>
          </motion.div>
          
          {/* Score Overview - Always visible */}
          <Card className="p-6 md:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ScoreCard 
                title="Visibility Score" 
                value={`${results.visibilityScore}`} 
                suffix="/100"
                description={results.visibilityScore < 40 ? "Critical - Needs immediate attention" : 
                              results.visibilityScore < 70 ? "Fair - Improvement needed" : "Good - Minor fixes recommended"}
                color={results.visibilityScore < 40 ? "text-red-500" : 
                       results.visibilityScore < 70 ? "text-orange-500" : "text-green-600"}
              />
              
              <ScoreCard 
                title="Consistency" 
                value={`${consistency}`} 
                suffix="%"
                description={consistency < 50 ? "Poor - Information varies across platforms" : 
                            consistency < 80 ? "Fair - Some inconsistencies found" : "Good - Most information is consistent"}
                color={consistency < 50 ? "text-red-500" : 
                       consistency < 80 ? "text-orange-500" : "text-green-600"}
              />
              
              <ScoreCard 
                title="Missing Platforms" 
                value={`${missingPlatforms}`} 
                suffix="/5"
                description={missingPlatforms > 3 ? "Critical - You're missing from most platforms" : 
                            missingPlatforms > 1 ? "Problem - You're missing key platforms" : "Good - Present on most platforms"}
                color={missingPlatforms > 3 ? "text-red-500" : 
                       missingPlatforms > 1 ? "text-orange-500" : "text-green-600"}
              />
              
              <ScoreCard 
                title="Customer Loss" 
                value={`~${results.estimatedCustomerLoss}`} 
                suffix="%"
                description={results.estimatedCustomerLoss > 30 ? "Severe - Missing significant business" : 
                            results.estimatedCustomerLoss > 15 ? "Moderate - Visible impact on business" : "Low - Minor impact on business"}
                color={results.estimatedCustomerLoss > 30 ? "text-red-500" : 
                       results.estimatedCustomerLoss > 15 ? "text-orange-500" : "text-green-600"}
              />
            </div>
          </Card>
          
          {/* Revenue Impact Alert - Always visible */}
          <Card className="p-6 md:p-8 mb-8 border-2 border-orange/30">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 bg-orange/20 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="heading-sm mb-2">Bottom Line: You're Losing Revenue</h3>
                <p className="paragraph mb-2">
                  Based on our analysis, your business is losing approximately:
                </p>
                <div className="text-xl font-bold text-orange">
                  ${results.revenueLoss.monthly.average.toLocaleString()} to ${results.revenueLoss.monthly.high.toLocaleString()} per month
                </div>
                <p className="text-sm text-neutral-600 mt-1">
                  That's ${results.revenueLoss.annual.average.toLocaleString()} to ${results.revenueLoss.annual.high.toLocaleString()} annually in missed revenue opportunities.
                </p>
              </div>
            </div>
          </Card>
          
          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto custom-scrollbar mb-6 border-b border-neutral-300/50">
            <TabButton 
              label="Overview" 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')} 
            />
            <TabButton 
              label="Search Rankings" 
              active={activeTab === 'search'} 
              onClick={() => setActiveTab('search')} 
            />
            <TabButton 
              label="Review Analysis" 
              active={activeTab === 'reviews'} 
              onClick={() => setActiveTab('reviews')} 
            />
            <TabButton 
              label="Competitor Analysis" 
              active={activeTab === 'competitors'} 
              onClick={() => setActiveTab('competitors')} 
            />
            <TabButton 
              label="Revenue Impact" 
              active={activeTab === 'revenue'} 
              onClick={() => setActiveTab('revenue')} 
            />
          </div>
          
          {/* Content based on active tab */}
          <div className="mb-8">
            {activeTab === 'overview' && (
              <>
                {/* Detailed Platform Analysis */}
                <Card className="p-6 md:p-8 mb-8">
                  <h3 className="heading-sm mb-6">Platform-by-Platform Analysis</h3>
                  
                  <div className="space-y-4">
                    <PlatformAnalysis 
                      name="Google Business Profile" 
                      platform={results.platforms.google}
                      importance="Very High"
                    />
                    <PlatformAnalysis 
                      name="Yelp" 
                      platform={results.platforms.yelp}
                      importance="High"
                    />
                    <PlatformAnalysis 
                      name="Facebook" 
                      platform={results.platforms.facebook}
                      importance="Medium"
                    />
                    <PlatformAnalysis 
                      name="Bing Places" 
                      platform={results.platforms.bingPlaces}
                      importance="Medium"
                    />
                    <PlatformAnalysis 
                      name="Apple Maps" 
                      platform={results.platforms.appleMaps}
                      importance="Medium"
                    />
                  </div>
                </Card>
                
                {/* Priority Fixes */}
                <Card className="p-6 md:p-8 mb-8">
                  <h3 className="heading-sm mb-4">Priority Fixes</h3>
                  <p className="paragraph mb-4">
                    Based on our analysis, here are the most important actions you should take to improve your local visibility:
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {results.priorityFixes.map((fix, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-neutral-300/30 rounded-md">
                        <div className="w-6 h-6 rounded-full bg-primary text-background flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <div>{fix}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-neutral-300/50 pt-6 mt-6">
                    <p className="paragraph text-neutral-800 font-medium">
                      Fixing these issues could help you recover up to {results.estimatedCustomerLoss}% of lost customers.
                    </p>
                  </div>
                </Card>
              </>
            )}
            
            {/* We'll add other tab content later */}
            {activeTab === 'search' && (
              <Card className="p-6 md:p-8 mb-8">
                <div className="mb-6">
                  <h3 className="heading-sm mb-4">Search Rankings Analysis</h3>
                  <p className="paragraph mb-6">
                    Here's where your business ranks when local customers search for these terms. Lower numbers are better - it means you appear higher in search results.
                  </p>
                  
                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full min-w-[600px] text-left">
                      <thead>
                        <tr className="border-b border-neutral-300/50">
                          <th className="py-3 px-4 font-medium text-sm text-neutral-600">Keyword</th>
                          <th className="py-3 px-4 font-medium text-sm text-neutral-600">Monthly Searches</th>
                          <th className="py-3 px-4 font-medium text-sm text-neutral-600">Google Search Rank</th>
                          <th className="py-3 px-4 font-medium text-sm text-neutral-600">Google Maps Rank</th>
                          <th className="py-3 px-4 font-medium text-sm text-neutral-600">Bing Rank</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.searchRankings.map((ranking, index) => (
                          <tr key={index} className="border-b border-neutral-300/30">
                            <td className="py-3 px-4 font-medium">{ranking.keyword}</td>
                            <td className="py-3 px-4">{ranking.estimatedMonthlySearches.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <RankingBadge rank={ranking.googleSearch} />
                            </td>
                            <td className="py-3 px-4">
                              <RankingBadge rank={ranking.googleMaps} />
                            </td>
                            <td className="py-3 px-4">
                              <RankingBadge rank={ranking.bing} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-neutral-300/50">
                  <h4 className="heading-sm mb-3">What This Means For Your Business</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-neutral-300/20 rounded-lg">
                      <div className="flex-shrink-0 bg-neutral-300/50 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Search Volume Insight</h5>
                        <p className="text-sm">
                          There are approximately {results.searchRankings.reduce((sum, r) => sum + r.estimatedMonthlySearches, 0).toLocaleString()} monthly searches for your business's services. Your current rankings mean you're missing out on a significant portion of this traffic.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-neutral-300/20 rounded-lg">
                      <div className="flex-shrink-0 bg-neutral-300/50 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l1 1a1 1 0 010 1.414l-1 1a1 1 0 11-1.414-1.414L10.586 4 9.293 2.707a1 1 0 011.414 0zM14 4a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V8h-1a1 1 0 110-2h1V5a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Click-Through Rates by Position</h5>
                        <p className="text-sm">
                          The first position in Google gets 31.7% of clicks, second gets 24.7%, and third gets 18.7%. Positions 4-10 get less than 10% each. Your current rankings are significantly limiting your visibility.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-orange/10 rounded-lg border border-orange/30">
                      <div className="flex-shrink-0 bg-orange/20 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Major Revenue Opportunity</h5>
                        <p className="text-sm">
                          Moving up just 3 positions in search rankings could increase your traffic by up to 200%. For your business, that could mean ${Math.round(results.revenueLoss.monthly.average * 1.5).toLocaleString()} to ${Math.round(results.revenueLoss.monthly.high * 2).toLocaleString()} in additional monthly revenue.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === 'reviews' && (
              <Card className="p-6 md:p-8 mb-8">
                <div className="mb-8">
                  <h3 className="heading-sm mb-4">Review Analysis</h3>
                  <p className="paragraph mb-6">
                    Reviews are critical for local business success. Here's how your business performs across review platforms.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <ReviewCard 
                      platform="Google" 
                      rating={results.reviews.google.rating} 
                      count={results.reviews.google.count} 
                      lastDate={results.reviews.google.lastReviewDate}
                      icon={
                        <svg className="h-5 w-5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                      }
                    />
                    
                    <ReviewCard 
                      platform="Yelp" 
                      rating={results.reviews.yelp.rating} 
                      count={results.reviews.yelp.count} 
                      lastDate={results.reviews.yelp.lastReviewDate}
                      icon={
                        <svg className="h-5 w-5 text-[#FF1A1A]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.16 12.73c-.11-.58-.7-.94-1.3-.82l-2.78.58a.68.68 0 0 1-.67-.27c-.15-.22-.15-.52-.04-.78l1.5-3.44c.28-.65-.2-1.38-.9-1.38-.37 0-.7.21-.85.54l-2.1 4.49a.68.68 0 0 1-.74.38c-.28-.06-.48-.3-.48-.58V4.52c0-.69-.64-1.24-1.34-1.08a1 1 0 0 0-.78 1.08v6.18a.71.71 0 0 1-.52.67c-.27.08-.57 0-.74-.25L5.58 7.76a1 1 0 0 0-.81-.4c-.7 0-1.18.73-.9 1.38l1.61 3.53c.1.23.1.5-.04.72a.67.67 0 0 1-.67.26l-2.78-.58c-.6-.11-1.16.25-1.28.82a1 1 0 0 0 .82 1.17l3.7.77c.27.06.48.28.52.56.04.28-.1.55-.35.68L3.77 17.4c-.57.31-.74 1.03-.37 1.55.26.38.71.54 1.14.43l3.44-1c.28-.08.57.02.74.25.16.22.18.52.04.77l-1.1 2.16c-.29.57.04 1.25.68 1.41a1 1 0 0 0 1.17-.57l1.24-2.87a.7.7 0 0 1 .67-.38c.27.04.5.24.56.52l.72 3.46c.11.58.73.96 1.31.8a1 1 0 0 0 .8-1.16l-.72-3.46a.73.73 0 0 1 .25-.73c.23-.16.52-.18.77-.07l1.92.85c.58.24 1.24-.08 1.35-.7a1 1 0 0 0-.56-1.12l-2.4-1.08c-.26-.11-.44-.37-.44-.44-.65 0-.29.15-.55.4-.69l3.12-1.65c.56-.3.75-1 .41-1.53-.24-.36-.67-.52-1.08-.42l-3.21.66a.68.68 0 0 1-.74-.32.69.69 0 0 1 0-.79l2.08-3.2c.34-.53.13-1.23-.45-1.44-.36-.14-.77-.05-1.05.22l-2.77 2.66c-.2.2-.5.25-.76.14a.68.68 0 0 1-.41-.65V6.7c0-.61-.56-1.08-1.17-.97-.52.09-.87.56-.87 1.08v3.84c0 .28-.18.52-.44.62-.27.1-.56.04-.77-.15l-2.37-2.25c-.44-.42-1.15-.33-1.48.18a.99.99 0 0 0 .2 1.25l2.97 2.82c.2.2.26.5.15.77-.12.27-.38.43-.67.43H4.23c-.6 0-1.08.53-1 1.12.07.5.5.88 1 .88h3.86c.27 0 .53.16.63.42.1.26.04.56-.15.76l-2.8 2.96c-.4.44-.3 1.13.23 1.44.38.23.86.18 1.18-.13l2.15-2.07c.22-.2.54-.24.8-.1.25.14.4.41.4.7v2.62c0 .61.56 1.08 1.17.97.52-.09.87-.56.87-1.08v-2.62c0-.29.15-.56.4-.7a.7.7 0 0 1 .78.08l2.17 2.09c.44.42 1.15.32 1.48-.2a.99.99 0 0 0-.2-1.23l-2.8-2.96a.68.68 0 0 1-.15-.76c.1-.26.35-.42.63-.42h4.44c.6 0 1.08-.53 1-1.12a.97.97 0 0 0-1-.88h-4.44a.68.68 0 0 1-.67-.43.67.67 0 0 1 .15-.77l2.97-2.82a.98.98 0 0 0 .15-1.32c-.36-.46-1.07-.52-1.49-.09l-2.37 2.25c-.2.2-.5.25-.77.15a.68.68 0 0 1-.44-.62V6.8c0-.52-.36-.99-.87-1.08a1.02 1.02 0 0 0-1.17.97v3.84c0 .28-.18.52-.44.62a.69.69 0 0 1-.77-.14L7.64 8.35c-.28-.27-.7-.36-1.05-.22a.97.97 0 0 0-.45 1.44l2.08 3.2a.69.69 0 0 1 0 .79.68.68 0 0 1-.74.32l-3.21-.66c-.41-.09-.84.06-1.08.42-.34.52-.15 1.22.41 1.53l3.12 1.65c.26.14.4.4.4.7 0 .28-.18.54-.44.65l-2.4 1.08c-.48.2-.7.73-.56 1.12.12.61.77.93 1.35.7l1.92-.86c.25-.1.54-.09.77.07.23.18.34.45.25.73l-.72 3.46a1 1 0 0 0 .8 1.16c.57.16 1.2-.22 1.31-.8l.72-3.46a.7.7 0 0 1 .56-.52c.28-.04.54.1.67.38l1.24 2.87c.24.52.77.75 1.3.6.54-.16.87-.84.58-1.41l-1.1-2.16a.7.7 0 0 1 .04-.77.7.7 0 0 1 .74-.25l3.44 1c.42.11.88-.05 1.13-.43.38-.52.2-1.24-.36-1.55l-1.92-.74a.7.7 0 0 1-.35-.68.7.7 0 0 1 .52-.56l3.7-.77a1 1 0 0 0 .82-1.17z"/>
                        </svg>
                      }
                    />
                    
                    <ReviewCard 
                      platform="Facebook" 
                      rating={results.reviews.facebook.rating} 
                      count={results.reviews.facebook.count} 
                      lastDate={results.reviews.facebook.lastReviewDate}
                      icon={
                        <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      }
                    />
                  </div>
                  
                  <div className="bg-neutral-300/20 rounded-lg p-4 mb-8">
                    <h4 className="heading-sm mb-3">Total Review Presence</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">
                          {(results.reviews.google.count + results.reviews.yelp.count + results.reviews.facebook.count + results.reviews.other.count).toLocaleString()}
                        </div>
                        <div className="text-sm text-neutral-600">Total Reviews</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">
                          {((parseFloat(results.reviews.google.rating) * results.reviews.google.count + 
                             parseFloat(results.reviews.yelp.rating) * results.reviews.yelp.count + 
                             parseFloat(results.reviews.facebook.rating) * results.reviews.facebook.count) / 
                            (results.reviews.google.count + results.reviews.yelp.count + results.reviews.facebook.count || 1)).toFixed(1)}
                        </div>
                        <div className="text-sm text-neutral-600">Average Rating</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">
                          {results.reviews.other.platforms.length}
                        </div>
                        <div className="text-sm text-neutral-600">Other Platforms</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">
                          {new Date(Math.max(
                            new Date(results.reviews.google.lastReviewDate).getTime(),
                            new Date(results.reviews.yelp.lastReviewDate).getTime(),
                            new Date(results.reviews.facebook.lastReviewDate).getTime()
                          )).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-neutral-600">Last Review</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-neutral-300/50">
                  <h4 className="heading-sm mb-3">Why Reviews Matter For Your Business</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-neutral-300/20 rounded-lg">
                      <div className="flex-shrink-0 bg-neutral-300/50 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Consumer Trust</h5>
                        <p className="text-sm">
                          93% of consumers say online reviews impact their purchasing decisions. Each additional star in your rating can increase your business by 5-9%.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-neutral-300/20 rounded-lg">
                      <div className="flex-shrink-0 bg-neutral-300/50 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Local Search Rankings</h5>
                        <p className="text-sm">
                          Review signals (quantity, velocity, diversity) make up 17% of how Google ranks your local business. More positive reviews = higher visibility.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-orange/10 rounded-lg border border-orange/30">
                      <div className="flex-shrink-0 bg-orange/20 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Your Review Opportunity</h5>
                        <p className="text-sm">
                          With your current review profile, developing a consistent review generation system could add ${Math.round(results.revenueLoss.monthly.average * 0.3).toLocaleString()} in monthly revenue within 90 days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === 'competitors' && (
              <Card className="p-6 md:p-8 mb-8">
                <div className="mb-8">
                  <h3 className="heading-sm mb-4">Competitor Analysis</h3>
                  <p className="paragraph mb-6">
                    Here's how your business compares to your top local competitors in terms of visibility and reviews.
                  </p>
                  
                  <div className="space-y-6">
                    {results.competitors.map((competitor, index) => (
                      <div key={index} className="border border-neutral-300/50 rounded-lg overflow-hidden">
                        <div className="bg-neutral-300/20 px-4 py-3 border-b border-neutral-300/50">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{competitor.name}</div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-neutral-700">Ranking vs You:</div>
                              <div className={`text-sm font-medium ${
                                competitor.rankDifference < 0 
                                  ? 'text-red-600' 
                                  : competitor.rankDifference > 0 
                                    ? 'text-green-600' 
                                    : 'text-neutral-600'
                              }`}>
                                {competitor.rankDifference < 0 
                                  ? `${Math.abs(competitor.rankDifference)} positions higher` 
                                  : competitor.rankDifference > 0 
                                    ? `${competitor.rankDifference} positions lower` 
                                    : 'Same position'}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col">
                              <span className="text-sm text-neutral-600 mb-1">Overall Rating</span>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-medium">{competitor.rating}</span>
                                <div className="flex text-yellow-400">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={i < Math.floor(parseFloat(competitor.rating)) ? 'currentColor' : 'none'} stroke="currentColor">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <ComparisonBar 
                                yourValue={parseFloat(results.reviews.google.rating)}
                                theirValue={parseFloat(competitor.rating)}
                                maxValue={5}
                                label="Rating"
                                higherIsBetter={true}
                                narrow={true}
                              />
                            </div>
                            
                            <div className="flex flex-col">
                              <span className="text-sm text-neutral-600 mb-1">Review Count</span>
                              <div className="text-lg font-medium">{competitor.reviewCount.toLocaleString()}</div>
                              <ComparisonBar 
                                yourValue={results.reviews.google.count}
                                theirValue={competitor.reviewCount}
                                maxValue={Math.max(results.reviews.google.count, competitor.reviewCount) * 1.2}
                                label="Reviews"
                                higherIsBetter={true}
                                narrow={true}
                              />
                            </div>
                            
                            <div className="flex flex-col">
                              <span className="text-sm text-neutral-600 mb-1">Search Position</span>
                              <div className="text-lg font-medium">
                                {results.platforms.google.searchRank + competitor.rankDifference}
                              </div>
                              <ComparisonBar 
                                yourValue={results.platforms.google.searchRank}
                                theirValue={results.platforms.google.searchRank + competitor.rankDifference}
                                maxValue={20}
                                label="Position"
                                higherIsBetter={false}
                                narrow={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-neutral-300/50">
                  <h4 className="heading-sm mb-3">Key Competitive Insights</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-neutral-300/20 rounded-lg">
                      <div className="flex-shrink-0 bg-neutral-300/50 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Competitive Position</h5>
                        <p className="text-sm">
                          {results.competitors.filter(c => c.rankDifference < 0).length > 
                           results.competitors.filter(c => c.rankDifference > 0).length
                            ? `${results.competitors.filter(c => c.rankDifference < 0).length} of your competitors are ranking higher than you in local searches.`
                            : `You're outranking ${results.competitors.filter(c => c.rankDifference > 0).length} of your main competitors in local searches.`
                          } This directly impacts your visibility to potential customers.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-neutral-300/20 rounded-lg">
                      <div className="flex-shrink-0 bg-neutral-300/50 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Review Benchmark</h5>
                        <p className="text-sm">
                          {results.competitors.every(c => parseFloat(c.rating) < parseFloat(results.reviews.google.rating))
                            ? "Your rating is higher than all analyzed competitors, which is excellent for attracting customers."
                            : `Your overall rating is ${parseFloat(results.reviews.google.rating) > results.competitors.reduce((sum, c) => sum + parseFloat(c.rating), 0) / results.competitors.length
                                ? "above"
                                : "below"} the competitor average of ${(results.competitors.reduce((sum, c) => sum + parseFloat(c.rating), 0) / results.competitors.length).toFixed(1)}.`
                          } 
                          {results.reviews.google.count < results.competitors.reduce((sum, c) => sum + c.reviewCount, 0) / results.competitors.length
                            ? ` However, you have fewer reviews than the competitor average of ${Math.round(results.competitors.reduce((sum, c) => sum + c.reviewCount, 0) / results.competitors.length)}.`
                            : ` You also have more reviews than the competitor average of ${Math.round(results.competitors.reduce((sum, c) => sum + c.reviewCount, 0) / results.competitors.length)}.`
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-orange/10 rounded-lg border border-orange/30">
                      <div className="flex-shrink-0 bg-orange/20 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Competitive Advantage Opportunity</h5>
                        <p className="text-sm">
                          {results.competitors.some(c => c.rankDifference < 0)
                            ? `By improving your online presence, you could overtake ${results.competitors.filter(c => c.rankDifference < -1 && c.rankDifference > -4).length} competitors in just 60-90 days with the right strategy.`
                            : "You're already ahead of your analyzed competitors, but maintaining this lead requires ongoing attention to your online presence."
                          } A premium website solution with proper local SEO integration could be your most strategic investment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === 'revenue' && (
              <Card className="p-6 md:p-8 mb-8">
                <div className="mb-8">
                  <h3 className="heading-sm mb-4">Revenue Impact Analysis</h3>
                  <p className="paragraph mb-6">
                    Your current online visibility issues are directly impacting your business revenue. Here's a detailed breakdown of your potential losses and opportunities.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-neutral-300/20 rounded-lg p-5">
                      <h4 className="heading-sm mb-4">Monthly Revenue Loss</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Conservative Estimate:</span>
                          <span className="font-medium">${results.revenueLoss.monthly.low.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center font-medium text-lg">
                          <span>Average Estimate:</span>
                          <span className="text-orange">${results.revenueLoss.monthly.average.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Aggressive Estimate:</span>
                          <span className="font-medium">${results.revenueLoss.monthly.high.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-300/20 rounded-lg p-5">
                      <h4 className="heading-sm mb-4">Annual Revenue Loss</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Conservative Estimate:</span>
                          <span className="font-medium">${results.revenueLoss.annual.low.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center font-medium text-lg">
                          <span>Average Estimate:</span>
                          <span className="text-orange">${results.revenueLoss.annual.average.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Aggressive Estimate:</span>
                          <span className="font-medium">${results.revenueLoss.annual.high.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-orange/10 rounded-lg p-5 border border-orange/30 mb-8">
                    <h4 className="font-medium text-orange text-lg mb-2">Revenue Loss Calculation Method</h4>
                    <p className="text-sm mb-4">
                      Our calculation considers your local visibility score, search rankings, platform presence, and industry benchmarks to estimate your potential monthly and annual revenue loss due to visibility issues.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="bg-background rounded p-3">
                        <div className="font-medium mb-1">Visibility Score Impact</div>
                        <p>Your score of {results.visibilityScore}/100 means you're missing approximately {100 - results.visibilityScore}% of potential online visibility.</p>
                      </div>
                      <div className="bg-background rounded p-3">
                        <div className="font-medium mb-1">Search Ranking Factor</div>
                        <p>On average, you're ranking at position #{Math.round(results.searchRankings.reduce((sum, r) => sum + r.googleSearch, 0) / results.searchRankings.length)} for key terms, resulting in an estimated {Math.round(((results.searchRankings.reduce((sum, r) => sum + r.googleSearch, 0) / results.searchRankings.length) * 5))}% customer loss.</p>
                      </div>
                      <div className="bg-background rounded p-3">
                        <div className="font-medium mb-1">Platform Consistency</div>
                        <p>With a consistency rating of {getTotalConsistency()}%, you're losing an additional {Math.round((100 - getTotalConsistency()) / 4)}% of potential customers due to confusion.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-300/20 rounded-lg p-5 mb-6">
                    <h4 className="heading-sm mb-4">5-Year Revenue Impact Projection</h4>
                    <div className="space-y-1 mb-4">
                      <div className="text-sm text-neutral-600">If these issues remain unaddressed:</div>
                      <div className="text-2xl font-bold text-red-600">
                        -${(results.revenueLoss.annual.average * 5).toLocaleString()}
                      </div>
                      <div className="text-sm text-neutral-500">
                        Projected 5-year cumulative loss
                      </div>
                    </div>
                    <div className="h-8 bg-neutral-300/40 rounded-full overflow-hidden relative mt-6">
                      <div className="absolute top-0 bottom-0 left-0 bg-accent/70 rounded-l-full" 
                           style={{ width: '24%' }}>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">Year 1</span>
                      </div>
                      <div className="absolute top-0 bottom-0 left-[24%] bg-accent/80 rounded-l-full" 
                           style={{ width: '24%' }}>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">Year 2</span>
                      </div>
                      <div className="absolute top-0 bottom-0 left-[48%] bg-orange/80" 
                           style={{ width: '24%' }}>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">Year 3</span>
                      </div>
                      <div className="absolute top-0 bottom-0 left-[72%] bg-red-500/80 rounded-r-full" 
                           style={{ width: '28%' }}>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">Years 4-5</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-neutral-300/50">
                  <h4 className="heading-sm mb-3">The Solution: Revenue Recovery Plan</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-neutral-300/20 rounded-lg">
                      <div className="flex-shrink-0 bg-neutral-300/50 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">30-Day Quick Wins</h5>
                        <p className="text-sm">
                          Immediate fixes to claim and optimize Google Business Profile, correct inconsistencies, and implement basic local SEO. Potential recovery: ${Math.round(results.revenueLoss.monthly.low).toLocaleString()}/month.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-neutral-300/20 rounded-lg">
                      <div className="flex-shrink-0 bg-neutral-300/50 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">90-Day Growth Plan</h5>
                        <p className="text-sm">
                          Premium website redesign with local SEO foundation, review generation system, and content strategy aligned with your keywords. Potential recovery: ${Math.round(results.revenueLoss.monthly.average).toLocaleString()}/month.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-green-100 rounded-lg border border-green-300">
                      <div className="flex-shrink-0 bg-green-200 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Premium ROI Guarantee</h5>
                        <p className="text-sm">
                          Our premium website service includes a revenue recovery guarantee. If we don't deliver measurable improvements within 90 days, we'll continue working until we do—at no additional cost. 
                          <span className="block mt-2 font-medium">Potential 12-month ROI: {Math.round((results.revenueLoss.annual.average / (11500 + 3000)) * 100)}x your investment</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
          
          {/* CTA Section - Always visible */}
          <Card className="p-6 md:p-8 bg-gradient-to-br from-background to-neutral-300/50">
            <div className="text-center mb-6">
              <h3 className="heading-md mb-3">Need Help Implementing These Fixes?</h3>
              <p className="paragraph mb-6">
                Our team specializes in building websites for local businesses that are properly integrated with all major platforms. 
                We can implement all these fixes and more as part of our premium website service.
              </p>
              
              {!showContactForm ? (
                <button 
                  className="btn-primary mx-auto"
                  onClick={() => setShowContactForm(true)}
                >
                  Book a Free Strategy Session
                </button>
              ) : (
                <div className="max-w-md mx-auto text-left p-6 bg-background rounded-lg shadow-md">
                  <h4 className="heading-sm mb-4">Book Your Free Strategy Session</h4>
                  <p className="text-sm text-neutral-700 mb-4">
                    We'll review your visibility analysis in detail and provide custom recommendations for your business.
                  </p>
                  {/* Simple booking form - in reality, you'd integrate with your booking system */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-light text-neutral-600 mb-1">Your Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-background border border-neutral-300 rounded-md px-4 py-3"
                        value={businessInfo.name}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-neutral-600 mb-1">Your Email</label>
                      <input 
                        type="email" 
                        className="w-full bg-background border border-neutral-300 rounded-md px-4 py-3"
                        value={businessInfo.email}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-neutral-600 mb-1">Preferred Date</label>
                      <input 
                        type="date" 
                        className="w-full bg-background border border-neutral-300 rounded-md px-4 py-3"
                      />
                    </div>
                    <button 
                      className="btn-primary w-full"
                      onClick={() => {
                        // In a real implementation, this would submit the booking
                        alert("Thank you! We'll reach out to confirm your strategy session soon.");
                      }}
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center justify-center mt-8 pt-6 border-t border-neutral-300/30">
              <p className="text-sm text-neutral-700 mb-3">
                Learn more about our web development services for local businesses
              </p>
              <Link href="/services" className="text-accent hover:underline">
                View Premium Website Services →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Score Card Component
const ScoreCard = ({ 
  title, 
  value, 
  suffix = '', 
  description, 
  color 
}: { 
  title: string; 
  value: string; 
  suffix?: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="text-center p-4">
      <h4 className="text-sm font-medium text-neutral-500 mb-2">{title}</h4>
      <div className={`text-4xl font-bold mb-2 ${color}`}>
        {value}<span className="text-lg font-normal">{suffix}</span>
      </div>
      <p className="text-xs text-neutral-600">{description}</p>
    </div>
  );
};

// Platform Analysis Component
const PlatformAnalysis = ({ 
  name, 
  platform, 
  importance 
}: { 
  name: string; 
  platform: Platform;
  importance: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="border border-neutral-300/50 rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-300/20"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            !platform.found 
              ? 'bg-red-500' 
              : !platform.consistent 
                ? 'bg-orange-500' 
                : 'bg-green-600'
          }`}></div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-neutral-500">Importance: {importance}</div>
        </div>
        <div className="flex items-center">
          <div className="text-sm mr-3">
            {!platform.found 
              ? 'Missing' 
              : !platform.consistent 
                ? 'Inconsistent' 
                : 'Good'}
          </div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-neutral-300/10 border-t border-neutral-300/50">
          {!platform.found ? (
            <div>
              <p className="text-sm mb-2">Your business was not found on this platform.</p>
              <div className="mt-3">
                <h5 className="text-sm font-medium mb-1">Recommended Action:</h5>
                <p className="text-sm">Create and claim your business listing on {name}.</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-3">
                <h5 className="text-sm font-medium mb-1">Status:</h5>
                <p className="text-sm">
                  {platform.consistent 
                    ? 'Your information is consistent with your submitted details.' 
                    : 'There are inconsistencies between your listing and your actual business information.'}
                </p>
              </div>
              
              {platform.issues.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium mb-1">Issues Found:</h5>
                  <ul className="text-sm list-disc list-inside">
                    {platform.issues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// TabButton Component
const TabButton = ({ 
  label, 
  active, 
  onClick 
}: { 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      className={`px-4 py-3 whitespace-nowrap font-medium text-sm transition-colors ${
        active 
          ? 'text-accent border-b-2 border-accent' 
          : 'text-neutral-600 hover:text-primary'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

// RankingBadge Component
const RankingBadge = ({ rank }: { rank: number }) => {
  let bgColor = 'bg-green-100 text-green-800';
  let label = 'Excellent';
  
  if (rank > 10) {
    bgColor = 'bg-red-100 text-red-800';
    label = 'Poor';
  } else if (rank > 5) {
    bgColor = 'bg-orange-100 text-orange-800';
    label = 'Fair';
  } else if (rank > 3) {
    bgColor = 'bg-yellow-100 text-yellow-800';
    label = 'Good';
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">{rank}</span>
      <span className={`text-xs px-2 py-1 rounded-full ${bgColor}`}>
        {label}
      </span>
    </div>
  );
};

// ReviewCard Component
const ReviewCard = ({ 
  platform, 
  rating, 
  count, 
  lastDate, 
  icon 
}: { 
  platform: string; 
  rating: string; 
  count: number; 
  lastDate: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="text-center p-4">
      <h4 className="text-sm font-medium text-neutral-500 mb-2">{platform}</h4>
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <div className="text-4xl font-bold mb-2">
        {rating}
      </div>
      <p className="text-xs text-neutral-600">
        {count} reviews
      </p>
      <p className="text-xs text-neutral-500">
        Last review: {new Date(lastDate).toLocaleDateString()}
      </p>
    </div>
  );
};

// ComparisonBar Component
const ComparisonBar = ({ 
  yourValue, 
  theirValue, 
  maxValue, 
  label, 
  higherIsBetter = true,
  narrow = false
}: { 
  yourValue: number; 
  theirValue: number; 
  maxValue: number;
  label: string;
  higherIsBetter?: boolean;
  narrow?: boolean;
}) => {
  const yourPercent = (yourValue / maxValue) * 100;
  const theirPercent = (theirValue / maxValue) * 100;
  
  const getComparisonText = () => {
    if (higherIsBetter) {
      if (yourValue > theirValue) {
        return {
          text: `Your ${label.toLowerCase()} is higher`,
          color: 'text-green-600'
        };
      } else if (yourValue < theirValue) {
        return {
          text: `Your ${label.toLowerCase()} is lower`,
          color: 'text-red-600'
        };
      } else {
        return {
          text: `Equal ${label.toLowerCase()}`,
          color: 'text-neutral-600'
        };
      }
    } else {
      // For metrics where lower is better (like position rank)
      if (yourValue < theirValue) {
        return {
          text: `Your ${label.toLowerCase()} is better`,
          color: 'text-green-600'
        };
      } else if (yourValue > theirValue) {
        return {
          text: `Your ${label.toLowerCase()} is worse`,
          color: 'text-red-600'
        };
      } else {
        return {
          text: `Equal ${label.toLowerCase()}`,
          color: 'text-neutral-600'
        };
      }
    }
  };
  
  const comparison = getComparisonText();
  
  return (
    <div className={`mt-2 ${narrow ? 'mt-1' : 'mt-3'}`}>
      <div className="flex justify-between items-center text-xs mb-1">
        <span>You</span>
        <span className={comparison.color}>{comparison.text}</span>
        <span>Them</span>
      </div>
      <div className="relative h-4 bg-neutral-300/40 rounded-full overflow-hidden">
        {/* Your bar */}
        <div 
          className="absolute top-0 bottom-0 left-0 bg-accent/70 rounded-l-full"
          style={{ width: `${yourPercent}%` }}
        ></div>
        
        {/* Divider */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-neutral-500/50 transform -translate-x-1/2 z-10"></div>
        
        {/* Their bar (reversed from right side) */}
        <div 
          className="absolute top-0 bottom-0 right-0 bg-primary/50 rounded-r-full"
          style={{ width: `${theirPercent}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center text-xs mt-1">
        <span>{yourValue}</span>
        <span>{theirValue}</span>
      </div>
    </div>
  );
};

export default AnalysisResults; 