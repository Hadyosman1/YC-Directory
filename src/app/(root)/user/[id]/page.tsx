import React, { Suspense } from "react";
import UserCard from "@/components/UserCard";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import ProfilePosts from "@/components/ProfilePosts";

interface Props {
  params: Promise<{ id: string }>;
}

const Profile = async ({ params }: Props) => {
  const id = (await params).id;
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();

  return (
    <section className="container py-[65px]">
      <div className="flex flex-col items-center gap-x-4 gap-y-7 sm:flex-row sm:items-start">
        <UserCard user={user} />

        <Suspense fallback={<p className="animate-pulse">Loading...</p>}>
          <ProfilePosts userId={id} />
        </Suspense>
      </div>
    </section>
  );
};

export default Profile;
