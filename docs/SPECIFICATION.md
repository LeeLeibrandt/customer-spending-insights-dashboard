# Customer Spending Insights Dashboard: Specification

## Project brief

Build a responsive financial analytics dashboard that displays a customer's spending using mocked data. The submission must be production-grade, include a runnable Dockerfile, and include a README with build, run, and test instructions. The solution is a frontend engineering submission using HTML, CSS, JavaScript, and React.

The supplied API contract is in [CustomerSpendingInsightsEndpoints.md](CustomerSpendingInsightsEndpoints.md). It describes seven GET endpoints. The endpoints are a contract for mocked data; the brief does not require a live backend.

## Functional requirements

1. Display the customer profile: name, account type, join date, total spent, and currency. Treat the email address as profile data, and show it only if it serves a clear interface purpose.
2. Display a spending summary for a selected quick period (`7d`, `30d`, `90d`, or `1y`). Include total spent, transaction count, average transaction, top category, and changes from the previous equivalent period.
3. Display spending by category with amount, share of total, and transaction count. Support quick periods and a custom start and end date.
4. Display monthly spending trends. The data contract supports 1 to 24 months, defaults to 12, and includes total spent, transaction count, and average transaction for each month.
5. Display transactions with category and date filters, date or amount sorting, and pagination. The contract defaults to 20 items per page and caps a page at 100.
6. Display spending goals with monthly budget, current spend, percentage used, days remaining, and status.
7. Obtain available categories and quick-period options from the filters contract rather than duplicating these choices throughout the interface.

## Data contract and behavior

Use one mocked customer identifier for the dashboard. Keep endpoint response shapes compatible with the supplied contract. Query parameters should follow the contract, including its default values and permitted sort options. Filtering, sorting, and pagination must change the displayed data rather than only changing control labels.

Money is denominated in the profile's currency, which is `ZAR` in the example. Format dates, amounts, and percentages consistently. A custom date range must have valid dates with the start on or before the end. When a custom range is active, use it for views that support custom dates; explain any view that remains governed by a different period or month selection.

Handle loading, empty, and error states for data-driven sections. Mock data should be coherent across summary, categories, transactions, trends, and goals for the same period whenever those values represent the same underlying spending.

## Quality requirements

- Support narrow phones, tablets, and desktop screens without clipped content or inaccessible controls.
- Use semantic HTML, labeled inputs, keyboard-operable controls, visible focus states, and text alternatives for charts and status colors.
- Separate components, styles, types and interfaces, services, mock data, and utility logic into consistently named files and directories.
- Keep code and documentation clear, with full sentences and consistent naming.
- Include meaningful tests for calculations and user flows, plus documented build, run, and test commands.
- Provide a Dockerfile that builds and serves the application.

## Open design decisions and source caveats

- The brief does not specify a visual design, chart library, routing, authentication, or a real API server. These are implementation choices.
- The source examples mix dates from different periods. They are illustrative response shapes, not a consistent dataset.
- The category amounts in the sample add to `4,250.75`, while their displayed percentages are rounded and may not add to exactly 100%.
- The `totalSpent` field in the profile has no stated time window. Label it as a customer lifetime total unless the implementation establishes another definition.
- The category endpoint accepts either a quick period or custom dates, while the summary endpoint accepts only a quick period. The interface must make this distinction clear.
- The goals endpoint provides monthly values, regardless of the selected dashboard period. Label goals as monthly.

## Acceptance criteria

The application starts locally and through Docker using README instructions. A reviewer can change periods, inspect category and trend data, filter and sort transactions, move between transaction pages, and see goal progress on phone and desktop layouts. The displayed data remains internally consistent, and automated tests cover the main calculations and interactions.
