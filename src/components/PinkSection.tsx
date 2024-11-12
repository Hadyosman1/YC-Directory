import React, { ReactNode } from "react";
import linesImage from "@/../public/lines.png";
import Image from "next/image";

const PinkSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className={"relative bg-primary py-12 md:py-[72px]"}>
      <Image
        className={"pointer-events-none object-cover"}
        src={linesImage}
        alt={"lines shape"}
        sizes={"(min-width: 0px) 100vw"}
        fill
        unoptimized
        priority
      />

      <div className={"container isolate flex flex-col items-center md:px-8"}>
        {children}
      </div>
    </section>
  );
};

export default PinkSection;
