import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PinkSection from "@/components/PinkSection";
import StartupViews, { StartupViewsSkeleton } from "@/components/StartupViews";

import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { formatDate } from "@/utils/helpers";

import markdownit from "markdown-it";
import StartupCard, { startupTypeCard } from "@/components/StartupCard";
const md = markdownit();

interface Props {
  params: Promise<{ id: string }>;
}

const StartupDetails = async ({ params }: Props) => {
  const id = (await params).id;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);

  if (!post) return notFound();

  let parsedContent;
  try {
    parsedContent = md.render(post?.pitch || "");
  } catch {
    console.log("Error rendering Markdown content");
    parsedContent = "";
  }

  return (
    <>
      <PinkSection>
        <p className={"yellow-p"}>
          <span className={"shape relative"}>
            {formatDate(post._createdAt)}
          </span>
        </p>

        <h1 className={"heading"}>{post.title}</h1>

        <p className={"sub-heading"}>{post.description}</p>
      </PinkSection>

      <section className="container py-12">
        <div className="mx-auto max-w-[1110px]">
          <Image
            unoptimized
            src={post.image ?? ""}
            alt="thumbnail"
            className="aspect-video max-w-full rounded-[20px] object-cover shadow-md"
            width={1110}
            height={583}
          />
        </div>

        <div className="mx-auto mb-12 mt-9 max-w-[800px]">
          <div className="flex flex-wrap-reverse items-end justify-between gap-x-1.5 gap-y-2.5">
            <Link
              href={`/user/${post.author._id}`}
              className="flex items-center gap-[14px]"
            >
              <Image
                unoptimized
                src={post.author.image ?? ""}
                alt={"avatar"}
                width={64}
                height={64}
                className="aspect-square w-16 rounded-full drop-shadow-md"
              />

              <div>
                <h2 className="line-clamp-1 text-lg font-extrabold md:text-[25px] md:leading-[30px]">
                  {post.author.name}
                </h2>

                <h3 className="mt-px line-clamp-1 text-lg font-medium md:text-xl md:leading-[30px]">
                  @{post.author.username}
                </h3>
              </div>
            </Link>

            <p className="rounded-[70px] bg-primary-100 px-3 py-1.5 text-sm font-medium capitalize leading-[24px] lg:px-8 lg:py-2.5 lg:text-xl">
              {post.category}
            </p>
          </div>

          <h4 className="mb-6 mt-12 text-3xl font-semibold leading-[35px]">
            Pitch Details
          </h4>

          <div className="mb-8 border-b border-dashed border-black-300/50 pb-8 md:mb-[60px] md:pb-[60px]">
            {parsedContent ? (
              <article
                className="prose break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="text-black-100">No Details Provided..!</p>
            )}
          </div>

          {editorPosts?.length > 0 && (
            <>
              <p className="mb-6 mt-12 text-3xl font-semibold leading-[35px]">
                Editor picks
              </p>

              <div className="inline-grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] justify-center gap-x-4 gap-y-7 lg:justify-start">
                {editorPosts.map((post: startupTypeCard) => (
                  <StartupCard key={post._id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Suspense fallback={<StartupViewsSkeleton />}>
        <StartupViews id={post?._id} />
      </Suspense>
    </>
  );
};

export default StartupDetails;
