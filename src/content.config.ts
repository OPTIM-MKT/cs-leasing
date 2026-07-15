import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

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

      // Optional: folder name inside src/assets/images/gal/ for the Gallery component.
      galeria: z.string().optional(),
      equipamiento: z.array(z.string()).optional(),
    }),
});

export const collections = { vehicles };
