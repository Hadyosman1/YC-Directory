import Hero from "@/components/home/sections/hero/Hero";
import Startups from "@/components/home/sections/startups/Startups";

export const experimental_ppr = true;

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const query = (await searchParams).query;

  return (
    <>
      <Hero query={query ?? ""} />
      <Startups query={query} />
    </>
  );
}
