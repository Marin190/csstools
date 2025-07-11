'use client'

import { useState, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Copy, Plus, Trash2, Palette } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface GradientStop {
  id: string
  color: string
  position: number
}

interface GradientSettings {
  type: 'linear' | 'radial'
  angle: number
  stops: GradientStop[]
}

const presetGradients = [
  { name: 'Ocean', colors: ['#2A7B9B', '#57C785', '#EDDD53'] },
  { name: 'Sunset', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'] },
  { name: 'Purple', colors: ['#667eea', '#764ba2'] },
  { name: 'Green', colors: ['#11998e', '#38ef7d'] },
  { name: 'Pink', colors: ['#ff9a9e', '#fecfef'] },
  { name: 'Blue', colors: ['#a8edea', '#fed6e3'] },
]

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const colorInputRef = useRef<HTMLInputElement>(null)

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleSwatchClick = () => {
    setIsOpen(!isOpen)
    if (colorInputRef.current) {
      colorInputRef.current.click()
    }
  }

  return (
    <div className="relative">
      <div 
        className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors"
        style={{ backgroundColor: color }}
        onClick={handleSwatchClick}
      />
      <input
        ref={colorInputRef}
        type="color"
        value={color}
        onChange={handleColorChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  )
}

export function GradientGenerator() {
  const [gradient, setGradient] = useState<GradientSettings>({
    type: 'linear',
    angle: 90,
    stops: [
      { id: '1', color: '#2A7B9B', position: 0 },
      { id: '2', color: '#57C785', position: 50 },
      { id: '3', color: '#EDDD53', position: 100 },
    ]
  })

  const [outputFormat, setOutputFormat] = useState<'css' | 'tailwind'>('css')

  const generateCSS = useCallback(() => {
    const { type, angle, stops } = gradient
    const sortedStops = [...stops].sort((a, b) => a.position - b.position)
    const colorStops = sortedStops.map(stop => `${stop.color} ${stop.position}%`).join(', ')
    
    if (type === 'linear') {
      return `linear-gradient(${angle}deg, ${colorStops})`
    } else {
      return `radial-gradient(circle, ${colorStops})`
    }
  }, [gradient])


  const getOutputCode = useCallback(() => {
    if (outputFormat === 'css') {
      return `background: ${generateCSS()};`
    } else {
      // Pour Tailwind, on retourne le CSS custom car les gradients complexes ne peuvent pas être exprimés en classes Tailwind pures
      return `/* Tailwind ne supporte pas les gradients complexes, utilisez du CSS custom */\n.gradient-bg {\n  background: ${generateCSS()};\n}`
    }
  }, [generateCSS, outputFormat])

  const copyToClipboard = async () => {
    const code = getOutputCode()
    try {
      await navigator.clipboard.writeText(code)
      toast({ title: 'Copié!', description: `Le code ${outputFormat.toUpperCase()} a été copié dans le presse-papiers` })
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  const addStop = () => {
    const newStop: GradientStop = {
      id: Date.now().toString(),
      color: '#888888',
      position: 50
    }
    setGradient(prev => ({
      ...prev,
      stops: [...prev.stops, newStop]
    }))
  }

  const removeStop = (id: string) => {
    if (gradient.stops.length <= 2) return
    setGradient(prev => ({
      ...prev,
      stops: prev.stops.filter(stop => stop.id !== id)
    }))
  }

  const updateStop = (id: string, updates: Partial<GradientStop>) => {
    setGradient(prev => ({
      ...prev,
      stops: prev.stops.map(stop => 
        stop.id === id ? { ...stop, ...updates } : stop
      )
    }))
  }

  const applyPreset = (colors: string[]) => {
    const newStops = colors.map((color, index) => ({
      id: Date.now().toString() + index,
      color,
      position: index === 0 ? 0 : index === colors.length - 1 ? 100 : (100 / (colors.length - 1)) * index
    }))
    setGradient(prev => ({ ...prev, stops: newStops }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Aperçu du gradient */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Aperçu</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="w-full h-48 rounded-lg border-2 border-gray-200"
            style={{ background: generateCSS() }}
          />
          <div className="mt-4 p-3 bg-gray-900 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-300">Format:</span>
                <div className="flex bg-gray-800 rounded p-1">
                  <button
                    onClick={() => setOutputFormat('css')}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      outputFormat === 'css' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-gray-300 cursor-pointer'
                    }`}
                  >
                    CSS
                  </button>
                  <button
                    onClick={() => setOutputFormat('tailwind')}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      outputFormat === 'tailwind' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-gray-300 cursor-pointer'
                    }`}
                  >
                    Tailwind
                  </button>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
                className="text-gray-800 border-gray-300 hover:bg-gray-300 cursor-pointer"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copier
              </Button>
            </div>
            <code className="text-sm text-gray-300 break-all whitespace-pre-wrap">
              {getOutputCode()}
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Contrôles */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Type de gradient */}
          <div className="space-y-2">
            <Label>Type de gradient</Label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setGradient(prev => ({ ...prev, type: 'linear' }))}
                className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                  gradient.type === 'linear' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                }`}
              >
                Linéaire
              </button>
              <button
                onClick={() => setGradient(prev => ({ ...prev, type: 'radial' }))}
                className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                  gradient.type === 'radial' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                }`}
              >
                Radial
              </button>
            </div>
          </div>

          {gradient.type === 'linear' && (
            <div className="space-y-2">
              <Label>Angle: {gradient.angle}°</Label>
              <Slider
                value={[gradient.angle]}
                onValueChange={(value) => setGradient(prev => ({ ...prev, angle: value[0] }))}
                max={360}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Couleurs</Label>
              <Button variant="outline" size="sm" onClick={addStop} className='cursor-pointer'>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
            
            {gradient.stops.map((stop, index) => (
              <div key={stop.id} className="flex items-center space-x-2">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <ColorPicker 
                      color={stop.color}
                      onChange={(color) => updateStop(stop.id, { color })}
                    />
                    <Input 
                      value={stop.color}
                      onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500 w-12">{stop.position}%</span>
                    {gradient.stops.length > 2 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className='cursor-pointer'
                        onClick={() => removeStop(stop.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Slider
                    value={[stop.position]}
                    onValueChange={(value) => updateStop(stop.id, { position: value[0] })}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Gradients prédéfinis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {presetGradients.slice(0, -1).map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.colors)}
                className="p-3 cursor-pointer rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div 
                  className="w-full h-12 rounded mb-2"
                  style={{ 
                    background: `linear-gradient(90deg, ${preset.colors.join(', ')})` 
                  }}
                />
                <p className="text-sm font-medium text-gray-700">{preset.name}</p>
              </button>
            ))}
            <a
              href="/presets"
              className="p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors flex flex-col items-center justify-center group"
            >
              <div className="w-full h-12 rounded mb-2 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                <Plus className="h-6 w-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Voir plus</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}