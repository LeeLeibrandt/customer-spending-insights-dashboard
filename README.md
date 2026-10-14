# Customer Spending Insights Dashboard

A responsive React and TypeScript dashboard for exploring a customer's spending. It includes an overview, category breakdown, monthly trends, filterable and paginated transactions, monthly goals, and a customer profile.

## How it works

The app calls seven customer spending endpoints through `src/services/`. Mock Service Worker (MSW) answers those requests in the browser and tests, so no backend is needed. The responses come from one transaction history in `src/mocks/`, keeping totals consistent across views. Components in `src/features/` display the responses; shared controls, types, and formatting helpers live in `src/components/`, `src/types/`, and `src/utils/`.

Values are formatted for `en-ZA` using the currency from the customer profile response. The profile total is a lifetime figure and goals use the current month. Quick periods drive the overview summary; custom date ranges are scoped to the Categories and Transactions views. Monthly trend length is selected separately.

## Requirements

- Node.js 24 or later and npm.
- Docker, to build and run the container.

## Run locally

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Test

```bash
npm test
```

Tests use Vitest, React Testing Library, MSW, and jsdom. Run `npm run test:watch` while editing. On machines where Vitest workers take a long time to start, run `npm test -- --pool=threads --maxWorkers=1 --no-file-parallelism`.

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

Open `http://localhost:8080`. If port 8080 is already in use, replace the first port in the `docker run` command with a free host port and open that port instead. The container builds the frontend with Node.js and serves it with nginx.
