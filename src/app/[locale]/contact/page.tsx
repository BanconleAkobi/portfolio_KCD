import ContactSection from "@/components/sections/Contact/ContactSection";
import PageHero from "@/components/layout/PageHero";
import { getTranslations } from "next-intl/server";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <PageHero
        index={t("section_index")}
        name={t("section_name")}
        title={t("page_title")}
        subtitle={t("page_subtitle")}
      />
      <ContactSection />
    </>
  );
}
