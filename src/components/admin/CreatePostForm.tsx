
import { useState } from 'react';
import { createPost } from '@/lib/posts';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  slug: z.string().min(3, "Slug deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  price: z.string(),
  affiliateLink: z.string().url("Link de afiliado deve ser uma URL válida"),
  category: z.string().min(1, "Categoria é obrigatória"),
  tags: z.string(),
  image: z.string().url("URL da imagem deve ser válida"),
  content: z.string().min(10, "Conteúdo deve ter pelo menos 10 caracteres")
});

type FormValues = z.infer<typeof formSchema>;

type CreatePostFormProps = {
  onSuccess: () => void;
}

const CreatePostForm = ({ onSuccess }: CreatePostFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      price: 'R$ 0,00',
      affiliateLink: 'https://',
      category: '',
      tags: '',
      image: 'https://',
      content: ''
    }
  });

  const handleSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const tags = values.tags.split(',').map(tag => tag.trim());
      
      // Current date in ISO format
      const currentDate = new Date().toISOString().split('T')[0];
      
      // Create post
      createPost(
        {
          title: values.title,
          slug: values.slug,
          description: values.description,
          price: values.price,
          affiliateLink: values.affiliateLink,
          tags,
          category: values.category,
          image: values.image,
          date: currentDate
        },
        values.content
      );
      
      onSuccess();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Criar Novo Artigo</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Título do artigo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="titulo-do-artigo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Uma breve descrição do artigo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="R$ 99,90" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="affiliateLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link de Afiliado</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://exemplo.com/produto" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Tecnologia" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (separadas por vírgula)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="tech, gadgets, review" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://exemplo.com/imagem.jpg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo do Artigo (Markdown)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="# Título do Artigo&#10;&#10;Conteúdo em markdown..."
                      className="min-h-[300px] font-mono"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Publicando...' : 'Publicar Artigo'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
