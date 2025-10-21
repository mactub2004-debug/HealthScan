import { useState } from 'react';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { RegistrationScreen } from './components/screens/RegistrationScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { CameraScreen } from './components/screens/CameraScreen';
import { ScanResultScreen } from './components/screens/ScanResultScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { SearchScreen } from './components/screens/SearchScreen';
import { RecommendationsScreen } from './components/screens/RecommendationsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { ProductComparisonScreen } from './components/screens/ProductComparisonScreen';
import { ShoppingListScreen } from './components/screens/ShoppingListScreen';
import { StatsScreen } from './components/screens/StatsScreen';
import { BottomNav } from './components/BottomNav';
import { Product, demoProducts } from './lib/demo-data';
import { Eye } from 'lucide-react';
import { Button } from './components/ui/button';

type AppFlow = 'onboarding' | 'registration' | 'main';
type MainScreen = 'home' | 'search' | 'history' | 'profile' | 'settings' | 'camera' | 'scan-result' | 'recommendations' | 'favorites' | 'comparison' | 'shopping-list' | 'stats';
type DemoScreen = 'selector' | 'onboarding' | 'registration' | 'home' | 'camera' | 'scan-result' | 'history' | 'search' | 'recommendations' | 'profile' | 'settings' | 'favorites' | 'comparison' | 'shopping-list' | 'stats';

interface NavigationState {
  screen: MainScreen;
  data?: {
    product?: Product;
    products?: Product[];
  };
}

