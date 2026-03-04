import "server-only";

const dictionaries = {
  id: () =>
    import("@/app/dictionaries/id.json").then((module) => module.default),
  en: () =>
    import("@/app/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: "id" | "en") =>
  dictionaries[locale]();
