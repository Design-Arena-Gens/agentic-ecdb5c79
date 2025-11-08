export const metadata = {
  title: "Text-to-Video Prompt Generator",
  description: "Craft vivid, production-ready prompts for text-to-video models"
};

import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div className="brand">
              <span className="logo">??</span>
              <div>
                <h1>Text-to-Video Prompt Generator</h1>
                <p className="tagline">Compose cinematic prompts for Sora, Pika, Runway, and more</p>
              </div>
            </div>
            <a className="gh" href="https://vercel.com" target="_blank" rel="noreferrer">Deployed on Vercel</a>
          </header>
          <main className="app-main">{children}</main>
          <footer className="app-footer">Built for fast deployment on Vercel ? MIT</footer>
        </div>
      </body>
    </html>
  );
}
