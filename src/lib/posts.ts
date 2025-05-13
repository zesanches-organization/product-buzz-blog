
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export type PostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  price: string;
  affiliateLink: string;
  tags: string[];
  category: string;
  image: string;
  date: string;
};

export type Post = {
  frontmatter: PostFrontmatter;
  content: string;
};

export function getAllPosts(): Post[] {
  try {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      return {
        frontmatter: data as PostFrontmatter,
        content,
      };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.frontmatter.date < b.frontmatter.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    
    // Find the file that matches the slug
    const fileName = fileNames.find((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return data.slug === slug;
    });

    if (!fileName) {
      return null;
    }

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      frontmatter: data as PostFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set<string>();
  
  posts.forEach((post) => {
    categories.add(post.frontmatter.category);
  });
  
  return Array.from(categories);
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  return posts.filter(post => post.frontmatter.category === category);
}

export function getLatestPosts(count: number): Post[] {
  const posts = getAllPosts();
  return posts.slice(0, count);
}
