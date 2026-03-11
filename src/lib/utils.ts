import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = "51960873225";
export const DEFAULT_WA_MESSAGE = "Hola, me interesa este modelo de zapato. ¿Sigue disponible?";

export function getWhatsAppLink(message: string = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
