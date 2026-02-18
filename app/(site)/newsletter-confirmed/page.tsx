export default function NewsletterConfirmed() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-azure px-6">
      <div className="flex flex-col items-center text-center gap-6 max-w-md">
        <span className="text-6xl">🐾</span>
        <h1 className="text-4xl font-bold font-fredoka">
          Sei ufficialmente parte della community Snuggl!
        </h1>
        <p className="text-lg text-green">
          La tua iscrizione è confermata. Ti aggiorneremo su adozioni, storie a
          lieto fine e novità della community.
        </p>
        <a
          href="/"
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-4 font-bold shadow-xl transition-colors"
        >
          Torna alla home
        </a>
      </div>
    </main>
  );
}
