import React from "react";

import StartupCard, { startupTypeCard } from "@/components/StartupCard";
import { StartupQueryType } from "./home/sections/startups/Startups";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

interface Props {
  query?: StartupQueryType;
}

const StartupCardList = async ({ query }: Props) => {
  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params: { search: query || null },
  });

  return (
    <div className="inline-grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] justify-center gap-x-4 gap-y-7 lg:justify-start">
      {posts?.length > 0 ? (
        posts.map((post: startupTypeCard) => (
          <StartupCard key={post._id} post={post} />
        ))
      ) : (
        <p className={"text-lg font-semibold text-slate-600 lg:text-2xl"}>
          There is no startups.
        </p>
      )}
      <SanityLive />
    </div>
  );
};
export default StartupCardList;
