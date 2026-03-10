import { aiRules } from "@/data/aiRules";
import { productDetails } from "@/data/productDetails";

type RuleResult = {
  reply: string;
  source: "rule";
};

export function ruleBasedAnswer(
  message: string,
  locale: "id" | "en" = "id",
): RuleResult | null {
  const q = message.toLowerCase();

  const totalProducts = Object.keys(productDetails).length;

  // =============================
  // TOTAL PRODUK
  // =============================
  if (
    q.includes("total produk") ||
    q.includes("jumlah produk") ||
    q.includes("berapa produk") ||
    q.includes("berapa banyak produk") ||
    q.includes("berapa model") ||
    q.includes("total model") ||
    q.includes("how many products") ||
    q.includes("how many machines") ||
    q.includes("total products") ||
    q.includes("number of products") ||
    q.includes("total machine models")
  ) {
    const template =
      locale === "en" ? aiRules.totalProducts.en : aiRules.totalProducts.id;

    return {
      reply: template.replace("{total}", String(totalProducts)),
      source: "rule",
    };
  }

  // =============================
  // ALAMAT / LOCATION
  // =============================
  if (
    q.includes("alamat") ||
    q.includes("lokasi") ||
    q.includes("address") ||
    q.includes("location")
  ) {
    return {
      reply: locale === "en" ? aiRules.address.en : aiRules.address.id,
      source: "rule",
    };
  }

  // =============================
  // KONTAK / WHATSAPP
  // =============================
  if (
    q.includes("whatsapp") ||
    q.includes("wa") ||
    q.includes("nomor wa") ||
    q.includes("nomer wa") ||
    q.includes("no wa") ||
    q.includes("kontak") ||
    q.includes("contact") ||
    q.includes("hubungi") ||
    q.includes("nomor cs") ||
    q.includes("customer service") ||
    q.includes("cs") ||
    q.includes("contact person") ||
    q.includes("cp") ||
    q.includes("how can i contact") ||
    q.includes("contact you")
  ) {
    return {
      reply: locale === "en" ? aiRules.contact.en : aiRules.contact.id,
      source: "rule",
    };
  }

  // =============================
  // JAM OPERASIONAL
  // =============================
  if (
    q.includes("jam buka") ||
    q.includes("jam operasional") ||
    q.includes("buka jam") ||
    q.includes("jam berapa buka") ||
    q.includes("kapan buka") ||
    q.includes("jam kerja") ||
    q.includes("opening hours") ||
    q.includes("open hours") ||
    q.includes("when open") ||
    q.includes("business hours") ||
    q.includes("hubungi cs") ||
    q.includes("contact cs") ||
    q.includes("kapan bisa hubungi") ||
    q.includes("when can i contact")
  ) {
    return {
      reply:
        locale === "en" ? aiRules.openingHours.en : aiRules.openingHours.id,
      source: "rule",
    };
  }

  // Company Profile //
  if (
    q.includes("tentang bcti") ||
    q.includes("tentang perusahaan") ||
    q.includes("profil perusahaan") ||
    q.includes("perusahaan apa") ||
    q.includes("siapa bcti") ||
    q.includes("apa itu bcti") ||
    q.includes("bcti itu apa") ||
    q.includes("info perusahaan") ||
    q.includes("company profile") ||
    q.includes("about company") ||
    q.includes("about bcti") ||
    q.includes("who is bcti") ||
    q.includes("what is bcti") ||
    q.includes("tell me about bcti") ||
    q.includes("tell me about your company")
  ) {
    return {
      reply:
        locale === "en" ? aiRules.companyProfile.en : aiRules.companyProfile.id,
      source: "rule",
    };
  }

  return null;
}
