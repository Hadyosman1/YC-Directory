import PinkSection from "@/components/PinkSection";
import StartupForm from "@/components/StartupForm";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

const CreateStartup = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <PinkSection>
        <h1 className="heading sm:!text-[40px]">Submit Your Startup Pitch</h1>
      </PinkSection>

      <section className="container !max-w-[750px] py-[72px]">
        <StartupForm />
      </section>
    </>
  );
};

export default CreateStartup;
