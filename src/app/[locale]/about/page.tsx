import AboutSection from "@/components/sections/About/AboutSection";
import PageHero from "@/components/layout/PageHero";
import PageNav from "@/components/layout/PageNav";
import { getTranslations } from "next-intl/server";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tAbout    = await getTranslations({ locale, namespace: "about" });
  const tNext     = await getTranslations({ locale, namespace: "expertise" });

  return (
    <>
      <PageHero
        index={tAbout("section_index")}
        name={tAbout("section_name")}
        title={tAbout("page_title")}
        subtitle={tAbout("page_subtitle")}
      />
      <AboutSection />
      <PageNav
        nextHref="/expertise"
        nextIndex={tNext("section_index")}
        nextLabel={tNext("page_title")}
      />
    </>
  );
}
