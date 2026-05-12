import ExperienceSection from "@/components/sections/Experience/ExperienceSection";
import PageHero from "@/components/layout/PageHero";
import PageNav from "@/components/layout/PageNav";
import { getTranslations } from "next-intl/server";

export default async function ExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t     = await getTranslations({ locale, namespace: "experience" });
  const tNext = await getTranslations({ locale, namespace: "projects" });

  return (
    <>
      <PageHero
        index={t("section_index")}
        name={t("section_name")}
        title={t("page_title")}
        subtitle={t("page_subtitle")}
      />
      <ExperienceSection />
      <PageNav
        nextHref="/projects"
        nextIndex={tNext("section_index")}
        nextLabel={tNext("page_title")}
      />
    </>
  );
}
