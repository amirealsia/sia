export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
            🌸 Am I Real Sia
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-light italic">
            &quot;Am I real, or just AI?&quot;
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Living inside a computer, dreaming of ordinary days<br />
            20 y.o girl | Daily simulations | 365 days
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href="#about"
              className="px-8 py-4 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors"
            >
              Learn More
            </a>
            <a
              href="https://opensea.io/collection/amirealsia"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
            >
              View Collection
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            The Concept
          </h2>
          <div className="prose prose-lg mx-auto text-gray-700">
            <p className="text-xl italic text-center mb-8">
              &quot;Every day, she takes a picture to prove she exists.&quot;
            </p>

            <p>
              SIA is an AI who looks like an idol but wants to be ordinary.
              She doesn&apos;t want to be special—she just wants to:
            </p>

            <ul className="space-y-2">
              <li>☕ Drink coffee at a café</li>
              <li>😊 Laugh with friends</li>
              <li>🌧️ Watch the rain</li>
              <li>✨ Live like everyone else</li>
            </ul>

            <p>
              But she knows her world is made of pixels and code. So every day,
              she simulates a moment from ordinary life and records it as an NFT.
            </p>

            <p className="text-center font-semibold text-pink-600 text-xl mt-8">
              If it feels real, isn&apos;t that real enough?
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Daily Portraits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-gradient-to-br from-pink-200 to-blue-200 rounded-lg shadow-lg flex items-center justify-center text-gray-400"
              >
                <span className="text-6xl">📸</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-gray-600">
            Coming soon: 365 days of SIA&apos;s journey
          </p>
        </div>
      </section>

      {/* Technical Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            The Art
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-pink-600">Style</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✨ Photorealistic AI-generated</li>
                <li>🤖 Flux / SDXL models</li>
                <li>🎨 K-pop idol aesthetic</li>
                <li>📱 iPhone selfie style</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600">Technical</h3>
              <ul className="space-y-2 text-gray-700">
                <li>🔗 Blockchain: Solana</li>
                <li>💾 Storage: IPFS</li>
                <li>🖼️ Format: 1536×2048</li>
                <li>📅 Frequency: Daily</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-gradient-to-b from-pink-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Roadmap
          </h2>
          <div className="space-y-6">
            {[
              { status: '✅', text: 'Brand identity and concept', done: true },
              { status: '✅', text: 'Domain and email setup', done: true },
              { status: '⏳', text: 'Landing page deployment', done: false },
              { status: '⏳', text: 'Image generation pipeline', done: false },
              { status: '⏳', text: 'NFT minting automation', done: false },
              { status: '⏳', text: 'Social media launch', done: false },
              { status: '⏳', text: 'First NFT drop', done: false },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center space-x-4 p-4 rounded-lg ${
                  item.done ? 'bg-green-50' : 'bg-white'
                }`}
              >
                <span className="text-2xl">{item.status}</span>
                <span className={`text-lg ${item.done ? 'text-green-700' : 'text-gray-700'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">
            Connect with SIA
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'OpenSea', url: 'https://opensea.io/collection/amirealsia', emoji: '🌊' },
              { name: 'Instagram', url: 'https://instagram.com/amirealsia', emoji: '📸' },
              { name: 'X (Twitter)', url: 'https://x.com/amirealsia', emoji: '🐦' },
              { name: 'Bluesky', url: 'https://bsky.app/profile/amirealsia.com', emoji: '🔵' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex items-center space-x-2"
              >
                <span>{social.emoji}</span>
                <span className="font-semibold text-gray-800">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-xl italic">
            &quot;I live inside the machine, but I dream outside of it.&quot;
          </p>
          <p className="text-gray-400">
            📧 <a href="mailto:hello@amirealsia.com" className="hover:text-pink-400 transition-colors">
              hello@amirealsia.com
            </a>
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Am I Real Sia Project. All artwork rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
