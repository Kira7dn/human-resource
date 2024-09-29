import { PasskeyModal } from "@/components/PassKeyModel";
import Recruitment from "./_components/Recruitment";
import CallToAction from "./_components/CallToAction";
import Hero from "./_components/Hero";
import Integrations from "./_components/Integrations";
import Showcase from "./_components/Showcase";

interface HomeProps {
  searchParams: {
    admin?: string;
  };
}

export default function Home({ searchParams }: HomeProps) {
  const isAdmin = searchParams?.admin === "true";

  return (
    <>
      {isAdmin && <PasskeyModal />}
      <Hero />
      <Showcase />
      <Recruitment />
      <Integrations />
    </>
  );
}
