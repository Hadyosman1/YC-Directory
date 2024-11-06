import React, { ReactNode } from "react";
import linesImage from "@/../public/lines.png";
import Image from "next/image";

const MainSectionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <section className={"relative bg-primary py-16 md:py-20"}>
      <Image
        className={"object-cover"}
        src={linesImage}
        alt={"lines shape"}
        sizes={"(min-width: 0px) 100vw"}
        fill
        unoptimized
        priority
      />
      {children}
    </section>
  );
};
export default MainSectionWrapper;
