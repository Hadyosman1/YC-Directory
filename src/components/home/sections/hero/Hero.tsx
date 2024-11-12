import SearchInput from "@/components/home/sections/hero/SearchInput";
import PinkSection from "@/components/PinkSection";

const Hero = ({ query }: { query: string }) => {
  return (
    <PinkSection>
      <p className={"yellow-p"}>
        <span className={"shape relative"}>Pitch, Vote And Grow</span>
      </p>

      <h1 className={"heading"}>
        Pitch Your Startup,
        <br /> Connect with Entrepreneurs
      </h1>

      <p className={"sub-heading"}>
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
      </p>

      <SearchInput query={query} />
    </PinkSection>
  );
};
export default Hero;
