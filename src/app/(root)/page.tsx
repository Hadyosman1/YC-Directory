import Hero from "@/components/home/sections/hero/Hero";
import Startups from "@/components/home/sections/startups/Startups";

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const query = (await searchParams).query;

  return (
    <>
      <Hero />
      <Startups query={query} />
    </>
  );
}
