import matter from "gray-matter";
import { marked, Renderer } from "marked";

// ✅ Fetch all POW entries
export const getAllPOW = async () => {
  const powFiles = import.meta.glob("../pow/*.md", {
    import: "default",
    query: "?raw",
  });

  const powItems = [];

  for (const path in powFiles) {
    try {
      const raw = (await powFiles[path]()) as string;
      const { data } = matter(raw);
      const slug = path.split("/").pop()?.replace(".md", "") || "";

      if (!data.title || !data.date) {
        console.warn(`⚠️ Skipping invalid POW frontmatter in ${path}`);
        continue;
      }

      powItems.push({ ...data, slug });
    } catch (err) {
      console.error(`❌ Error loading POW from ${path}`, err);
    }
  }

  return powItems.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// ✅ Fetch POW detail by slug
export const getPOWBySlug = async (slug: string) => {
  try {
    const file = await import(`../pow/${slug}.md?raw`);
    const raw = file.default;
    const { data, content } = matter(raw);
    const html = marked.parse(content);
    return { ...data, content: html, slug };
  } catch (err) {
    console.error(`❌ Error loading POW for slug: ${slug}`, err);
    throw err;
  }
};
