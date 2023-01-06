import Listing from "../components/Listing";
import HeroSection from "../components/HeroSection";
export default function Home() {
  return (
    <>
      <HeroSection />
      <Listing maxItem={6} showFilter={false} showSort={false} />
    </>
  );
}
