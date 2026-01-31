import type { Invoice, InvoiceItem } from '../../../types';

/**
 * Calculate the subtotal for a single invoice item (quantity * price)
 */
export const calculateItemSubtotal = (item: InvoiceItem): number => {
  const quantity = item.quantity || 0;
  const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price || 0;
  return quantity * price;
};

/**
 * Calculate the tax amount for a single invoice item
 */
export const calculateItemTax = (item: InvoiceItem): number => {
  const subtotal = calculateItemSubtotal(item);
  const taxRate = item.taxRate || 0;
  return subtotal * (taxRate / 100);
};

/**
 * Calculate the total for a single invoice item (subtotal + tax)
 */
export const calculateItemTotal = (item: InvoiceItem): number => {
  const subtotal = calculateItemSubtotal(item);
  const tax = calculateItemTax(item);
  return subtotal + tax;
};

/**
 * Calculate the subtotal for an entire invoice (sum of all item subtotals)
 */
export const calculateInvoiceSubtotal = (invoice: Invoice): number => {
  if (!invoice.items || invoice.items.length === 0) return 0;
  return invoice.items.reduce((sum, item) => sum + calculateItemSubtotal(item), 0);
};

/**
 * Calculate the total tax for an entire invoice (sum of all item taxes)
 */
export const calculateInvoiceTax = (invoice: Invoice): number => {
  if (!invoice.items || invoice.items.length === 0) return 0;
  return invoice.items.reduce((sum, item) => sum + calculateItemTax(item), 0);
};

/**
 * Calculate the total for an entire invoice (subtotal + tax)
 */
export const calculateInvoiceTotal = (invoice: Invoice): number => {
  const subtotal = calculateInvoiceSubtotal(invoice);
  const tax = calculateInvoiceTax(invoice);
  return subtotal + tax;
};

/**
 * Format currency amount based on invoice currency and locale
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'EUR',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Get the currency symbol for a given currency code
 */
export const getCurrencySymbol = (currency: string = 'EUR'): string => {
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    JPY: '¥',
    CAD: 'CA$',
    AUD: 'A$',
  };
  return symbols[currency] || currency;
};
