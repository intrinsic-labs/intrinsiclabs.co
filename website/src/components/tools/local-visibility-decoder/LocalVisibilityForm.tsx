"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import AnalysisResults from './AnalysisResults';

const LocalVisibilityForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    website: '',
    category: '',
    email: '', // For lead generation
    competitors: '',
    annualRevenue: '',
    primaryKeywords: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.primaryKeywords.trim()) newErrors.primaryKeywords = 'At least one keyword is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsAnalyzing(true);
    
    try {
      // For MVP, we'll simulate API calls with timeouts
      await simulateAnalysis();
      
      // Generate mock analysis results
      const results = generateMockResults();
      setAnalysisResults(results);
      setAnalysisComplete(true);
    } catch (error) {
      console.error('Error during analysis:', error);
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Function to simulate API calls with timeouts
  const simulateAnalysis = async () => {
    // Simulate checking different platforms
    await new Promise(resolve => setTimeout(resolve, 1000)); // Google
    await new Promise(resolve => setTimeout(resolve, 800));  // Yelp
    await new Promise(resolve => setTimeout(resolve, 600));  // Facebook
    await new Promise(resolve => setTimeout(resolve, 700));  // Bing
    await new Promise(resolve => setTimeout(resolve, 500));  // Apple Maps
    await new Promise(resolve => setTimeout(resolve, 900));  // Competitor Analysis
    await new Promise(resolve => setTimeout(resolve, 1100)); // Search Rankings
    await new Promise(resolve => setTimeout(resolve, 800));  // Review Analysis
  };
  
  // Function to generate mock analysis results for MVP
  const generateMockResults = () => {
    // Helper function to generate random ratings
    const generateRandomRating = () => {
      return (Math.random() * 2.5 + 2.5).toFixed(1); // Random rating between 2.5-5.0
    };
    
    // Helper function to generate random review counts
    const generateRandomReviewCount = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    // Extract primary keywords from input
    const keywords = formData.primaryKeywords.split(',').map(k => k.trim());
    const mainKeyword = keywords[0] || formData.category;
    
    // Generate search ranking positions
    const generateSearchRankings = () => {
      return keywords.map(keyword => {
        const trimmedKeyword = keyword.trim();
        return {
          keyword: trimmedKeyword || mainKeyword,
          googleSearch: Math.floor(Math.random() * 30) + 1,
          googleMaps: Math.floor(Math.random() * 20) + 1,
          bing: Math.floor(Math.random() * 40) + 1,
          estimatedMonthlySearches: Math.floor(Math.random() * 1500) + 100
        };
      });
    };
    
    // Generate mock competitors
    const generateCompetitors = () => {
      const competitors = formData.competitors.split(',').map(c => c.trim()).filter(c => c);
      
      // If no competitors provided, generate some random ones
      if (competitors.length === 0) {
        return [
          {
            name: `Top ${mainKeyword} Provider`,
            rankDifference: -(Math.floor(Math.random() * 5) + 1),
            reviewCount: generateRandomReviewCount(50, 200),
            rating: (Math.random() * 1 + 4).toFixed(1)
          },
          {
            name: `${mainKeyword} Experts`,
            rankDifference: -(Math.floor(Math.random() * 3) + 1),
            reviewCount: generateRandomReviewCount(30, 150),
            rating: (Math.random() * 1 + 3.8).toFixed(1)
          },
          {
            name: `${formData.city} ${mainKeyword}`,
            rankDifference: Math.floor(Math.random() * 3) + 1,
            reviewCount: generateRandomReviewCount(10, 80),
            rating: (Math.random() * 1 + 3.5).toFixed(1)
          }
        ];
      }
      
      // Use provided competitors with random data
      return competitors.map(name => {
        return {
          name,
          rankDifference: Math.floor(Math.random() * 10) - 5, // -5 to +5
          reviewCount: generateRandomReviewCount(10, 200),
          rating: (Math.random() * 1.5 + 3.5).toFixed(1) // 3.5-5.0
        };
      });
    };
    
    // Calculate estimated revenue loss
    const calculateRevenueLoss = () => {
      if (!formData.annualRevenue) {
        return {
          monthly: {
            low: 1200,
            average: 2500,
            high: 4000
          },
          annual: {
            low: 14400,
            average: 30000,
            high: 48000
          }
        };
      }
      
      // Parse annual revenue
      let annualRevenue = 0;
      try {
        annualRevenue = parseInt(formData.annualRevenue.replace(/[^0-9]/g, ''));
      } catch (e) {
        annualRevenue = 250000; // Default if parsing fails
      }
      
      // Calculate potential monthly loss based on visibility score (15-35% of monthly revenue)
      const lossRate = {
        low: 0.15,
        average: 0.25,
        high: 0.35
      };
      
      // Factor in visibility score 
      const visibilityScore = Math.floor(Math.random() * 61) + 20; // 20-80
      const scoreFactor = (100 - visibilityScore) / 100; // Lower score = higher loss
      
      return {
        monthly: {
          low: Math.round((annualRevenue / 12) * lossRate.low * scoreFactor),
          average: Math.round((annualRevenue / 12) * lossRate.average * scoreFactor),
          high: Math.round((annualRevenue / 12) * lossRate.high * scoreFactor)
        },
        annual: {
          low: Math.round(annualRevenue * lossRate.low * scoreFactor),
          average: Math.round(annualRevenue * lossRate.average * scoreFactor),
          high: Math.round(annualRevenue * lossRate.high * scoreFactor)
        }
      };
    };
    
    // Generate platform review data
    const reviews = {
      google: {
        count: generateRandomReviewCount(5, 50),
        rating: generateRandomRating(),
        lastReviewDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Random date within last 30 days
      },
      yelp: {
        count: generateRandomReviewCount(3, 30),
        rating: generateRandomRating(),
        lastReviewDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Random date within last 60 days
      },
      facebook: {
        count: generateRandomReviewCount(0, 20),
        rating: generateRandomRating(),
        lastReviewDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Random date within last 90 days
      },
      other: {
        count: generateRandomReviewCount(0, 15),
        platforms: ['TripAdvisor', 'BBB', 'Yellow Pages']
      }
    };
    
    // Generate revenue loss projections
    const revenueLoss = calculateRevenueLoss();
    const visibilityScore = Math.floor(Math.random() * 61) + 20; // Score between 20-80
    
    // This is a simplified version for the MVP with enhanced data
    return {
      visibilityScore,
      platforms: {
        google: {
          found: Math.random() > 0.2,
          consistent: Math.random() > 0.4,
          issues: Math.random() > 0.5 ? ['Incorrect phone number', 'Missing category', 'Outdated business hours'] : [],
          searchRank: Math.floor(Math.random() * 20) + 1,
          mapsRank: Math.floor(Math.random() * 15) + 1
        },
        yelp: {
          found: Math.random() > 0.3,
          consistent: Math.random() > 0.5,
          issues: Math.random() > 0.6 ? ['Address inconsistency', 'Outdated hours', 'Missing business description'] : []
        },
        facebook: {
          found: Math.random() > 0.4,
          consistent: Math.random() > 0.6,
          issues: Math.random() > 0.5 ? ['Missing website link', 'Profile incomplete', 'Outdated contact info'] : []
        },
        bingPlaces: {
          found: Math.random() > 0.5,
          consistent: Math.random() > 0.7,
          issues: Math.random() > 0.6 ? ['Missing photos', 'Incomplete information', 'Unclaimed listing'] : []
        },
        appleMaps: {
          found: Math.random() > 0.6,
          consistent: Math.random() > 0.7,
          issues: Math.random() > 0.7 ? ['Not verified', 'Missing business hours', 'Incorrect category'] : []
        }
      },
      reviews,
      businessInfo: {
        name: formData.businessName,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        phone: formData.phone,
        website: formData.website,
        category: formData.category
      },
      searchRankings: generateSearchRankings(),
      competitors: generateCompetitors(),
      revenueLoss,
      estimatedCustomerLoss: Math.floor(Math.random() * 41) + 10, // Between 10-50%
      priorityFixes: [
        'Claim and verify your Google Business Profile',
        'Update your business information on Yelp',
        'Add consistent business hours across all platforms',
        'Use the same phone number on all listings',
        'Implement a review generation strategy to improve ratings',
        'Add high-quality photos to all profiles',
        'Create location-based landing pages on your website'
      ]
    };
  };
  
  const inputClasses = "w-full bg-background border border-neutral-300 rounded-md px-4 py-3 text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:border-transparent transition-all duration-200";
  const labelClasses = "block text-sm font-light text-neutral-600 mb-1";
  const errorClasses = "text-orange text-xs mt-1";
  
  // If analysis is complete, show results instead of form
  if (analysisComplete && analysisResults) {
    return <AnalysisResults 
      results={analysisResults} 
      businessInfo={{
        ...formData,
        name: formData.businessName
      }} 
    />;
  }
  
  return (
    <section className="py-16 md:py-24" id="visibility-form">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="heading-md mb-3">Check Your Local Business Visibility</h2>
              <p className="text-neutral-700">
                Enter your business details below to analyze your visibility across multiple platforms. 
                See where customers might be missing you and how much revenue you're losing.
              </p>
            </div>
            
            {isAnalyzing ? (
              <div className="py-8">
                <div className="text-center mb-8">
                  <h3 className="heading-sm mb-4">Analyzing your business visibility...</h3>
                  <div className="w-full bg-neutral-300/50 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5.2 }}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <AnalysisStep 
                    platform="Google Business Profile" 
                    status="Checking..." 
                    delay={0.1} 
                  />
                  <AnalysisStep 
                    platform="Yelp" 
                    status="Checking..." 
                    delay={1.1} 
                  />
                  <AnalysisStep 
                    platform="Facebook Pages" 
                    status="Checking..." 
                    delay={1.9} 
                  />
                  <AnalysisStep 
                    platform="Bing Places" 
                    status="Checking..." 
                    delay={2.5} 
                  />
                  <AnalysisStep 
                    platform="Apple Maps" 
                    status="Checking..." 
                    delay={3.1} 
                  />
                  <AnalysisStep 
                    platform="Search Rankings" 
                    status="Analyzing..." 
                    delay={3.7} 
                  />
                  <AnalysisStep 
                    platform="Review Analysis" 
                    status="Processing..." 
                    delay={4.3} 
                  />
                  <AnalysisStep 
                    platform="Competitor Comparison" 
                    status="Comparing..." 
                    delay={4.8} 
                  />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h3 className="heading-sm mb-4">Business Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="businessName" className={labelClasses}>Business Name *</label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.businessName ? 'border-orange/50 focus:ring-orange/30' : ''}`}
                        placeholder="Your Business Name"
                      />
                      {errors.businessName && <p className={errorClasses}>{errors.businessName}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className={labelClasses}>Street Address *</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.address ? 'border-orange/50 focus:ring-orange/30' : ''}`}
                        placeholder="123 Main St"
                      />
                      {errors.address && <p className={errorClasses}>{errors.address}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="city" className={labelClasses}>City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.city ? 'border-orange/50 focus:ring-orange/30' : ''}`}
                        placeholder="City"
                      />
                      {errors.city && <p className={errorClasses}>{errors.city}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="state" className={labelClasses}>State *</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`${inputClasses} ${errors.state ? 'border-orange/50 focus:ring-orange/30' : ''}`}
                          placeholder="State"
                        />
                        {errors.state && <p className={errorClasses}>{errors.state}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className={labelClasses}>ZIP Code *</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className={`${inputClasses} ${errors.zipCode ? 'border-orange/50 focus:ring-orange/30' : ''}`}
                          placeholder="12345"
                        />
                        {errors.zipCode && <p className={errorClasses}>{errors.zipCode}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className={labelClasses}>Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.phone ? 'border-orange/50 focus:ring-orange/30' : ''}`}
                        placeholder="(123) 456-7890"
                      />
                      {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="website" className={labelClasses}>Website URL</label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="https://yourbusiness.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className={labelClasses}>Business Category</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="" disabled>Select your business type</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Retail">Retail Store</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Home Services">Home Services</option>
                        <option value="Health & Medical">Health & Medical</option>
                        <option value="Beauty & Spa">Beauty & Spa</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="annualRevenue" className={labelClasses}>Annual Revenue (helps calculate potential losses)</label>
                      <input
                        type="text"
                        id="annualRevenue"
                        name="annualRevenue"
                        value={formData.annualRevenue}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="$250,000"
                      />
                      <p className="text-xs text-neutral-500 mt-1">
                        This helps us calculate your potential revenue loss. Your data is confidential.
                      </p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="primaryKeywords" className={labelClasses}>Primary Keywords Customers Search For *</label>
                      <input
                        type="text"
                        id="primaryKeywords"
                        name="primaryKeywords"
                        value={formData.primaryKeywords}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.primaryKeywords ? 'border-orange/50 focus:ring-orange/30' : ''}`}
                        placeholder="plumber, emergency plumber, bathroom installation (comma separated)"
                      />
                      {errors.primaryKeywords && <p className={errorClasses}>{errors.primaryKeywords}</p>}
                      <p className="text-xs text-neutral-500 mt-1">
                        What terms do customers use to find your business? (Comma separated)
                      </p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="competitors" className={labelClasses}>Top Competitors (Optional)</label>
                      <input
                        type="text"
                        id="competitors"
                        name="competitors"
                        value={formData.competitors}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Competitor 1, Competitor 2, Competitor 3 (comma separated)"
                      />
                      <p className="text-xs text-neutral-500 mt-1">
                        List your main local competitors to see how you compare (comma separated)
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className={labelClasses}>Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.email ? 'border-orange/50 focus:ring-orange/30' : ''}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className={errorClasses}>{errors.email}</p>}
                      <p className="text-xs text-neutral-500 mt-1">
                        We'll send your full analysis report to this email.
                      </p>
                    </div>
                  </div>
                </div>
                
                {errors.form && (
                  <div className="mb-6 p-3 bg-orange/10 border border-orange/30 rounded-md">
                    <p className="text-orange text-sm">{errors.form}</p>
                  </div>
                )}
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="btn-primary w-full"
                  >
                    Run Deep Local Visibility Analysis
                  </button>
                  <p className="text-xs text-center text-neutral-500 mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service.
                    We will not share your information with third parties.
                  </p>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

// Component for showing real-time analysis steps
const AnalysisStep = ({ platform, status, delay }: { platform: string; status: string; delay: number }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  
  // Simulate changing status after delay
  useState(() => {
    const timer = setTimeout(() => {
      // Randomize status for MVP
      const randomStatus = Math.random() > 0.5 
        ? 'Found!' 
        : Math.random() > 0.5 
          ? 'Inconsistency detected!' 
          : 'Missing!';
      
      setCurrentStatus(randomStatus);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  });
  
  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-300/50">
      <div className="font-medium">{platform}</div>
      <div className={`text-sm ${
        currentStatus === 'Checking...' || currentStatus === 'Analyzing...' || currentStatus === 'Processing...' || currentStatus === 'Comparing...'
        ? 'text-neutral-500' 
        : currentStatus === 'Found!' 
          ? 'text-green-600' 
          : 'text-orange-500'
      }`}>
        {currentStatus}
      </div>
    </div>
  );
};

export default LocalVisibilityForm; 