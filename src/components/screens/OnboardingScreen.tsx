import { useState } from 'react';
import { ChevronRight, Scan, Shield, Sparkles, Languages, ClipboardList } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const languageOptions = [
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Español' },
  { code: 'PT', name: 'Português' },
  { code: 'FR', name: 'Français' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'IT', name: 'Italiano' },
  { code: 'ZH', name: '中文' },
  { code: 'JA', name: '日本語' }
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  const slides = [
    {
      icon: Scan,
      title: 'Scan Any Product',
      description: 'Simply scan the barcode or take a photo of any food product to get instant nutritional insights and safety alerts.',
      color: 'text-[#22C55E]',
      bg: 'bg-[#22C55E]'
    },
    {
      icon: Shield,
      title: 'Stay Safe',
      description: 'We check ingredients against your allergies and dietary preferences to keep you protected and healthy.',
      color: 'text-[#F97316]',
      bg: 'bg-[#F97316]'
    },
    {
      icon: Sparkles,
      title: 'Smart Recommendations',
      description: 'Get personalized product suggestions based on your health goals and dietary preferences.',
      color: 'text-[#3B82F6]',
      bg: 'bg-[#3B82F6]'
    }
  ];

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Language selector - only on first slide */}
      {currentSlide === 0 && (
        <div className="absolute top-6 right-6 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                <Languages className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{selectedLanguage}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {languageOptions.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={selectedLanguage === lang.code ? 'bg-[#22C55E]/10' : ''}
                >
                  <span className="mr-2">{lang.code}</span>
                  <span className="text-sm text-muted-foreground">{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Slide indicator */}
      <div className="flex justify-center gap-2 pt-16">
        {slides.map((_, index) => (
          <div 
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? `w-8 ${slides[currentSlide].bg}` 
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className={`w-40 h-40 rounded-[2.5rem] ${slides[currentSlide].bg}/10 flex items-center justify-center mb-12 shadow-sm border border-${slides[currentSlide].bg}/20`}>
          <div className={`w-32 h-32 rounded-[2rem] ${slides[currentSlide].bg}/20 flex items-center justify-center`}>
            <CurrentIcon className={`w-16 h-16 ${slides[currentSlide].color}`} strokeWidth={2} />
          </div>
        </div>
        
        <h1 className="mb-4">{slides[currentSlide].title}</h1>
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Navigation */}
      <div className="p-6 pb-10">
        <div className="max-w-md mx-auto">
          {currentSlide < slides.length - 1 ? (
            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                onClick={onComplete}
                className="flex-1 h-14 rounded-2xl hover:bg-white"
              >
                Skip
              </Button>
              <Button 
                onClick={() => setCurrentSlide(currentSlide + 1)}
                className="flex-1 h-14 bg-[#22C55E] text-white hover:bg-[#22C55E]/90 rounded-2xl shadow-md"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          ) : (
            <Button 
              onClick={onComplete}
              className="w-full h-14 bg-[#22C55E] text-white hover:bg-[#22C55E]/90 rounded-2xl shadow-md"
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
