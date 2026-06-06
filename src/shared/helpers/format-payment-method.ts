const PAYMENT_METHOD_MAP: Record<string, string> = {
  BANK_TRANSFER: 'Transferencia bancaria',
  CASH: 'Efectivo',
  CARD: 'Tarjeta de crédito/débito',
  USDT: 'USDT',
  USDC: 'USDC',
  BITCOIN: 'Bitcoin',
  STRIPE: 'Stripe',
  PAYPAL: 'PayPal',
  MERCADOPAGO: 'Mercado Pago',
  OTHER: 'Otro método'
};

export const formatPaymentMethod = (method: string): string => {
  return PAYMENT_METHOD_MAP[method] || method;
};
