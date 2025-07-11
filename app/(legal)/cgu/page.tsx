export default function CGU() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Conditions Générales d’Utilisation
        </h1>

        <main className="space-y-6 text-sm leading-7">
          <section>
            <h2 className="text-lg font-medium mb-2">1. Objet</h2>
            <p>
              Les présentes CGU définissent les conditions d’utilisation du site ossip.ovh.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2">2. Acceptation</h2>
            <p>
              L’utilisation du site implique l’acceptation pleine et entière des présentes CGU. Si vous n’acceptez pas, veuillez quitter le site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2">3. Accès au site</h2>
            <p>
              Le site est accessible gratuitement. L’éditeur ne peut garantir l’absence d’interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2">4. Publicité et Cookies</h2>
            <p>
              Ce site utilise Google Ads. Des cookies peuvent être déposés par des tiers à des fins de personnalisation publicitaire. Consultez la Politique de Confidentialité pour plus d’informations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2">5. Droit applicable</h2>
            <p>
              Ces CGU sont soumises au droit français. Tout litige sera traité par les tribunaux compétents.
            </p>
          </section>
        </main>

        <footer className="mt-12 text-xs text-center text-gray-500">
          © {new Date().getFullYear()} CSSTools. Tous droits réservés.
        </footer>
      </div>
    </div>
  );
}
