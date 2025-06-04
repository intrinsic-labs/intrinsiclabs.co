'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaSearch, FaBell, FaCog, FaUser, FaHeart, FaStar, FaDownload, FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaSun, FaMoon } from 'react-icons/fa'

export default function NeumorphismDemo() {
  const [selectedBackground, setSelectedBackground] = useState('mountains')
  const [showModal, setShowModal] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [toggleStates, setToggleStates] = useState({
    notifications: false,
    darkMode: false,
    autoplay: true,
  })
  const [progressValue, setProgressValue] = useState(65)
  const [lineProgressValue, setLineProgressValue] = useState(45)
  const [activeDots, setActiveDots] = useState(3)

  const backgrounds = {
    mountains: '/images/ground-control/nature/mountains.jpg',
    beach: '/images/ground-control/nature/beach.jpg',
    desert: '/images/ground-control/nature/desert.jpg',
    desert2: '/images/ground-control/nature/desert-2.jpg'
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleToggle = (key: string) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }))
  }

  return (
    <div className={`min-h-screen neuro-bg transition-all duration-500 ${darkMode ? 'dark' : ''}`}>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <nav className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="neuro-card p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink">
                  <h1 className="text-lg sm:text-2xl font-calling-code neuro-text-primary truncate">
                    <span className="hidden sm:inline">il/</span>
                    <span className="neuro-text-accent">
                      <span className="sm:hidden">neuro</span>
                      <span className="hidden sm:inline">neumorphism-demo</span>
                    </span>
                  </h1>
                </div>
                
                <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                  <button className="neuro-icon" onClick={toggleDarkMode}>
                    {darkMode ? <FaSun className="w-4 h-4 neuro-text-primary" /> : <FaMoon className="w-4 h-4 neuro-text-primary" />}
                  </button>
                  <button className="neuro-icon hidden sm:block">
                    <FaSearch className="w-4 h-4 neuro-text-primary" />
                  </button>
                  <button className="neuro-icon hidden sm:block">
                    <FaBell className="w-4 h-4 neuro-text-primary" />
                  </button>
                  <button className="neuro-icon-pressed">
                    <FaCog className="w-4 h-4 neuro-text-primary" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Background Selector */}
            <div className="neuro-card mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold neuro-text-primary mb-4 sm:mb-6">Background Selector</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {Object.entries(backgrounds).map(([key, src]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedBackground(key)}
                    className={`neuro-raised p-4 transition-all ${
                      selectedBackground === key ? 'neuro-pressed' : ''
                    }`}
                  >
                    <Image 
                      src={src} 
                      alt={key} 
                      width={100} 
                      height={60}
                      className="w-full h-16 object-cover neuro-rounded mb-3"
                    />
                    <span className="text-sm capitalize neuro-text-primary">{key}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Left Column - Basic Components */}
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-xl sm:text-2xl font-bold neuro-text-primary">Core Components</h2>
                
                {/* Buttons with Rounded-Z Effects */}
                <div className="neuro-card">
                  <h3 className="text-lg sm:text-xl font-semibold neuro-text-primary mb-4">Buttons & Rounded-Z</h3>
                  <div className="space-y-4">
                    <button className="neuro-button w-full">
                      Standard Button
                    </button>
                    <button className="neuro-button-accent w-full neuro-rounded-z">
                      Accent Button with Rounded-Z
                    </button>
                    <button className="neuro-button neuro-accessible w-full">
                      Accessible Button
                    </button>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button className="neuro-button neuro-sm neuro-rounded-z-sm px-3 sm:px-4 py-2 text-xs sm:text-sm">Small Z</button>
                      <button className="neuro-button neuro-rounded-z px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm">Regular Z</button>
                      <button className="neuro-button neuro-lg neuro-rounded-z-lg px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm">Large Z</button>
                    </div>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="neuro-card">
                  <h3 className="text-lg sm:text-xl font-semibold neuro-text-primary mb-4">Progress Indicators</h3>
                  <div className="space-y-6">
                    {/* Original Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="neuro-text-secondary text-sm sm:text-base">Standard Progress</span>
                        <span className="neuro-text-muted text-sm sm:text-base">{progressValue}%</span>
                      </div>
                      <div className="neuro-progress">
                        <div 
                          className="neuro-progress-bar" 
                          style={{ width: `${progressValue}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Line Progress - Keyboard Style */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="neuro-text-secondary text-sm sm:text-base">Line Progress (Glows in Dark)</span>
                        <span className="neuro-text-muted text-sm sm:text-base">{lineProgressValue}%</span>
                      </div>
                      <div className="neuro-progress-line">
                        <div 
                          className="neuro-progress-line-bar" 
                          style={{ width: `${lineProgressValue}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Dot Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="neuro-text-secondary text-sm sm:text-base">Dot Progress</span>
                        <span className="neuro-text-muted text-sm sm:text-base">{activeDots}/7</span>
                      </div>
                      <div className="neuro-progress-dots">
                        {[...Array(7)].map((_, i) => (
                          <div 
                            key={i}
                            className={`neuro-progress-dot ${i < activeDots ? 'active' : ''}`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                      <button 
                        onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
                        className="neuro-button neuro-sm text-xs"
                      >
                        -10% Std
                      </button>
                      <button 
                        onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
                        className="neuro-button neuro-sm text-xs"
                      >
                        +10% Std
                      </button>
                      <button 
                        onClick={() => setLineProgressValue(Math.max(0, lineProgressValue - 15))}
                        className="neuro-button neuro-sm text-xs"
                      >
                        -15% Line
                      </button>
                      <button 
                        onClick={() => setLineProgressValue(Math.min(100, lineProgressValue + 15))}
                        className="neuro-button neuro-sm text-xs"
                      >
                        +15% Line
                      </button>
                      <button 
                        onClick={() => setActiveDots(Math.max(0, activeDots - 1))}
                        className="neuro-button neuro-sm text-xs"
                      >
                        -1 Dot
                      </button>
                      <button 
                        onClick={() => setActiveDots(Math.min(7, activeDots + 1))}
                        className="neuro-button neuro-sm text-xs"
                      >
                        +1 Dot
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form Elements */}
                <div className="neuro-card neuro-rounded-z">
                  <h3 className="text-lg sm:text-xl font-semibold neuro-text-primary mb-4">Form Elements</h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Standard input field..."
                      className="neuro-input"
                    />
                    <input 
                      type="email" 
                      placeholder="Accessible input with border"
                      className="neuro-input neuro-accessible"
                    />
                    <div className="flex items-center justify-between">
                      <span className="neuro-text-primary text-sm sm:text-base">Enable Notifications</span>
                      <label className="neuro-toggle">
                        <input 
                          type="checkbox" 
                          checked={toggleStates.notifications}
                          onChange={() => handleToggle('notifications')}
                        />
                        <span className="neuro-toggle-slider"></span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="neuro-text-primary text-sm sm:text-base">Auto-play Music</span>
                      <label className="neuro-toggle">
                        <input 
                          type="checkbox" 
                          checked={toggleStates.autoplay}
                          onChange={() => handleToggle('autoplay')}
                        />
                        <span className="neuro-toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column - Photo Integration */}
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-xl sm:text-2xl font-bold neuro-text-primary">Photos & Interactive Elements</h2>
                
                {/* Photo Showcase */}
                <div className="neuro-card neuro-rounded-z">
                  <h3 className="text-xl font-semibold neuro-text-primary mb-4">Photo Integration</h3>
                  <div className="space-y-6">
                    
                    {/* Round Photos */}
                    <div>
                      <p className="neuro-text-secondary text-sm mb-3">Round Photos</p>
                      <div className="flex gap-4 items-center">
                        <div className="neuro-photo neuro-photo-round w-16 h-16">
                          <Image 
                            src={backgrounds.mountains} 
                            alt="Round photo" 
                            width={64} 
                            height={64}
                          />
                        </div>
                        <div className="neuro-photo neuro-photo-round w-20 h-20">
                          <Image 
                            src={backgrounds.beach} 
                            alt="Round photo" 
                            width={80} 
                            height={80}
                          />
                        </div>
                        <div className="neuro-photo neuro-photo-round w-24 h-24">
                          <Image 
                            src={backgrounds.desert} 
                            alt="Round photo" 
                            width={96} 
                            height={96}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Square Photos */}
                    <div>
                      <p className="neuro-text-secondary text-sm mb-3">Square Photos</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="neuro-photo neuro-photo-square">
                          <Image 
                            src={backgrounds.mountains} 
                            alt="Square photo" 
                            width={150} 
                            height={150}
                          />
                        </div>
                        <div className="neuro-photo neuro-photo-square">
                          <Image 
                            src={backgrounds.beach} 
                            alt="Square photo" 
                            width={150} 
                            height={150}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Rounded-Z Photo */}
                    <div>
                      <p className="neuro-text-secondary text-sm mb-3">Photo with Rounded-Z Effect</p>
                      <div className="neuro-photo neuro-photo-rounded-z aspect-video">
                        <Image 
                          src={backgrounds.desert2} 
                          alt="Rounded-Z photo" 
                          width={300} 
                          height={200}
                        />
                        <div className="neuro-photo-overlay"></div>
                      </div>
                    </div>

                    {/* Thumbnail Row */}
                    <div>
                      <p className="neuro-text-secondary text-sm mb-3">Thumbnails</p>
                      <div className="flex gap-3">
                        {Object.values(backgrounds).map((src, i) => (
                          <div key={i} className="neuro-photo neuro-photo-thumb">
                            <Image 
                              src={src} 
                              alt={`Thumbnail ${i + 1}`} 
                              width={64} 
                              height={64}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Music Player Widget */}
                <div className="neuro-card neuro-float neuro-rounded-z">
                  <h3 className="text-xl font-semibold neuro-text-primary mb-4">Music Player</h3>
                  <div className="text-center space-y-4">
                    <div className="neuro-photo neuro-photo-square w-32 h-32 mx-auto">
                      <Image 
                        src={backgrounds.mountains} 
                        alt="Album art" 
                        width={128} 
                        height={128}
                      />
                      <div className="neuro-photo-overlay"></div>
                    </div>
                    
                    <div>
                      <h4 className="neuro-text-primary font-semibold">Ambient Coding Vibes</h4>
                      <p className="neuro-text-secondary">lo-fi hip hop</p>
                    </div>
                    
                    <div className="flex justify-center items-center space-x-4">
                      <button className="neuro-icon neuro-rounded-z-sm">
                        <FaBackward className="w-4 h-4 neuro-text-primary" />
                      </button>
                      <button className="neuro-icon neuro-lg neuro-rounded-z">
                        <FaPlay className="w-5 h-5 neuro-text-primary" />
                      </button>
                      <button className="neuro-icon neuro-rounded-z-sm">
                        <FaForward className="w-4 h-4 neuro-text-primary" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FaVolumeUp className="w-4 h-4 neuro-text-muted" />
                      <div className="neuro-progress-line flex-1">
                        <div className="neuro-progress-line-bar" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Complex Layouts */}
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-xl sm:text-2xl font-bold neuro-text-primary">Complex Layouts</h2>
                
                {/* User Profile Card */}
                <div className="neuro-card neuro-rounded-z-lg">
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="neuro-photo neuro-photo-round w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                      <Image 
                        src={backgrounds.beach} 
                        alt="Sarah Chen" 
                        width={64} 
                        height={64}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold neuro-text-primary text-sm sm:text-base">Sarah Chen</h3>
                      <p className="neuro-text-secondary text-xs sm:text-sm">Senior UX Designer</p>
                      <span className="neuro-indicator-success text-xs px-2 py-1 mt-1 inline-block">Online</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="neuro-raised neuro-rounded-z-sm p-2 sm:p-3 text-center">
                      <FaHeart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 mx-auto mb-1" />
                      <p className="text-xs neuro-text-primary font-medium">234</p>
                      <p className="text-xs neuro-text-muted">Likes</p>
                    </div>
                    <div className="neuro-raised neuro-rounded-z-sm p-2 sm:p-3 text-center">
                      <FaStar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mx-auto mb-1" />
                      <p className="text-xs neuro-text-primary font-medium">1.2k</p>
                      <p className="text-xs neuro-text-muted">Stars</p>
                    </div>
                    <div className="neuro-raised neuro-rounded-z-sm p-2 sm:p-3 text-center">
                      <FaDownload className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mx-auto mb-1" />
                      <p className="text-xs neuro-text-primary font-medium">89</p>
                      <p className="text-xs neuro-text-muted">Downloads</p>
                    </div>
                  </div>
                  
                  <button className="neuro-button neuro-rounded-z w-full text-sm sm:text-base">
                    View Full Profile
                  </button>
                </div>

                {/* Surface Types Showcase */}
                <div className="neuro-card">
                  <h3 className="text-lg sm:text-xl font-semibold neuro-text-primary mb-4">Surface Types</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="neuro-raised p-3 sm:p-4">
                      <h4 className="neuro-text-primary font-medium text-sm sm:text-base">Raised Surface</h4>
                      <p className="neuro-text-secondary text-xs sm:text-sm">Standard raised appearance</p>
                    </div>
                    <div className="neuro-raised neuro-rounded-z p-3 sm:p-4">
                      <h4 className="neuro-text-primary font-medium text-sm sm:text-base">Raised + Rounded-Z</h4>
                      <p className="neuro-text-secondary text-xs sm:text-sm">Beveled edges for extra depth</p>
                    </div>
                    <div className="neuro-pressed p-3 sm:p-4">
                      <h4 className="neuro-text-primary font-medium text-sm sm:text-base">Pressed Surface</h4>
                      <p className="neuro-text-secondary text-xs sm:text-sm">Appears pushed into background</p>
                    </div>
                    <div className="neuro-pressed neuro-rounded-z-pressed p-3 sm:p-4">
                      <h4 className="neuro-text-primary font-medium text-sm sm:text-base">Pressed + Rounded-Z</h4>
                      <p className="neuro-text-secondary text-xs sm:text-sm">Enhanced pressed effect</p>
                    </div>
                  </div>
                </div>

                {/* Settings Panel with Photos */}
                <div className="neuro-card neuro-rounded-z">
                  <h3 className="text-lg sm:text-xl font-semibold neuro-text-primary mb-4">Gallery Dashboard</h3>
                  <div className="space-y-4">
                    <div className="neuro-photo neuro-photo-rect">
                      <Image 
                        src={backgrounds.mountains} 
                        alt="Featured image" 
                        width={300} 
                        height={169}
                      />
                      <div className="neuro-photo-overlay"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 pr-3">
                        <p className="neuro-text-primary font-medium text-sm sm:text-base">Theme</p>
                        <p className="neuro-text-muted text-xs sm:text-sm">Switch between light and dark</p>
                      </div>
                      <label className="neuro-toggle flex-shrink-0">
                        <input 
                          type="checkbox" 
                          checked={darkMode}
                          onChange={toggleDarkMode}
                        />
                        <span className="neuro-toggle-slider"></span>
                      </label>
                    </div>
                    
                    <div className="neuro-flat p-3">
                      <p className="neuro-text-secondary text-xs sm:text-sm mb-2">Progress Status</p>
                      <div className="neuro-progress-dots">
                        {[...Array(7)].map((_, i) => (
                          <div 
                            key={i}
                            className={`neuro-progress-dot ${i < 5 ? 'active' : ''}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setShowModal(true)}
                      className="neuro-button-accent neuro-rounded-z w-full text-sm sm:text-base"
                    >
                      Advanced Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowModal(false)}
            />
            <div className="neuro-card neuro-rounded-z max-w-md w-full relative z-10 mx-4">
              <h2 className="text-xl sm:text-2xl font-bold neuro-text-primary mb-4">Advanced Settings</h2>
              <p className="neuro-text-secondary mb-6 text-sm sm:text-base">
                This modal demonstrates the new neumorphic features: rounded-Z effects for beveled edges, 
                alternative progress indicators, and seamless photo integration.
              </p>
              <div className="space-y-4 mb-6">
                <input 
                  type="text" 
                  placeholder="Configuration name..."
                  className="neuro-input"
                />
                <div className="flex items-center justify-between">
                  <span className="neuro-text-primary text-sm sm:text-base">Enable advanced features</span>
                  <label className="neuro-toggle flex-shrink-0">
                    <input type="checkbox" defaultChecked />
                    <span className="neuro-toggle-slider"></span>
                  </label>
                </div>
                <div>
                  <p className="neuro-text-secondary text-xs sm:text-sm mb-2">Feature Progress</p>
                  <div className="neuro-progress-line">
                    <div className="neuro-progress-line-bar" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="neuro-button neuro-rounded-z flex-1 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="neuro-button-accent neuro-rounded-z flex-1 text-sm sm:text-base"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 