export default function App() {
  const [demoMode, setDemoMode] = useState(true);
  const [currentDemoScreen, setCurrentDemoScreen] = useState<DemoScreen>('onboarding');
  const [appFlow, setAppFlow] = useState<AppFlow>('onboarding');
  const [navigation, setNavigation] = useState<NavigationState>({ screen: 'home' });
  const [navigationHistory, setNavigationHistory] = useState<NavigationState[]>([]);

  const handleNavigate = (screen: MainScreen, data?: any) => {
    // Save current state to history if navigating to detail screens
    if (screen === 'scan-result' || screen === 'camera' || screen === 'comparison') {
      setNavigationHistory([...navigationHistory, navigation]);
    }
    
    setNavigation({ screen, data });
  };

  const handleBack = () => {
    if (navigationHistory.length > 0) {
      const previousState = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(navigationHistory.slice(0, -1));
      setNavigation(previousState);
    } else {
      setNavigation({ screen: 'home' });
    }
  };

  // Demo Mode - Screen Selector
  if (demoMode) {
    const screens = [
      { id: 'onboarding', name: 'Onboarding', description: '3-slide introduction' },
      { id: 'registration', name: 'Registration', description: '4-step profile setup' },
      { id: 'home', name: 'Home Dashboard', description: 'Main screen with stats' },
      { id: 'camera', name: 'Camera/Scan', description: 'Scanning interface' },
      { id: 'scan-result', name: 'Scan Result', description: 'Product details' },
      { id: 'history', name: 'History', description: 'Scan history' },
      { id: 'favorites', name: 'Favorites', description: 'Saved products' },
      { id: 'shopping-list', name: 'Shopping List', description: 'Your shopping checklist' },
      { id: 'search', name: 'Search', description: 'Product search & filters' },
      { id: 'recommendations', name: 'Recommendations', description: 'Smart product picks' },
      { id: 'profile', name: 'Profile', description: 'User profile & account' },
      { id: 'settings', name: 'Settings', description: 'App preferences' },
      { id: 'stats', name: 'Statistics', description: 'Detailed stats & insights' }
    ];

    if (currentDemoScreen === 'selector') {
      return (
        <div className="min-h-screen bg-background p-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="mb-2">HealthScan - Screen Review</h1>
              <p className="text-muted-foreground">Click on any screen to preview it</p>
              <Button 
                variant="outline" 
                onClick={() => setDemoMode(false)}
                className="mt-4"
              >
                Exit Demo Mode
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {screens.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => setCurrentDemoScreen(screen.id as DemoScreen)}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all text-left hover:shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3>{screen.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {screen.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Show selected screen with back button
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto relative">
          {/* Back to selector button */}
          <div className="fixed top-4 left-4 z-50">
            <Button
              onClick={() => setCurrentDemoScreen('selector')}
              variant="outline"
              size="sm"
              className="bg-card shadow-lg"
            >
              ← Back to Menu
            </Button>
          </div>

          {/* Render selected screen */}
          {currentDemoScreen === 'onboarding' && (
            <OnboardingScreen onComplete={() => setCurrentDemoScreen('selector')} />
          )}
          
          {currentDemoScreen === 'registration' && (
            <RegistrationScreen onComplete={() => setCurrentDemoScreen('selector')} />
          )}

          {currentDemoScreen === 'home' && (
            <>
              <div key="home-screen" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <HomeScreen onNavigate={(screen, data) => {
                  if (screen === 'scan-result') {
                    setCurrentDemoScreen('scan-result');
                  } else if (screen === 'camera') {
                    setCurrentDemoScreen('camera');
                  } else {
                    setCurrentDemoScreen(screen as DemoScreen);
                  }
                }} />
              </div>
              <BottomNav activeScreen="home" onNavigate={(screen) => setCurrentDemoScreen(screen as DemoScreen)} />
            </>
          )}

          {currentDemoScreen === 'camera' && (
            <div key="camera-screen" className="fixed inset-0 z-50 animate-in fade-in slide-in-from-bottom duration-500">
              <CameraScreen 
                onNavigate={(screen, data) => {
                  if (screen === 'scan-result') {
                    setCurrentDemoScreen('scan-result');
                  } else {
                    setCurrentDemoScreen(screen as DemoScreen);
                  }
                }}
                onClose={() => setCurrentDemoScreen('selector')}
              />
            </div>
          )}

          {currentDemoScreen === 'scan-result' && (
            <ScanResultScreen 
              product={demoProducts[0]}
              onNavigate={(screen, data) => {
                if (screen === 'comparison') {
                  setCurrentDemoScreen('comparison');
                } else {
                  setCurrentDemoScreen(screen as DemoScreen);
                }
              }}
              onBack={() => setCurrentDemoScreen('selector')}
            />
          )}

          {currentDemoScreen === 'comparison' && (
            <ProductComparisonScreen 
              products={[demoProducts[0], demoProducts[3]]}
              onNavigate={(screen, data) => setCurrentDemoScreen(screen as DemoScreen)}
              onBack={() => setCurrentDemoScreen('scan-result')}
              onAddProduct={() => setCurrentDemoScreen('camera')}
            />
          )}

          {currentDemoScreen === 'history' && (
            <>
              <div key="history-screen">
                <HistoryScreen onNavigate={(screen, data) => {
                  if (screen === 'scan-result') {
                    setCurrentDemoScreen('scan-result');
                  } else {
                    setCurrentDemoScreen(screen as DemoScreen);
                  }
                }} />
              </div>
              <BottomNav activeScreen="history" onNavigate={(screen) => setCurrentDemoScreen(screen as DemoScreen)} />
            </>
          )}

          {currentDemoScreen === 'search' && (
            <>
              <div key="search-screen" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <SearchScreen onNavigate={(screen, data) => {
                  if (screen === 'scan-result') {
                    setCurrentDemoScreen('scan-result');
                  } else {
                    setCurrentDemoScreen(screen as DemoScreen);
                  }
                }} />
              </div>
              <BottomNav activeScreen="search" onNavigate={(screen) => setCurrentDemoScreen(screen as DemoScreen)} />
            </>
          )}

          {currentDemoScreen === 'recommendations' && (
            <>
              <div key="recommendations-screen">
                <RecommendationsScreen onNavigate={(screen, data) => {
                  if (screen === 'scan-result') {
                    setCurrentDemoScreen('scan-result');
                  } else {
                    setCurrentDemoScreen(screen as DemoScreen);
                  }
                }} />
              </div>
              <BottomNav activeScreen="home" onNavigate={(screen) => setCurrentDemoScreen(screen as DemoScreen)} />
            </>
          )}

          {currentDemoScreen === 'profile' && (
            <>
              <div key="profile-screen" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <ProfileScreen onNavigate={(screen) => setCurrentDemoScreen(screen as DemoScreen)} />
              </div>
              <BottomNav activeScreen="profile" onNavigate={(screen) => setCurrentDemoScreen(screen as DemoScreen)} />
            </>
          )}

          {currentDemoScreen === 'stats' && (
            <div key="stats-screen">
              <StatsScreen onBack={() => setCurrentDemoScreen('profile')} />
            </div>
          )}

          {currentDemoScreen === 'settings' && (
            <div key="settings-screen">
              <SettingsScreen 
                onNavigate={(screen) => setCurrentDemoScreen(screen as DemoScreen)} 
                onActivateDemoMode={() => setCurrentDemoScreen('selector')}
              />
            </div>
          )}

          {currentDemoScreen === 'favorites' && (
            <>
              <div key="favorites-screen">
                <FavoritesScreen 
                  onNavigate={(screen, data) => {
                    if (screen === 'scan-result') {
                      setCurrentDemoScreen('scan-result');
                    } else {
                      setCurrentDemoScreen(screen as DemoScreen);
                    }
                  }}
                  onBack={() => setCurrentDemoScreen('profile')}
                />
              </div>
              <BottomNav activeScreen="favorites" onNavigate={(screen) => setCurrentDemoScreen(screen as DemoScreen)} />
            </>
          )}

          {currentDemoScreen === 'shopping-list' && (
            <>
              <div key="shopping-list-screen" className="animate-in fade-in slide-in-from-right-8 duration-300">
                <ShoppingListScreen 
                  onNavigate={(screen, data) => setCurrentDemoScreen(screen as DemoScreen)}
                />
              </div>
              <BottomNav activeScreen="shopping-list" onNavigate={(screen) => setCurrentDemoScreen(screen as DemoScreen)} />
            </>
          )}
        </div>
      </div>
    );
  }

  // Normal App Flow (when demo mode is off)
  // Onboarding flow
  if (appFlow === 'onboarding') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto">
          <OnboardingScreen onComplete={() => setAppFlow('registration')} />
        </div>
      </div>
    );
  }

  // Registration flow
  if (appFlow === 'registration') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto">
          <RegistrationScreen onComplete={() => setAppFlow('main')} />
        </div>
      </div>
    );
  }

  // Main app screens
  const showBottomNav = !['camera', 'scan-result', 'settings', 'comparison'].includes(navigation.screen);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto relative">
        {/* Camera Screen (fullscreen overlay) */}
        {navigation.screen === 'camera' && (
          <div className="fixed inset-0 z-50 animate-in fade-in slide-in-from-bottom duration-500">
            <CameraScreen 
              onNavigate={handleNavigate}
              onClose={handleBack}
            />
          </div>
        )}

        {/* Scan Result Screen */}
        {navigation.screen === 'scan-result' && navigation.data?.product && (
          <ScanResultScreen 
            product={navigation.data.product}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        )}

        {/* Product Comparison Screen */}
        {navigation.screen === 'comparison' && navigation.data?.products && (
          <ProductComparisonScreen 
            products={navigation.data.products}
            onNavigate={handleNavigate}
            onBack={handleBack}
            onAddProduct={() => handleNavigate('camera')}
          />
        )}

        {/* Main screens with bottom navigation */}
        {navigation.screen !== 'camera' && navigation.screen !== 'scan-result' && (
          <>
            {navigation.screen === 'home' && (
              <div key="home-main" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <HomeScreen onNavigate={handleNavigate} />
              </div>
            )}
            
            {navigation.screen === 'search' && (
              <div key="search-main" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <SearchScreen onNavigate={handleNavigate} />
              </div>
            )}
            
            {navigation.screen === 'history' && (
              <div key="history-main" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <HistoryScreen onNavigate={handleNavigate} />
              </div>
            )}
            
            {navigation.screen === 'recommendations' && (
              <div key="recommendations-main" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <RecommendationsScreen onNavigate={handleNavigate} />
              </div>
            )}
            
            {navigation.screen === 'profile' && (
              <div key="profile-main" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <ProfileScreen onNavigate={handleNavigate} />
              </div>
            )}

            {navigation.screen === 'favorites' && (
              <div key="favorites-main">
                <FavoritesScreen 
                  onNavigate={handleNavigate}
                  onBack={() => handleNavigate('profile')}
                />
              </div>
            )}

            {navigation.screen === 'shopping-list' && (
              <div key="shopping-list-main" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <ShoppingListScreen 
                  onNavigate={handleNavigate}
                />
              </div>
            )}

            {navigation.screen === 'stats' && (
              <div key="stats-main">
                <StatsScreen onBack={() => handleNavigate('profile')} />
              </div>
            )}
            
            {navigation.screen === 'settings' && (
              <div key="settings-main">
                <SettingsScreen 
                  onNavigate={handleNavigate}
                  onActivateDemoMode={() => setDemoMode(true)}
                />
              </div>
            )}

            {showBottomNav && (
              <BottomNav 
                activeScreen={navigation.screen}
                onNavigate={(screen) => handleNavigate(screen as MainScreen)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
