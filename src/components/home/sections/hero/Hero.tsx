import SearchInput from "@/components/home/sections/hero/SearchInput";
import MainSectionWrapper from "@/components/MainSectionWrapper";

const Hero = () => {
  return (
    <MainSectionWrapper>
      <div className={"container relative flex flex-col items-center md:px-8"}>
        <h1 className={"heading"}>
          <span className={"shape relative"}>Pitch, Vote And Grow</span>
        </h1>

        <h2 className={"sub-heading"}>
          Pitch Your Startup,
          <br /> Connect with Entrepreneurs
        </h2>

        <p className={"section-paragraph"}>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchInput />
      </div>
    </MainSectionWrapper>
  );
};
export default Hero;
