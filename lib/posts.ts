// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  title: string;
  date: string;
  description: string;
  image?: string;
  slug: string;
};

export type Post = PostMeta & {
  content: string;
};

function getPostFileNames(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

export function getAllPosts(): PostMeta[] {
  const fileNames = getPostFileNames();

  const posts: PostMeta[] = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    const slugFromFrontmatter = (data as any).slug as string | undefined;
    const slug =
      slugFromFrontmatter ?? fileName.replace(/\.md$/, ""); // fallback to filename

    const { title, date, description } = data as any;
    const image = (data as any).image as string | undefined;

    return {
      title,
      date,
      description,
      image,
      slug,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  if (!slug) {
    throw new Error("getPostBySlug: slug is required");
  }

  const fileNames = getPostFileNames();

  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const slugFromFrontmatter = (data as any).slug as string | undefined;
    const derivedSlug =
      slugFromFrontmatter ?? fileName.replace(/\.md$/, "");

    if (derivedSlug === slug) {
      const { title, date, description } = data as any;
      const image = (data as any).image as string | undefined;

      return {
        title,
        date,
        description,
        image,
        slug: derivedSlug,
        content,
      };
    }
  }

  throw new Error(`Post not found for slug: ${slug}`);
}
