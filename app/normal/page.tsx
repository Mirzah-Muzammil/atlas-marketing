import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Modules from "@/components/sections/modules";
import Industries from "@/components/sections/industries";
import CtaBanner from "@/components/sections/cta-banner";
import Faqs from "@/components/sections/faqs";
import Footer from "@/components/sections/footer";
import Modal from "@/components/modal/modal";
import Providers from "@/components/providers";
import PostHeroScrollPath from "@/components/common/PostHeroScrollPath";
import {
  normalFaqs,
  normalModules,
  normalServices,
} from "@/constants/normal-page-data";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <Navbar />
      <main className="flex flex-col">
        <Providers>
          <Hero />
          {/* <PostHeroScrollPath> */}
          <Modules modules={normalModules} />
          <Features />
          <Industries industries={normalServices} />
          <CtaBanner />
          <Faqs faqs={normalFaqs} />
          {/* </PostHeroScrollPath> */}
        </Providers>
      </main>
      <Footer />
      <Modal />
    </div>
  );
}
