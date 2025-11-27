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
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleGetStarted = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            onGetStarted();
        }, 1500);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#FDFDFD] flex flex-col">

            {/* Language Selector - Top Left */}
            <div className="absolute top-6 left-6 z-50">
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-sm font-medium">{language}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute left-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                            >
                                {(Object.keys(languages) as Language[]).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === lang ? 'text-[#22C55E] font-medium' : 'text-gray-700'
                                            }`}
                                    >
                                        {languages[lang].label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col flex-1 w-full max-w-md mx-auto px-6 pt-24 pb-8 justify-between">

                {/* CENTER: Illustration/Logo */}
                <motion.div
                    className="flex items-center justify-center flex-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                        type: "spring",
                        stiffness: 100
                    }}
                >
                    <div className="relative">
                        {/* Glowing effect behind logo */}
                        <div className="absolute inset-0 bg-[#4CE3B6]/10 blur-3xl rounded-full transform scale-110" />

                        {/* Logo */}
                        <img
                            src={logoImage}
                            alt="HealthScan Logo"
                            className="w-48 h-48 object-contain relative z-10"
                            style={{ mixBlendMode: 'multiply' }}
                        />
                    </div>
                </motion.div>

                {/* TOP: Headline */}
                <motion.div
                    className="flex flex-col items-center text-center mt-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h1
                        className="text-foreground font-bold"
                        style={{
                            fontSize: '40px',
                            fontFamily: 'Inter, SF Pro Display, -apple-system, sans-serif',
                            lineHeight: '1.2',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {t.welcome.title}
                    </h1>

                    <p className="text-muted-foreground mt-4 text-lg">
                        {t.welcome.subtitle}
                    </p>
                </motion.div>

                {/* BOTTOM: CTA */}
                <motion.div
                    className="w-full flex flex-col items-center mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    {/* Get Started Button */}
                    <motion.button
                        onClick={handleGetStarted}
                        className="w-full h-14 rounded-2xl text-white transition-all duration-300 shadow-lg shadow-[#22C55E]/20 flex items-center justify-center relative overflow-hidden"
                        style={{
                            background: '#22C55E',
                            fontSize: '1.125rem',
                            fontWeight: 600,
                        }}
                        whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isAnalyzing}
                    >
                        {isAnalyzing ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>{t.welcome.analyzing}</span>
                            </div>
                        ) : (
                            t.welcome.getStarted
                        )}
                    </motion.button>

                    {/* Micro-copy hint */}


                    {/* Sign In Link */}
                    <motion.button
                        onClick={onSignIn}
                        className="mt-4 text-center text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium px-4 py-2 rounded-lg border border-transparent hover:border-gray-100"
                        whileHover={{ scale: 1.02 }}
                    >
                        {t.welcome.alreadyHaveAccount}
                        <span className="underline" style={{ color: '#4CE3B6' }}>
                            {t.welcome.signIn}
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}
