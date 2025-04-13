import matter from "gray-matter";

// ✅ Fetch all bookmarks from Markdown files
export const getAllBookmarks = async () => {
  // ✅ Corrected glob path relative to Vite src root
  const bookmarkFiles = import.meta.glob("/src/bookmarks/*.md", {
    import: "default",
    query: "?raw",
  });

  const bookmarks = [];

  for (const path in bookmarkFiles) {
    try {
      // Log to check if we are processing the correct file
      console.log("Processing bookmark file:", path);

      // Read the markdown file and parse frontmatter
      const raw = await bookmarkFiles[path]() as string;
      const { data } = matter(raw);

      // Log the data to ensure we have valid content
      console.log("Parsed data:", data);

      // Ensure required fields exist (title and link)
      if (!data.title || !data.link) {
        console.warn(`⚠️ Skipping invalid bookmark file: ${path}`);
        continue;
      }

      // Get the slug from the file path (can be used later if needed)
      const slug = path.split("/").pop()?.replace(".md", "") || "";

      // Add the valid bookmark data to the array
      bookmarks.push({ ...data, slug });
    } catch (err) {
      console.error(`❌ Error processing bookmark ${path}`, err);
    }
  }

  // Sort bookmarks by date if available (else returns as they are)
  return bookmarks.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
};
