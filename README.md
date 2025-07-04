# owl-writey-test

## Description

Ce projet contient une suite de tests automatisés pour l'application Owl Writey. Il comprend des tests API, des tests end-to-end (E2E) et des tests de performance, permettant de garantir la qualité et le bon fonctionnement de l'application.

## Structure du Projet

```
owl-writey-test/
├── api/                   # Tests API avec Jest
│   ├── src/
│   │   ├── tests/         # Tests unitaires et d'intégration
│   │   ├── type/          # Définitions de types TypeScript
│   │   └── utils/         # Utilitaires de test
│   ├── jest.config.js     # Configuration Jest
│   └── package.json
├── e2e/                   # Tests End-to-End avec Playwright
│   ├── features/          # Fichiers Gherkin (.feature) pour BDD
│   ├── steps/             # Implémentation des steps BDD
│   ├── tests/             # Tests Playwright classiques
│   │   └── pages/         # Page Object Model
│   ├── playwright.config.ts
│   └── package.json
└── perf/                  # Tests de performance
    ├── script.js
    └── utils/
```

## Installation

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation des dépendances

1. **Tests API :**
```bash
cd api
npm install
```

2. **Tests E2E :**
```bash
cd e2e
npm install
npx playwright install
```

3. **Tests de performance :**  
Si k6 n'est pas installé, référez-vous à la documentation officielle pour l'installation.  
Ensuite, placez-vous dans le dossier `perf` :
```bash
cd perf
```

## Tests End-to-End (E2E)

### Configuration

Les tests E2E utilisent Playwright et supportent deux modes :

1. **Mode Classique** : Tests Playwright traditionnels avec Page Object Model
2. **Mode BDD** : Tests utilisant Gherkin et Cucumber

### Basculer entre les modes

Pour changer de mode, modifiez le fichier `e2e/playwright.config.ts` :

```typescript
const useBdd = false; // Changer à true pour activer le mode BDD
```

- `useBdd = false` : Utilise les tests dans le dossier `tests/`
- `useBdd = true` : Utilise les fichiers `.feature` dans le dossier `features/`

### Configuration des utilisateurs

1. Copiez le fichier template :
```bash
cd e2e
cp users.tpl.json users.json
```

2. Remplissez les informations d'authentification dans `users.json` :
```json
{
  "pseudo": {
    "login": "votre-email@example.com",
    "password": "votre-mot-de-passe"
  },
  "bob": {
    "login": "bob@example.com",
    "password": "mot-de-passe-bob"
  }
}
```

### Lancement des tests

#### Mode Classique (Page Object Model)
```bash
cd e2e              
npm run e2e:open
```

#### Mode BDD (avec useBdd = true)
```bash
cd e2e
npm run bdd:run
```

### Tests disponibles

#### Tests Classiques (`tests/`)
- **exercice.spec.ts** : Tests complets des exercices
  - Création d'exercice
  - Participation à un exercice
  - Partage d'exercice
  - Suppression d'exercice
  - Finalisation d'exercice

- **connexion.spec.ts** : Tests d'authentification
- **intro.spec.ts** : Tests de la page d'accueil

#### Tests BDD (`features/`)
- **exercice.feature** : Scénarios d'exercices en Gherkin
- **login.feature** : Scénarios de connexion
- **home.feature** : Scénarios de la page d'accueil

### Page Object Model

Le projet utilise le pattern Page Object Model pour maintenir la séparation des préoccupations :

```
tests/pages/
├── base.po.ts         # Classe de base pour tous les Page Objects
├── login.po.ts        # Actions et éléments de la page de connexion
└── exercice.po.ts     # Actions et éléments des pages d'exercice
```

#### Exemple d'utilisation :
```typescript
const loginPo = new LoginPo(page);
const exercicePo = new ExercicePo(page);

await loginPo.goTo();
await loginPo.logAsUser('pseudo');
await exercicePo.createFullExerciceFlow();
```

### Rapports et Traces

- **Rapport HTML** : Généré automatiquement après chaque exécution dans `playwright-report/`
- **Traces** : Capturées lors des échecs pour faciliter le debug

Pour visualiser les rapports :
```bash
npx playwright show-report
```

## Tests API

### Lancement des tests API
```bash
cd api
npm run test                # Tous les tests
npm run test:watch          # Mode watch
npm test -- ping.test.ts    # Test spécifique
```

### Structure des tests API
- Tests dans `src/tests/`
- Utilitaires dans `src/utils/`
- Types dans `src/type/`

## Tests de Performance

### Lancement des tests de performance
```bash
cd perf
k6 run script.js
```

## Contributeur
Nicolas Servary
Matteo Bonneval