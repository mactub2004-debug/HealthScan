import { useState } from 'react';
import { ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { countries } from '../../lib/demo-data';
import { StorageService } from '../../lib/storage';
import { useLanguage } from '../../contexts/LanguageContext';

interface RegistrationScreenProps {
  onComplete: () => void;
}

export function RegistrationScreen({ onComplete }: RegistrationScreenProps) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    language: language, // Use global language
    allergies: [] as string[],
    preferences: [] as string[],
    goals: [] as string[]
  });

  const toggleSelection = (category: 'allergies' | 'preferences' | 'goals', item: string) => {
    if (category === 'goals') {
      // Single select for goals
      setFormData(prev => ({
        ...prev,
        [category]: prev[category].includes(item) ? [] : [item]
      }));
    } else {
      // Multi select for others
      setFormData(prev => ({
        ...prev,
        [category]: prev[category].includes(item)
          ? prev[category].filter(i => i !== item)
          : [...prev[category], item]
      }));
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.email && formData.country;
    return true;
  };

  const totalSteps = 6;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 pt-10 pb-6">
        <div className="max-w-md mx-auto relative flex items-center justify-center">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="absolute left-0 p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div className="text-center">
            <h1 className="text-xl font-bold">{t.registration.header.title}</h1>
            <p className="text-sm text-muted-foreground">{t.registration.header.step} {step} of {totalSteps}</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto">
          <div className="h-1.5 bg-gray-100">
            <div
              className="h-full bg-[#22C55E] transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-2">{t.registration.step1.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {t.registration.step1.subtitle}
                </p>
              </div>
              <div>
                <Label htmlFor="name" className="text-sm mb-2 block">{t.registration.step1.nameLabel}</Label>
                <Input
                  id="name"
                  placeholder={t.registration.step1.namePlaceholder}
                  maxLength={20}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white h-12 rounded-xl"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {formData.name.length}/20
                </p>
              </div>
              <div>
                <Label htmlFor="email" className="text-sm mb-2 block">{t.registration.step1.emailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.registration.step1.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white h-12 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="country" className="text-sm mb-2 block">{t.registration.step1.countryLabel}</Label>
                <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                  <SelectTrigger className="bg-white h-12 rounded-xl">
                    <SelectValue placeholder={t.registration.step1.countryPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 flex flex-col items-center justify-center min-h-[60vh]">
              {/* Layered circular icon */}
              <div className="relative w-48 h-48 flex items-center justify-center animate-in zoom-in-95 fade-in duration-700">
                {/* Outer circle - continuous pulse */}
                <div className="absolute w-48 h-48 rounded-full bg-[#22C55E]/10 animate-pulse" style={{ animationDuration: '3s' }} />
                {/* Middle circle - subtle pulse */}
                <div className="absolute w-36 h-36 rounded-full bg-[#22C55E]/20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
                {/* Inner circle - bounce effect - INCREASED OPACITY/CONTRAST */}
                <div className="absolute w-24 h-24 rounded-full bg-[#22C55E] flex items-center justify-center animate-pulse shadow-lg shadow-[#22C55E]/30" style={{ animationDuration: '2.5s' }}>
                  <ClipboardList className="w-12 h-12 text-white animate-pulse" strokeWidth={2.5} style={{ animationDuration: '2s' }} />
                </div>
              </div>

              {/* Text content */}
              <div className="text-center max-w-sm px-6 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '300ms' }}>
                <h2 className="mb-3">{t.registration.step2.title}</h2>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-2">{t.registration.step3.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {t.registration.step3.subtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.lists.allergens.map((allergen) => (
                  <Badge
                    key={allergen}
                    variant={formData.allergies.includes(allergen) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all px-4 py-2 ${formData.allergies.includes(allergen)
                      ? 'bg-[#22C55E] text-white border-[#22C55E] hover:bg-[#22C55E]/90'
                      : 'hover:border-[#22C55E]/50'
                      }`}
                    onClick={() => toggleSelection('allergies', allergen)}
                  >
                    {allergen}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">
                {t.registration.step3.skip}
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-2">{t.registration.step4.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {t.registration.step4.subtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.lists.dietaryPreferences.map((pref) => (
                  <Badge
                    key={pref}
                    variant={formData.preferences.includes(pref) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all px-4 py-2 ${formData.preferences.includes(pref)
                      ? 'bg-[#22C55E] text-white border-[#22C55E] hover:bg-[#22C55E]/90'
                      : 'hover:border-[#22C55E]/50'
                      }`}
                    onClick={() => toggleSelection('preferences', pref)}
                  >
                    {pref}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">
                {t.registration.step4.optional}
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-2">{t.registration.step5.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {t.registration.step5.subtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.lists.healthGoals.map((goal) => (
                  <Badge
                    key={goal}
                    variant={formData.goals.includes(goal) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all px-4 py-2 ${formData.goals.includes(goal)
                      ? 'bg-[#22C55E] text-white border-[#22C55E] hover:bg-[#22C55E]/90'
                      : 'hover:border-[#22C55E]/50'
                      }`}
                    onClick={() => toggleSelection('goals', goal)}
                  >
                    {goal}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">
                {t.registration.step5.optional}
              </p>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-2">{t.registration.step6.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {t.registration.step6.subtitle}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.registration.step6.labels.name}</p>
                  <p>{formData.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.registration.step6.labels.email}</p>
                  <p>{formData.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t.registration.step6.labels.country}</p>
                    <p>{formData.country}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t.registration.step6.labels.language}</p>
                    <p>{formData.language}</p>
                  </div>
                </div>
                {formData.allergies.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">{t.registration.step6.labels.allergies}</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.allergies.map((allergen) => (
                        <Badge key={allergen} className="bg-[#22C55E]">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {formData.preferences.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">{t.registration.step6.labels.preferences}</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.preferences.map((pref) => (
                        <Badge key={pref} className="bg-[#22C55E]">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {formData.goals.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">{t.registration.step6.labels.goals}</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.goals.map((goal) => (
                        <Badge key={goal} className="bg-[#22C55E]">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 p-6 pb-8">
        <div className="max-w-md mx-auto">
          {step < 6 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={step !== 2 && !canProceed()}
              className="w-full h-14 bg-[#22C55E] text-white hover:bg-[#22C55E]/90 rounded-2xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.registration.continue}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                StorageService.saveUserProfile(formData);
                onComplete();
              }}
              className="w-full h-14 bg-[#22C55E] text-white hover:bg-[#22C55E]/90 rounded-2xl shadow-md"
            >
              {t.registration.step6.complete}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
