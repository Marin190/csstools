import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CSS Tools',
  description: 'Créez facilement des models CSS personnalisés',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9078985664217000" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}