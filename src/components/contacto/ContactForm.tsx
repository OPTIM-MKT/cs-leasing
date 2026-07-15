import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre."),
  email: z.email("Correo no válido."),
  telefono: z
    .string()
    .min(10, "Ingresa un teléfono a 10 dígitos.")
    .regex(/^[0-9+\s-]+$/, "Sólo números."),
  interes: z.enum(["Comprar un vehículo", "Toma a cuenta", "Otro"]),
  mensaje: z.string().min(10, "Cuéntanos un poco más (mín. 10 caracteres)."),
});

type FormValues = z.infer<typeof schema>;

const interesOptions = [
  { value: "Comprar un vehículo", label: "Comprar un vehículo" },
  { value: "Toma a cuenta", label: "Toma a cuenta" },
  { value: "Otro", label: "Otro" },
];

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { interes: "Comprar un vehículo" },
  });

  // Pre-fill the message when arriving from a vehicle's "Lo quiero" button.
  useEffect(() => {
    const vehiculo = new URLSearchParams(window.location.search).get(
      "vehiculo",
    );
    if (vehiculo) {
      setValue("mensaje", `Me interesa el ${vehiculo}. ¿Sigue disponible?`);
    }
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    // TODO: wire to the Resend/Netlify endpoint. Base structure only.
    await new Promise((r) => setTimeout(r, 600));
    console.info("contact submission", data);
    toast.success("¡Mensaje enviado! Te contactaremos muy pronto.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Toaster position="top-center" richColors />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Nombre"
          placeholder="Tu nombre"
          error={errors.nombre?.message}
          {...register("nombre")}
        />
        <Input
          label="Teléfono"
          type="tel"
          placeholder="81 1234 5678"
          error={errors.telefono?.message}
          {...register("telefono")}
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="tucorreo@ejemplo.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Select
        label="¿En qué te ayudamos?"
        options={interesOptions}
        error={errors.interes?.message}
        {...register("interes")}
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="mensaje"
          className="text-sm font-medium text-foreground"
        >
          Mensaje
        </label>
        <textarea
          id="mensaje"
          rows={4}
          placeholder="Cuéntanos qué buscas…"
          aria-invalid={!!errors.mensaje}
          className={`w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-ring ${
            errors.mensaje ? "border-red-500" : "border-input"
          }`}
          {...register("mensaje")}
        />
        {errors.mensaje && (
          <p className="text-xs text-red-500">{errors.mensaje.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60"
      >
        {isSubmitting ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
