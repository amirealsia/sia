'use client';

import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa';
import { SiOpensea } from 'react-icons/si';

export default function Home() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent"
            >
              🌸 {t('hero.title')}
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                {t('about.title')}
              </a>
              <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">
                {t('gallery.title')}
              </a>
              <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors">
                {t('roadmap.title')}
              </a>
              <LanguageSwitcher />
              <motion.a
                href="https://opensea.io/collection/amirealsia"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
              >
                {t('hero.mintButton')}
              </motion.a>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm font-semibold mb-4"
            >
              365-Day AI Art Journey
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl text-gray-400 font-light italic"
            >
              &quot;{t('hero.subtitle')}&quot;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            >
              <motion.a
                href="#gallery"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full font-semibold text-white shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  {t('hero.exploreButton')}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.a>

              <motion.a
                href="https://opensea.io/collection/amirealsia"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-full font-semibold text-white hover:bg-gray-700 transition-all"
              >
                {t('hero.mintButton')}
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-gray-800"
            >
              <div>
                <div className="text-3xl md:text-4xl font-bold text-pink-400">365</div>
                <div className="text-sm text-gray-500 mt-1">Unique NFTs</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-400">Solana</div>
                <div className="text-sm text-gray-500 mt-1">Blockchain</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-400">Daily</div>
                <div className="text-sm text-gray-500 mt-1">New Drops</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-gray-500">Scroll to explore</span>
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('about.title')}
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {t('about.description')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '📅', title: t('about.dailyArt'), desc: t('about.dailyArtDesc'), color: 'pink' },
                { icon: '⚡', title: t('about.blockchain'), desc: t('about.blockchainDesc'), color: 'blue' },
                { icon: '🤝', title: t('about.community'), desc: t('about.communityDesc'), color: 'purple' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
                  <div className="relative">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className={`text-xl font-bold mb-2 text-${feature.color}-400`}>{feature.title}</h3>
                    <p className="text-gray-500">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('gallery.title')}
            </h2>
            <p className="text-xl text-gray-400">Coming soon: Daily AI-generated portraits</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-pink-500/20 to-blue-500/20 border border-gray-800"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📸</div>
                    <div className="text-sm text-gray-500">Day {item}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-semibold mb-1">Day {item}</h3>
                    <p className="text-gray-300 text-sm">Am I Real Sia</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <a
              href="https://opensea.io/collection/amirealsia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
            >
              {t('gallery.viewAll')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-32 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('technical.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { label: t('technical.blockchain'), value: t('technical.blockchainValue'), color: 'pink' },
              { label: t('technical.supply'), value: t('technical.supplyValue'), color: 'blue' },
              { label: t('technical.format'), value: t('technical.formatValue'), color: 'purple' },
              { label: t('technical.metadata'), value: t('technical.metadataValue'), color: 'green' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-900 rounded-2xl border border-gray-800 text-center"
              >
                <h3 className="text-sm text-gray-500 mb-2">{item.label}</h3>
                <p className="text-xl font-bold text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-32 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('roadmap.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {['q1', 'q2', 'q3', 'q4'].map((quarter, qIndex) => (
              <motion.div
                key={quarter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: qIndex * 0.1 }}
                className="p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-pink-500/50 transition-all"
              >
                <h3 className="text-xl font-bold mb-6 text-pink-400">
                  {t(`roadmap.${quarter}.title`)}
                </h3>
                <ul className="space-y-3">
                  {[0, 1, 2, 3].map((index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-400 text-sm">
                      <svg className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{t(`roadmap.${quarter}.items.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social/Community */}
      <section className="py-32 bg-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('social.title')}
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              {t('social.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'OpenSea', url: 'https://opensea.io/collection/amirealsia', icon: SiOpensea },
                { name: 'Instagram', url: 'https://instagram.com/amirealsia', icon: FaInstagram },
                { name: 'X (Twitter)', url: 'https://x.com/amirealsia', icon: FaTwitter },
                { name: 'Discord', url: 'https://discord.gg/amirealsia', icon: FaDiscord },
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-3 px-6 py-3 bg-gray-900 border border-gray-800 rounded-full hover:border-pink-500/50 transition-all"
                >
                  <social.icon className="text-xl" />
                  <span className="font-semibold">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              🌸 {t('hero.title')}
            </div>
            <p className="text-gray-500 italic">
              &quot;{t('hero.subtitle')}&quot;
            </p>
            <p className="text-gray-600">
              📧 <a href="mailto:hello@amirealsia.com" className="hover:text-pink-400 transition-colors">
                hello@amirealsia.com
              </a>
            </p>
            <p className="text-gray-700 text-sm pt-4">
              {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
