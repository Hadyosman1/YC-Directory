import Image from "next/image";
import profileShape from "@/../public/profile-card-shape.svg";
import { AUTHOR_BY_GITHUB_ID_QUERYResult } from "@/sanity/types";

const UserCard = async ({
  user,
}: {
  user: AUTHOR_BY_GITHUB_ID_QUERYResult;
}) => {
  return (
    <div className="relative ms-2 min-w-[300px] grow md:max-w-[312px]">
      <Image
        src={profileShape}
        alt="profile shape"
        className="absolute -left-4 -top-6 aspect-square w-10 sm:-left-7"
        width={40}
        height={40}
      />

      <div className="relative z-10 mx-auto -mb-9 min-w-[270px] max-w-[90%] rounded-[20px]">
        <div className="absolute -inset-0 -z-10 -rotate-[2.5deg] rounded-[20px] bg-black" />
        <h1 className="relative z-10 line-clamp-1 rounded-[20px] border-[5px] border-black bg-white text-center text-2xl font-black uppercase leading-[51px]">
          {user?.name}
        </h1>
      </div>

      <div className="rounded-[30px] border-[5px] border-black bg-primary px-[22px] drop-shadow-[5px_6px_0_#000] transition-all">
        <div className="mt-[55px] flex flex-col items-center pb-[38px] text-white">
          <Image
            unoptimized
            priority
            src={user?.image ?? ""}
            alt="profile"
            width={220}
            height={220}
            className="aspect-square w-[220px] rounded-full border-4 border-black bg-slate-300"
          />
          <h2 className="mt-6 line-clamp-1 text-3xl font-extrabold leading-[36px]">
            @{user?.username}
          </h2>
          <p className="mt-2.5 line-clamp-1 text-base font-medium leading-[24px]">
            {user?.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
