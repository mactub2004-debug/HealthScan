import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import logoImage from '../../assets/logo.jpg';
import { useLanguage } from '../../contexts/LanguageContext';
import { Language } from '../../lib/translations';

interface WelcomeScreenProps {
    onGetStarted: () => void;
    onSignIn: () => void;
}

const languages: Record<Language, { label: string; flag: string }> = {
    ES: { label: 'Español', flag: '🇪🇸' },
    EN: { label: 'English', flag: '🇺🇸' },
    PT: { label: 'Português', flag: '🇧🇷' }
};

export function WelcomeScreen({ onGetStarted, onSignIn }: WelcomeScreenProps) {
    const { language, setLanguage, t } = useLanguage();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#FDFDFD] flex flex-col">

            {/* Language Selector - Top Right */}
            <div className="absolute top-6 right-6 z-50">
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full shadow-sm hover:bg-gray-50 transition-all duration-300"
                    >
                        <span className="text-sm font-medium text-gray-700">{language}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50"
                            >
                                {(Object.keys(languages) as Language[]).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${language === lang ? 'text-[#22C55E] font-medium bg-green-50/50' : 'text-gray-600'
                                            }`}
                                    >
                                        <span className="text-base">{languages[lang].flag}</span>
                                        {languages[lang].label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col flex-1 w-full max-w-md mx-auto px-8 pt-12 pb-12">

                {/* CENTER: Illustration/Logo */}
                <motion.div
                    className="flex items-center justify-center flex-1 py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1] // Custom ease for premium feel
                    }}
                >
                    <div className="relative">
                        {/* Refined glowing effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#4CE3B6]/20 to-[#22C55E]/20 blur-[60px] rounded-full transform scale-125 opacity-60" />

                        {/* Logo */}
                        <img
                            src={logoImage}
                            alt="HealthScan Logo"
                            className="w-56 h-56 object-contain relative z-10 drop-shadow-2xl"
                            style={{ mixBlendMode: 'multiply' }}
                        />
                    </div>
                </motion.div>

                {/* BOTTOM SECTION: Content & Actions */}
                <div className="flex flex-col items-center w-full space-y-12">

                    {/* Text Content */}
                    <motion.div
                        className="flex flex-col items-center text-center space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <h1
                            className="text-gray-900 font-bold tracking-tight"
                            style={{
                                fontSize: 'clamp(32px, 8vw, 40px)',
                                fontFamily: 'Inter, -apple-system, sans-serif',
                                lineHeight: '1.1',
                            }}
                        >
                            {t.welcome.title}
                        </h1>

                        <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-[280px]">
                            {t.welcome.subtitle}
                        </p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        className="w-full flex flex-col items-center space-y-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                        {/* Get Started Button */}
                        <motion.button
                            onClick={onGetStarted}
                            className="w-full h-14 rounded-2xl text-white shadow-lg shadow-[#22C55E]/25 flex items-center justify-center relative overflow-hidden group"
                            style={{
                                background: '#22C55E',
                                fontSize: '1.125rem',
                                fontWeight: 600,
                                letterSpacing: '0.01em'
                            }}
                            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.35)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10">{t.welcome.getStarted}</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </motion.button>

                        {/* Sign In Link */}
                        <motion.button
                            onClick={onSignIn}
                            className="text-gray-500 hover:text-gray-900 transition-colors duration-300 text-sm font-medium py-2"
                            whileHover={{ scale: 1.02 }}
                        >
                            {t.welcome.alreadyHaveAccount} <span className="text-[#22C55E] font-semibold ml-1">{t.welcome.signIn}</span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
