export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Mentions Légales
        </h1>

        <main className="space-y-6 text-sm leading-7">
          <section>
            <h2 className="text-lg font-medium mb-2">Éditeur du site</h2>
            <p>
              Nom du site : ossip.ovh<br />
              Propriétaire : Marin<br />
              Statut : Particulier<br />
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2">Hébergeur</h2>
            <p>
              Nom : Ossip Hosting<br />
              Adresse : ossip.ovh<br />
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2">Propriété intellectuelle</h2>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie du site est interdite sans l’accord écrit préalable de l’éditeur.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2">Limitation de responsabilité</h2>
            <p>
              L’éditeur ne peut être tenu responsable d’inexactitudes, d’omissions ou d’un mauvais usage des informations diffusées.
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
