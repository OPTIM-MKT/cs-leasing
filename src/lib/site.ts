/**
 * Global site constants. Keeping contact details and formatting helpers here
 * means a component never hardcodes a phone number, currency format, or URL.
 */
export const SITE = {
  name: "C&S Leasing",
  tagline: "Vehículos seminuevos premium",
  email: "ventas@cs-leasing.com",
  /** Digits only, country code included — required by the wa.me link format. */
  whatsapp: "528120170561",
  hours: "Lun–Sáb · 9:00–19:00",
} as const;

/** The 4 office locations with their own phone and email. */
export const OFFICES = [
  {
    city: "Monterrey, Nuevo León",
    address:
      "Torre Vértice Piso 12 y 15, Av. Frida Kahlo 195, Haciendas de la Sierra, San Pedro G.G., Nuevo León",
    phone: "81 1099 4289",
    email: "ventas@cs-leasing.com",
  },
  {
    city: "Ciudad de México",
    address:
      "Edificio Arcos Torre B Piso 6, Paseo de Los Tamarindos 400, Bosques de las Lomas, Ciudad de México",
    phone: "55 6820 5618",
    email: "jorge.mayen@cs-leasing.com",
  },
  {
    city: "León, Guanajuato",
    address:
      "Torre San Mateo, Prol. Blvd. Campestre #2502, Torre II, Planta Baja, Local 1-B, Col. El Refugio Campestre, León, Gto 37156",
    phone: "477 192 3196",
    email: "americo.lozano@cs-leasing.com",
  },
  {
    city: "San Luis Potosí",
    address: "San Luis Potosí, S.L.P.",
    phone: "444 304 2510",
    email: "Ivette.lozano@cs-leasing.com",
  },
] as const;

/** Social media links. */
export const SOCIAL = {
  instagram: "https://www.instagram.com/csleasing/",
  facebook: "https://www.facebook.com/CSLeasingMexico/",
  linkedin: "https://www.linkedin.com/company/c&s-leasing-sa-de-cv/",
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
