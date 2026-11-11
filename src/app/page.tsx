import { Clients } from "@/components/sites/oblique/clients";
import { Cta, Footer } from "@/components/sites/oblique/cta-footer";
import { Faq } from "@/components/sites/oblique/faq";
import { Header } from "@/components/sites/oblique/header";
import { Hero } from "@/components/sites/oblique/hero";
import { Integration } from "@/components/sites/oblique/integration";
import { Problem } from "@/components/sites/oblique/problem";
import { Process } from "@/components/sites/oblique/process";
import { Services } from "@/components/sites/oblique/services";
import { Testimonials } from "@/components/sites/oblique/testimonials";
import { Work } from "@/components/sites/oblique/work";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Clients />
        <Problem />
        <Services />
        <Integration />
        <Work />
        <Process />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
