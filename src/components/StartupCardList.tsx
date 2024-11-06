import React from "react";
import StartupCard from "@/components/StartupCard";

const StartupCardList = () => {
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 5, name: "Steven Smith" },
      _id: 2,
      description: "This Is A Description.",
      image: "/test-startup.png",
      category: "Robots",
      title: "We Are Robots.",
    },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] justify-items-center gap-x-4 gap-y-7 2xl:grid-cols-4 2xl:justify-between">
      {posts?.length > 0 ? (
        posts.map((post) => <StartupCard key={post._id} post={post} />)
      ) : (
        <p className={"text-lg font-semibold lg:text-2xl"}>
          There is no startups.
        </p>
      )}
    </div>
  );
};
export default StartupCardList;
