export type Language = 'ES' | 'EN';

export const translations = {
    ES: {
        common: {
            loading: 'Cargando...',
            error: 'Algo salió mal',
            save: 'Guardar',
            cancel: 'Cancelar',
            edit: 'Editar',
            delete: 'Eliminar',
            back: 'Atrás',
            search: 'Buscar',
            filter: 'Filtrar',
            scan: 'Escanear',
            scans: 'escaneos',
            week: 'Semana',
            month: 'Mes',
            year: 'Año',
            thisWeek: 'Esta semana',
            imageError: 'Error cargando imagen',
            nav: {
                home: 'Inicio',
                search: 'Buscar',
                scan: 'Escanear',
                list: 'Lista',
                profile: 'Perfil'
            },
            days: {
                mon: 'Lun',
                tue: 'Mar',
                jun: 'Jun',
                jul: 'Jul',
                aug: 'Ago',
                sep: 'Sep',
                oct: 'Oct',
                nov: 'Nov',
                dec: 'Dic'
            },
            weekLabel: 'Semana',
            time: {
                justNow: 'Ahora mismo'
            }
        },
        welcome: {
            title: 'Tu asistente de compras inteligentes',
            subtitle: 'Descubrí qué productos son realmente buenos para vos.',
            getStarted: 'Comenzar',
            alreadyHaveAccount: '¿Ya usas Picko? ',
            signIn: 'Entrar',
            analyzing: 'Analizando...'
        },
        onboarding: {
            skip: 'Saltar',
            next: 'Siguiente',
            getStarted: 'Comenzar',
            slides: [
                {
                    title: 'Escanea cualquier producto',
                    description: 'Simplemente escanea el código de barras o toma una foto de cualquier producto alimenticio para obtener información nutricional instantánea y alertas de seguridad.'
                },
                {
                    title: 'Mantente seguro',
                    description: 'Verificamos los ingredientes contra tus alergias y preferencias dietéticas para mantenerte protegido y saludable.'
                },
                {
                    title: 'Recomendaciones inteligentes',
                    description: 'Obtén sugerencias de productos personalizadas basadas en tus objetivos de salud y preferencias dietéticas.'
                }
            ]
        },
        registration: {
            step1: {
                title: 'Sobre ti',
                subtitle: 'Vamos a conocerte mejor',
                nameLabel: 'Nombre completo',
                namePlaceholder: 'Ingresa tu nombre',
                emailLabel: 'Correo electrónico',
                emailPlaceholder: 'tu@email.com',
                countryLabel: 'País *',
                countryPlaceholder: 'Selecciona tu país',
                languageLabel: 'Idioma *',
                languagePlaceholder: 'Selecciona tu idioma'
            },
            step2: {
                title: 'Vamos a personalizar tu filtro de nutrición para satisfacer tus necesidades específicas'
            },
            step3: {
                title: 'Selecciona tus alergias',
                subtitle: 'Verificaremos los productos contra estos alérgenos',
                skip: 'Puedes saltar esto si no tienes alergias'
            },
            step4: {
                title: 'Preferencias dietéticas',
                subtitle: 'Elige lo que te importa',
                optional: 'Opcional - nos ayuda a recomendar mejores productos'
            },
            step5: {
                title: 'Objetivos de salud',
                subtitle: '¿En qué estás trabajando? (Selecciona hasta dos)',
                optional: 'Opcional - ayuda a personalizar tu experiencia'
            },
            step6: {
                title: '¡Todo listo! 🎉',
                subtitle: 'Revisa los detalles de tu perfil',
                labels: {
                    name: 'Nombre',
                    email: 'Correo',
                    country: 'País',
                    language: 'Idioma',
                    allergies: 'Alergias',
                    preferences: 'Preferencias',
                    goals: 'Objetivos'
                },
                complete: 'Finalizar configuración'
            },
            continue: 'Continuar',
            header: {
                title: 'Crea tu perfil',
                step: 'Paso'
            }
        },
        lists: {
            allergens: [
                'Gluten', 'Leche', 'Huevos', 'Pescado', 'Crustáceos',
                'Nueces', 'Maní', 'Trigo', 'Soja', 'Sésamo'
            ],
            dietaryPreferences: [
                'Vegano', 'Vegetariano', 'Sin gluten', 'Sin lácteos', 'Orgánico',
                'Bajo en azúcar', 'Bajo en sodio', 'Alto en proteína', 'Keto', 'Paleo'
            ],
            healthGoals: [
                'Perder peso', 'Ganar músculo', 'Mantener peso', 'Mejorar energía',
                'Mejor digestión', 'Salud del corazón', 'Controlar diabetes', 'Reducir colesterol'
            ]
        },
        home: {
            greeting: 'Hola',
            readyMessage: '¿Listo para tomar decisiones saludables?',
            scanProduct: 'Escanear producto',
            recentScans: 'Escaneos recientes',
            viewAll: 'Ver todo',
            dailySummary: 'Resumen diario',
            calories: 'Calorías',
            protein: 'Proteína',
            carbs: 'Carbohidratos',
            fat: 'Grasas',
            quickActions: 'Acciones rápidas',
            smartPicks: 'Selecciones inteligentes',
            forYou: 'Para ti',
            community: 'Comunidad',
            topRated: 'Mejor valorados',
            recommended: 'Recomendado para ti',
            dailyTip: 'Consejo diario',
            tipContent: '¿Leyendo etiquetas nutricionales? Concéntrate primero en el tamaño de la porción para calcular con precisión tu ingesta.',
            emptyState: {
                title: '¡Haz tu primer escaneo!',
                description: 'Comienza a construir tu historial nutricional escaneando productos y marcando los que has comprado.'
            },
            status: {
                suitable: 'Adecuado',
                questionable: 'Cuestionable',
                notRecommended: 'No recomendado',
                unknown: 'Desconocido'
            },
            categories: {
                snacks: 'Snacks',
                beverages: 'Bebidas',
                dairy: 'Lácteos',
                breakfast: 'Desayuno',
                frozen: 'Congelados'
            }
        },
        stats: {
            title: 'Estadísticas',
            detailedStats: 'Estadísticas detalladas',
            insights: 'Información sobre tu salud',
            scoreEvolution: 'Evolución de puntuación',
            topBrands: 'Ranking de marcas',
            currentScore: 'Puntuación actual',
            totalScans: 'Total de escaneos',
            favorites: 'Favoritos',
            weeklyOverview: 'Resumen semanal',
            nutritionScore: 'Puntuación nutricional',
            scannedProducts: 'Productos escaneados',
            healthyChoices: 'Elecciones saludables',
            trend: 'tendencia de puntuación'
        },
        profile: {
            title: 'Perfil',
            personalInfo: 'Información personal',
            dietaryNeeds: 'Necesidades dietéticas',
            appSettings: 'Configuración de la aplicación',
            editProfile: 'Editar perfil',
            signOut: 'Cerrar sesión'
        },
        search: {
            title: 'Buscar productos',
            subtitle: 'Encuentra y compara productos',
            placeholder: 'Buscar por nombre, marca o categoría...',
            categories: 'Categorías',
            filterByStatus: 'Filtrar por estado',
            selected: 'seleccionado(s)',
            clearFilters: 'Limpiar filtros',
            noResults: 'Ningún producto encontrado',
            tryAdjusting: 'Intenta ajustar tu búsqueda o filtros',
            found: 'producto(s) encontrado(s)',
            statusLabels: {
                safe: 'Seguro',
                caution: 'Cuidado',
                avoid: 'Evitar'
            }
        },
        history: {
            title: 'Historial',
            scannedCount: 'productos escaneados',
            tabs: {
                products: 'Historial de productos',
                comparisons: 'Comparaciones'
            },
            noHistory: 'Aún no hay historial',
            startScanning: 'Comienza a escanear para construir tu historial',
            noComparisons: 'Aún no hay comparaciones',
            compareHint: 'Compara productos para tomar mejores decisiones',
            viewComparison: 'Toca para ver detalles',
            time: {
                justNow: 'Ahora mismo',
                ago: 'h atrás',
                yesterday: 'Ayer',
                daysAgo: 'días atrás'
            }
        },
        favorites: {
            title: 'Favoritos',
            savedCount: 'producto(s) guardado(s)',
            deleteHint: 'Arrastra aquí para eliminar',
            releaseHint: 'Suelta para eliminar',
            noFavorites: 'Aún no hay favoritos',
            hint: 'Los productos que marques como favoritos aparecerán aquí',
            dragHint: 'Arrastra los ítems hacia arriba para eliminarlos'
        },
        scanResult: {
            status: {
                suitable: {
                    label: 'Adecuado para ti',
                    description: 'Este producto coincide con tu perfil dietético y objetivos de salud.'
                },
                questionable: {
                    label: 'Revisión necesaria',
                    description: 'Este producto tiene algunas preocupaciones. Verifica los detalles abajo.'
                },
                notRecommended: {
                    label: 'No recomendado',
                    description: 'Este producto entra en conflicto con tu perfil dietético.'
                }
            },
            nutritionScore: 'Puntuación nutricional:',
            analysis: {
                title: 'Análisis personalizado',
                benefits: 'Beneficios',
                concerns: 'Preocupaciones'
            },
            ingredients: 'Ingredientes',
            allergens: 'Información de alérgenos',
            alternatives: {
                title: 'Mejores alternativas',
                seeAll: 'Ver todo'
            },
            actions: {
                scanAnother: 'Escanear otro',
                compare: 'Comparar',
                viewSimilar: 'Ver similares',
                markAsPurchased: 'Marcar comprado',
                purchased: 'Comprado ✓'
            },
            compare: {
                title: 'Comparar productos',
                subtitle: 'Elige un producto de tu historial para comparar con',
                scanNew: 'Escanear nuevo producto',
                scanNewDesc: 'Usa la cámara para escanear otro producto',
                orHistory: 'o elige del historial'
            },
            nutrition: {
                title: 'Información Nutricional',
                perPortion: 'Por Porción',
                per100g: 'Por 100g',
                calories: 'Calorías',
                protein: 'Proteína',
                carbs: 'Carbohidratos',
                fat: 'Grasas',
                fiber: 'Fibra',
                sugar: 'Azúcar',
                sodium: 'Sodio'
            }
        },
        settings: {
            title: 'Configuración y Preferencias',
            profile: {
                title: 'Información del perfil',
                name: 'Nombre completo',
                email: 'Correo electrónico',
                country: 'País',
                selectCountry: 'Selecciona el país',
                language: 'Idioma',
                selectLanguage: 'Selecciona el idioma',
                save: 'Guardar cambios',
                savedSuccess: '¡Perfil guardado con éxito!'
            },
            dietary: {
                title: 'Preferencias dietéticas',
                allergies: 'Gestionar alergias',
                preferences: 'Preferencias de dieta'
            },
            app: {
                title: 'Configuración de la aplicación',
                notifications: 'Notificaciones',
                darkMode: 'Modo oscuro'
            },
            support: {
                help: 'Ayuda y FAQ',
                helpDesc: 'Obtén ayuda y soporte'
            }
        }
    },
    EN: {
        common: {
            loading: 'Loading...',
            error: 'Something went wrong',
            save: 'Save',
            cancel: 'Cancel',
            edit: 'Edit',
            delete: 'Delete',
            back: 'Back',
            search: 'Search',
            filter: 'Filter',
            scan: 'Scan',
            scans: 'scans',
            week: 'Week',
            month: 'Month',
            year: 'Year',
            thisWeek: 'This week',
            imageError: 'Error loading image',
            nav: {
                home: 'Home',
                search: 'Search',
                scan: 'Scan',
                list: 'List',
                profile: 'Profile'
            },
            days: {
                mon: 'Mon',
                tue: 'Tue',
                jun: 'Jun',
                jul: 'Jul',
                aug: 'Aug',
                sep: 'Sep',
                oct: 'Oct',
                nov: 'Nov',
                dec: 'Dec'
            },
            weekLabel: 'Week',
            time: {
                justNow: 'Just now'
            }
        },
        welcome: {
            title: 'Your smart shopping assistant',
            subtitle: 'Discover which products are really good for you.',
            getStarted: 'Get Started',
            alreadyHaveAccount: 'Already use Picko? ',
            signIn: 'Sign In',
            analyzing: 'Analyzing...'
        },
        onboarding: {
            skip: 'Skip',
            next: 'Next',
            getStarted: 'Get Started',
            slides: [
                {
                    title: 'Scan any product',
                    description: 'Simply scan the barcode or take a photo of any food product to get instant nutritional information and safety alerts.'
                },
                {
                    title: 'Stay safe',
                    description: 'We check ingredients against your allergies and dietary preferences to keep you protected and healthy.'
                },
                {
                    title: 'Smart recommendations',
                    description: 'Get personalized product suggestions based on your health goals and dietary preferences.'
                }
            ]
        },
        registration: {
            step1: {
                title: 'About you',
                subtitle: 'Let\'s get to know you better',
                nameLabel: 'Full name',
                namePlaceholder: 'Enter your name',
                emailLabel: 'Email',
                emailPlaceholder: 'your@email.com',
                countryLabel: 'Country *',
                countryPlaceholder: 'Select your country',
                languageLabel: 'Language *',
                languagePlaceholder: 'Select your language'
            },
            step2: {
                title: 'Let\'s customize your nutrition filter to meet your specific needs'
            },
            step3: {
                title: 'Select your allergies',
                subtitle: 'We will check products against these allergens',
                skip: 'You can skip this if you don\'t have allergies'
            },
            step4: {
                title: 'Dietary preferences',
                subtitle: 'Choose what matters to you',
                optional: 'Optional - helps us recommend better products'
            },
            step5: {
                title: 'Health goals',
                subtitle: 'What are you working on? (Select up to two)',
                optional: 'Optional - helps customize your experience'
            },
            step6: {
                title: 'All set! 🎉',
                subtitle: 'Review your profile details',
                labels: {
                    name: 'Name',
                    email: 'Email',
                    country: 'Country',
                    language: 'Language',
                    allergies: 'Allergies',
                    preferences: 'Preferences',
                    goals: 'Goals'
                },
                complete: 'Complete setup'
            },
            continue: 'Continue',
            header: {
                title: 'Create your profile',
                step: 'Step'
            }
        },
        lists: {
            allergens: [
                'Gluten', 'Milk', 'Eggs', 'Fish', 'Crustaceans',
                'Nuts', 'Peanuts', 'Wheat', 'Soy', 'Sesame'
            ],
            dietaryPreferences: [
                'Vegan', 'Vegetarian', 'Gluten Free', 'Dairy Free', 'Organic',
                'Low Sugar', 'Low Sodium', 'High Protein', 'Keto', 'Paleo'
            ],
            healthGoals: [
                'Lose Weight', 'Build Muscle', 'Maintain Weight', 'Improve Energy',
                'Better Digestion', 'Heart Health', 'Manage Diabetes', 'Reduce Cholesterol'
            ]
        },
        home: {
            greeting: 'Hello',
            readyMessage: 'Ready to make healthy choices?',
            scanProduct: 'Scan product',
            recentScans: 'Recent scans',
            viewAll: 'View all',
            dailySummary: 'Daily summary',
            calories: 'Calories',
            protein: 'Protein',
            carbs: 'Carbs',
            fat: 'Fat',
            quickActions: 'Quick actions',
            smartPicks: 'Smart picks',
            forYou: 'For you',
            community: 'Community',
            topRated: 'Top rated',
            recommended: 'Recommended for you',
            dailyTip: 'Daily tip',
            tipContent: 'Reading nutrition labels? Focus on serving size first to accurately calculate your intake.',
            emptyState: {
                title: 'Make your first scan!',
                description: 'Start building your nutritional history by scanning products and marking the ones you bought.'
            },
            status: {
                suitable: 'Suitable',
                questionable: 'Questionable',
                notRecommended: 'Not Recommended',
                unknown: 'Unknown'
            },
            categories: {
                snacks: 'Snacks',
                beverages: 'Beverages',
                dairy: 'Dairy',
                breakfast: 'Breakfast',
                frozen: 'Frozen'
            }
        },
        stats: {
            title: 'Statistics',
            detailedStats: 'Detailed statistics',
            insights: 'Health insights',
            scoreEvolution: 'Score evolution',
            topBrands: 'Brand ranking',
            currentScore: 'Current score',
            totalScans: 'Total scans',
            favorites: 'Favorites',
            weeklyOverview: 'Weekly overview',
            nutritionScore: 'Nutrition score',
            scannedProducts: 'Scanned products',
            healthyChoices: 'Healthy choices',
            trend: 'score trend'
        },
        profile: {
            title: 'Profile',
            personalInfo: 'Personal information',
            dietaryNeeds: 'Dietary needs',
            appSettings: 'App settings',
            editProfile: 'Edit profile',
            signOut: 'Sign out'
        },
        search: {
            title: 'Search products',
            subtitle: 'Find and compare products',
            placeholder: 'Search by name, brand or category...',
            categories: 'Categories',
            filterByStatus: 'Filter by status',
            selected: 'selected',
            clearFilters: 'Clear filters',
            noResults: 'No products found',
            tryAdjusting: 'Try adjusting your search or filters',
            found: 'product(s) found',
            statusLabels: {
                safe: 'Safe',
                caution: 'Caution',
                avoid: 'Avoid'
            }
        },
        history: {
            title: 'History',
            scannedCount: 'products scanned',
            tabs: {
                products: 'Product history',
                comparisons: 'Comparisons'
            },
            noHistory: 'No history yet',
            startScanning: 'Start scanning to build your history',
            noComparisons: 'No comparisons yet',
            compareHint: 'Compare products to make better choices',
            viewComparison: 'Tap to view details',
            time: {
                justNow: 'Just now',
                ago: 'h ago',
                yesterday: 'Yesterday',
                daysAgo: 'days ago'
            }
        },
        favorites: {
            title: 'Favorites',
            savedCount: 'product(s) saved',
            deleteHint: 'Drag here to delete',
            releaseHint: 'Release to delete',
            noFavorites: 'No favorites yet',
            hint: 'Products you mark as favorite will appear here',
            dragHint: 'Drag items up to delete them'
        },
        scanResult: {
            status: {
                suitable: {
                    label: 'Suitable for you',
                    description: 'This product matches your dietary profile and health goals.'
                },
                questionable: {
                    label: 'Review needed',
                    description: 'This product has some concerns. Check details below.'
                },
                notRecommended: {
                    label: 'Not recommended',
                    description: 'This product conflicts with your dietary profile.'
                }
            },
            nutritionScore: 'Nutrition Score:',
            analysis: {
                title: 'Personalized Analysis',
                benefits: 'Benefits',
                concerns: 'Concerns'
            },
            ingredients: 'Ingredients',
            allergens: 'Allergen Information',
            alternatives: {
                title: 'Better Alternatives',
                seeAll: 'See All'
            },
            actions: {
                scanAnother: 'Scan another',
                compare: 'Compare',
                viewSimilar: 'View similar',
                markAsPurchased: 'Mark purchased',
                purchased: 'Purchased ✓'
            },
            compare: {
                title: 'Compare Products',
                subtitle: 'Choose a product from your history to compare with',
                scanNew: 'Scan new product',
                scanNewDesc: 'Use camera to scan another product',
                orHistory: 'or choose from history'
            },
            nutrition: {
                title: 'Nutrition Facts',
                perPortion: 'Per Portion',
                per100g: 'Per 100g',
                calories: 'Calories',
                protein: 'Protein',
                carbs: 'Carbs',
                fat: 'Fat',
                fiber: 'Fiber',
                sugar: 'Sugar',
                sodium: 'Sodium'
            }
        },
        settings: {
            title: 'Settings & Preferences',
            profile: {
                title: 'Profile Information',
                name: 'Full Name',
                email: 'Email',
                country: 'Country',
                selectCountry: 'Select Country',
                language: 'Language',
                selectLanguage: 'Select Language',
                save: 'Save Changes',
                savedSuccess: 'Profile saved successfully!'
            },
            dietary: {
                title: 'Dietary Preferences',
                allergies: 'Manage Allergies',
                preferences: 'Diet Preferences'
            },
            app: {
                title: 'App Settings',
                notifications: 'Notifications',
                darkMode: 'Dark Mode'
            },
            support: {
                help: 'Help & FAQ',
                helpDesc: 'Get help and support'
            }
        }
    }
};
