"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import StarGrid from "../StarGrid";
import ButtonLink from "../ButtonLink";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function AnimatedContent() {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);
  // read all image from \public\assets\wallpapers

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ".hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow",
          { opacity: 1 },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: {
          ease: "power2.inOut",
        },
      });

      tl.fromTo(
        ".hero__heading",
        { scale: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
        },
      );

      tl.fromTo(
        ".hero__body",
        { y: 20 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
        },
        "-=0.6",
      );

      tl.fromTo(
        ".hero__button",
        { scale: 1.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
        },
        "-=0.8",
      );
      tl.fromTo(
        ".hero__image",
        { y: 100 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
        },
        "+=0.3",
      );
      tl.fromTo(
        ".hero__glow",
        { scale: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
        },
        "-=1",
      );
    },
    { scope: container },
  );

  return (
    <div className="relative" ref={container}>
      <StarGrid />
      <div className="hero__heading mx-auto mt-6 max-w-3xl text-balance text-heading4-bold opacity-0 md:text-heading3-bold">
        Introduction about our company
      </div>

      <div className="hero__body mx-auto mt-6 max-w-3xl text-balance text-body-medium text-slate-300 opacity-0">
        With a 17-year journey in Vietnam, we has not only created timeless
        landmarks that transform the landscapes but also built a humane working
        environment and human resource policies that bring international
        standards closer to Vietnamese workers. Adhering to the philosophy "Good
        seeds only sprout and grow in a favorable environment," we continues to
        sustainably develop a professional working environment. At we, the Group
        always considers human resources as the core factor and valuable asset.
        This place gathers many talented, dynamic, and creative individuals who
        possess both good character and excellent professional skills. With the
        mission "The Pioneer," we always prioritizes discovering and nurturing
        talents, contributing to building a new generation of Vietnamese people
        with qualities, capabilities, and health that keep pace with the times.
      </div>

      <ButtonLink className="hero__button mt-8 opacity-0" href="/dashboard">
        Discover jobs
      </ButtonLink>
      <div className="hero__image glass-container mt-16 w-fit opacity-0">
        <div className="hero__glow absolute inset-0 -z-10 bg-blue-500/30 opacity-0 blur-2xl filter" />
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Image
                    className="aspect-video rounded-md object-cover"
                    src={`/assets/wallpapers/${index + 1}.jpg`}
                    alt={`wallpaper-${index + 1}`}
                    width={1200}
                    height={500}
                    sizes="100vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* <div className="hero__image glass-container mt-16 w-fit opacity-0">
        <div className="hero__glow absolute inset-0 -z-10 bg-blue-500/30 opacity-0 blur-2xl filter" /> 

        <Image
          src="/assets/home.png"
          className="h-auto w-auto rounded-lg"
          priority
          sizes="100vw"
          alt="Hero image"
          width={800}
          height={500}
        />
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex h-full w-full items-center justify-center p-6">
                      <Image
                        className="rounded-lg object-fill"
                        src={`/assets/wallpapers/${index + 1}.jpg`}
                        alt={`wallpaper-${index + 1}`}
                        width={800}
                        height={500}
                        sizes="100vw"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        
      </div> */}
    </div>
  );
}
