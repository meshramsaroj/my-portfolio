export const navigation = [
  { label: "Home", id: "home", href: "/#home" },
  { label: "Skills", id: "skills", href: "/#skills" },
  { label: "Experience", id: "experience", href: "/#experience" },
  { label: "Projects", id: "projects", href: "/#projects" },
  { label: "Education", id: "education", href: "/#education" },
  { label: "Contact", id: "contact", href: "/contact" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];
