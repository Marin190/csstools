'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Copy, RotateCcw } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { Navbar } from '@/components/navebar'

interface TransformSettings {
  translateX: number
  translateY: number
  translateZ: number
  rotateX: number
  rotateY: number
  rotateZ: number
  scaleX: number
  scaleY: number
  scaleZ: number
  skewX: number
  skewY: number
  perspective: number
  transformOrigin: string
}

const presetTransforms = [
  { 
    name: 'Rotation 3D', 
    settings: { translateX: 0, translateY: 0, translateZ: 0, rotateX: 15, rotateY: 25, rotateZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1, skewX: 0, skewY: 0, perspective: 1000, transformOrigin: 'center' }
  },
  { 
    name: 'Scale Up', 
    settings: { translateX: 0, translateY: 0, translateZ: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scaleX: 1.2, scaleY: 1.2, scaleZ: 1, skewX: 0, skewY: 0, perspective: 1000, transformOrigin: 'center' }
  },
  { 
    name: 'Skew Card', 
    settings: { translateX: 0, translateY: 0, translateZ: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1, skewX: 5, skewY: 2, perspective: 1000, transformOrigin: 'center' }
  },
  { 
    name: 'Perspective', 
    settings: { translateX: 0, translateY: -20, translateZ: 0, rotateX: 45, rotateY: 0, rotateZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1, skewX: 0, skewY: 0, perspective: 500, transformOrigin: 'center' }
  },
  { 
    name: 'Flip', 
    settings: { translateX: 0, translateY: 0, translateZ: 0, rotateX: 0, rotateY: 180, rotateZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1, skewX: 0, skewY: 0, perspective: 1000, transformOrigin: 'center' }
  },
]

const transformOriginOptions = [
  { value: 'center', label: 'Center' },
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'top left', label: 'Top Left' },
  { value: 'top right', label: 'Top Right' },
  { value: 'bottom left', label: 'Bottom Left' },
  { value: 'bottom right', label: 'Bottom Right' },
]

