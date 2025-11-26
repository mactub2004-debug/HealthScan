import { useState } from 'react';
import { ChevronRight, Scan, Shield, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Scan,
      title: t.onboarding.slides[0].title,
      description: t.onboarding.slides[0].description,
      color: 'text-[#22C55E]',
      bg: 'bg-[#22C55E]'
    },
    {
      icon: Shield,
      title: t.onboarding.slides[1].title,
      description: t.onboarding.slides[1].description,
      color: 'text-[#F97316]',
      bg: 'bg-[#F97316]'
    },
    {
      icon: Sparkles,
      title: t.onboarding.slides[2].title,
      description: t.onboarding.slides[2].description,
      color: 'text-[#3B82F6]',
      bg: 'bg-[#3B82F6]'
    }
  ];

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Slide indicator */}
      <div className="flex justify-center gap-2 pt-16">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
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
                {t.onboarding.skip}
              </Button>
              <Button
                onClick={() => setCurrentSlide(currentSlide + 1)}
                className="flex-1 h-14 bg-[#22C55E] text-white hover:bg-[#22C55E]/90 rounded-2xl shadow-md"
              >
                {t.onboarding.next}
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={onComplete}
              className="w-full h-14 bg-[#22C55E] text-white hover:bg-[#22C55E]/90 rounded-2xl shadow-md"
            >
              {t.onboarding.getStarted}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
