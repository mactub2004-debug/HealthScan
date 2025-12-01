import { ChevronLeft, Bell, Shield, User, Globe, Languages, Moon, HelpCircle, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { demoUserProfile, countries, languages } from '../../lib/demo-data';
import { StorageService } from '../../lib/storage';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
  onActivateDemoMode?: () => void;
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const { setLanguage, t } = useLanguage();
  const [profileData, setProfileData] = useState(demoUserProfile);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const storedProfile = StorageService.getUserProfile();
    if (storedProfile) {
      setProfileData(storedProfile);
    }
  }, []);

  const handleSave = () => {
    StorageService.saveUserProfile(profileData);
    // Sync language with app context
    if (profileData.language) {
      // Map full language name to code
      const langMap: Record<string, 'EN' | 'ES'> = {
        'English': 'EN',
        'Español': 'ES',
        'EN': 'EN',
        'ES': 'ES'
      };
      const langCode = langMap[profileData.language] || 'ES';
      setLanguage(langCode);
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white px-6 pt-10 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={() => onNavigate('profile')}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors -ml-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1>{t.settings.title}</h1>
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-6">
          <h3 className="mb-4">{t.settings.profile.title}</h3>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm mb-2 block">{t.settings.profile.name}</Label>
              <Input
                id="name"
                autoComplete="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="bg-[#F8F9FA]"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm mb-2 block">{t.settings.profile.email}</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="bg-[#F8F9FA]"
              />
            </div>

            <div>
              <Label htmlFor="country" className="text-sm mb-2 block">{t.settings.profile.country}</Label>
              <Select value={profileData.country} onValueChange={(value: string) => setProfileData({ ...profileData, country: value })}>
                <SelectTrigger className="bg-[#F8F9FA]">
                  <SelectValue placeholder={t.settings.profile.selectCountry} />
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
              <Label htmlFor="language" className="text-sm mb-2 block">{t.settings.profile.language}</Label>
              <Select value={profileData.language} onValueChange={(value: string) => setProfileData({ ...profileData, language: value })}>
                <SelectTrigger className="bg-[#F8F9FA]">
                  <SelectValue placeholder={t.settings.profile.selectLanguage} />
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

            <Button
              onClick={handleSave}
              className="w-full bg-[#22C55E] text-white hover:bg-[#22C55E]/90"
            >
              <Save className="w-4 h-4 mr-2" />
              {t.settings.profile.save}
            </Button>
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="px-6 pb-6">
          <h3 className="mb-4">{t.settings.dietary.title}</h3>
          <div className="space-y-3">
            <button className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap3">
                  <div className="w-12 h-12 bg-[#EF4444]/10 rounded-2xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#EF4444]" />
                  </div>
                  <div>
                    <p>{t.settings.dietary.allergies}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {profileData.allergies.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </button>

            <button className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#22C55E]/10 rounded-2xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  <div>
                    <p>{t.settings.dietary.preferences}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {profileData.preferences.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* App Settings */}
        <div className="px-6 pb-6">
          <h3 className="mb-4">{t.settings.app.title}</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#F97316]" />
                </div>
                <p>{t.settings.app.notifications}</p>
              </div>
              <Switch />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center">
                  <Moon className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <p>{t.settings.app.darkMode}</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="px-6 pb-6">
          <button className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p>{t.settings.support.help}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.settings.support.helpDesc}</p>
              </div>
            </div>
          </button>
        </div>

        {/* App Info */}
        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-muted-foreground">HealthScan v1.0.0</p>
        </div>
      </div>

      {/* Aesthetic Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#22C55E] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 z-50"
          >
            <div className="bg-white/20 rounded-full p-1">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-medium">{t.settings.profile.savedSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
