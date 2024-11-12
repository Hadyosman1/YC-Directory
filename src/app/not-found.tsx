import Link from "next/link";

const NotFound = () => {
  return (
    <div className="container flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-2 text-6xl font-black text-slate-700">500</h1>
        <h2 className="text-2xl font-black text-slate-700">
          Something went wrong!
        </h2>

        <div className="mt-5 flex justify-center gap-3 text-xl leading-6">
          <Link
            className="rounded border-2 border-slate-700 px-2 py-1 font-semibold text-slate-700 hover:underline hover:brightness-90"
            href={"/"}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
