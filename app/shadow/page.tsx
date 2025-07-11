'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Copy, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { Navbar } from '@/components/navebar'

interface BoxShadow {
  id: string
  x: number
  y: number
  blur: number
  spread: number
  color: string
  inset: boolean
}

interface ShadowSettings {
  shadows: BoxShadow[]
}

const presetShadows = [
  { 
    name: 'Subtle', 
    shadows: [{ id: '1', x: 0, y: 1, blur: 3, spread: 0, color: '#00000010', inset: false }]
  },
  { 
    name: 'Medium', 
    shadows: [{ id: '1', x: 0, y: 4, blur: 6, spread: -1, color: '#00000025', inset: false }]
  },
  { 
    name: 'Large', 
    shadows: [{ id: '1', x: 0, y: 10, blur: 15, spread: -3, color: '#00000035', inset: false }]
  },
  { 
    name: 'Colored', 
    shadows: [{ id: '1', x: 0, y: 4, blur: 14, spread: 0, color: '#3b82f650', inset: false }]
  },
  { 
    name: 'Inset', 
    shadows: [{ id: '1', x: 0, y: 2, blur: 4, spread: 0, color: '#00000020', inset: true }]
  },
]

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

function ColorPicker({ color, onChange }: ColorPickerProps) {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="relative">
      <input
        type="color"
        value={color.length === 7 ? color : '#000000'}
        onChange={handleColorChange}
        className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors"
      />
    </div>
  )
}

export default function ShadowPage() {
  const [shadowSettings, setShadowSettings] = useState<ShadowSettings>({
    shadows: [
      { id: '1', x: 0, y: 2, blur: 4, spread: 0, color: '#00000025', inset: false },
    ]
  })

  const [outputFormat, setOutputFormat] = useState<'css' | 'tailwind'>('css')

  const generateCSS = useCallback(() => {
    const shadowStrings = shadowSettings.shadows.map(shadow => {
      const insetStr = shadow.inset ? 'inset ' : ''
      return `${insetStr}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
    })
    return shadowStrings.join(', ')
  }, [shadowSettings])

  const getOutputCode = useCallback(() => {
    if (outputFormat === 'css') {
      return `box-shadow: ${generateCSS()};`
    } else {
      return `/* Tailwind ne supporte pas les box-shadow complexes, utilisez du CSS custom */\n.shadow-custom {\n  box-shadow: ${generateCSS()};\n}`
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

  const addShadow = () => {
    const newShadow: BoxShadow = {
      id: Date.now().toString(),
      x: 0,
      y: 2,
      blur: 4,
      spread: 0,
      color: '#00000025',
      inset: false
    }
    setShadowSettings(prev => ({
      shadows: [...prev.shadows, newShadow]
    }))
  }

    const resetTransform = () => {
        setShadowSettings({ shadows: [{ id: '1', x: 0, y: 2, blur: 4, spread: 0, color: '#00000025', inset: false }] })
    }

  const removeShadow = (id: string) => {
    if (shadowSettings.shadows.length <= 1) return
    setShadowSettings(prev => ({
      shadows: prev.shadows.filter(shadow => shadow.id !== id)
    }))
  }

  const updateShadow = (id: string, updates: Partial<BoxShadow>) => {
    setShadowSettings(prev => ({
      shadows: prev.shadows.map(shadow => 
        shadow.id === id ? { ...shadow, ...updates } : shadow
      )
    }))
  }

  const applyPreset = (preset: typeof presetShadows[0]) => {
    setShadowSettings({ shadows: preset.shadows })
  }

  const hexToRgba = (hex: string, alpha: number = 1) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return hex
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
        <Navbar  />
      <div className="max-w-7xl mx-auto mt-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Générateur de Box Shadow</h1>
          <p className="text-gray-600">Créez des ombres CSS personnalisées avec aperçu</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Aperçu */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {/*<Shadow className="w-5 h-5" />*/}
                <span>Aperçu</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                <div 
                  className="w-32 h-32 bg-white rounded-lg"
                  style={{ boxShadow: generateCSS() }}
                />
              </div>
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
        <Card className='relative'>
            <Button 
                variant="outline" 
                size="sm" 
                onClick={resetTransform}
                className="text-gray-800 absolute top-5 right-5 border-gray-300 hover:bg-gray-300 cursor-pointer"
            >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
            </Button>
            <CardHeader>
              <CardTitle>Paramètres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Ombres</Label>
                  <Button variant="outline" size="sm" onClick={addShadow} className='cursor-pointer'>
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter
                  </Button>
                </div>
                
                {shadowSettings.shadows.map((shadow, index) => (
                  <div key={shadow.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Ombre {index + 1}</span>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            checked={shadow.inset}
                            onChange={(e) => updateShadow(shadow.id, { inset: e.target.checked })}
                            className="rounded"
                          />
                          <span className="text-sm">Inset</span>
                        </label>
                        {shadowSettings.shadows.length > 1 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className='cursor-pointer'
                            onClick={() => removeShadow(shadow.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>X: {shadow.x}px</Label>
                        <Slider
                          value={[shadow.x]}
                          onValueChange={(value) => updateShadow(shadow.id, { x: value[0] })}
                          max={50}
                          min={-50}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Y: {shadow.y}px</Label>
                        <Slider
                          value={[shadow.y]}
                          onValueChange={(value) => updateShadow(shadow.id, { y: value[0] })}
                          max={50}
                          min={-50}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Blur: {shadow.blur}px</Label>
                        <Slider
                          value={[shadow.blur]}
                          onValueChange={(value) => updateShadow(shadow.id, { blur: value[0] })}
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Spread: {shadow.spread}px</Label>
                        <Slider
                          value={[shadow.spread]}
                          onValueChange={(value) => updateShadow(shadow.id, { spread: value[0] })}
                          max={50}
                          min={-50}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label>Couleur:</Label>
                      <ColorPicker 
                        color={shadow.color.substring(0, 7)}
                        onChange={(color) => updateShadow(shadow.id, { color })}
                      />
                      <Input 
                        value={shadow.color}
                        onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                        placeholder="#000000"
                        className="flex-1"
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
              <CardTitle>Ombres prédéfinies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {presetShadows.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="p-3 cursor-pointer rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{preset.name}</span>
                      <div 
                        className="w-8 h-8 bg-white rounded"
                        style={{ 
                          boxShadow: preset.shadows.map(shadow => {
                            const insetStr = shadow.inset ? 'inset ' : ''
                            return `${insetStr}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
                          }).join(', ')
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}