import { unstable_after as after } from "next/server";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

interface Props {
  id: string;
}

const StartupViews = async ({ id }: Props) => {
  let { views } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: +views + 1 })
        .commit(),
  );

  views = `${views}`;

  return (
    <div className="fixed bottom-4 right-4 rounded-[9px] bg-primary-100 px-4 py-2 text-sm font-bold drop-shadow">
      <p>
        Views: <span className={"font-black"}>{`${views}`}</span>
      </p>

      <div className="absolute right-0 top-0 grid -translate-y-1/3 translate-x-1/3 place-items-center">
        <span className="aspect-square w-2.5 rounded-full bg-primary" />
        <span className="absolute -z-[1] aspect-square w-3 animate-ping rounded-full bg-primary/60" />
      </div>
    </div>
  );
};
export default StartupViews;

export const StartupViewsSkeleton = () => {
  return (
    <div className="fixed bottom-4 right-4 grid h-[36px] w-[90px] animate-pulse place-content-center rounded-[9px] bg-slate-300/30 px-4 py-2 font-bold drop-shadow">
      . . .
    </div>
  );
};
