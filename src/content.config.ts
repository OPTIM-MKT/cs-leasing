import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

/**
 * `vehicles` — the single source of truth for the inventory.
 * Nothing about a vehicle should ever be hardcoded in a component; it all
 * flows from these entries through `getCollection("vehicles")`.
 */
const vehicles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/vehicles" }),
  schema: ({ image }) =>
    z.object({
      foto: image(),
      precio: z.number().int().positive(),
      marca: z.string(),
      modelo: z.string(),
      version: z.string(),
      año: z.number().int(),
      kilometraje: z.number().int().nonnegative(),
      transmision: z.enum(["Automática", "Manual", "CVT", "Automatizada"]),
      combustible: z.enum(["Gasolina", "Diésel", "Híbrido", "Eléctrico"]),
      slug: z.string(),
      descripcion: z.string(),
      destacado: z.boolean().default(false),

      // Optional, forward-looking fields for the vehicle detail experience.
      galeria: z.array(image()).optional(),
      equipamiento: z.array(z.string()).optional(),
    }),
});

export const collections = { vehicles };
