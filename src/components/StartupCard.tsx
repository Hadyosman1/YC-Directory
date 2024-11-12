import React from "react";
import Image from "next/image";
import Link from "next/link";
import eyeIcon from "@/../public/eye-icon.svg";
import { formatDate } from "@/utils/helpers";
import { Author, Startup } from "@/sanity/types";

export type startupTypeCard = Omit<Startup, "author"> & { author?: Author };

interface Props {
  post: startupTypeCard;
}

const StartupCard = ({ post }: Props) => {
  const {
    _createdAt,
    views,
    author,
    _id,
    title,
    category,
    image,
    description,
  } = post;

  const viewsAsString = `${views}`;

  return (
    <article className="group rounded-[22px] border-[5px] border-black bg-white px-4 py-8 drop-shadow-[4px_4px_0_#000] transition-all hover:border-primary hover:bg-primary-100 hover:drop-shadow-[4px_4px_0_#EE2B69] 2xl:px-[22px]">
      <div className={"mb-5 flex items-center justify-between"}>
        <p
          className={
            "rounded-[70px] bg-primary-100 p-2.5 font-semibold group-hover:bg-white"
          }
        >
          {formatDate(_createdAt)}
        </p>

        <div className={"flex items-center gap-0.5"}>
          <Image
            src={eyeIcon}
            alt={"eye icon"}
            width={24}
            height={24}
            priority
          />
          <span className={"text-base font-medium [letter-spacing:-3%]"}>
            {viewsAsString}
          </span>
        </div>
      </div>

      <div className={"mb-2.5 flex items-center justify-between"}>
        <div>
          <Link
            href={`/user/${author?._id}`}
            className={
              "mb-1.5 line-clamp-1 text-base font-medium leading-[19px]"
            }
          >
            {author?.name}
          </Link>

          <Link
            href={`/startup/${_id}`}
            className={
              "line-clamp-1 text-[26px] font-semibold leading-[30.5px]"
            }
          >
            {title}
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image ?? ""}
            alt="author"
            width={40}
            height={40}
            className={"aspect-square w-10 rounded-full bg-slate-300"}
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className={"mb-4 line-clamp-2 min-h-[47px] text-black-100"}>
          {description}
        </p>
      </Link>

      <Image
        className={"mb-4 h-[164px] w-full rounded-[10px] border border-black"}
        src={image ?? ""}
        alt={"startup"}
        width={276}
        height={164}
      />

      <div className={"flex items-center justify-between font-medium"}>
        <Link
          href={`/?query=${category?.toLowerCase()}`}
          className={"text-base leading-[19px] text-black hover:underline"}
        >
          {category}
        </Link>

        <Link
          href={`/startup/${_id}`}
          className="rounded-[70px] border border-black bg-black px-5 py-2.5 text-base leading-[19px] text-white hover:underline"
        >
          Details
        </Link>
      </div>
    </article>
  );
};
export default StartupCard;
