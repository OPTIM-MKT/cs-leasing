/**
 * Global site constants. Keeping contact details and formatting helpers here
 * means a component never hardcodes a phone number, currency format, or URL.
 */
export const SITE = {
  name: "C&S Leasing",
  tagline: "Vehículos seminuevos premium",
  email: "contacto@cs-leasing.com",
  phone: "+52 81 1234 5678",
  /** Digits only, country code included — required by the wa.me link format. */
  whatsapp: "528112345678",
  address: "Monterrey, Nuevo León, México",
  hours: "Lun–Sáb · 9:00–19:00",
} as const;

/** Currency formatter for MXN prices — used everywhere a price is shown. */
export const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

/** Compact number formatter (e.g. kilometraje). */
export const number = new Intl.NumberFormat("es-MX");

/**
 * Build a wa.me deep link with a pre-filled message. Centralising this keeps
 * the WhatsApp behaviour identical across every card and CTA.
 */
export function whatsappLink(message: string, phone: string = SITE.whatsapp) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
