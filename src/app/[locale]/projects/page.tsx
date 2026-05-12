import ProjectsSection from "@/components/sections/Projects/ProjectsSection";
import PageHero from "@/components/layout/PageHero";
import PageNav from "@/components/layout/PageNav";
import { getTranslations } from "next-intl/server";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t     = await getTranslations({ locale, namespace: "projects" });
  const tNext = await getTranslations({ locale, namespace: "skills" });

  return (
    <>
      <PageHero
        index={t("section_index")}
        name={t("section_name")}
        title={t("page_title")}
        subtitle={t("page_subtitle")}
      />
      <ProjectsSection />
      <PageNav
        nextHref="/skills"
        nextIndex={tNext("section_index")}
        nextLabel={tNext("page_title")}
      />
    </>
  );
}
