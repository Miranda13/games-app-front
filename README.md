# React-Tailwind-Vite Games App

This project is designed for the management of football games. It offers UI interface to see football games, editing and deleting.

You can access pre-existing data for locations and teams to create new games, and you don't have access to manage them by UI interface, only for games.

It's deployed with render.com a free hosting, and its URL: https://games-app-pre.onrender.com

You have to wait 5 to 10 minutes while the backend and database services start up and become available; this is done automatically.

## Prerequisite
- Node 18.17.1

## Getting started for local work

- Clone the repository
```
git clone git@github.com:Miranda13/games-app-front.git
```
- Install dependencies
```
cd games-app-front
npm install
```
- Run local development server
```
npm run dev
```
## ENV variables

The project uses environment variables. To add environment variables create a `.env` file in the root folder of the project. This project is built with vite, and vite manages environment variables, you have to create VITE_BASE_URL with backend's url.

VITE_BASE_URL=http://localhost:8080

```
- To use ESLint
```
npm run build

```

## Project structure
```
│   .env
│   .eslintrc.cjs
│   .gitignore
│   index.html
│   package-lock.json
│   package.json
│   postcss.config.js
│   README.md
│   tailwind.config.js
│   tsconfig.json
│   tsconfig.node.json
│   vite.config.ts
│
├───public
│       vite.svg
│
└───src
    │   index.scss
    │   index.tsx
    │
    ├───app
    │   │   Router.tsx
    │   │
    │   ├───core
    │   │       index.tsx
    │   │
    │   ├───routesConfig
    │   │       index.tsx
    │   │       routesConst.ts
    │   │
    │   └───views
    │       ├───Error
    │       │       index.ts
    │       │
    │       └───Home
    │           │   index.tsx
    │           │
    │           └───components
    │               ├───cardGame
    │               │       index.tsx
    │               │
    │               ├───cardsGame
    │               │       index.tsx
    │               │
    │               ├───deleteGame
    │               │       index.tsx
    │               │
    │               ├───form
    │               │       index.tsx
    │               │
    │               ├───menuGame
    │               │       index.tsx
    │               │
    │               └───teamPresentation
    │                       index.tsx
    │
    ├───assets
    │       react.svg
    │
    ├───components
    │   ├───Footer
    │   │       index.tsx
    │   │
    │   └───Header
    │           index.tsx
    │
    ├───envs
    │       vite-env.d.ts
    │
    ├───models
    │       games.model.ts
    │       locations.model.ts
    │       scores.model.ts
    │       teams.model.ts
    │
    ├───services
    │   └───api
    │           games.service.ts
    │           locations.service.ts
    │           teams.service.ts
    │
    └───utils
            index.ts
```

- In services is configurated every request that can make to the server.
- The Model defines how the data structure of objects is constructed for make resquets to server, and by the way is used for responses.
- You can find every view with its components.
