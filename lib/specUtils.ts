export const normalizeSpecKey = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]/g, "");
