'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Copy, Search } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'

interface PresetGradient {
  name: string
  colors: string[]
  category: string
}

const allPresets: PresetGradient[] = [
  // Nature
  { name: 'Ocean', colors: ['#2A7B9B', '#57C785', '#EDDD53'], category: 'Nature' },
  { name: 'Sunset', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'], category: 'Nature' },
  { name: 'Forest', colors: ['#134E5E', '#71B280'], category: 'Nature' },
  { name: 'Mountain', colors: ['#8360c3', '#2ebf91'], category: 'Nature' },
  { name: 'Beach', colors: ['#74b9ff', '#0984e3', '#a29bfe'], category: 'Nature' },
  { name: 'Desert', colors: ['#f39c12', '#e74c3c', '#9b59b6'], category: 'Nature' },
  
  // Vibrant
  { name: 'Purple', colors: ['#667eea', '#764ba2'], category: 'Vibrant' },
  { name: 'Pink', colors: ['#ff9a9e', '#fecfef'], category: 'Vibrant' },
  { name: 'Rainbow', colors: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'], category: 'Vibrant' },
  { name: 'Neon', colors: ['#00ffff', '#ff00ff', '#ffff00'], category: 'Vibrant' },
  { name: 'Fire', colors: ['#ff4757', '#ff6b7a', '#ffa502'], category: 'Vibrant' },
  { name: 'Electric', colors: ['#667eea', '#764ba2', '#f093fb'], category: 'Vibrant' },
  
  // Soft
  { name: 'Pastel', colors: ['#a8edea', '#fed6e3'], category: 'Soft' },
  { name: 'Mint', colors: ['#d299c2', '#fef9d7'], category: 'Soft' },
  { name: 'Lavender', colors: ['#e0c3fc', '#9bb5ff'], category: 'Soft' },
  { name: 'Peach', colors: ['#ffb7b7', '#ffd3a5'], category: 'Soft' },
  { name: 'Cloud', colors: ['#ffffff', '#e3f2fd', '#bbdefb'], category: 'Soft' },
  { name: 'Rose', colors: ['#ffecd2', '#fcb69f'], category: 'Soft' },
  
  // Dark
  { name: 'Midnight', colors: ['#232526', '#414345'], category: 'Dark' },
  { name: 'Galaxy', colors: ['#1e3c72', '#2a5298'], category: 'Dark' },
  { name: 'Carbon', colors: ['#0f0f0f', '#2d2d2d'], category: 'Dark' },
  { name: 'Steel', colors: ['#41295a', '#2F0743'], category: 'Dark' },
  { name: 'Shadow', colors: ['#000000', '#434343'], category: 'Dark' },
  { name: 'Deep Sea', colors: ['#00416A', '#799F0C'], category: 'Dark' },
  
  // Professional
  { name: 'Corporate', colors: ['#3b82f6', '#1e40af'], category: 'Professional' },
  { name: 'Modern', colors: ['#6366f1', '#8b5cf6'], category: 'Professional' },
  { name: 'Elegant', colors: ['#1f2937', '#4b5563'], category: 'Professional' },
  { name: 'Clean', colors: ['#f8fafc', '#e2e8f0'], category: 'Professional' },
  { name: 'Sophisticated', colors: ['#374151', '#6b7280'], category: 'Professional' },
  { name: 'Minimal', colors: ['#f9fafb', '#f3f4f6'], category: 'Professional' },
]

const categories = ['Tous', 'Nature', 'Vibrant', 'Soft', 'Dark', 'Professional']

export default function PresetsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPresets = allPresets.filter(preset => {
    const matchesCategory = selectedCategory === 'Tous' || preset.category === selectedCategory
    const matchesSearch = preset.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const generateCSS = (colors: string[]) => {
    const colorStops = colors.map((color, index) => {
      const position = index === 0 ? 0 : index === colors.length - 1 ? 100 : (100 / (colors.length - 1)) * index
      return `${color} ${position}%`
    }).join(', ')
    return `linear-gradient(90deg, ${colorStops})`
  }

  const copyGradient = async (preset: PresetGradient) => {
    const css = `background: ${generateCSS(preset.colors)};`
    try {
      await navigator.clipboard.writeText(css)
      toast({ title: 'Copié!', description: `Le gradient "${preset.name}" a été copié` })
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au générateur
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gradients prédéfinis
          </h1>
          <p className="text-gray-600">
            Explorez notre collection de gradients prêts à utiliser
          </p>
        </div>

        {/* Filtres */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un gradient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 "
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grille de gradients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPresets.map((preset, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div 
                  className="w-full h-32 cursor-pointer relative group"
                  style={{ background: generateCSS(preset.colors) }}
                  onClick={() => copyGradient(preset)}
                >
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <Copy className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{preset.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{preset.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {preset.colors.map((color, colorIndex) => (
                      <span
                        key={colorIndex}
                        className="inline-block px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-600"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPresets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">Aucun gradient trouvé</div>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  )
}