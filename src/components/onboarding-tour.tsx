'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, MousePointer, Eye, Download } from 'lucide-react'
import { Button } from './ui/button'

interface OnboardingStep {
  title: string
  description: string
  action: string
  highlight?: {
    selector: string
    position: 'top' | 'bottom' | 'left' | 'right'
  }
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to Linkly!',
    description: 'Let\'s get you started with a quick 30-second tour. We\'ll show you exactly how to create and track your short links.',
    action: 'Start Tour',
  },
  {
    title: 'Create Your First Link',
    description: 'Click the "New Link" button in the top right corner. You\'ll be able to paste any long URL and get a short link instantly.',
    action: 'Show Me',
    highlight: {
      selector: '[data-tour="create-link"]',
      position: 'bottom',
    },
  },
  {
    title: 'View Your Analytics',
    description: 'Every link you create gets tracked automatically. Click on any link to see detailed analytics including clicks, locations, and devices.',
    action: 'Got It',
    highlight: {
      selector: '[data-tour="analytics"]',
      position: 'top',
    },
  },
  {
    title: 'Download QR Codes',
    description: 'Each link comes with a QR code. Perfect for posters, business cards, or any offline marketing. Just click the QR icon on any link.',
    action: 'Understood',
  },
]

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [highlightElement, setHighlightElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('linkly_tour_completed')
    if (!hasSeenTour) {
      setTimeout(() => setIsOpen(true), 1500)
    }
  }, [])

  useEffect(() => {
    if (isOpen && steps[currentStep].highlight) {
      const element = document.querySelector(steps[currentStep].highlight!.selector) as HTMLElement
      setHighlightElement(element)
    } else {
      setHighlightElement(null)
    }
  }, [currentStep, isOpen])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    localStorage.setItem('linkly_tour_completed', 'true')
    setIsOpen(false)
  }

  const handleComplete = () => {
    localStorage.setItem('linkly_tour_completed', 'true')
    setIsOpen(false)
  }

  if (!isOpen) return null

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  // Calculate tooltip position
  const getTooltipPosition = () => {
    if (!highlightElement || !step.highlight) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    }

    const rect = highlightElement.getBoundingClientRect()
    const position = step.highlight.position

    switch (position) {
      case 'bottom':
        return {
          top: `${rect.bottom + 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translateX(-50%)',
        }
      case 'top':
        return {
          bottom: `${window.innerHeight - rect.top + 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translateX(-50%)',
        }
      case 'left':
        return {
          top: `${rect.top + rect.height / 2}px`,
          right: `${window.innerWidth - rect.left + 20}px`,
          transform: 'translateY(-50%)',
        }
      case 'right':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + 20}px`,
          transform: 'translateY(-50%)',
        }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
      >
        {/* Backdrop with spotlight */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm">
          {highlightElement && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute pointer-events-none"
              style={{
                top: highlightElement.getBoundingClientRect().top - 8,
                left: highlightElement.getBoundingClientRect().left - 8,
                width: highlightElement.getBoundingClientRect().width + 16,
                height: highlightElement.getBoundingClientRect().height + 16,
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7), 0 0 20px 4px rgba(59, 130, 246, 0.5)',
                borderRadius: '12px',
                border: '3px solid rgb(59, 130, 246)',
              }}
            >
              {/* Animated pointer */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-12 left-1/2 -translate-x-1/2"
              >
                <MousePointer className="w-8 h-8 text-blue-500" />
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Tooltip */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute w-full max-w-md px-4"
          style={highlightElement ? getTooltipPosition() : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Progress bar */}
            <div className="h-1 bg-gray-200 dark:bg-gray-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-600"
              />
            </div>

            <div className="p-6">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <button
                  onClick={handleSkip}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  Skip tour
                </button>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {step.description}
              </p>

              {/* Visual indicators */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50">
                {currentStep === 1 && (
                  <>
                    <MousePointer className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-blue-900 dark:text-blue-100">
                      Look for the button highlighted above
                    </span>
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-blue-900 dark:text-blue-100">
                      Click any link to see its analytics
                    </span>
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <Download className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-blue-900 dark:text-blue-100">
                      Download QR codes for offline use
                    </span>
                  </>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                {currentStep > 0 && (
                  <Button
                    variant="secondary"
                    onClick={handlePrevious}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className={`${currentStep === 0 ? 'w-full' : 'flex-1'} bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/25`}
                >
                  {step.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
