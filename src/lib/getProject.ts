import matter from "gray-matter";
import { marked } from "marked";

// ✅ Fetch all projects from Markdown files
export const getAllProjects = async () => {
  const projectFiles = import.meta.glob("../projects/*.md", {
    import: "default",
    query: "?raw",
  });

  const projects = [];

  for (const path in projectFiles) {
    try {
      const raw = (await projectFiles[path]()) as string;
      const { data } = matter(raw);

      // ✅ Ensure required frontmatter fields exist
      if (!data.title || !data.date) {
        console.warn(`⚠️ Skipping invalid frontmatter in: ${path}`);
        continue;
      }

      const slug = path.split("/").pop()?.replace(".md", "") || "";
      projects.push({ ...data, slug });
    } catch (err) {
      console.error(`❌ Error processing ${path}`, err);
    }
  }

  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// ✅ Fetch a single project by slug
export const getProjectBySlug = async (slug: string) => {
  try {
    const file = await import(`../projects/${slug}.md?raw`);
    const raw = file.default;
    const { data, content } = matter(raw);
    const html = marked(content);
    return { ...data, content: html, slug };
  } catch (err) {
    console.error(`❌ Error loading project for slug: ${slug}`, err);
    throw err;
  }
};
