import matter from "gray-matter";
import { marked } from "marked";

const caseStudyFiles = import.meta.glob(
  ["../case-studies/*.md", "!../case-studies/README.md"],
  {
    import: "default",
    query: "?raw",
  }
);

export const getAllCaseStudies = async () => {
  const caseStudies = [];

  for (const path in caseStudyFiles) {
    try {
      const raw = (await caseStudyFiles[path]()) as string;
      const { data } = matter(raw);

      if (!data.title || !data.date) {
        console.warn(`Skipping invalid frontmatter in: ${path}`);
        continue;
      }

      const slug = path.split("/").pop()?.replace(".md", "") || "";
      caseStudies.push({ ...data, slug });
    } catch (err) {
      console.error(`Error processing ${path}`, err);
    }
  }

  return caseStudies.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getCaseStudyBySlug = async (slug: string) => {
  try {
    const path = `../case-studies/${slug}.md`;
    const loadCaseStudy = caseStudyFiles[path];

    if (!loadCaseStudy) {
      return null;
    }

    const raw = (await loadCaseStudy()) as string;
    const { data, content } = matter(raw);
    const html = marked(content);
    return { ...data, content: html, slug };
  } catch (err) {
    console.error(`Error loading case study for slug: ${slug}`, err);
    throw err;
  }
};
