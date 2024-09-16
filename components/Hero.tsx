import React from "react";
import { WavyBackground } from "./ui/wavy-background";
import { TypewriterEffectSmooth } from "./ui/typewritter-effect";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex min-h-screen p-2 md:p-4">
      <div className="w-full md:mx-auto flex justify-center items-center">
        {/* <p className="md:text-5xl font-bold text-center">
          Redefine Classroom with <br />{" "}
          <span className="text-accent">CodeYantra</span>
        </p> */}
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Redefining classroom experience
                <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-accent">
                  CodeYantra
                </span>
              </h1>
            </>
          }
        >
          <Image
            src="/assets/demo.webp"
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  );
};

export default Hero;
