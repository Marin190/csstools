export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Politique de Confidentialité
        </h1>

        <main className="space-y-6 text-sm leading-7">
          <section>
            <h2 className="text-lg font-medium mb-2">Aucune collecte de données personnelles</h2>
            <p>
              Le site ne collecte, ne stocke et ne traite aucune donnée personnelle identifiable. Aucun formulaire, compte ou espace utilisateur n’est proposé.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2">Cookies et publicité</h2>
            <p>
              Le site utilise Google Ads. Google et ses partenaires peuvent déposer des cookies pour personnaliser les annonces selon votre navigation.
            </p>
            <p>
              Pour plus d’informations, consultez :{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                policies.google.com/technologies/ads
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2">Gestion des cookies</h2>
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies, ou utiliser des extensions pour les bloquer.
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
