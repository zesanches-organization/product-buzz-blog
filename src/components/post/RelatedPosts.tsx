
import PostCard from "@/components/PostCard";
import { type Post } from "@/lib/posts";

type RelatedPostsProps = {
  posts: Post[];
};

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Artigos Relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((relatedPost) => (
          <PostCard 
            key={relatedPost.frontmatter.slug} 
            post={relatedPost.frontmatter}
          />
        ))}
      </div>
    </div>
  );
}
