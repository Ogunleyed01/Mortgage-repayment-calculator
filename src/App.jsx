import React, { useState } from 'react'
import calculatorIcon from './assets/images/icon-calculator.svg'
import emptyIllustration from './assets/images/illustration-empty.svg'

const App = () => {
  // Form state
  const [formData, setFormData] = useState({
    amount: '',
    term: '',
    rate: '',
    mortgageType: 'repayment'
  })

  // Results state
  const [results, setResults] = useState(null)
  const [errors, setErrors] = useState({})
  const [isCalculating, setIsCalculating] = useState(false)

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle mortgage type change
  const handleMortgageTypeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      mortgageType: e.target.value
    }))
  }

  // Clear all form data
  const clearAll = () => {
    setFormData({
      amount: '',
      term: '',
      rate: '',
      mortgageType: 'repayment'
    })
    setResults(null)
    setErrors({})
  }

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {}

    // Amount validation
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid mortgage amount'
    } else if (formData.amount < 1000) {
      newErrors.amount = 'Minimum mortgage amount is $1,000'
    }

    // Term validation
    if (!formData.term || formData.term <= 0) {
      newErrors.term = 'Please enter a valid mortgage term'
    } else if (formData.term < 1 || formData.term > 50) {
      newErrors.term = 'Mortgage term must be between 1 and 50 years'
    }

    // Rate validation
    if (!formData.rate || formData.rate <= 0) {
      newErrors.rate = 'Please enter a valid interest rate'
    } else if (formData.rate > 30) {
      newErrors.rate = 'Interest rate cannot exceed 30%'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Calculate monthly payment
  const calculateMonthlyPayment = (principal, annualRate, years, isInterestOnly = false) => {
    const monthlyRate = annualRate / 100 / 12
    const totalPayments = years * 12

    if (isInterestOnly) {
      // Interest-only payment
      return principal * monthlyRate
    } else {
      // Standard repayment calculation
      if (monthlyRate === 0) {
        return principal / totalPayments
      }
      
      const monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
        (Math.pow(1 + monthlyRate, totalPayments) - 1)
      
      return monthlyPayment
    }
  }

  // Calculate total interest
  const calculateTotalInterest = (principal, monthlyPayment, years, isInterestOnly = false) => {
    if (isInterestOnly) {
      return monthlyPayment * years * 12
    } else {
      return (monthlyPayment * years * 12) - principal
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsCalculating(true)

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const principal = parseFloat(formData.amount)
      const annualRate = parseFloat(formData.rate)
      const years = parseFloat(formData.term)
      const isInterestOnly = formData.mortgageType === 'interest-only'

      const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years, isInterestOnly)
      const totalInterest = calculateTotalInterest(principal, monthlyPayment, years, isInterestOnly)
      const totalAmount = principal + totalInterest

      setResults({
        monthlyPayment,
        totalInterest,
        totalAmount,
        principal,
        years,
        annualRate,
        isInterestOnly
      })

      setIsCalculating(false)
    }, 500)
  }
  return (
    <>
      <div className='flex flex-col lg:flex-row min-h-screen lg:items-center'>
        <div className='flex flex-col lg:flex-row min-h-[90vh] lg:min-h-auto max-w-[1024px] lg:m-auto lg:border lg:border-gray-400 lg:rounded-2xl lg:shadow-2xl'>
        {/* Form Section */}
        <div className='flex-1 p-4 sm:p-6 md:p-8 lg:p-10'>
          <div className='max-w-md mx-auto lg:max-w-none'>
            {/* Header */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8'>
              <h2 className='font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-2 sm:mb-0'>Mortgage Calculator</h2>
              <button 
                type="button"
                onClick={clearAll}
                className='text-base sm:text-lg underline text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded cursor-pointer'
              >
                Clear All
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
              {/* Mortgage Amount */}
              <div className='space-y-2'>
                <label htmlFor="amount" className='text-base sm:text-lg text-gray-600 font-medium'>Mortgage Amount</label>
                <div className={`flex h-12 sm:h-14 border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}>
                  <span className='flex bg-sky-100 items-center justify-center px-3 sm:px-4'>
                    <span className='text-base sm:text-lg text-sky-700 font-medium'>$</span>
                  </span>
                  <input 
                    type="number" 
                    name="amount" 
                    id="amount" 
                    value={formData.amount}
                    onChange={handleInputChange}
                    className='flex-1 px-3 sm:px-4 text-sm sm:text-base focus:outline-none text-gray-900 placeholder-gray-500'
                    placeholder='Enter amount'
                    min="0"
                    step="1000"
                    required
                    aria-label="Mortgage amount in dollars"
                    aria-invalid={errors.amount ? 'true' : 'false'}
                    aria-describedby={errors.amount ? 'amount-error' : undefined}
                  />
                </div>
                {errors.amount && (
                  <p id="amount-error" className='text-sm text-red-600 mt-1' role="alert">
                    {errors.amount}
                  </p>
                )}
              </div>

              {/* Mortgage Term */}
              <div className='space-y-2'>
                <label htmlFor="term" className='text-base sm:text-lg text-gray-600 font-medium'>Mortgage Term</label>
                <div className={`flex h-12 sm:h-14 border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 ${
                  errors.term ? 'border-red-500' : 'border-gray-300'
                }`}>
                  <input 
                    type="number" 
                    name="term" 
                    id="term" 
                    value={formData.term}
                    onChange={handleInputChange}
                    className='flex-1 px-3 sm:px-4 text-sm sm:text-base focus:outline-none text-gray-900 placeholder-gray-500'
                    placeholder='Enter years'
                    min="1"
                    max="50"
                    required
                    aria-label="Mortgage term in years"
                    aria-invalid={errors.term ? 'true' : 'false'}
                    aria-describedby={errors.term ? 'term-error' : undefined}
                  />
                  <span className='flex bg-sky-100 items-center justify-center px-3 sm:px-4'>
                    <span className='text-base sm:text-lg text-sky-700 font-medium'>years</span>
                  </span>
                </div>
                {errors.term && (
                  <p id="term-error" className='text-sm text-red-600 mt-1' role="alert">
                    {errors.term}
                  </p>
                )}
              </div>

              {/* Interest Rate */}
              <div className='space-y-2'>
                <label htmlFor="rate" className='text-base sm:text-lg text-gray-600 font-medium'>Interest Rate</label>
                <div className={`flex h-12 sm:h-14 border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 ${
                  errors.rate ? 'border-red-500' : 'border-gray-300'
                }`}>
                  <input 
                    type="number" 
                    name="rate" 
                    id="rate" 
                    value={formData.rate}
                    onChange={handleInputChange}
                    className='flex-1 px-3 sm:px-4 text-sm sm:text-base focus:outline-none text-gray-900 placeholder-gray-500'
                    placeholder='Enter rate'
                    min="0"
                    max="30"
                    step="0.01"
                    required
                    aria-label="Interest rate percentage"
                    aria-invalid={errors.rate ? 'true' : 'false'}
                    aria-describedby={errors.rate ? 'rate-error' : undefined}
                  />
                  <span className='flex bg-sky-100 items-center justify-center px-3 sm:px-4'>
                    <span className='text-base sm:text-lg text-sky-700 font-medium'>%</span>
                  </span>
                </div>
                {errors.rate && (
                  <p id="rate-error" className='text-sm text-red-600 mt-1' role="alert">
                    {errors.rate}
                  </p>
                )}
              </div>

              {/* Mortgage Type */}
              <div className='space-y-2'>
                <label htmlFor="mortgage-type" className='text-base sm:text-lg text-gray-600 font-medium'>Mortgage Type</label>
                <div className='space-y-2'>
                  <div className='flex items-center h-12 sm:h-14 border border-gray-300 rounded-lg px-3 sm:px-4 cursor-pointer hover:bg-sky-50 transition-colors'>
                    <input 
                      type="radio" 
                      name="mortgageType" 
                      id="repayment" 
                      value="repayment" 
                      checked={formData.mortgageType === 'repayment'}
                      onChange={handleMortgageTypeChange}
                      className='cursor-pointer w-4 h-4 sm:w-5 sm:h-5 text-sky-600' 
                    />
                    <label htmlFor="repayment" className='ml-3 text-sm sm:text-base text-gray-800 font-medium cursor-pointer'>Repayment</label>
                  </div>
                  <div className='flex items-center h-12 sm:h-14 border border-gray-300 rounded-lg px-3 sm:px-4 cursor-pointer hover:bg-sky-50 transition-colors'>
                    <input 
                      type="radio" 
                      name="mortgageType" 
                      id="interest-only" 
                      value="interest-only" 
                      checked={formData.mortgageType === 'interest-only'}
                      onChange={handleMortgageTypeChange}
                      className='cursor-pointer w-4 h-4 sm:w-5 sm:h-5 text-sky-600'
                    />
                    <label htmlFor="interest-only" className='ml-3 text-sm sm:text-base text-gray-800 font-medium cursor-pointer'>Interest only</label>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <button 
                type="submit"
                disabled={isCalculating}
                className={`w-full flex justify-center items-center gap-2 sm:gap-3 text-sm sm:text-base font-medium text-gray-800 mt-6 sm:mt-8 h-12 sm:h-14 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                  isCalculating 
                    ? 'bg-amber-300 cursor-not-allowed opacity-75' 
                    : 'bg-amber-400 hover:bg-amber-500 active:bg-amber-600'
                }`}
                aria-label={isCalculating ? "Calculating..." : "Calculate mortgage repayments"}
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-gray-800 border-t-transparent"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <img src={calculatorIcon} alt="calculator" className='w-5 h-5 sm:w-6 sm:h-6' />
                    Calculate Repayments
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results Section */}
        <div className='flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 bg-green-950 text-white'>
          {results ? (
            <div className='w-full max-w-md space-y-6'>
              <div className='text-center mb-8'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-medium mb-2'>Your Results</h1>
                <p className='text-sm sm:text-base opacity-90'>Based on your mortgage details</p>
              </div>
              
              <div className='space-y-4'>
                {/* Monthly Payment */}
                <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm sm:text-base opacity-90'>Monthly Payment</span>
                    <span className='text-xs sm:text-sm opacity-75'>
                      {results.isInterestOnly ? '(Interest Only)' : '(Principal + Interest)'}
                    </span>
                  </div>
                  <div className='text-2xl sm:text-3xl font-bold text-green-300'>
                    ${results.monthlyPayment.toLocaleString('en-US', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </div>
                </div>

                {/* Total Interest */}
                <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm sm:text-base opacity-90'>Total Interest</span>
                  </div>
                  <div className='text-2xl sm:text-3xl font-bold text-amber-300'>
                    ${results.totalInterest.toLocaleString('en-US', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </div>
                </div>

                {/* Total Amount */}
                <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm sm:text-base opacity-90'>Total Amount</span>
                    <span className='text-xs sm:text-sm opacity-75'>
                      (Principal + Interest)
                    </span>
                  </div>
                  <div className='text-2xl sm:text-3xl font-bold text-white'>
                    ${results.totalAmount.toLocaleString('en-US', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </div>
                </div>

                {/* Summary */}
                <div className='bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10'>
                  <h3 className='text-sm sm:text-base font-medium mb-3 opacity-90'>Summary</h3>
                  <div className='space-y-2 text-xs sm:text-sm opacity-75'>
                    <div className='flex justify-between'>
                      <span>Principal:</span>
                      <span>${results.principal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Interest Rate:</span>
                      <span>{results.annualRate}% per year</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Term:</span>
                      <span>{results.years} years</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Type:</span>
                      <span className='capitalize'>{results.isInterestOnly ? 'Interest Only' : 'Repayment'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center'>
              <img src={emptyIllustration} alt="illustration" className='w-32 sm:w-40 md:w-48 lg:w-56 mb-4 sm:mb-6 mx-auto'/>
              <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4'>Results shown here</h1>
              <p className='text-sm sm:text-base md:text-lg text-center max-w-md opacity-90 leading-relaxed mx-auto'>
                Complete the form and click 'Calculate Repayments' to see what your monthly repayment would be
              </p>
            </div>
          )}
        </div>
        </div>
      </div>
    </>    
  )
}

export default App
