// Shared contact details used across Header, Footer, Contact and legal pages.
// Ported as-is from the previous site (legacy/src/lib/contact.js) — do not
// change these values without confirming with the business, they're real
// registered details (phone numbers, office address).

export const PHONE_NUMBERS = [
  { region: "US / CA", tel: "+19177307993", display: "+1 (917) 730-7993" },
  { region: "UK", tel: "+442035043837", display: "+44 20 3504 3837" },
  { region: "Pakistan", tel: "+923271804037", display: "+92 327 180 4037" },
] as const;

export const PRIMARY_PHONE = PHONE_NUMBERS[1]; // UK — matches the registered office address

export const OFFICE_ADDRESS =
  "31 Pepper St, Canary Wharf Estate, London E14 9RP, United Kingdom";

export const OFFICE_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.924927828314!2d-0.020940123873195608!3d51.496245111518746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487603ef17c17bc1%3A0x6672e895364061e1!2sIT%20Meta%20Solutions!5e0!3m2!1sen!2s!4v1786914490033!5m2!1sen!2s";

export const OFFICE_MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=51.496245111518746,-0.020940123873195608";

export const OFFICE_HOURS = "Monday – Friday • 9:00 AM – 6:00 PM (UK Time)";

export const EMAIL = "info@itmetasolutions.com";
