export type Language = 'ES' | 'EN' | 'PT';

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
            scan: 'escaneo',
            scans: 'escaneos',
            week: 'Semana',
            month: 'Mes',
            year: 'Año',
            thisWeek: 'Esta semana'
        },
        welcome: {
            title: 'Conoce lo que comes',
            subtitle: 'Análisis personalizado de alimentos.',
            getStarted: 'Comenzar',
            alreadyHaveAccount: '¿Ya usas HealthScan? ',
            signIn: 'Iniciar Sesión',
            analyzing: 'Analizando...'
        },
        onboarding: {
            skip: 'Omitir',
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
                title: 'Personalicemos tu filtro de nutrición para que coincida con tus necesidades específicas'
            },
            step3: {
                title: 'Selecciona tus alergias',
                subtitle: 'Verificaremos los productos contra estos alérgenos',
                skip: 'Puedes omitir esto si no tienes alergias'
            },
            step4: {
                title: 'Preferencias dietéticas',
                subtitle: 'Elige lo que te importa',
                optional: 'Opcional - nos ayuda a recomendar mejores productos'
            },
            step5: {
                title: 'Objetivos de salud',
                subtitle: '¿En qué estás trabajando? (Selecciona uno)',
                optional: 'Opcional - ayuda a personalizar tu experiencia'
            },
            step6: {
                title: '¡Todo listo! 🎉',
                subtitle: 'Revisa los detalles de tu perfil',
                labels: {
                    name: 'Nombre',
                    email: 'Correo electrónico',
                    country: 'País',
                    language: 'Idioma',
                    allergies: 'Alergias',
                    preferences: 'Preferencias',
                    goals: 'Objetivos'
                },
                complete: 'Completar configuración'
            },
            continue: 'Continuar',
            header: {
                title: 'Crea tu perfil',
                step: 'Paso'
            }
        },
        lists: {
            allergens: [
                'Gluten', 'Leche', 'Huevos', 'Pescado', 'Mariscos',
                'Frutos secos', 'Cacahuetes', 'Trigo', 'Soja', 'Sésamo'
            ],
            dietaryPreferences: [
                'Vegano', 'Vegetariano', 'Sin gluten', 'Sin lácteos', 'Orgánico',
                'Bajo en azúcar', 'Bajo en sodio', 'Alto en proteínas', 'Keto', 'Paleo'
            ],
            healthGoals: [
                'Perder peso', 'Ganar músculo', 'Mantener peso', 'Mejorar energía',
                'Mejor digestión', 'Salud cardíaca', 'Controlar diabetes', 'Reducir colesterol'
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
            smartPicks: 'Selección inteligente',
            forYou: 'Para ti',
            community: 'Comunidad',
            topRated: 'Mejor valorados',
            recommended: 'Recomendado para ti',
            dailyTip: 'Consejo diario',
            tipContent: '¿Lees las etiquetas nutricionales? Fíjate primero en el tamaño de la porción para calcular con precisión tu ingesta.',
            status: {
                suitable: 'Adecuado',
                questionable: 'Cuestionable',
                notRecommended: 'No recomendado',
                unknown: 'Desconocido'
            }
        },
        stats: {
            title: 'Estadísticas',
            detailedStats: 'Estadísticas detalladas',
            insights: 'Información sobre tu salud',
            scoreEvolution: 'Evolución de puntuación',
            topBrands: 'Ranking de marcas',
            currentScore: 'Puntuación actual',
            totalScans: 'Total escaneos',
            favorites: 'Favoritos',
            weeklyOverview: 'Resumen semanal',
            nutritionScore: 'Puntuación nutricional',
            scannedProducts: 'Productos escaneados',
            healthyChoices: 'Elecciones saludables',
            trend: 'Tendencia de puntuación'
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
            noResults: 'No se encontraron productos',
            tryAdjusting: 'Intenta ajustar tu búsqueda o filtros',
            found: 'producto(s) encontrado(s)',
            statusLabels: {
                safe: 'Seguro',
                caution: 'Precaución',
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
                ago: 'h hace',
                yesterday: 'Ayer',
                daysAgo: 'días hace'
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
                    description: 'Este producto tiene algunas preocupaciones. Revisa los detalles abajo.'
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
                compare: 'Comparar con otros productos',
                viewSimilar: 'Ver productos similares'
            },
            compare: {
                title: 'Comparar productos',
                subtitle: 'Elige un producto de tu historial para comparar con',
                scanNew: 'Escanear nuevo producto',
                scanNewDesc: 'Usa la cámara para escanear otro producto',
                orHistory: 'o elige del historial'
            }
        },
        settings: {
            title: 'Configuración y Preferencias',
            profile: {
                title: 'Información del perfil',
                name: 'Nombre completo',
                email: 'Correo electrónico',
                country: 'País',
                selectCountry: 'Selecciona país',
                language: 'Idioma',
                selectLanguage: 'Selecciona idioma',
                save: 'Guardar cambios',
                savedSuccess: '¡Perfil guardado exitosamente!'
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
                help: 'Ayuda y Preguntas frecuentes',
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
            scan: 'scan',
            scans: 'scans',
            week: 'Week',
            month: 'Month',
            year: 'Year',
            thisWeek: 'This Week'
        },
        welcome: {
            title: 'Know what you eat',
            subtitle: 'Personalized food analysis.',
            getStarted: 'Get Started',
            alreadyHaveAccount: 'Already using HealthScan? ',
            signIn: 'Sign In',
            analyzing: 'Analyzing...'
        },
        onboarding: {
            skip: 'Skip',
            next: 'Next',
            getStarted: 'Get Started',
            slides: [
                {
                    title: 'Scan Any Product',
                    description: 'Simply scan the barcode or take a photo of any food product to get instant nutritional insights and safety alerts.'
                },
                {
                    title: 'Stay Safe',
                    description: 'We check ingredients against your allergies and dietary preferences to keep you protected and healthy.'
                },
                {
                    title: 'Smart Recommendations',
                    description: 'Get personalized product suggestions based on your health goals and dietary preferences.'
                }
            ]
        },
        registration: {
            step1: {
                title: 'About You',
                subtitle: "Let's get to know you better",
                nameLabel: 'Full Name',
                namePlaceholder: 'Enter your name',
                emailLabel: 'Email',
                emailPlaceholder: 'your@email.com',
                countryLabel: 'Country *',
                countryPlaceholder: 'Select your country',
                languageLabel: 'Language *',
                languagePlaceholder: 'Select your language'
            },
            step2: {
                title: "Let's customize your nutrition filter to match your specific needs"
            },
            step3: {
                title: 'Select Your Allergies',
                subtitle: "We'll check products against these allergens",
                skip: 'You can skip this if you have no allergies'
            },
            step4: {
                title: 'Dietary Preferences',
                subtitle: 'Choose what matters to you',
                optional: 'Optional - helps us recommend better products'
            },
            step5: {
                title: 'Health Goals',
                subtitle: 'What are you working towards? (Select one)',
                optional: 'Optional - helps personalize your experience'
            },
            step6: {
                title: "You're All Set! 🎉",
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
                complete: 'Complete Setup'
            },
            continue: 'Continue',
            header: {
                title: 'Create Your Profile',
                step: 'Step'
            }
        },
        lists: {
            allergens: [
                'Gluten', 'Milk', 'Eggs', 'Fish', 'Shellfish',
                'Tree Nuts', 'Peanuts', 'Wheat', 'Soy', 'Sesame'
            ],
            dietaryPreferences: [
                'Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Organic',
                'Low sugar', 'Low sodium', 'High protein', 'Keto-friendly', 'Paleo'
            ],
            healthGoals: [
                'Lose weight', 'Gain muscle', 'Maintain weight', 'Improve energy',
                'Better digestion', 'Heart health', 'Manage diabetes', 'Reduce cholesterol'
            ]
        },
        home: {
            greeting: 'Hello',
            readyMessage: 'Ready to make healthy choices?',
            scanProduct: 'Scan Product',
            recentScans: 'Recent Scans',
            viewAll: 'View All',
            dailySummary: 'Daily Summary',
            calories: 'Calories',
            protein: 'Protein',
            carbs: 'Carbs',
            fat: 'Fat',
            quickActions: 'Quick Actions',
            smartPicks: 'Smart Picks',
            forYou: 'For you',
            community: 'Community',
            topRated: 'Top rated',
            recommended: 'Recommended for You',
            dailyTip: 'Daily Tip',
            tipContent: 'Reading nutrition labels? Focus on serving sizes first to accurately calculate your intake.',
            status: {
                suitable: 'Suitable',
                questionable: 'Questionable',
                notRecommended: 'Not Recommended',
                unknown: 'Unknown'
            }
        },
        stats: {
            title: 'Statistics',
            detailedStats: 'Detailed Statistics',
            insights: 'Your health journey insights',
            scoreEvolution: 'Health Score Evolution',
            topBrands: 'Top Brands Ranking',
            currentScore: 'Current Score',
            totalScans: 'Total Scans',
            favorites: 'Favorites',
            weeklyOverview: 'Weekly Overview',
            nutritionScore: 'Nutrition Score',
            scannedProducts: 'Scanned Products',
            healthyChoices: 'Healthy Choices',
            trend: 'health score trend'
        },
        profile: {
            title: 'Profile',
            personalInfo: 'Personal Information',
            dietaryNeeds: 'Dietary Needs',
            appSettings: 'App Settings',
            editProfile: 'Edit Profile',
            signOut: 'Sign Out'
        },
        search: {
            title: 'Search Products',
            subtitle: 'Find and compare products',
            placeholder: 'Search by name, brand, or category...',
            categories: 'Categories',
            filterByStatus: 'Filter by Status',
            selected: 'selected',
            clearFilters: 'Clear Filters',
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
                products: 'Product History',
                comparisons: 'Comparisons'
            },
            noHistory: 'No scan history yet',
            startScanning: 'Start scanning products to build your history',
            noComparisons: 'No comparisons yet',
            compareHint: 'Compare products to make better choices',
            viewComparison: 'Tap to view comparison details',
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
            hint: 'Products you mark as favorites will appear here for quick access',
            dragHint: 'Drag items up to delete them'
        },
        scanResult: {
            status: {
                suitable: {
                    label: 'Suitable for You',
                    description: 'This product matches your dietary profile and health goals.'
                },
                questionable: {
                    label: 'Review Needed',
                    description: 'This product has some concerns. Check the details below.'
                },
                notRecommended: {
                    label: 'Not Recommended',
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
                seeAll: 'See all'
            },
            actions: {
                scanAnother: 'Scan Another',
                compare: 'Compare with Other Products',
                viewSimilar: 'View Similar Products'
            },
            compare: {
                title: 'Compare Products',
                subtitle: 'Choose a product from your history to compare with',
                scanNew: 'Scan New Product',
                scanNewDesc: 'Use camera to scan another product',
                orHistory: 'or choose from history'
            }
        },
        settings: {
            title: 'Settings & Preferences',
            profile: {
                title: 'Profile Information',
                name: 'Full Name',
                email: 'Email',
                country: 'Country',
                selectCountry: 'Select country',
                language: 'Language',
                selectLanguage: 'Select language',
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
    },
    PT: {
        common: {
            loading: 'Carregando...',
            error: 'Algo deu errado',
            save: 'Salvar',
            cancel: 'Cancelar',
            edit: 'Editar',
            delete: 'Excluir',
            back: 'Voltar',
            search: 'Buscar',
            filter: 'Filtrar',
            scan: 'escaneamento',
            scans: 'escaneamentos',
            week: 'Semana',
            month: 'Mês',
            year: 'Ano',
            thisWeek: 'Esta semana'
        },
        welcome: {
            title: 'Saiba o que você come',
            subtitle: 'Análise personalizada de alimentos.',
            getStarted: 'Começar',
            alreadyHaveAccount: 'Já usa o HealthScan? ',
            signIn: 'Entrar',
            analyzing: 'Analisando...'
        },
        onboarding: {
            skip: 'Pular',
            next: 'Próximo',
            getStarted: 'Começar',
            slides: [
                {
                    title: 'Escaneie qualquer produto',
                    description: 'Basta escanear o código de barras ou tirar uma foto de qualquer produto alimentício para obter informações nutricionais instantâneas e alertas de segurança.'
                },
                {
                    title: 'Fique seguro',
                    description: 'Verificamos os ingredientes contra suas alergias e preferências dietéticas para mantê-lo protegido e saudável.'
                },
                {
                    title: 'Recomendações inteligentes',
                    description: 'Obtenha sugestões de produtos personalizadas com base em seus objetivos de saúde e preferências dietéticas.'
                }
            ]
        },
        registration: {
            step1: {
                title: 'Sobre você',
                subtitle: 'Vamos te conhecer melhor',
                nameLabel: 'Nome completo',
                namePlaceholder: 'Digite seu nome',
                emailLabel: 'E-mail',
                emailPlaceholder: 'seu@email.com',
                countryLabel: 'País *',
                countryPlaceholder: 'Selecione seu país',
                languageLabel: 'Idioma *',
                languagePlaceholder: 'Selecione seu idioma'
            },
            step2: {
                title: 'Vamos personalizar seu filtro de nutrição para atender às suas necessidades específicas'
            },
            step3: {
                title: 'Selecione suas alergias',
                subtitle: 'Verificaremos os produtos contra esses alérgenos',
                skip: 'Você pode pular isso se não tiver alergias'
            },
            step4: {
                title: 'Preferencias dietéticas',
                subtitle: 'Escolha o que importa para você',
                optional: 'Opcional - nos ajuda a recomendar produtos melhores'
            },
            step5: {
                title: 'Objetivos de saúde',
                subtitle: 'No que você está trabalhando? (Selecione um)',
                optional: 'Opcional - ajuda a personalizar sua experiência'
            },
            step6: {
                title: 'Tudo pronto! 🎉',
                subtitle: 'Revise os detalhes do seu perfil',
                labels: {
                    name: 'Nome',
                    email: 'E-mail',
                    country: 'País',
                    language: 'Idioma',
                    allergies: 'Alergias',
                    preferences: 'Preferências',
                    goals: 'Objetivos'
                },
                complete: 'Concluir configuração'
            },
            continue: 'Continuar',
            header: {
                title: 'Crie seu perfil',
                step: 'Passo'
            }
        },
        lists: {
            allergens: [
                'Glúten', 'Leite', 'Ovos', 'Peixe', 'Crustáceos',
                'Nozes', 'Amendoim', 'Trigo', 'Soja', 'Gergelim'
            ],
            dietaryPreferences: [
                'Vegano', 'Vegetariano', 'Sem glúten', 'Sem laticínios', 'Orgânico',
                'Baixo açúcar', 'Baixo sódio', 'Rica em proteínas', 'Keto', 'Paleo'
            ],
            healthGoals: [
                'Perder peso', 'Ganhar músculo', 'Manter peso', 'Melhorar energia',
                'Melhor digestão', 'Saúde do coração', 'Controlar diabetes', 'Reducir colesterol'
            ]
        },
        home: {
            greeting: 'Olá',
            readyMessage: 'Pronto para fazer escolhas saudáveis?',
            scanProduct: 'Escanear produto',
            recentScans: 'Escaneamentos recentes',
            viewAll: 'Ver tudo',
            dailySummary: 'Resumo diário',
            calories: 'Calorias',
            protein: 'Proteína',
            carbs: 'Carboidratos',
            fat: 'Gorduras',
            quickActions: 'Ações rápidas',
            smartPicks: 'Escolhas inteligentes',
            forYou: 'Para você',
            community: 'Comunidade',
            topRated: 'Mais bem avaliados',
            recommended: 'Recomendado para você',
            dailyTip: 'Dica diária',
            tipContent: 'Lendo rótulos nutricionais? Concentre-se primeiro no tamanho da porção para calcular com precisão sua ingestão.',
            status: {
                suitable: 'Adequado',
                questionable: 'Questionável',
                notRecommended: 'Não recomendado',
                unknown: 'Desconhecido'
            }
        },
        stats: {
            title: 'Estatísticas',
            detailedStats: 'Estatísticas detalhadas',
            insights: 'Informações sobre sua saúde',
            scoreEvolution: 'Evolução da pontuação',
            topBrands: 'Ranking de marcas',
            currentScore: 'Pontuação atual',
            totalScans: 'Total de escaneamentos',
            favorites: 'Favoritos',
            weeklyOverview: 'Visão geral semanal',
            nutritionScore: 'Pontuação nutricional',
            scannedProducts: 'Produtos escaneados',
            healthyChoices: 'Escolhas saudáveis',
            trend: 'tendência de pontuação'
        },
        profile: {
            title: 'Perfil',
            personalInfo: 'Informações pessoais',
            dietaryNeeds: 'Necessidades dietéticas',
            appSettings: 'Configurações do aplicativo',
            editProfile: 'Editar perfil',
            signOut: 'Sair'
        },
        search: {
            title: 'Buscar produtos',
            subtitle: 'Encontre e compare produtos',
            placeholder: 'Buscar por nome, marca ou categoria...',
            categories: 'Categorias',
            filterByStatus: 'Filtrar por status',
            selected: 'selecionado(s)',
            clearFilters: 'Limpar filtros',
            noResults: 'Nenhum produto encontrado',
            tryAdjusting: 'Tente ajustar sua busca ou filtros',
            found: 'produto(s) encontrado(s)',
            statusLabels: {
                safe: 'Seguro',
                caution: 'Cuidado',
                avoid: 'Evitar'
            }
        },
        history: {
            title: 'Histórico',
            scannedCount: 'produtos escaneados',
            tabs: {
                products: 'Histórico de produtos',
                comparisons: 'Comparações'
            },
            noHistory: 'Ainda não há histórico',
            startScanning: 'Comece a escanear para construir seu histórico',
            noComparisons: 'Ainda não há comparações',
            compareHint: 'Compare produtos para fazer melhores escolhas',
            viewComparison: 'Toque para ver detalhes',
            time: {
                justNow: 'Agora mesmo',
                ago: 'h atrás',
                yesterday: 'Ontem',
                daysAgo: 'dias atrás'
            }
        },
        favorites: {
            title: 'Favoritos',
            savedCount: 'produto(s) salvo(s)',
            deleteHint: 'Arraste aqui para excluir',
            releaseHint: 'Solte para excluir',
            noFavorites: 'Ainda não há favoritos',
            hint: 'Produtos que você marcar como favoritos aparecerão aqui',
            dragHint: 'Arraste os itens para cima para excluí-los'
        },
        scanResult: {
            status: {
                suitable: {
                    label: 'Adequado para você',
                    description: 'Este produto corresponde ao seu perfil dietético e objetivos de saúde.'
                },
                questionable: {
                    label: 'Revisão necessária',
                    description: 'Este produto tem algumas preocupações. Verifique os detalhes abaixo.'
                },
                notRecommended: {
                    label: 'Não recomendado',
                    description: 'Este produto entra em conflito com seu perfil dietético.'
                }
            },
            nutritionScore: 'Pontuação nutricional:',
            analysis: {
                title: 'Análise personalizada',
                benefits: 'Benefícios',
                concerns: 'Preocupações'
            },
            ingredients: 'Ingredientes',
            allergens: 'Informação de alérgenos',
            alternatives: {
                title: 'Melhores alternativas',
                seeAll: 'Ver tudo'
            },
            actions: {
                scanAnother: 'Escanear outro',
                compare: 'Comparar com outros produtos',
                viewSimilar: 'Ver produtos similares'
            },
            compare: {
                title: 'Comparar produtos',
                subtitle: 'Escolha um produto do seu histórico para comparar com',
                scanNew: 'Escanear novo produto',
                scanNewDesc: 'Use a câmera para escanear outro produto',
                orHistory: 'ou escolha do histórico'
            }
        },
        settings: {
            title: 'Configurações e Preferências',
            profile: {
                title: 'Informações do perfil',
                name: 'Nome completo',
                email: 'E-mail',
                country: 'País',
                selectCountry: 'Selecione o país',
                language: 'Idioma',
                selectLanguage: 'Selecione o idioma',
                save: 'Salvar alterações',
                savedSuccess: 'Perfil salvo com sucesso!'
            },
            dietary: {
                title: 'Preferências dietéticas',
                allergies: 'Gerenciar alergias',
                preferences: 'Preferências de dieta'
            },
            app: {
                title: 'Configurações do aplicativo',
                notifications: 'Notificações',
                darkMode: 'Modo escuro'
            },
            support: {
                help: 'Ajuda e FAQ',
                helpDesc: 'Obtenha ajuda e suporte'
            }
        }
    }
};
