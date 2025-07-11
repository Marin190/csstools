'use client'

import { Footer } from '@/components/footer'
import { GradientGenerator } from '@/components/gradient-generator'
import { Navbar } from '@/components/navebar'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <Navbar  />
      <div className="max-w-7xl mx-auto mt-6">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Générateur de Gradients CSS
          </h1>
          <p className="text-gray-600">
            Créez facilement des gradients CSS personnalisés
          </p>
        </div>
        <GradientGenerator />
      </div>
      <Footer />
    </main>
  )
}