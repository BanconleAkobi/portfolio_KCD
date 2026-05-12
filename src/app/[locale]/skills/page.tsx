import SkillsSection from "@/components/sections/Skills/SkillsSection";
import PageHero from "@/components/layout/PageHero";
import PageNav from "@/components/layout/PageNav";
import { getTranslations } from "next-intl/server";

export default async function SkillsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t     = await getTranslations({ locale, namespace: "skills" });
  const tNext = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <PageHero
        index={t("section_index")}
        name={t("section_name")}
        title={t("page_title")}
        subtitle={t("page_subtitle")}
      />
      <SkillsSection />
      <PageNav
        nextHref="/contact"
        nextIndex={tNext("section_index")}
        nextLabel={tNext("page_title")}
      />
    </>
  );
}
