# Customer Spending Insights Dashboard

This project is a responsive customer spending dashboard. It is being built with React, TypeScript, Material UI, and Vite. The current application is a working foundation; the spending views and mocked API are planned but have not yet been implemented.

Run the commands below from the project root directory.

## Requirements

- Node.js 24 or later and npm.
- Docker, if you want to build and run the container.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Test

```bash
npm test
```

Tests use Vitest, React Testing Library, and jsdom. Use `npm run test:watch` to rerun tests while you edit files. Test setup and shared helpers are in `src/test/`.

## Build and check

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

## Run with Docker

```bash
docker build -t customer-spending-insights-dashboard .
docker run --rm -p 8080:80 customer-spending-insights-dashboard
```

Open `http://localhost:8080`.
