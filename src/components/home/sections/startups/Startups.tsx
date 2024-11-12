import React, { Suspense } from "react";
import StartupCardList from "@/components/StartupCardList";

export type StartupQueryType = string | undefined;
interface Props {
  query: StartupQueryType;
}

const Startups = ({ query }: Props) => {
  return (
    <section className={"container py-10 md:py-16"}>
      <h2 className="mb-6 text-xl font-semibold [letter-spacing:-3%] md:mb-9 md:text-3xl">
        {query ? `Search results for "${query}"` : "All startups"}
      </h2>

      <Suspense fallback={<p className="animate-pulse">Loading...</p>}>
        <StartupCardList query={query} />
      </Suspense>
    </section>
  );
};
export default Startups;
