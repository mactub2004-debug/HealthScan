import { ChevronLeft, Bell, Shield, User, Globe, Languages, Moon, HelpCircle, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { demoUserProfile, commonAllergens, dietaryPreferences, countries, languages } from '../../lib/demo-data';
import { useState } from 'react';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
  onActivateDemoMode?: () => void;
}

export function SettingsScreen({ onNavigate, onActivateDemoMode }: SettingsScreenProps) {
  const [profileData, setProfileData] = useState({
    name: demoUserProfile.name,
    email: demoUserProfile.email,
    country: demoUserProfile.country,
    language: demoUserProfile.language
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white px-6 pt-10 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-2">
            <button 
              onClick={() => onNavigate('profile')}
              className="p-2 hover:bg-gray-100 rounded-full -ml-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1>Settings & Preferences</h1>
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-6">
          <h3 className="mb-4">Profile Information</h3>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm mb-2 block">Full Name</Label>
              <Input 
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="bg-[#F8F9FA]"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm mb-2 block">Email</Label>
              <Input 
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="bg-[#F8F9FA]"
              />
            </div>

            <div>
              <Label htmlFor="country" className="text-sm mb-2 block">Country</Label>
              <Select value={profileData.country} onValueChange={(value) => setProfileData({...profileData, country: value})}>
                <SelectTrigger className="bg-[#F8F9FA]">
                  <SelectValue placeholder="Select country" />
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
              <Label htmlFor="language" className="text-sm mb-2 block">Language</Label>
              <Select value={profileData.language} onValueChange={(value) => setProfileData({...profileData, language: value})}>
                <SelectTrigger className="bg-[#F8F9FA]">
                  <SelectValue placeholder="Select language" />
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
        </div>

        {/* Dietary Preferences */}
        <div className="px-6 pb-6">
          <h3 className="mb-4">Dietary Preferences</h3>
          <div className="space-y-3">
            <button className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#EF4444]/10 rounded-2xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#EF4444]" />
                  </div>
                  <div>
                    <p>Manage Allergies</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {demoUserProfile.allergies.join(', ')}
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
                    <p>Diet Preferences</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {demoUserProfile.preferences.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* App Settings */}
        <div className="px-6 pb-6">
          <h3 className="mb-4">App Settings</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#F97316]" />
                </div>
                <p>Notifications</p>
              </div>
              <Switch />
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center">
                  <Moon className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <p>Dark Mode</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Demo Mode */}
        <div className="px-6 pb-6">
          <Button
            onClick={onActivateDemoMode}
            className="w-full h-14 bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 rounded-2xl shadow-md"
          >
            <Eye className="w-5 h-5 mr-2" />
            Activate Demo Mode
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Demo mode allows you to preview all screens
          </p>
        </div>

        {/* Support */}
        <div className="px-6 pb-6">
          <button className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p>Help & FAQ</p>
                <p className="text-xs text-muted-foreground mt-0.5">Get help and support</p>
              </div>
            </div>
          </button>
        </div>

        {/* App Info */}
        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-muted-foreground">HealthScan v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
