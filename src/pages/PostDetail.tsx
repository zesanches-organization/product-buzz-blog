
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag, Share, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getPostBySlug, getAllPosts, type Post } from '@/lib/posts';
import markdownToHtml from '@/lib/markdownToHtml';
import PostCard from '@/components/PostCard';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);

      if (slug) {
        try {
          const postData = getPostBySlug(slug);
          
          if (postData) {
            setPost(postData);
            
            // Convert markdown to HTML
            const html = await markdownToHtml(postData.content);
            setHtmlContent(html);
            
            // Get related posts from the same category
            const allPosts = getAllPosts();
            const related = allPosts
              .filter(p => 
                p.frontmatter.category === postData.frontmatter.category && 
                p.frontmatter.slug !== slug
              )
              .slice(0, 2);
            
            setRelatedPosts(related);
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPostData();
  }, [slug]);

  // Share functionality
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.frontmatter.title || 'BlogRecomenda',
        text: post?.frontmatter.description || '',
        url: window.location.href,
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
          <p className="mb-8">O artigo que você procura não existe ou foi removido.</p>
          <Link to="/">
            <Button>Voltar para a Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formattedDate = format(new Date(post.frontmatter.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <Layout>
      {/* Hero section with post image */}
      <div
        className="relative w-full h-64 md:h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${post.frontmatter.image || '/placeholder.svg'})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="container mx-auto px-4 py-6">
            <Badge className="mb-2">{post.frontmatter.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {post.frontmatter.title}
            </h1>
            <div className="flex items-center mt-4 text-white text-opacity-80">
              <Calendar size={16} className="mr-2" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="prose dark:prose-invert max-w-none">
              <div className="mb-8 text-lg text-muted-foreground">
                {post.frontmatter.description}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 my-6">
                <Tag className="h-4 w-4 mr-1" />
                {post.frontmatter.tags.map((tag) => (
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

            {/* Share buttons */}
            <div className="mt-12 flex items-center justify-between border-t border-b border-border py-6">
              <div>
                <span className="font-medium">Compartilhe:</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={sharePost}
                  aria-label="Compartilhar"
                >
                  <Share size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  aria-label="Copiar Link"
                >
                  <LinkIcon size={16} />
                </Button>
              </div>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Artigos Relacionados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <PostCard 
                      key={relatedPost.frontmatter.slug} 
                      post={relatedPost.frontmatter}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Product info card */}
            <Card className="p-6 mb-8 sticky top-24">
              <h3 className="font-bold text-xl mb-4">Informações do Produto</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Preço:</p>
                  <p className="font-semibold">{post.frontmatter.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Categoria:</p>
                  <Link to={`/categorias/${post.frontmatter.category}`}>
                    <Badge className="cursor-pointer">{post.frontmatter.category}</Badge>
                  </Link>
                </div>
                
                <a 
                  href={post.frontmatter.affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block mt-6"
                >
                  <Button className="w-full">Ver oferta</Button>
                </a>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  *O preço pode variar desde a última atualização
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetail;
