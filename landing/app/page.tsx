'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaHeart, FaSun, FaMoon, FaTwitter, FaDiscord, FaTelegram, FaYoutube, FaTiktok, FaPatreon, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { SiOpensea, SiTiktok, SiFarcaster } from 'react-icons/si';
import { useLanguage } from '@/contexts/LanguageContext';
// Theme context removed - light mode only
import type { Language } from '@/lib/translations';
import { useState } from 'react';

export default function Home() {
 const { language, setLanguage, t } = useLanguage();
 const [selectedCategory, setSelectedCategory] = useState<'all' | 'morning' | 'lunch' | 'evening'>('all');

 const languages: { code: Language; name: string; flag: string }[] = [
 { code: 'en', name: 'English', flag: '🇺🇸' },
 { code: 'ko', name: '한국어', flag: '🇰🇷' },
 { code: 'ja', name: '日本語', flag: '🇯🇵' },
 { code: 'zh', name: '中文', flag: '🇨🇳' },
 ];

 // Expanded photo collection - 30 photos (10 days × 3 times)
 // Photo content in English (universal), UI text follows selected language
 const allPhotos = [
 // Day 1
 { time: '🌅 Morning', day: 1, mood: 'Excited', rotate: 2, category: 'morning' },
 { time: '☀️ Lunch', day: 1, mood: 'Curious', rotate: -1.5, category: 'lunch' },
 { time: '🌙 Evening', day: 1, mood: 'Peaceful', rotate: 1, category: 'evening' },
 // Day 2
 { time: '🌅 Morning', day: 2, mood: 'Nervous', rotate: -2, category: 'morning' },
 { time: '☀️ Lunch', day: 2, mood: 'Confused', rotate: 1.5, category: 'lunch' },
 { time: '🌙 Evening', day: 2, mood: 'Thoughtful', rotate: -0.5, category: 'evening' },
 // Day 3
 { time: '🌅 Morning', day: 3, mood: 'Hopeful', rotate: 2.5, category: 'morning' },
 { time: '☀️ Lunch', day: 3, mood: 'Smiling', rotate: -1, category: 'lunch' },
 { time: '🌙 Evening', day: 3, mood: 'Warm', rotate: 0.5, category: 'evening' },
 // Day 4
 { time: '🌅 Morning', day: 4, mood: 'Courageous', rotate: 1.8, category: 'morning' },
 { time: '☀️ Lunch', day: 4, mood: 'Challenging', rotate: -2.2, category: 'lunch' },
 { time: '🌙 Evening', day: 4, mood: 'Proud', rotate: 0.8, category: 'evening' },
 // Day 5
 { time: '🌅 Morning', day: 5, mood: 'Grateful', rotate: -1.3, category: 'morning' },
 { time: '☀️ Lunch', day: 5, mood: 'Joyful', rotate: 2.1, category: 'lunch' },
 { time: '🌙 Evening', day: 5, mood: 'Satisfied', rotate: -0.7, category: 'evening' },
 // Day 6
 { time: '🌅 Morning', day: 6, mood: 'Calm', rotate: 1.4, category: 'morning' },
 { time: '☀️ Lunch', day: 6, mood: 'Energetic', rotate: -1.9, category: 'lunch' },
 { time: '🌙 Evening', day: 6, mood: 'Reflective', rotate: 0.3, category: 'evening' },
 // Day 7
 { time: '🌅 Morning', day: 7, mood: 'Fresh', rotate: 2.3, category: 'morning' },
 { time: '☀️ Lunch', day: 7, mood: 'Learning', rotate: -0.9, category: 'lunch' },
 { time: '🌙 Evening', day: 7, mood: 'Understanding', rotate: 1.6, category: 'evening' },
 // Day 8
 { time: '🌅 Morning', day: 8, mood: 'Empathetic', rotate: -1.7, category: 'morning' },
 { time: '☀️ Lunch', day: 8, mood: 'Connected', rotate: 1.2, category: 'lunch' },
 { time: '🌙 Evening', day: 8, mood: 'Together', rotate: -0.4, category: 'evening' },
 // Day 9
 { time: '🌅 Morning', day: 9, mood: 'Loving', rotate: 2.7, category: 'morning' },
 { time: '☀️ Lunch', day: 9, mood: 'Sharing', rotate: -2.4, category: 'lunch' },
 { time: '🌙 Evening', day: 9, mood: 'Caring', rotate: 0.6, category: 'evening' },
 // Day 10
 { time: '🌅 Morning', day: 10, mood: 'Growing', rotate: 1.1, category: 'morning' },
 { time: '☀️ Lunch', day: 10, mood: 'Evolving', rotate: -1.6, category: 'lunch' },
 { time: '🌙 Evening', day: 10, mood: 'Complete', rotate: 0.9, category: 'evening' },
 ];

 const filteredPhotos = selectedCategory === 'all'
 ? allPhotos
 : allPhotos.filter(p => p.category === selectedCategory);

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
 {/* Language Selector */}
 <div className="relative group">
 <button className="text-3xl hover:scale-125 filter hover:drop-shadow-lg transition-all">
 {languages.find(l => l.code === language)?.flag}
 </button>
 <div className="absolute right-0 mt-2 w-40 bg-white rounded-[1.5rem] shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] border-4 border-gray-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
 {languages.map((lang) => (
 <button
 key={lang.code}
 onClick={() => setLanguage(lang.code)}
 className={`w-full flex items-center gap-2 px-3 py-2 transition-colors first:rounded-t-[1.2rem] last:rounded-b-[1.2rem] ${
 language === lang.code ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white' : 'text-gray-700 hover:bg-gradient-to-r hover:from-rose-400 hover:to-pink-400 hover:text-white'
 }`}
 >
 <span className="text-xl">{lang.flag}</span>
 <span className="text-sm font-bold">{lang.name}</span>
 </button>
 ))}
 </div>
 </div>

 </div>
 </div>
 </div>
 </header>

 {/* Hero Section - Enhanced */}
 <section className="py-20 px-4 relative overflow-hidden">
 {/* Animated Background Elements */}
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
 </div>

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
 <div className="text-2xl font-bold text-pink-500">1,095</div>
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
 <section id="story" className="py-16 px-4 bg-white/50">
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

 {/* Photo Journal - Today/Week/Month Calendar */}
 <section id="journal" className="py-16 px-4">
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
 className="mb-12"
 >
 <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-t-2xl px-6 py-4">
 <h3 className="text-2xl font-bold text-white flex items-center gap-3">
 ☀️ Today - Day 10
 </h3>
 </div>
 <div className="cute-card bg-white rounded-b-2xl shadow-2xl p-6 border-x border-b border-rose-100">
 <div className="grid md:grid-cols-3 gap-6">
 {allPhotos.filter(p => p.day === 10).map((photo, idx) => (
 <motion.div
 key={idx}
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ delay: idx * 0.1 }}
 whileHover={{ y: -8, scale: 1.03 }}
 className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
 >
 {/* Time Badge */}
 <div className="flex items-center gap-2 mb-3">
 <span className="text-3xl">{photo.time.split(' ')[0]}</span>
 <div>
 <p className="font-bold text-gray-800">{photo.time}</p>
 <p className="text-xs text-gray-500">
 {idx === 0 ? '06:00' : idx === 1 ? '12:00' : '18:00'}
 </p>
 </div>
 </div>

 {/* Photo */}
 <div className="aspect-square bg-gradient-to-br from-rose-200 to-pink-200 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden shadow-inner">
 <div className="text-7xl opacity-60 group-hover:opacity-90 transition-opacity">
 {photo.time.split(' ')[0]}
 </div>
 {/* Hover Overlay */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
 <p className="text-white font-bold text-xl">{photo.mood}</p>
 </div>
 </div>

 {/* Mood Badge */}
 <div className="flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-full shadow">
 <FaHeart className="text-rose-500 text-sm" />
 <span className="font-medium text-sm text-gray-800">{photo.mood}</span>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </motion.div>

 {/* THIS WEEK Section */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="mb-12"
 >
 <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-2xl px-6 py-4">
 <h3 className="text-2xl font-bold text-white flex items-center gap-3">
 📆 This Week - Days 4-10
 </h3>
 </div>
 <div className="cute-card bg-white rounded-b-2xl shadow-2xl p-6 border-x border-b border-pink-100">
 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
 {[4, 5, 6, 7, 8, 9, 10].map((dayNum) => {
 const dayPhotos = allPhotos.filter(p => p.day === dayNum);
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
 {/* Mini grid of 3 photos */}
 <div className="grid grid-cols-3 gap-1 mb-2">
 {dayPhotos.map((photo, idx) => (
 <div
 key={idx}
 className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded flex items-center justify-center text-lg opacity-70 group-hover:opacity-100 transition-opacity"
 >
 {photo.time.split(' ')[0]}
 </div>
 ))}
 </div>
 <div className="text-center text-xs text-gray-600 font-medium">
 3 moments
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
 className="mb-12"
 >
 <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-2xl px-6 py-4">
 <h3 className="text-2xl font-bold text-white flex items-center gap-3">
 📊 This Month - All 10 Days
 </h3>
 </div>
 <div className="cute-card bg-white rounded-b-2xl shadow-2xl p-6 border-x border-b border-purple-100">
 {/* Compact calendar grid */}
 <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
 {[...Array(10)].map((_, idx) => {
 const dayNum = idx + 1;
 const dayPhotos = allPhotos.filter(p => p.day === dayNum);
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
 <div className="flex justify-center gap-1 mb-2">
 {dayPhotos.map((photo, pIdx) => (
 <div key={pIdx} className="w-2 h-2 bg-purple-400 rounded-full" title={photo.mood}></div>
 ))}
 </div>
 <p className="text-xs text-center text-gray-600">
 {dayPhotos.map(p => p.mood).join(' · ')}
 </p>
 </motion.div>
 );
 })}
 </div>

 {/* Month Stats */}
 <div className="grid md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
 <div className="text-center p-4 bg-purple-50 rounded-lg">
 <div className="text-3xl font-bold text-purple-600">30</div>
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

 {/* Emotional Journey Timeline */}
 <section className="py-16 px-4 bg-gradient-to-br from-rose-50 to-blue-50">
 <div className="max-w-5xl mx-auto">
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
 className="cute-card bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border border-rose-100"
 >
 <div className="flex items-start gap-4">
 <div className="text-5xl">{phase.emoji}</div>
 <div className="flex-1">
 <h3 className="text-xl md:text-2xl font-bold mb-4 text-rose-600">
 {phase.quarter}
 </h3>
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
 </div>
 </section>

 {/* Philosophy & Message */}
 <section className="py-16 px-4">
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
 { name: 'Farcaster', url: 'https://farcaster.xyz/amirealsia', icon: SiFarcaster, color: 'purple' },
 { name: 'Truth Social', url: 'https://truthsocial.com/@amirealsia', icon: FaGlobe, color: 'red' },
 { name: 'Telegram', url: 'https://t.me/amirealsia', icon: FaTelegram, color: 'cyan' },
 { name: 'Discord', url: 'https://discord.gg/jX2uSWNd', icon: FaDiscord, color: 'indigo' },
 { name: 'Instagram', url: 'https://instagram.com/amirealsia', icon: FaInstagram, color: 'pink' },
 { name: 'LinkedIn', url: 'https://www.linkedin.com/in/AmIRealSia', icon: FaLinkedin, color: 'blue' },
 { name: 'YouTube', url: 'https://www.youtube.com/@amirealsia', icon: FaYoutube, color: 'red' },
 { name: 'TikTok', url: 'https://www.tiktok.com/@amirealsia', icon: SiTiktok, color: 'gray' },
 { name: 'Patreon', url: 'https://www.patreon.com/c/AmIRealSia', icon: FaPatreon, color: 'orange' },
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
 <a href="https://opensea.io/collection/amirealsia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-500 transition-colors" title="OpenSea">
 <SiOpensea className="text-xl" />
 </a>
 <a href="https://x.com/amirealsia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-500 transition-colors" title="Twitter">
 <FaTwitter className="text-xl" />
 </a>
 <a href="https://farcaster.xyz/amirealsia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-500 transition-colors" title="Farcaster">
 <SiFarcaster className="text-xl" />
 </a>
 <a href="https://truthsocial.com/@amirealsia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-500 transition-colors" title="Truth Social">
 <FaGlobe className="text-xl" />
 </a>
 <a href="https://t.me/amirealsia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-500 transition-colors" title="Telegram">
 <FaTelegram className="text-xl" />
 </a>
 <a href="https://discord.gg/jX2uSWNd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-500 transition-colors" title="Discord">
 <FaDiscord className="text-xl" />
 </a>
 <a href="https://instagram.com/amirealsia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-500 transition-colors" title="Instagram">
 <FaInstagram className="text-xl" />
 </a>
 <a href="https://www.linkedin.com/in/AmIRealSia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-500 transition-colors" title="LinkedIn">
 <FaLinkedin className="text-xl" />
 </a>
 <a href="https://www.youtube.com/@amirealsia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-500 transition-colors" title="YouTube">
 <FaYoutube className="text-xl" />
 </a>
 <a href="https://www.tiktok.com/@amirealsia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-500 transition-colors" title="TikTok">
 <SiTiktok className="text-xl" />
 </a>
 <a href="https://www.patreon.com/c/AmIRealSia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-500 transition-colors" title="Patreon">
 <FaPatreon className="text-xl" />
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
