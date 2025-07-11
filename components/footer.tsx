import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} CSSTools. Tous droits réservés.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link 
              href="/mentions-legales" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Mentions légales
            </Link>
            <Link 
              href="/politique-confidentialite" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link 
              href="/cgu" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}