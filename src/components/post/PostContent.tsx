
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import { type PostFrontmatter } from "@/lib/posts";

type PostContentProps = {
  frontmatter: PostFrontmatter;
  htmlContent: string;
};

export default function PostContent({ frontmatter, htmlContent }: PostContentProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="mb-8 text-lg text-muted-foreground">
        {frontmatter.description}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 my-6">
        <Tag className="h-4 w-4 mr-1" />
        {frontmatter.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="mr-2">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Markdown content */}
      <div 
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </div>
  );
}
