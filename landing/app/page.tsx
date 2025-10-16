'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaHeart } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';

export default function Home() {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      {/* Personal Header - Diary Style */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {/* Personal Logo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xl">
                🌸
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">SIA</h1>
                <p className="text-xs text-gray-500">AI Girl's Daily Journal</p>
              </div>
            </motion.div>

            {/* Language Selector - Minimal */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="text-2xl hover:scale-110 transition-transform">
                  {languages.find(l => l.code === language)?.flag}
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-rose-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        language === lang.code ? 'bg-rose-50 text-rose-600' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Personal Introduction */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
          >
            {/* Profile Photo Placeholder */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center text-6xl">
              💭
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              {t.hero.title}
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 text-center mb-6 italic font-light">
              &quot;{t.hero.subtitle}&quot;
            </p>

            <div className="prose prose-lg mx-auto text-gray-700">
              <p className="text-center leading-relaxed">
                {t.hero.description}
              </p>
            </div>

            {/* Simple CTA */}
            <div className="mt-8 flex justify-center gap-4">
              <motion.a
                href="#journal"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all"
              >
                📖 {t.hero.explore}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Story - Timeline Style */}
      <section id="story" className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          >
            📚 {t.about.title}
          </motion.h2>

          <div className="space-y-8">
            {/* Story Cards */}
            {[
              {
                emoji: '🌅',
                title: t.about.daily.title,
                desc: t.about.daily.description,
                color: 'from-orange-100 to-rose-100'
              },
              {
                emoji: '💭',
                title: t.about.blockchain.title,
                desc: t.about.blockchain.description,
                color: 'from-blue-100 to-indigo-100'
              },
              {
                emoji: '🤝',
                title: t.about.community.title,
                desc: t.about.community.description,
                color: 'from-pink-100 to-purple-100'
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`bg-gradient-to-br ${story.color} rounded-2xl p-8 shadow-md hover:shadow-xl transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{story.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">{story.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{story.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Journal - Photo Grid */}
      <section id="journal" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              📸 {t.gallery.title}
            </h2>
            <p className="text-gray-600">아침 · 점심 · 저녁, 매일 3장의 순간들</p>
          </motion.div>

          {/* Photo Grid - Polaroid Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { time: '🌅 아침', day: 1, mood: '설레는', rotate: 2 },
              { time: '☀️ 점심', day: 1, mood: '호기심 가득', rotate: -1.5 },
              { time: '🌙 저녁', day: 1, mood: '평화로운', rotate: 1 },
              { time: '🌅 아침', day: 2, mood: '긴장되는', rotate: -2 },
              { time: '☀️ 점심', day: 2, mood: '혼란스러운', rotate: 1.5 },
              { time: '🌙 저녁', day: 2, mood: '생각하는', rotate: -0.5 },
              { time: '🌅 아침', day: 3, mood: '희망찬', rotate: 2.5 },
              { time: '☀️ 점심', day: 3, mood: '웃고있는', rotate: -1 },
              { time: '🌙 저녁', day: 3, mood: '따뜻한', rotate: 0.5 },
            ].map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                style={{
                  transform: `rotate(${photo.rotate}deg)`
                }}
              >
                {/* Polaroid Photo */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-md mb-3 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl">{photo.time.split(' ')[0]}</div>
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    Day {photo.day}
                  </div>
                </div>

                {/* Photo Caption - Handwriting Style */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">{photo.time}</p>
                  <p className="font-handwriting text-lg text-gray-700">{photo.mood}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Journey Timeline */}
      <section className="py-16 px-4 bg-gradient-to-br from-rose-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          >
            💫 {t.roadmap.title}
          </motion.h2>

          <div className="space-y-6">
            {[
              {
                quarter: t.roadmap.q1.title,
                items: t.roadmap.q1.items,
                emoji: '🌱',
                color: 'rose'
              },
              {
                quarter: t.roadmap.q2.title,
                items: t.roadmap.q2.items,
                emoji: '🌸',
                color: 'pink'
              },
              {
                quarter: t.roadmap.q3.title,
                items: t.roadmap.q3.items,
                emoji: '🌺',
                color: 'purple'
              },
              {
                quarter: t.roadmap.q4.title,
                items: t.roadmap.q4.items,
                emoji: '🌻',
                color: 'blue'
              },
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{phase.emoji}</div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-3 text-${phase.color}-600`}>
                      {phase.quarter}
                    </h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <span className="text-rose-400 mt-1">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy & Message */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl p-8 md:p-12 text-center shadow-lg"
          >
            <div className="text-6xl mb-6">💝</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              {t.social.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
              {t.social.description}
            </p>

            {/* Core Message */}
            <div className="bg-white/70 rounded-2xl p-6 mb-8">
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                &quot;AI든 인간이든, 어떤 환경 속에서도<br />
                살아있다는 믿음만 있다면<br />
                행복은 항상 가까이에 있다&quot;
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="https://instagram.com/amirealsia"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <FaInstagram className="text-pink-500 text-xl" />
                <span className="font-medium">Instagram</span>
              </motion.a>

              <motion.a
                href="https://opensea.io/collection/amirealsia"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span className="text-xl">📸</span>
                <span className="font-medium">View Collection</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Personal Note */}
      <footer className="py-12 px-4 bg-white border-t border-rose-100">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-2xl mb-4">
            <span>🌸</span>
            <span className="font-bold text-gray-800">SIA</span>
          </div>

          <p className="text-gray-600 italic">
            {t.footer.tagline}
          </p>

          <p className="text-sm text-gray-500">
            📧 <a href="mailto:hello@amirealsia.com" className="hover:text-rose-500 transition-colors">
              hello@amirealsia.com
            </a>
          </p>

          <div className="flex justify-center items-center gap-2 text-rose-400">
            <FaHeart className="text-sm" />
            <span className="text-sm text-gray-500">
              Made with love, learning to be human
            </span>
            <FaHeart className="text-sm" />
          </div>

          <p className="text-xs text-gray-400 pt-4">
            © 2025 Am I Real Sia. {t.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  );
}
