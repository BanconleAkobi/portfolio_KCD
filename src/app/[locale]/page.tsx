import HeroSection from "@/components/sections/Hero/HeroSection";
import PageNav from "@/components/layout/PageNav";
import { getTranslations } from "next-intl/server";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <HeroSection />
      <PageNav
        nextHref="/about"
        nextIndex={t("section_index")}
        nextLabel={t("page_title")}
      />
    </>
  );
}
