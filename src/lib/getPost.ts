import matter from "gray-matter";
import MarkdownIt from "markdown-it"; // ✅ Replaced marked with markdown-it

const md = new MarkdownIt(); // ✅ Initialize markdown-it parser

export const getAllPosts = async () => {
  const postFiles = import.meta.glob("../posts/*.md", {
    import: "default",
    query: "?raw",
  });

  console.log("📂 Matched Markdown files:", Object.keys(postFiles));

  const posts = [];

  for (const path in postFiles) {
    try {
      const raw = await postFiles[path]() as string;
      const { data } = matter(raw);

      // ✅ Skip files missing required metadata
      if (!data.title || !data.date) {
        console.warn(`⚠️ Skipping file due to missing frontmatter: ${path}`);
        continue;
      }

      const slug = path.split("/").pop()?.replace(".md", "") || "";
      posts.push({ ...data, slug });
    } catch (err) {
      console.error(`❌ Error processing ${path}`, err);
    }
  }

  console.log("✅ Parsed posts:", posts);
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getPostBySlug = async (slug: string) => {
  const file = await import(`../posts/${slug}.md?raw`);
  const raw = file.default;
  const { data, content } = matter(raw);
  const html = md.render(content); // ✅ Swapped from marked to markdown-it
  return { ...data, content: html, slug };
};
