"use client";

import Link from "next/link";

export default function Error({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-2 text-6xl font-black text-primary">500</h1>
        <h2 className="text-2xl font-black text-primary">
          Something went wrong!
        </h2>

        <div className="mt-5 flex justify-center gap-3 font-semibold text-xl leading-6">
          <Link
            className="rounded bg-primary px-2 py-1 text-white hover:brightness-90"
            href={"/"}
          >
            Go Home
          </Link>
          <button
            className="rounded px-2 py-1 text-primary outline outline-1 outline-primary hover:underline"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
