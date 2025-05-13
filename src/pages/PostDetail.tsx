
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { getPostBySlug, getAllPosts, type Post } from '@/lib/posts';
import markdownToHtml from '@/lib/markdownToHtml';
import { pageView } from '@/lib/analytics';

// Import our new components
import PostHeader from '@/components/post/PostHeader';
import PostContent from '@/components/post/PostContent';
import PostShareTools from '@/components/post/PostShareTools';
import ProductInfoCard from '@/components/post/ProductInfoCard';
import RelatedPosts from '@/components/post/RelatedPosts';

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
            
            // Track page view
            pageView(window.location.pathname);
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

  return (
    <Layout>
      {/* Hero section with post image */}
      <PostHeader frontmatter={post.frontmatter} />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            <PostContent frontmatter={post.frontmatter} htmlContent={htmlContent} />

            {/* Share buttons */}
            <PostShareTools 
              title={post.frontmatter.title} 
              description={post.frontmatter.description} 
              url={window.location.href}
            />

            {/* Related posts */}
            <RelatedPosts posts={relatedPosts} />
          </div>

          {/* Sidebar */}
          <div>
            {/* Product info card */}
            <ProductInfoCard frontmatter={post.frontmatter} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetail;
