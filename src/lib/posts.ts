
// Import JSON data directly
import headphones from '../content/posts/headphones-bluetooth-2023.md?raw';
import smartphone from '../content/posts/smartphone-top-2023.md?raw';
import smartwatch from '../content/posts/smartwatch-fitness-2023.md?raw';

import matter from 'gray-matter';

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

// Create a map of all post content
const postsContent: Record<string, string> = {
  'headphones-bluetooth-2023.md': headphones,
  'smartphone-top-2023.md': smartphone,
  'smartwatch-fitness-2023.md': smartwatch,
};

// For storing new posts (they will be lost on refresh as this is client-side only)
const newPosts: Record<string, string> = {};

// Parse post content
function parsePostContent(fileName: string, content: string): Post {
  const { data, content: postContent } = matter(content);
  return {
    frontmatter: data as PostFrontmatter,
    content: postContent,
  };
}

export function getAllPosts(): Post[] {
  try {
    // Get all posts (including new ones)
    const allPostsData = [
      ...Object.entries(postsContent).map(([fileName, content]) => {
        return parsePostContent(fileName, content);
      }),
      ...Object.entries(newPosts).map(([fileName, content]) => {
        return parsePostContent(fileName, content);
      })
    ];

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
    // Find the post that matches the slug in both sources
    const postEntry = [...Object.entries(postsContent), ...Object.entries(newPosts)].find(([_, content]) => {
      const { data } = matter(content);
      return data.slug === slug;
    });

    if (!postEntry) {
      return null;
    }

    const [fileName, content] = postEntry;
    return parsePostContent(fileName, content);
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

export function createPost(post: PostFrontmatter, content: string): Post | null {
  try {
    // Create frontmatter content
    const postContent = matter.stringify(content, post);
    const fileName = `${post.slug}.md`;
    
    // Add to newPosts
    newPosts[fileName] = postContent;
    
    return {
      frontmatter: post,
      content: content,
    };
  } catch (error) {
    console.error('Error creating post:', error);
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
