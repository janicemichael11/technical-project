// components/DownloadSection.jsx
const BACKEND_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const STEPS = [
  { n: '1', text: 'Click "Download Extension" below' },
  { n: '2', text: 'Extract the ZIP file to a folder' },
  { n: '3', text: 'Open Chrome → go to chrome://extensions' },
  { n: '4', text: 'Enable "Developer Mode" (top right toggle)' },
  { n: '5', text: 'Click "Load Unpacked" → select the extracted folder' },
];

export default function DownloadSection() {
  return (
    <section id="download-extension" className="relative overflow-hidden border-t border-white/5 py-20 px-4"
             style={{ background: 'rgba(255,255,255,0.01)' }}>

      {/* Floating glow shapes */}
      <div className="pointer-events-none absolute -top-20 left-1/4 w-72 h-72 rounded-full
                      bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-64 h-64 rounded-full
                      bg-blue-500/15 blur-3xl" />

      <div className="relative max-w-3xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass text-purple-200
                        text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
          🧩 Browser Extension
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
          Install{' '}
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-pink-400
                           bg-clip-text text-transparent">
            PricePulse
          </span>
          {' '}Extension
        </h2>

        <p className="text-white/50 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Compare prices instantly while shopping online works on Amazon, Flipkart, eBay &amp; Etsy.
        </p>

        {/* Glassmorphism card */}
        <div className="glass rounded-3xl p-8 sm:p-10 shadow-2xl mb-10 text-left">

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href={`${BACKEND_URL}/download-extension`}
              className="btn-gradient flex items-center justify-center gap-2 text-white
                         font-bold px-8 py-3.5 rounded-2xl text-sm tracking-wide shadow-lg"
            >
              <span>⬇</span> Download Extension
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center justify-center gap-2 text-white/80
                         hover:text-white font-semibold px-8 py-3.5 rounded-2xl text-sm
                         tracking-wide transition-all hover:bg-white/10"
            >
              <span>⭐</span> View on GitHub
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-8" />

          {/* Installation steps */}
          <h3 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-5 text-center">
            How to Install
          </h3>
          <div className="space-y-3">
            {STEPS.map((s) => (
              <div key={s.n} className="flex items-center gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full btn-gradient
                                 flex items-center justify-center text-white text-xs font-black
                                 shadow-lg">
                  {s.n}
                </span>
                <p className="text-white/60 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <p className="text-white/25 text-xs tracking-wide">
          Currently supports Chrome and Chromium-based browsers (Edge, Brave, Arc)
        </p>
      </div>
    </section>
  );
}
