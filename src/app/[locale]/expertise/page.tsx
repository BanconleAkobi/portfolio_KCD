import ExpertiseSection from "@/components/sections/Expertise/ExpertiseSection";
import PageHero from "@/components/layout/PageHero";
import PageNav from "@/components/layout/PageNav";
import { getTranslations } from "next-intl/server";

export default async function ExpertisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t     = await getTranslations({ locale, namespace: "expertise" });
  const tNext = await getTranslations({ locale, namespace: "experience" });

  return (
    <>
      <PageHero
        index={t("section_index")}
        name={t("section_name")}
        title={t("page_title")}
        subtitle={t("page_subtitle")}
      />
      <ExpertiseSection />
      <PageNav
        nextHref="/experience"
        nextIndex={tNext("section_index")}
        nextLabel={tNext("page_title")}
      />
    </>
  );
}
