# Customer Spending Insights Dashboard

A responsive React and TypeScript dashboard for exploring a customer's spending. It includes an overview, category breakdown, monthly trends, filterable and paginated transactions, monthly goals, and a customer profile.

## Requirements

- Node.js 24 or later (npm is included with Node.js)
- Docker only if you want to run the containerized build

No environment variables or backend service are required. The application uses Mock Service Worker (MSW) to provide its API responses in local and containerized builds.

## Start the application locally

Follow these steps in order:

1. Install Node.js 24 or later. Confirm that Node.js and npm are available:

   ```bash
   node --version
   npm --version
   ```

2. Open a terminal and change to the project directory:

   ```bash
   cd customer-spending-insights-dashboard
   ```

   Skip this step if your terminal is already open in the project directory.

3. Install the exact dependency versions from `package-lock.json`:

   ```bash
   npm ci
   ```

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

5. Open the URL printed in the terminal, normally `http://localhost:5173`.

The first visit may reload once while the mock service worker takes control of the page. Keep the terminal running while using the application. Press `Ctrl+C` in that terminal to stop the server.

## Run the production build locally

```bash
npm run build
npm run preview
```

Open the URL printed by Vite, normally `http://localhost:4173`.

## Run with Docker

Follow these steps in order:

1. Install and start Docker Desktop. Confirm that Docker is available:

   ```bash
   docker --version
   ```

2. Open a terminal and change to the project directory:

   ```bash
   cd customer-spending-insights-dashboard
   ```

   Skip this step if your terminal is already open in the project directory.

3. Build the Docker image:

   ```bash
   docker build -t customer-spending-insights-dashboard .
   ```

4. Start a container in the background:

   ```bash
   docker run --rm -d --name customer-spending-dashboard -p 8081:80 customer-spending-insights-dashboard
   ```

5. Open `http://127.0.0.1:8081` in your browser.

6. When you are finished, stop the container:

   ```bash
   docker stop customer-spending-dashboard
   ```

The `-d` option keeps the container running in the background. The `--rm` option automatically removes it after `docker stop`.

If port 8081 is already in use, replace `-p 8081:80` with `-p 8082:80` and open `http://127.0.0.1:8082` instead. Using `127.0.0.1` avoids local IPv6 or hostname-resolution issues that can affect `localhost` with Docker Desktop. The image builds the frontend with Node.js and serves it with nginx; no separate backend or local `npm install` is required.

## Data and API behavior

The dashboard calls seven same-origin endpoints under `/api/customers/12345`. MSW implements those endpoints from a single generated transaction history, so summaries, categories, trends, transactions, and goals remain consistent with one another. Dates are generated relative to the current date, which keeps the dashboard data current whenever it runs.

Mock source files are in `src/mocks/`:

- `browser.ts` starts the MSW service worker in development.
- `handlers.ts` validates requests and calculates all endpoint responses.
- `transactions.ts` generates the transaction history from the monthly sample transactions.
- `data/` holds the static dummy data:
  - `customer.ts` contains the customer profile.
  - `monthlyTransactions.ts` contains one month of sample transactions.
  - `categories.ts` defines category labels, icons, and colors.
  - `goalBudgets.ts` contains monthly category budgets.
  - `dateRangePresets.ts` defines the available quick filters.

The complete endpoint contract is documented in [`docs/CustomerSpendingInsightsEndpoints.md`](docs/CustomerSpendingInsightsEndpoints.md).

Values are formatted for the `en-ZA` locale using the currency returned by the customer profile. The profile total is a lifetime figure, while goals always use the current month. Quick periods drive the overview summary; custom date ranges apply to the Categories and Transactions views. The monthly trend length is selected separately.

## Test and validate

Run the automated test suite once:

```bash
npm test
```

Use `npm run test:watch` during development. If Vitest workers are slow to start on your machine, use:

```bash
npm test -- --pool=threads --maxWorkers=1 --no-file-parallelism
```

Run all static checks and create a production build:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

## Project structure

- `src/app/` assembles the application views.
- `src/components/` contains reusable components, grouped by purpose:
  - `layout/` contains the dashboard shell, header, sidebar, and page header.
  - `providers/` contains the customer profile provider.
  - `request/` contains the loading and error states for API requests.
  - `cards/` contains the section and stat cards.
  - `inputs/` contains the select and date range fields.
  - `indicators/` contains category icons, change indicators, and progress bars.
  - `transactions/` contains the transactions table and its rows.
- `src/features/` contains the overview, categories, trends, transactions, goals, and spending views.
- `src/styles/` contains the theme, colours, global CSS, and every component and feature style file.
- `src/services/` contains the typed API client.
- `src/types/` contains shared TypeScript models.
- `src/utils/` contains date, money, formatting, and spending calculations.
- `src/test/` contains Vitest and React Testing Library tests.
