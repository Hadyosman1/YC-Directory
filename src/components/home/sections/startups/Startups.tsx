import React from "react";
import StartupCardList from "@/components/StartupCardList";
interface Props {
  query: string | undefined;
}

const Startups = ({ query }: Props) => {
  console.log("query ", query);

  return (
    <section className={"container py-10 md:py-16"}>
      <h2
        className={
          "mb-6 text-xl font-semibold [letter-spacing:-3%] md:mb-9 md:text-3xl"
        }
      >
        {query ? `Search results for "${query}"` : "Recommended startups"}
      </h2>
      <StartupCardList />
    </section>
  );
};
export default Startups;
