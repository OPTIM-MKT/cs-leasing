import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappLink } from "@/lib/site";
import type { ImageMetadata } from "astro";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";


interface HomeSliderProps {
  carImage: ImageMetadata | string;
}

const slidesData = [
  {
    tag: "Seminuevos premium",
    title: "El auto que buscas, con la confianza que mereces.",
    description:
      "Inventario seleccionado y verificado, precios claros y atención directa. Sin letras chiquitas, sin presiones.",
  },
  {
    tag: "Calidad Garantizada",
    title: "Financiamiento flexible y a tu medida.",
    description:
      "Opciones de crédito y arrendamiento adaptadas a tus necesidades. Estrena hoy mismo con las mejores tasas.",
  },
  {
    tag: "Toma a Cuenta",
    title: "Evaluamos tu auto actual al mejor precio.",
    description:
      "Recibimos tu vehículo a cuenta con un proceso rápido, seguro y transparente. Ahorra tiempo y dinero.",
  },
  {
    tag: "Atención Exclusiva",
    title: "Experiencia de compra premium digital.",
    description:
      "Reserva, cotiza y realiza todo tu trámite en línea con el soporte personalizado de nuestros asesores.",
  },
];

export default function HomeSlider({ carImage }: HomeSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageSrc = typeof carImage === "string" ? carImage : carImage.src;
  const wa = whatsappLink("Hola, me interesa conocer su inventario.");

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={800}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        navigation={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-[75vh] min-h-[500px] sm:h-[80vh] sm:min-h-[600px] w-full"
      >
        {slidesData.map((slide, index) => {
          const isActive = activeIndex === index;
          return (
            <SwiperSlide key={index} className="relative w-full h-full">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
                <img
                  src={imageSrc}
                  alt="Fondo de auto seminuevo premium"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
              </div>

              {/* Centered Content */}
              <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl text-center flex flex-col items-center">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <div className="flex flex-col items-center">
                        <motion.span
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="text-xs sm:text-sm font-semibold tracking-widest text-primary uppercase"
                        >
                          {slide.tag}
                        </motion.span>

                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.15,
                            ease: "easeOut",
                          }}
                          className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-3xl"
                        >
                          {slide.title}
                        </motion.h2>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.3,
                            ease: "easeOut",
                          }}
                          className="mt-6 text-sm sm:text-lg text-white/80 max-w-2xl leading-relaxed"
                        >
                          {slide.description}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.45,
                            ease: "easeOut",
                          }}
                          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
                        >
                          <a
                            href="/inventario"
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-150 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            Ver inventario
                          </a>
                          <a
                            href={wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-150 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            WhatsApp
                          </a>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
