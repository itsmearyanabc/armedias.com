// Formats the market figures in cost-guides.ts the same way on the page and in the planner.
import type { CostTier, MarketCost } from '../data/cost-guides';

export function money(n: number, m: Pick<MarketCost, 'locale' | 'currency'>): string {
  if (!m.currency) throw new Error('This market has no currency figures');
  return new Intl.NumberFormat(m.locale, { style: 'currency', currency: m.currency, maximumFractionDigits: 0 }).format(n);
}

export function priceText(t: CostTier, m: MarketCost): string {
  const per = t.per === 'year' ? ' a year' : t.per === 'month' ? ' a month' : '';
  if (t.max === undefined) return `From ${money(t.min, m)}${per}`;
  return `${money(t.min, m)} – ${money(t.max, m)}${t.plus ? '+' : ''}${per}`;
}
