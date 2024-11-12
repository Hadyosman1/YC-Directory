import { sanityFetch } from "@/sanity/lib/live";
import { AUTHOR_STARTUPS_QUERY } from "@/sanity/lib/queries";
import StartupCard, { startupTypeCard } from "./StartupCard";

const ProfilePosts = async ({ userId }: { userId: string }) => {
  const { data: posts } = await sanityFetch({
    query: AUTHOR_STARTUPS_QUERY,
    params: { id: userId },
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
    </div>
  );
};

export default ProfilePosts;