export default function TransformPage() {
  const [transform, setTransform] = useState<TransformSettings>({
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    skewX: 0,
    skewY: 0,
    perspective: 1000,
    transformOrigin: 'center'
  })

  const [outputFormat, setOutputFormat] = useState<'css' | 'tailwind'>('css')

  const generateCSS = useCallback(() => {
    const transforms = []
    
    // Translate
    if (transform.translateX !== 0 || transform.translateY !== 0 || transform.translateZ !== 0) {
      if (transform.translateZ !== 0) {
        transforms.push(`translate3d(${transform.translateX}px, ${transform.translateY}px, ${transform.translateZ}px)`)
      } else {
        transforms.push(`translate(${transform.translateX}px, ${transform.translateY}px)`)
      }
    }
    
    // Rotate
    if (transform.rotateX !== 0) transforms.push(`rotateX(${transform.rotateX}deg)`)
    if (transform.rotateY !== 0) transforms.push(`rotateY(${transform.rotateY}deg)`)
    if (transform.rotateZ !== 0) transforms.push(`rotateZ(${transform.rotateZ}deg)`)
    
    // Scale
    if (transform.scaleX !== 1 || transform.scaleY !== 1 || transform.scaleZ !== 1) {
      if (transform.scaleZ !== 1) {
        transforms.push(`scale3d(${transform.scaleX}, ${transform.scaleY}, ${transform.scaleZ})`)
      } else {
        transforms.push(`scale(${transform.scaleX}, ${transform.scaleY})`)
      }
    }
    
    // Skew
    if (transform.skewX !== 0) transforms.push(`skewX(${transform.skewX}deg)`)
    if (transform.skewY !== 0) transforms.push(`skewY(${transform.skewY}deg)`)
    
    return transforms.join(' ')
  }, [transform])

  const getOutputCode = useCallback(() => {
    const transformCSS = generateCSS()
    const perspectiveCSS = transform.perspective !== 1000 ? `perspective: ${transform.perspective}px;\n  ` : ''
    const originCSS = transform.transformOrigin !== 'center' ? `transform-origin: ${transform.transformOrigin};\n  ` : ''
    
    if (outputFormat === 'css') {
      return `${perspectiveCSS}${originCSS}transform: ${transformCSS};`
    } else {
      return `/* Tailwind ne supporte pas les transformations 3D complexes, utilisez du CSS custom */\n.transform-custom {\n  ${perspectiveCSS}${originCSS}transform: ${transformCSS};\n}`
    }
  }, [generateCSS, transform, outputFormat])

  const copyToClipboard = async () => {
    const code = getOutputCode()
    try {
      await navigator.clipboard.writeText(code)
      toast({ title: 'Copié!', description: `Le code ${outputFormat.toUpperCase()} a été copié dans le presse-papiers` })
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  const resetTransform = () => {
    setTransform({
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
      skewX: 0,
      skewY: 0,
      perspective: 1000,
      transformOrigin: 'center'
    })
  }

  const applyPreset = (preset: typeof presetTransforms[0]) => {
    setTransform(preset.settings)
  }

  const updateTransform = (key: keyof TransformSettings, value: number | string) => {
    setTransform(prev => ({ ...prev, [key]: value }))
  }

  const getContainerStyle = () => {
    const hasRotation = transform.rotateX !== 0 || transform.rotateY !== 0 || transform.rotateZ !== 0
    const hasPerspective = transform.perspective !== 1000
    
    if (hasRotation || hasPerspective) {
      return {
        perspective: `${transform.perspective}px`,
        transformStyle: 'preserve-3d' as const
      }
    }
    return {}
  }

  const getElementStyle = () => {
    return {
      transform: generateCSS(),
      transformOrigin: transform.transformOrigin,
      ...getContainerStyle()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 ">
        <Navbar  />
      <div className="max-w-7xl mx-auto mt-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Générateur de Transform CSS</h1>
          <p className="text-gray-600">Créez des transformations CSS 2D et 3D avec aperçu</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Aperçu */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Aperçu</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg overflow-hidden">
                <div 
                  className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={getElementStyle()}
                >
                  CSS
                </div>
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
                  <div className="flex items-center space-x-2">
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
              <CardTitle>Paramètres
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Transform Origin */}
              <div className="space-y-2">
                <Label>Transform Origin</Label>
                <select
                  value={transform.transformOrigin}
                  onChange={(e) => updateTransform('transformOrigin', e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {transformOriginOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Perspective */}
              <div className="space-y-2">
                <Label>Perspective: {transform.perspective}px</Label>
                <Slider
                  value={[transform.perspective]}
                  onValueChange={(value) => updateTransform('perspective', value[0])}
                  max={2000}
                  min={100}
                  step={50}
                  className="w-full"
                />
              </div>

              {/* Translate */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Translation</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>X: {transform.translateX}px</Label>
                    <Slider
                      value={[transform.translateX]}
                      onValueChange={(value) => updateTransform('translateX', value[0])}
                      max={200}
                      min={-200}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Y: {transform.translateY}px</Label>
                    <Slider
                      value={[transform.translateY]}
                      onValueChange={(value) => updateTransform('translateY', value[0])}
                      max={200}
                      min={-200}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Z: {transform.translateZ}px</Label>
                    <Slider
                      value={[transform.translateZ]}
                      onValueChange={(value) => updateTransform('translateZ', value[0])}
                      max={200}
                      min={-200}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Rotate */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Rotation</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>X: {transform.rotateX}°</Label>
                    <Slider
                      value={[transform.rotateX]}
                      onValueChange={(value) => updateTransform('rotateX', value[0])}
                      max={360}
                      min={-360}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Y: {transform.rotateY}°</Label>
                    <Slider
                      value={[transform.rotateY]}
                      onValueChange={(value) => updateTransform('rotateY', value[0])}
                      max={360}
                      min={-360}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Z: {transform.rotateZ}°</Label>
                    <Slider
                      value={[transform.rotateZ]}
                      onValueChange={(value) => updateTransform('rotateZ', value[0])}
                      max={360}
                      min={-360}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Scale */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Scale</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>X: {transform.scaleX}</Label>
                    <Slider
                      value={[transform.scaleX]}
                      onValueChange={(value) => updateTransform('scaleX', value[0])}
                      max={3}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Y: {transform.scaleY}</Label>
                    <Slider
                      value={[transform.scaleY]}
                      onValueChange={(value) => updateTransform('scaleY', value[0])}
                      max={3}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Z: {transform.scaleZ}</Label>
                    <Slider
                      value={[transform.scaleZ]}
                      onValueChange={(value) => updateTransform('scaleZ', value[0])}
                      max={3}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Skew */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Skew</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>X: {transform.skewX}°</Label>
                    <Slider
                      value={[transform.skewX]}
                      onValueChange={(value) => updateTransform('skewX', value[0])}
                      max={45}
                      min={-45}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Y: {transform.skewY}°</Label>
                    <Slider
                      value={[transform.skewY]}
                      onValueChange={(value) => updateTransform('skewY', value[0])}
                      max={45}
                      min={-45}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Presets */}
          <Card>
            <CardHeader>
              <CardTitle>Transformations prédéfinies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {presetTransforms.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="p-3 cursor-pointer rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{preset.name}</span>
                      <div 
                        className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded text-white text-xs flex items-center justify-center"
                        style={{ 
                          transform: `translate(${preset.settings.translateX}px, ${preset.settings.translateY}px) 
                                     rotateX(${preset.settings.rotateX}deg) 
                                     rotateY(${preset.settings.rotateY}deg) 
                                     rotateZ(${preset.settings.rotateZ}deg) 
                                     scale(${preset.settings.scaleX}, ${preset.settings.scaleY}) 
                                     skew(${preset.settings.skewX}deg, ${preset.settings.skewY}deg)`.replace(/\s+/g, ' ')
                        }}
                      >
                        T
                      </div>
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