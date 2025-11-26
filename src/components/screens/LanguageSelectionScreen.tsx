import { useState } from 'react';
import { Button } from '../ui/button';

interface LanguageSelectionScreenProps {
    onSelect: (language: string) => void;
}

export function LanguageSelectionScreen({ onSelect }: LanguageSelectionScreenProps) {
    const [selected, setSelected] = useState<'en' | 'es'>('en');

    return (
        <div className="min-h-screen relative bg-black text-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop"
                    alt="Healthy Food"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-6">
                {/* Language Toggle */}
                <div className="flex justify-start pt-4">
                    <div className="flex border border-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                        <button
                            onClick={() => setSelected('es')}
                            className={`px-4 py-1.5 text-sm font-medium transition-colors ${selected === 'es'
                                    ? 'bg-[#FFD700] text-black'
                                    : 'bg-transparent text-white hover:bg-white/10'
                                }`}
                        >
                            ES
                        </button>
                        <div className="w-[1px] bg-white/30" />
                        <button
                            onClick={() => setSelected('en')}
                            className={`px-4 py-1.5 text-sm font-medium transition-colors ${selected === 'en'
                                    ? 'bg-[#FFD700] text-black'
                                    : 'bg-transparent text-white hover:bg-white/10'
                                }`}
                        >
                            EN
                        </button>
                    </div>
                </div>

                {/* Main Text */}
                <div className="flex-1 flex flex-col justify-end pb-12">
                    {/* Logo Icon Placeholder */}
                    <div className="mb-6">
                        <div className="w-12 h-8 flex flex-col gap-1.5">
                            <div className="h-1.5 w-8 bg-white rounded-full" />
                            <div className="h-1.5 w-12 bg-white rounded-full" />
                            <div className="h-1.5 w-6 bg-white rounded-full" />
                        </div>
                    </div>

                    <h1 className="text-5xl font-bold leading-tight mb-4">
                        {selected === 'en' ? 'Eat Smarter,' : 'Come Mejor,'}
                        <br />
                        {selected === 'en' ? 'Get Results' : 'Logra Resultados'}
                    </h1>

                    <Button
                        onClick={() => onSelect(selected)}
                        className="w-full h-14 text-lg font-semibold rounded-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black mb-6"
                    >
                        {selected === 'en' ? 'Start now' : 'Comenzar ahora'}
                    </Button>

                    <div className="text-center">
                        <span className="text-gray-400 text-sm">
                            {selected === 'en' ? 'Already have an account? ' : '¿Ya tienes una cuenta? '}
                            <button className="text-white font-semibold hover:underline">
                                {selected === 'en' ? 'Log In' : 'Iniciar Sesión'}
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
