import { useState } from 'react';
import { ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { commonAllergens, dietaryPreferences, healthGoals, countries, languages } from '../../lib/demo-data';

interface RegistrationScreenProps {
  onComplete: () => void;
}

export function RegistrationScreen({ onComplete }: RegistrationScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    language: '',
    allergies: [] as string[],
    preferences: [] as string[],
    goals: [] as string[]
  });

  const toggleSelection = (category: 'allergies' | 'preferences' | 'goals', item: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.email && formData.country && formData.language;
    return true;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 pt-10 pb-6">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="p-2 hover:bg-gray-100 rounded-full -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div className="flex-1">
            <h1>Create Your Profile</h1>
            <p className="text-sm text-muted-foreground">Step {step} of 6</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto">
          <div className="h-1.5 bg-gray-100">
            <div 
              className="h-full bg-[#22C55E] transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
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
                <h2 className="mb-2">About You</h2>
                <p className="text-sm text-muted-foreground">
                  Let's get to know you better
                </p>
              </div>
              <div>
                <Label htmlFor="name" className="text-sm mb-2 block">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white h-12 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm mb-2 block">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white h-12 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="country" className="text-sm mb-2 block">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                  <SelectTrigger className="bg-white h-12 rounded-xl">
                    <SelectValue placeholder="Select your country" />
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
              <div>
                <Label htmlFor="language" className="text-sm mb-2 block">Language *</Label>
                <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                  <SelectTrigger className="bg-white h-12 rounded-xl">
                    <SelectValue placeholder="Select your language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
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
                <div className="absolute w-48 h-48 rounded-full bg-[#22C55E]/15 animate-pulse" style={{ animationDuration: '3s' }} />
                {/* Middle circle - subtle pulse */}
                <div className="absolute w-36 h-36 rounded-full bg-[#22C55E]/25 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
                {/* Inner circle - bounce effect */}
                <div className="absolute w-24 h-24 rounded-full bg-[#22C55E]/35 flex items-center justify-center animate-pulse" style={{ animationDuration: '2.5s' }}>
                  <ClipboardList className="w-12 h-12 text-[#22C55E] animate-pulse" strokeWidth={2.5} style={{ animationDuration: '2s' }} />
                </div>
              </div>

              {/* Text content */}
              <div className="text-center max-w-sm px-6 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '300ms' }}>
                <h2 className="mb-3">Let's customize your nutrition filter to match your specific needs</h2>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-2">Select Your Allergies</h2>
                <p className="text-sm text-muted-foreground">
                  We'll check products against these allergens
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {commonAllergens.map((allergen) => (
                  <Badge
                    key={allergen}
                    variant={formData.allergies.includes(allergen) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all px-4 py-2 ${
                      formData.allergies.includes(allergen) 
                        ? 'bg-[#EF4444] text-white border-[#EF4444] hover:bg-[#EF4444]/90' 
                        : 'hover:border-[#EF4444]/50'
                    }`}
                    onClick={() => toggleSelection('allergies', allergen)}
                  >
                    {allergen}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">
                You can skip this if you have no allergies
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-2">Dietary Preferences</h2>
                <p className="text-sm text-muted-foreground">
                  Choose what matters to you
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {dietaryPreferences.map((pref) => (
                  <Badge
                    key={pref}
                    variant={formData.preferences.includes(pref) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all px-4 py-2 ${
                      formData.preferences.includes(pref) 
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
                Optional - helps us recommend better products
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-2">Health Goals</h2>
                <p className="text-sm text-muted-foreground">
                  What are you working towards?
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {healthGoals.map((goal) => (
                  <Badge
                    key={goal}
                    variant={formData.goals.includes(goal) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all px-4 py-2 ${
                      formData.goals.includes(goal) 
                        ? 'bg-[#3B82F6] text-white border-[#3B82F6] hover:bg-[#3B82F6]/90' 
                        : 'hover:border-[#3B82F6]/50'
                    }`}
                    onClick={() => toggleSelection('goals', goal)}
                  >
                    {goal}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">
                Optional - helps personalize your experience
              </p>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-2">You're All Set! 🎉</h2>
                <p className="text-sm text-muted-foreground">
                  Review your profile details
                </p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Name</p>
                  <p>{formData.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p>{formData.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Country</p>
                    <p>{formData.country}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Language</p>
                    <p>{formData.language}</p>
                  </div>
                </div>
                {formData.allergies.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Allergies</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.allergies.map((allergen) => (
                        <Badge key={allergen} className="bg-[#EF4444]">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {formData.preferences.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Preferences</p>
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
                    <p className="text-xs text-muted-foreground mb-2">Goals</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.goals.map((goal) => (
                        <Badge key={goal} className="bg-[#3B82F6]">
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
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={onComplete}
              className="w-full h-14 bg-[#22C55E] text-white hover:bg-[#22C55E]/90 rounded-2xl shadow-md"
            >
              Complete Setup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
