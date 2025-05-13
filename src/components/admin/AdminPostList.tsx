
import { useState, useEffect } from 'react';
import { getAllPosts, type Post } from '@/lib/posts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AdminPostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Artigos Publicados</h2>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum artigo publicado ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.frontmatter.slug}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{post.frontmatter.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-2 gap-2">
                      <Calendar size={14} />
                      <span>
                        {formatDistanceToNow(new Date(post.frontmatter.date), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {post.frontmatter.category}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link to={`/posts/${post.frontmatter.slug}`}>
                    <ExternalLink className="h-4 w-4 mr-1" /> 
                    Visualizar
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPostList;
