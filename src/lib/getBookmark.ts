import matter from "gray-matter";

export const getAllBookmarks = async () => {
  // Use Vite's dynamic import to load all markdown files in the bookmarks folder
  const bookmarkFiles = import.meta.glob("../bookmarks/*.md", {
    import: "default",
    query: "?raw",
  });

  const bookmarks = [];

  for (const path in bookmarkFiles) {
    try {
      // Read the markdown file
      const raw = await bookmarkFiles[path]() as string;
      const { data } = matter(raw); // Parse front matter
      
      // Ensure required fields exist (title and link)
      if (!data.title || !data.link) {
        console.warn(`⚠️ Skipping invalid bookmark file: ${path}`);
        continue;
      }

      // Get the slug (this could also be used if needed in future)
      const slug = path.split("/").pop()?.replace(".md", "") || "";

      // Add the bookmark data to the array
      bookmarks.push({ ...data, slug });
    } catch (err) {
      console.error(`❌ Error processing bookmark ${path}`, err);
    }
  }

  // Return bookmarks sorted by date, if available
  return bookmarks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
