export enum Period {
  SevenDays = '7d',
  ThirtyDays = '30d',
  NinetyDays = '90d',
  OneYear = '1y',
}

export enum PeriodSelection {
  CustomRange = 'custom',
}

export enum CategoryIcon {
  ShoppingCart = 'shopping-cart',
  Film = 'film',
  Car = 'car',
  Utensils = 'utensils',
  ShoppingBag = 'shopping-bag',
  Zap = 'zap',
}

export enum AccountType {
  Standard = 'standard',
  Premium = 'premium',
}

export enum PaymentMethod {
  CreditCard = 'Credit Card',
  DebitCard = 'Debit Card',
  DebitOrder = 'Debit Order',
}

export enum TransactionSortOrder {
  DateDesc = 'date_desc',
  DateAsc = 'date_asc',
  AmountDesc = 'amount_desc',
  AmountAsc = 'amount_asc',
}

export enum GoalStatus {
  OnTrack = 'on_track',
  Warning = 'warning',
  Exceeded = 'exceeded',
}

export enum DashboardView {
  Overview = 'overview',
  Categories = 'categories',
  Trends = 'trends',
  Transactions = 'transactions',
  Goals = 'goals',
}
