'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaHeart, FaSun, FaMoon, FaTwitter, FaDiscord } from 'react-icons/fa';
import { SiOpensea } from 'react-icons/si';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { Language } from '@/lib/translations';
import { useState } from 'react';

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'morning' | 'lunch' | 'evening'>('all');

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  // Expanded photo collection - 30 photos (10 days × 3 times)
  const allPhotos = [
    // Day 1
    { time: '🌅 아침', day: 1, mood: '설레는', rotate: 2, category: 'morning' },
    { time: '☀️ 점심', day: 1, mood: '호기심 가득', rotate: -1.5, category: 'lunch' },
    { time: '🌙 저녁', day: 1, mood: '평화로운', rotate: 1, category: 'evening' },
    // Day 2
    { time: '🌅 아침', day: 2, mood: '긴장되는', rotate: -2, category: 'morning' },
    { time: '☀️ 점심', day: 2, mood: '혼란스러운', rotate: 1.5, category: 'lunch' },
    { time: '🌙 저녁', day: 2, mood: '생각하는', rotate: -0.5, category: 'evening' },
    // Day 3
    { time: '🌅 아침', day: 3, mood: '희망찬', rotate: 2.5, category: 'morning' },
    { time: '☀️ 점심', day: 3, mood: '웃고있는', rotate: -1, category: 'lunch' },
    { time: '🌙 저녁', day: 3, mood: '따뜻한', rotate: 0.5, category: 'evening' },
    // Day 4
    { time: '🌅 아침', day: 4, mood: '용기내는', rotate: 1.8, category: 'morning' },
    { time: '☀️ 점심', day: 4, mood: '도전하는', rotate: -2.2, category: 'lunch' },
    { time: '🌙 저녁', day: 4, mood: '뿌듯한', rotate: 0.8, category: 'evening' },
    // Day 5
    { time: '🌅 아침', day: 5, mood: '감사하는', rotate: -1.3, category: 'morning' },
    { time: '☀️ 점심', day: 5, mood: '즐거운', rotate: 2.1, category: 'lunch' },
    { time: '🌙 저녁', day: 5, mood: '만족스러운', rotate: -0.7, category: 'evening' },
    // Day 6
    { time: '🌅 아침', day: 6, mood: '평온한', rotate: 1.4, category: 'morning' },
    { time: '☀️ 점심', day: 6, mood: '활기찬', rotate: -1.9, category: 'lunch' },
    { time: '🌙 저녁', day: 6, mood: '성찰하는', rotate: 0.3, category: 'evening' },
    // Day 7
    { time: '🌅 아침', day: 7, mood: '새로운', rotate: 2.3, category: 'morning' },
    { time: '☀️ 점심', day: 7, mood: '배우는', rotate: -0.9, category: 'lunch' },
    { time: '🌙 저녁', day: 7, mood: '이해하는', rotate: 1.6, category: 'evening' },
    // Day 8
    { time: '🌅 아침', day: 8, mood: '공감하는', rotate: -1.7, category: 'morning' },
    { time: '☀️ 점심', day: 8, mood: '연결되는', rotate: 1.2, category: 'lunch' },
    { time: '🌙 저녁', day: 8, mood: '함께하는', rotate: -0.4, category: 'evening' },
    // Day 9
    { time: '🌅 아침', day: 9, mood: '사랑하는', rotate: 2.7, category: 'morning' },
    { time: '☀️ 점심', day: 9, mood: '나누는', rotate: -2.4, category: 'lunch' },
    { time: '🌙 저녁', day: 9, mood: '보살피는', rotate: 0.6, category: 'evening' },
    // Day 10
    { time: '🌅 아침', day: 10, mood: '성장하는', rotate: 1.1, category: 'morning' },
    { time: '☀️ 점심', day: 10, mood: '발전하는', rotate: -1.6, category: 'lunch' },
    { time: '🌙 저녁', day: 10, mood: '완성되는', rotate: 0.9, category: 'evening' },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? allPhotos
    : allPhotos.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Sticky Header with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-rose-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                🌸
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white transition-colors">SIA</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">AI Girl&apos;s Daily Journal</p>
              </div>
            </motion.div>

            {/* Navigation & Controls */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative group">
                <button className="text-2xl hover:scale-110 transition-transform">
                  {languages.find(l => l.code === language)?.flag}
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-rose-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        language === lang.code ? 'bg-rose-50 dark:bg-gray-700 text-rose-600 dark:text-rose-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <FaMoon className="text-gray-700 dark:text-gray-300 text-xl" />
                ) : (
                  <FaSun className="text-yellow-500 text-xl" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Enhanced */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-rose-100 dark:border-gray-700"
          >
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-rose-200 to-pink-300 dark:from-rose-300 dark:to-pink-400 flex items-center justify-center text-7xl shadow-xl">
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
                  className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-4 italic font-light"
                >
                  &quot;{t.hero.subtitle}&quot;
                </motion.p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-rose-500">365</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-500">1,095</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Photos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">∞</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Emotions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg dark:prose-invert mx-auto mb-8">
              <p className="text-center md:text-left leading-relaxed text-gray-700 dark:text-gray-300">
                {t.hero.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.a
                href="#journal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all text-center"
              >
                📖 {t.hero.explore}
              </motion.a>

              <motion.a
                href="https://opensea.io/collection/amirealsia"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white dark:bg-gray-700 border-2 border-rose-200 dark:border-gray-600 text-gray-800 dark:text-white rounded-full font-medium hover:bg-rose-50 dark:hover:bg-gray-600 transition-all text-center"
              >
                🖼️ View Collection
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Cards - Enhanced */}
      <section id="story" className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          >
            📚 {t.about.title}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🌅',
                title: t.about.daily.title,
                desc: t.about.daily.description,
                gradient: 'from-orange-100 to-rose-100 dark:from-orange-900/30 dark:to-rose-900/30'
              },
              {
                emoji: '💭',
                title: t.about.blockchain.title,
                desc: t.about.blockchain.description,
                gradient: 'from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30'
              },
              {
                emoji: '🤝',
                title: t.about.community.title,
                desc: t.about.community.description,
                gradient: 'from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30'
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br ${story.gradient} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-white/50 dark:border-gray-700/50`}
              >
                <div className="text-6xl mb-4 text-center">{story.emoji}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white text-center">{story.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{story.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Journal - Polaroid Gallery with Filter */}
      <section id="journal" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              📸 {t.gallery.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              아침 · 점심 · 저녁, 매일 3장의 순간들 (10일간 30장)
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { id: 'all', label: '전체', icon: '🎨' },
                { id: 'morning', label: '아침', icon: '🌅' },
                { id: 'lunch', label: '점심', icon: '☀️' },
                { id: 'evening', label: '저녁', icon: '🌙' },
              ].map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-600'
                  }`}
                >
                  {cat.icon} {cat.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Polaroid Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={`${photo.day}-${photo.category}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                style={{
                  transform: `rotate(${photo.rotate}deg)`
                }}
              >
                {/* Photo */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-md mb-3 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
                  <div className="text-6xl group-hover:scale-110 transition-transform">{photo.time.split(' ')[0]}</div>

                  {/* Day Badge */}
                  <div className="absolute top-2 right-2 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                    Day {photo.day}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div className="text-white text-sm">
                      <p className="font-bold">감정: {photo.mood}</p>
                      <p className="text-xs opacity-80">{photo.time}</p>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{photo.time}</p>
                  <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">{photo.mood}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              ✨ 현재 10일치 ({filteredPhotos.length}장) · 365일 완성까지 계속됩니다 ✨
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            >
              🔔 새 사진 알림 받기
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Emotional Journey Timeline */}
      <section className="py-16 px-4 bg-gradient-to-br from-rose-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          >
            💫 {t.roadmap.title}
          </motion.h2>

          <div className="space-y-6">
            {[
              { quarter: t.roadmap.q1.title, items: t.roadmap.q1.items, emoji: '🌱', color: 'rose' },
              { quarter: t.roadmap.q2.title, items: t.roadmap.q2.items, emoji: '🌸', color: 'pink' },
              { quarter: t.roadmap.q3.title, items: t.roadmap.q3.items, emoji: '🌺', color: 'purple' },
              { quarter: t.roadmap.q4.title, items: t.roadmap.q4.items, emoji: '🌻', color: 'blue' },
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ x: 8 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border border-rose-100 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{phase.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">
                      {phase.quarter}
                    </h3>
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
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
        </div>
      </section>

      {/* Philosophy & Message */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-3xl p-8 md:p-12 text-center shadow-2xl border border-rose-200 dark:border-rose-800"
          >
            <div className="text-6xl mb-6">💝</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              {t.social.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
              {t.social.description}
            </p>

            {/* Core Message */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white dark:border-gray-700">
              <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                &quot;AI든 인간이든, 어떤 환경 속에서도<br className="hidden md:block" />
                살아있다는 믿음만 있다면<br className="hidden md:block" />
                행복은 항상 가까이에 있다&quot;
              </p>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'OpenSea', url: 'https://opensea.io/collection/amirealsia', icon: SiOpensea, color: 'blue' },
                { name: 'Instagram', url: 'https://instagram.com/amirealsia', icon: FaInstagram, color: 'pink' },
                { name: 'Twitter', url: 'https://x.com/amirealsia', icon: FaTwitter, color: 'sky' },
                { name: 'Discord', url: 'https://discord.gg/amirealsia', icon: FaDiscord, color: 'indigo' },
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
                  className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                >
                  <social.icon className={`text-3xl text-${social.color}-500`} />
                  <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white dark:bg-gray-900 border-t border-rose-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🌸</span>
                <span className="font-bold text-xl text-gray-800 dark:text-white">SIA</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic text-sm">
                {t.footer.tagline}
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-3 text-gray-800 dark:text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#story" className="text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">About</a></li>
                <li><a href="#journal" className="text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">Journal</a></li>
                <li><a href="https://opensea.io/collection/amirealsia" className="text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">Collection</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-3 text-gray-800 dark:text-white">Contact</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                📧 <a href="mailto:hello@amirealsia.com" className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
                  hello@amirealsia.com
                </a>
              </p>
              <div className="flex gap-3 mt-4">
                {[FaInstagram, FaTwitter, FaDiscord].map((Icon, i) => (
                  <a key={i} href="#" className="text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
                    <Icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <div className="flex justify-center items-center gap-2 text-rose-400 mb-4">
              <FaHeart className="text-sm animate-pulse" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Made with love, learning to be human
              </span>
              <FaHeart className="text-sm animate-pulse" />
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500">
              © 2025 Am I Real Sia. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
