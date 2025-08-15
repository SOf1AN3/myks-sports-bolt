# MYKS Sports - Site E-commerce Premium

Site e-commerce moderne et futuriste pour la marque MYKS Sports, spécialisée dans les vêtements de sport premium.

## 🚀 Caractéristiques

### Frontend (Next.js + TypeScript)
- **Design moderne et futuriste** avec couleur principale violet foncé (#5A2D82)
- **Animations fluides** avec Framer Motion
- **Mode sombre/clair** adaptatif
- **Responsive design** mobile-first
- **Système de panier complet** avec persistance localStorage
- **Navigation intuitive** avec indicateurs d'état

### Pages disponibles
- **Accueil** : Hero banner, produits vedettes, collections
- **Catalogue** : Grille responsive avec filtres et recherche avancée
- **Page produit** : Galerie, détails, sélection taille/couleur
- **Panier** : Gestion quantités, passage de commande
- **Collections** : Nouveautés et promotions
- **À propos** : Présentation de la marque
- **Contact** : Formulaire et coordonnées

### Backend (Express.js + MongoDB)
- **API REST** simple et efficace
- **Base de données MongoDB** avec schémas Mongoose
- **Gestion des produits** (6 produits de test inclus)
- **Système de commandes** complet
- **CORS configuré** pour le développement

## 🛠 Installation et démarrage

### Prérequis
- Node.js 16+
- MongoDB (local ou distant)

### Installation
```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres MongoDB
```

### Démarrage en développement
```bash
# Démarrer frontend + backend simultanément
npm run dev

# Ou séparément :
npm run dev:client  # Frontend sur http://localhost:3000
npm run dev:server  # Backend sur http://localhost:5000
```

### Production
```bash
npm run build
npm start
```

## 🎨 Design & Identité

### Couleurs principales
- **Violet principal** : #5A2D82
- **Palette complémentaire** : Gris clair, gris foncé, blanc, noir
- **Dégradés** : Violet vers nuances plus claires

### Typographie
- **Police principale** : Inter (Google Fonts)
- **Poids** : 300, 400, 500, 600, 700, 800

### Animations
- **Framer Motion** pour les transitions fluides
- **Hover effects** sur les cartes produits
- **Animations d'entrée** avec stagger effects
- **Micro-interactions** sur les boutons et formulaires

## 🛍️ Fonctionnalités E-commerce

### Gestion du panier
- Ajout/suppression de produits
- Modification des quantités
- Sélection taille et couleur
- Persistance localStorage
- Indicateur visuel du nombre d'articles

### Filtres et recherche
- **Recherche** par nom de produit
- **Filtres** par catégorie, taille, couleur, prix
- **Tri** par nom, prix, nouveautés
- **Vue** grille ou liste

### Commandes
- Passage de commande simple
- Stockage en base MongoDB
- Paiement à la livraison
- Statuts de commande

## 🔧 Structure technique

### Frontend
```
/app
  /api          # Routes API Next.js
  /catalogue    # Page catalogue
  /products     # Pages produits dynamiques
  /collections  # Page collections
  /about        # Page à propos
  /contact      # Page contact
/components
  /navigation   # Navigation principale
  /products     # Composants produits
  /providers    # Contexts (panier, theme)
  /ui          # Composants UI (shadcn/ui)
```

### Backend
```
/server
  index.js      # Serveur Express principal
  /models       # Schémas Mongoose (intégrés)
  /routes       # Routes API (intégrées)
```

## 📱 Responsive Design

- **Mobile** : < 768px
- **Tablet** : 768px - 1024px  
- **Desktop** : > 1024px

Navigation adaptative avec menu burger sur mobile, grilles responsives pour les produits.

## 🌙 Mode sombre

Implémentation complète du mode sombre avec :
- Détection automatique des préférences système
- Persistance du choix utilisateur
- Transitions fluides entre les modes
- Variables CSS personnalisées

## 🚦 API Endpoints

### Produits
- `GET /api/products` - Liste tous les produits
- `GET /api/products/:id` - Détails d'un produit

### Commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders` - Liste des commandes

### Health Check
- `GET /api/health` - Statut du serveur

## 🎯 Prochaines étapes

- [ ] Système d'authentification utilisateur
- [ ] Intégration paiement en ligne (Stripe)
- [ ] Panel d'administration
- [ ] Gestion des stocks en temps réel
- [ ] Système de notifications
- [ ] Optimisations SEO avancées
- [ ] Tests automatisés

## 📄 Licence

Projet de démonstration pour MYKS Sports.

---

Développé avec ❤️ pour MYKS Sports - L'excellence sportive rencontre l'innovation technique.