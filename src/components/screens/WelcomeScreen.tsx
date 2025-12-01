import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Language } from '../../lib/translations';

interface WelcomeScreenProps {
    onGetStarted: () => void;
    onSignIn: () => void;
}

const languages: Record<Language, { label: string; flag: string }> = {
    ES: { label: 'Español', flag: '🇪🇸' },
    EN: { label: 'English', flag: '🇺🇸' }
};

export function WelcomeScreen({ onGetStarted, onSignIn }: WelcomeScreenProps) {
    const { language, setLanguage, t } = useLanguage();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 h-full flex flex-col relative overflow-hidden font-sans">

            {/* Language Selector: Top Right - Pill Style */}
            <div className="absolute top-6 right-6 z-50">
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-1 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm text-sm font-medium text-gray-600 active:bg-gray-50 transition-colors"
                    >
                        <span>{language}</span>
                        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50 origin-top-right"
                            >
                                {(Object.keys(languages) as Language[]).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${language === lang ? 'text-[#28C567] font-medium bg-green-50/30' : 'text-gray-600'
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

            {/* Main Content: Aligned to bottom (justify-end) with increased padding (pb-24) as requested */}
            <main className="flex-grow flex flex-col items-center justify-end px-6 pb-24 w-full max-w-md mx-auto">

                {/* Logo Group & Brand */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center mb-8"
                >
                    {/* Scaled down Logo (SVG Recreation) */}
                    <div className="w-24 h-24 mb-2 text-[#28C567]">
                        <svg viewBox="0 0 100 100" fill="currentColor" className="drop-shadow-sm">
                            {/* Apple Body shape */}
                            <path d="M50 90 C 20 90, 10 60, 10 45 C 10 25, 30 20, 40 30 C 45 35, 55 35, 60 30 C 70 20, 90 25, 90 45 C 90 60, 80 90, 50 90 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            {/* Leaf */}
                            <path d="M50 25 Q 55 5, 75 10 Q 60 25, 50 25" fill="currentColor" />
                            {/* Stem */}
                            <path d="M50 25 Q 45 15, 42 12" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />

                            {/* Fork Illusion */}
                            <path d="M42 45 L 42 60 Q 42 70, 50 70 Q 58 70, 58 60 L 58 45" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                            <path d="M50 65 L 50 42" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                            <path d="M50 70 L 50 82" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Brand Name - Constructing it visually */}
                    <h1 className="text-4xl font-bold tracking-tight text-[#228B49]">
                        Health<span className="text-[#28C567]">Scan</span>
                    </h1>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-center space-y-2 mb-10"
                >
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {t.welcome.title}
                    </h2>
                    <p className="text-gray-500 text-base max-w-[260px] mx-auto leading-relaxed">
                        {t.welcome.subtitle}
                    </p>
                </motion.div>

                {/* Action Area */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="w-full space-y-6"
                >
                    <button
                        onClick={onGetStarted}
                        className="w-full max-w-[280px] mx-auto bg-[#28C567] hover:bg-[#23ad5a] active:scale-[0.98] transition-all text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 text-lg flex items-center justify-center"
                    >
                        {t.welcome.getStarted}
                    </button>
                </motion.div>

            </main>

            {/* Footer / Sign In link */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pb-8 w-full text-center"
            >
                <p className="text-sm text-gray-500 font-medium">
                    {t.welcome.alreadyHaveAccount}
                    <button
                        onClick={onSignIn}
                        className="text-[#28C567] hover:text-[#228B49] font-bold ml-1 outline-none focus:underline"
                    >
                        {t.welcome.signIn}
                    </button>
                </p>
                {/* Home indicator spacing for iOS aesthetics */}
                <div className="h-1 w-32 bg-gray-200 rounded mx-auto mt-6 opacity-50"></div>
            </motion.div>

        </div>
    );
}