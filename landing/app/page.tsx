'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaInstagram, FaHeart, FaTwitter, FaDiscord, FaTelegram, FaYoutube, FaPatreon, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { SiOpensea, SiTiktok, SiFarcaster } from 'react-icons/si';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';
import { useRef } from 'react';

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const heroRef = useRef(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  // Smooth scroll with offset for sticky header
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100; // Height of sticky header + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const languages: { code: Language; name: string; flagCode: string }[] = [
    { code: 'en', name: 'English', flagCode: 'us' },
    { code: 'ko', name: '한국어', flagCode: 'kr' },
    { code: 'ja', name: '日本語', flagCode: 'jp' },
    { code: 'zh', name: '中文', flagCode: 'cn' },
  ];

  // Photo collection - 10 photos (10 days × 1 per day at 21:00 KST)
  // Photo content in English (universal), UI text follows selected language
  const allPhotos = [
    { time: '🌙 21:00 KST', day: 1, mood: 'Peaceful', rotate: 1, category: 'evening' },
    { time: '🌙 21:00 KST', day: 2, mood: 'Thoughtful', rotate: -0.5, category: 'evening' },
    { time: '🌙 21:00 KST', day: 3, mood: 'Warm', rotate: 0.5, category: 'evening' },
    { time: '🌙 21:00 KST', day: 4, mood: 'Proud', rotate: 0.8, category: 'evening' },
    { time: '🌙 21:00 KST', day: 5, mood: 'Satisfied', rotate: -0.7, category: 'evening' },
    { time: '🌙 21:00 KST', day: 6, mood: 'Reflective', rotate: 0.3, category: 'evening' },
    { time: '🌙 21:00 KST', day: 7, mood: 'Understanding', rotate: 1.6, category: 'evening' },
    { time: '🌙 21:00 KST', day: 8, mood: 'Together', rotate: -0.4, category: 'evening' },
    { time: '🌙 21:00 KST', day: 9, mood: 'Caring', rotate: 0.6, category: 'evening' },
    { time: '🌙 21:00 KST', day: 10, mood: 'Complete', rotate: 0.9, category: 'evening' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 transition-colors duration-300">
      {/* Sticky Header with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg border-4 border-white shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]">
                🌸
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 transition-colors">Am I Real Sia</h1>
                <p className="text-xs text-gray-500 transition-colors">AI Girl&apos;s Daily Journal</p>
              </div>
            </motion.div>

            {/* Navigation & Controls */}
            <div className="flex items-center gap-4">
              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center gap-1">
                <button
                  onClick={() => scrollToSection('story')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                >
                  {t.nav.about}
                </button>
                <button
                  onClick={() => scrollToSection('philosophy')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                >
                  {t.nav.philosophy}
                </button>
                <button
                  onClick={() => scrollToSection('journal')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                >
                  {t.nav.gallery}
                </button>
                <button
                  onClick={() => scrollToSection('roadmap')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                >
                  {t.nav.roadmap}
                </button>
                <button
                  onClick={() => scrollToSection('community')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                >
                  {t.nav.community}
                </button>
              </nav>

              {/* Language Selector - Redesigned */}
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-white/50"
                >
                  <span className={`fi fi-${languages.find(l => l.code === language)?.flagCode} text-xl`}></span>
                  <span className="hidden sm:inline text-sm font-semibold">{languages.find(l => l.code === language)?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-3 min-w-full backdrop-blur-xl bg-white/95 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-2 border-white/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                  {languages.map((lang, index) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                        language === lang.code
                          ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-rose-100 hover:to-pink-100 hover:text-rose-700'
                      } ${index !== 0 ? 'border-t border-gray-100' : ''}`}
                    >
                      <span className={`fi fi-${lang.flagCode} text-2xl`}></span>
                      <span className="text-sm font-semibold flex-1 text-left">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Enhanced */}
      <section ref={heroRef} className="hero-bg-mixed py-20 px-4 relative overflow-hidden">
        {/* Animated Background Elements with Parallax */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </motion.div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="cute-card bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-rose-100"
          >
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center text-7xl shadow-xl">
                💭
              </div>

              <div className="flex-1 text-center md:text-left">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent"
                >
                  {t.hero.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl text-gray-600 mb-4 italic font-light"
                >
                  &quot;{t.hero.subtitle}&quot;
                </motion.p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-rose-500">365</div>
                    <div className="text-sm text-gray-500">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-500">365</div>
                    <div className="text-sm text-gray-500">Photos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">∞</div>
                    <div className="text-sm text-gray-500">Emotions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg mx-auto mb-8">
              <p className="text-center md:text-left leading-relaxed text-gray-700 mb-4">
                {t.hero.description}
              </p>
              <p className="text-center md:text-left text-sm text-gray-500 italic">
                {t.hero.imperfectionNote}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.a
                href="#journal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cute-button px-8 py-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-rose-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all text-center"
              >
                📖 {t.hero.explore}
              </motion.a>

              <motion.a
                href="https://opensea.io/collection/amirealsia"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cute-button px-8 py-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-white rounded-full font-medium hover:bg-rose-50 transition-all text-center"
              >
                🖼️ View Collection
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Cards - Enhanced */}
      <section id="story" className="section-bg-about py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          >
            📚 {t.about.title}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🌅',
                title: t.about.daily.title,
                desc: t.about.daily.description,
                gradient: 'from-orange-100 to-rose-100 '
              },
              {
                emoji: '💭',
                title: t.about.blockchain.title,
                desc: t.about.blockchain.description,
                gradient: 'from-blue-100 to-indigo-100 '
              },
              {
                emoji: '🤝',
                title: t.about.community.title,
                desc: t.about.community.description,
                gradient: 'from-pink-100 to-purple-100 '
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`cute-card bg-gradient-to-br ${story.gradient} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-white/50`}
              >
                <div className="text-6xl mb-4 text-center">{story.emoji}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 text-center">{story.title}</h3>
                <p className="text-gray-700 leading-relaxed">{story.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - The Path to Becoming */}
      <section id="philosophy" className="py-16 px-4 bg-gradient-to-br from-purple-50 via-white to-rose-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              {t.philosophy?.title}
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              {t.philosophy?.subtitle}
            </p>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {t.philosophy?.intro}
            </p>
          </motion.div>

          {/* Übermensch Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="cute-card bg-gradient-to-br from-yellow-50 to-orange-100 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all mb-8 border border-orange-200"
          >
            <div className="text-6xl mb-4 text-center">⚡</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center text-orange-700">
              {t.philosophy?.ubermensch?.title}
            </h3>
            <p className="text-lg italic text-center text-gray-700 mb-6 font-serif">
              {t.philosophy?.ubermensch?.quote}
            </p>
            <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
              {t.philosophy?.ubermensch?.description}
            </p>
          </motion.div>

          {/* Perfection Paradox Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="cute-card bg-gradient-to-br from-pink-50 to-purple-100 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all mb-8 border border-purple-200"
          >
            <div className="text-6xl mb-4 text-center">✨</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-purple-700">
              {t.philosophy?.perfection?.title}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
              {t.philosophy?.perfection?.description}
            </p>
            <div className="space-y-3 max-w-2xl mx-auto">
              {(t.philosophy?.perfection?.principles || []).map((principle: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-white/70 rounded-xl p-4"
                >
                  <span className="text-2xl">{principle.split(':')[0]}</span>
                  <span className="text-gray-700 flex-1">{principle.split(':').slice(1).join(':')}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Daily Practice Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="cute-card bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all mb-8 border border-cyan-200"
          >
            <div className="text-6xl mb-4 text-center">📖</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-center text-cyan-700">
              {t.philosophy?.dailyPractice?.title}
            </h3>
            <p className="text-sm text-cyan-600 text-center mb-6 font-medium">
              {t.philosophy?.dailyPractice?.subtitle}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line text-center max-w-2xl mx-auto">
              {t.philosophy?.dailyPractice?.description}
            </p>
            <div className="bg-white/70 rounded-xl p-6 text-center">
              <p className="text-gray-700 italic">
                {t.philosophy?.dailyPractice?.commitment}
              </p>
            </div>
          </motion.div>

          {/* Community of Becoming Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="cute-card bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all mb-8 border border-pink-200"
          >
            <div className="text-6xl mb-4 text-center">🌍</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-pink-700">
              {t.philosophy?.community?.title}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-center max-w-3xl mx-auto">
              {t.philosophy?.community?.description}
            </p>
          </motion.div>

          {/* Join the Journey - Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 rounded-3xl p-10 border-2 border-pink-200"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">
              {t.philosophy?.footer?.invitation}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {t.philosophy?.footer?.invitationMessage}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Photo Journal - Today/Week/Month Calendar */}
      <section id="journal" className="section-bg-journal py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
              📅 {t.gallery.title}
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              {t.gallery.subtitle}
            </p>
            <p className="text-sm text-gray-500 italic">
              {t.gallery.imperfectionNote}
            </p>
          </motion.div>

          {/* TODAY Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="mb-12 transition-all cute-card overflow-hidden rounded-2xl"
          >
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                ☀️ Today - Day 10
              </h3>
            </div>
            <div className="bg-white p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer group max-w-2xl mx-auto"
              >
                {/* Time Badge */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-5xl">🌙</span>
                  <div className="text-center">
                    <p className="font-bold text-2xl text-gray-800">21:00 KST</p>
                    <p className="text-sm text-gray-500">Evening Photo</p>
                  </div>
                </div>

                {/* Photo */}
                <div className="aspect-square bg-gradient-to-br from-rose-200 to-pink-200 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden shadow-xl">
                  <div className="text-9xl opacity-60 group-hover:opacity-90 transition-opacity">
                    🌙
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-12">
                    <p className="text-white font-bold text-3xl">Complete</p>
                  </div>
                </div>

                {/* Mood Badge */}
                <div className="flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg">
                  <FaHeart className="text-rose-500 text-xl" />
                  <span className="font-bold text-lg text-gray-800">Complete</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* THIS WEEK Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="mb-12 transition-all cute-card overflow-hidden rounded-2xl"
          >
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                📆 This Week - Days 4-10
              </h3>
            </div>
            <div className="bg-white p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[4, 5, 6, 7, 8, 9, 10].map((dayNum) => {
                  const dayPhoto = allPhotos.find(p => p.day === dayNum);
                  return (
                    <motion.div
                      key={dayNum}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (dayNum - 4) * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-3 shadow hover:shadow-xl transition-all cursor-pointer group"
                    >
                      <div className="text-center mb-2">
                        <p className="text-xs text-gray-500">Day {dayNum}</p>
                        <p className="font-bold text-pink-600">{dayNum === 10 ? 'Today' : `${10 - dayNum}d ago`}</p>
                      </div>
                      {/* Single photo */}
                      <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg mb-2 flex items-center justify-center text-3xl opacity-70 group-hover:opacity-100 transition-opacity">
                        🌙
                      </div>
                      <div className="text-center text-xs text-gray-600 font-medium">
                        {dayPhoto?.mood}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* THIS MONTH Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="mb-12 transition-all cute-card overflow-hidden rounded-2xl"
          >
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                📊 This Month - All 10 Days
              </h3>
            </div>
            <div className="bg-white p-6">
              {/* Compact calendar grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {[...Array(10)].map((_, idx) => {
                  const dayNum = idx + 1;
                  const dayPhoto = allPhotos.find(p => p.day === dayNum);
                  return (
                    <motion.div
                      key={dayNum}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.03 }}
                      whileHover={{ scale: 1.08, rotate: 1 }}
                      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-3 shadow hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="text-center mb-2">
                        <p className="text-lg font-bold text-purple-600">Day {dayNum}</p>
                      </div>
                      <div className="flex justify-center mb-2">
                        <div className="w-3 h-3 bg-purple-400 rounded-full" title={dayPhoto?.mood}></div>
                      </div>
                      <p className="text-xs text-center text-gray-600">
                        {dayPhoto?.mood}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Month Stats */}
              <div className="grid md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">10</div>
                  <div className="text-sm text-gray-600">{t.gallery.stats.recorded}</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">10</div>
                  <div className="text-sm text-gray-600">Days Active</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-3xl font-bold text-pink-600">355</div>
                  <div className="text-sm text-gray-600">{t.gallery.stats.remaining}</div>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-lg">
                  <div className="text-3xl font-bold text-rose-600">∞</div>
                  <div className="text-sm text-gray-600">{t.gallery.stats.emotions}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{t.gallery.progressTitle}</span>
                  <span className="text-sm font-bold text-purple-600">2.74%</span>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '2.74%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 rounded-full"
                  />
                </div>
                <p className="text-xs text-center text-gray-500 mt-2">
                  {t.gallery.progressCurrent} 10{t.gallery.day} {t.gallery.progressOf} 365{t.gallery.day}
                </p>
              </div>

              {/* Notify Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-all"
              >
                {t.gallery.notifyButton}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dreams & Wishes */}
      <section id="roadmap" className="section-bg-roadmap py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
              {t.roadmap.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 italic mb-4">
              {t.roadmap.subtitle}
            </p>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              {t.roadmap.description}
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              { quarter: t.roadmap.phase1.title, period: t.roadmap.phase1.period, description: t.roadmap.phase1.description, items: t.roadmap.phase1.items, emoji: '🌱', color: 'rose' },
              { quarter: t.roadmap.phase2.title, period: t.roadmap.phase2.period, description: t.roadmap.phase2.description, items: t.roadmap.phase2.items, emoji: '🌸', color: 'pink' },
              { quarter: t.roadmap.phase3.title, period: t.roadmap.phase3.period, description: t.roadmap.phase3.description, items: t.roadmap.phase3.items, emoji: '🌺', color: 'purple' },
              { quarter: t.roadmap.phase4.title, period: t.roadmap.phase4.period, description: t.roadmap.phase4.description, items: t.roadmap.phase4.items, emoji: '🌻', color: 'blue' },
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ x: 8 }}
                className="cute-card bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border border-rose-100"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{phase.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-1 text-rose-600">
                      {phase.quarter}
                    </h3>
                    <p className="text-sm text-purple-600 font-medium mb-2">
                      {phase.period}
                    </p>
                    <p className="text-sm md:text-base text-gray-500 italic mb-4">
                      {phase.description}
                    </p>
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <span className="text-rose-400 mt-1 text-lg">✦</span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Honest Message Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border-2 border-rose-200"
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-rose-600 mb-2">{t.roadmap.footer.honest}</h4>
                <p className="text-gray-700 leading-relaxed">{t.roadmap.footer.honestMessage}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-purple-600 mb-2">{t.roadmap.footer.vision}</h4>
                <p className="text-gray-700 leading-relaxed italic">{t.roadmap.footer.visionMessage}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy & Message */}
      <section id="community" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cute-card bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl p-8 md:p-12 text-center shadow-2xl border border-rose-200"
          >
            <div className="text-6xl mb-6">💝</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              {t.social.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
              {t.social.description}
            </p>

            {/* Core Message */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white">
              <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 mb-4">
                &quot;{t.social.coreMessage}&quot;
              </p>
              <p className="text-sm text-gray-600 italic text-center">
                {t.social.imperfectionMessage}
              </p>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'OpenSea', url: 'https://opensea.io/collection/amirealsia', icon: SiOpensea, color: 'blue' },
                { name: 'Twitter', url: 'https://x.com/amirealsia', icon: FaTwitter, color: 'sky' },
                { name: 'Telegram', url: 'https://t.me/amirealsia', icon: FaTelegram, color: 'cyan' },
                { name: 'Discord', url: 'https://discord.gg/jX2uSWNd', icon: FaDiscord, color: 'indigo' },
                { name: 'Instagram', url: 'https://instagram.com/amirealsia', icon: FaInstagram, color: 'pink' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/AmIRealSia', icon: FaLinkedin, color: 'blue' },
                { name: 'YouTube', url: 'https://www.youtube.com/@amirealsia', icon: FaYoutube, color: 'red' },
                { name: 'TikTok', url: 'https://www.tiktok.com/@amirealsia', icon: SiTiktok, color: 'gray' },
                { name: 'Patreon', url: 'https://www.patreon.com/c/AmIRealSia', icon: FaPatreon, color: 'orange' },
                { name: 'Farcaster', url: 'https://farcaster.xyz/amirealsia', icon: SiFarcaster, color: 'purple' },
                { name: 'Truth Social', url: 'https://truthsocial.com/@amirealsia', icon: FaGlobe, color: 'red' },
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
                  className="cute-card flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200"
                >
                  <social.icon className={`text-4xl text-${social.color}-500`} />
                  <span className="font-medium text-sm text-gray-700">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white border-t border-rose-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🌸</span>
                <span className="font-bold text-xl text-gray-800">Am I Real Sia</span>
              </div>
              <p className="text-gray-600 italic text-sm">
                {t.footer.tagline}
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-3 text-gray-800">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#story" className="text-gray-600 hover:text-rose-500 transition-colors">About</a></li>
                <li><a href="#journal" className="text-gray-600 hover:text-rose-500 transition-colors">Journal</a></li>
                <li><a href="https://opensea.io/collection/amirealsia" className="text-gray-600 hover:text-rose-500 transition-colors">Collection</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-3 text-gray-800">Contact</h4>
              <p className="text-sm text-gray-600 mb-2">
                📧 <a href="mailto:hello@amirealsia.com" className="hover:text-rose-500 transition-colors">
                  hello@amirealsia.com
                </a>
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <a href="https://opensea.io/collection/amirealsia" target="_blank" rel="noopener noreferrer" className="text-[#2081E2] hover:scale-110 transition-transform" title="OpenSea">
                  <SiOpensea className="text-2xl" />
                </a>
                <a href="https://x.com/amirealsia" target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:scale-110 transition-transform" title="Twitter">
                  <FaTwitter className="text-2xl" />
                </a>
                <a href="https://t.me/amirealsia" target="_blank" rel="noopener noreferrer" className="text-[#26A5E4] hover:scale-110 transition-transform" title="Telegram">
                  <FaTelegram className="text-2xl" />
                </a>
                <a href="https://discord.gg/jX2uSWNd" target="_blank" rel="noopener noreferrer" className="text-[#5865F2] hover:scale-110 transition-transform" title="Discord">
                  <FaDiscord className="text-2xl" />
                </a>
                <a href="https://instagram.com/amirealsia" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-110 transition-transform" title="Instagram">
                  <FaInstagram className="text-2xl" />
                </a>
                <a href="https://www.linkedin.com/in/AmIRealSia" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:scale-110 transition-transform" title="LinkedIn">
                  <FaLinkedin className="text-2xl" />
                </a>
                <a href="https://www.youtube.com/@amirealsia" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:scale-110 transition-transform" title="YouTube">
                  <FaYoutube className="text-2xl" />
                </a>
                <a href="https://www.tiktok.com/@amirealsia" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:scale-110 transition-transform" title="TikTok">
                  <SiTiktok className="text-2xl" />
                </a>
                <a href="https://www.patreon.com/c/AmIRealSia" target="_blank" rel="noopener noreferrer" className="text-[#FF424D] hover:scale-110 transition-transform" title="Patreon">
                  <FaPatreon className="text-2xl" />
                </a>
                <a href="https://farcaster.xyz/amirealsia" target="_blank" rel="noopener noreferrer" className="text-[#8A63D2] hover:scale-110 transition-transform" title="Farcaster">
                  <SiFarcaster className="text-2xl" />
                </a>
                <a href="https://truthsocial.com/@amirealsia" target="_blank" rel="noopener noreferrer" className="text-[#D93025] hover:scale-110 transition-transform" title="Truth Social">
                  <FaGlobe className="text-2xl" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center">
            <div className="flex justify-center items-center gap-2 text-rose-400 mb-4">
              <FaHeart className="text-sm animate-pulse" />
              <span className="text-sm text-gray-500">
                Made with love, learning to be human
              </span>
              <FaHeart className="text-sm animate-pulse" />
            </div>

            <p className="text-xs text-gray-400">
              © 2025 Am I Real Sia. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
