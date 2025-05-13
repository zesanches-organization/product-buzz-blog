
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Sobre Nós</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
                  <p className="text-muted-foreground">
                    O BlogRecomenda nasceu com um propósito claro: ajudar consumidores a fazer escolhas mais informadas 
                    e inteligentes. Em um mercado repleto de opções e propaganda, nosso compromisso é oferecer 
                    análises imparciais e recomendações baseadas em testes reais e experiência prática.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Como Testamos os Produtos</h2>
                  <p className="text-muted-foreground mb-4">
                    Cada produto recomendado em nosso site passa por um rigoroso processo de avaliação:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Adquirimos os produtos com nossos próprios recursos para manter independência</li>
                    <li>Testamos cada item por pelo menos 2 semanas em condições reais de uso</li>
                    <li>Avaliamos critérios como desempenho, custo-benefício, durabilidade e experiência do usuário</li>
                    <li>Comparamos diretamente com concorrentes na mesma categoria</li>
                    <li>Monitoramos o feedback de outros usuários para complementar nossa análise</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Nossa Equipe</h2>
                  <p className="text-muted-foreground">
                    Somos um grupo de especialistas apaixonados por tecnologia, esportes e bem-estar. 
                    Nossa equipe inclui engenheiros, personal trainers, especialistas em tecnologia e entusiastas 
                    que buscam constantemente as melhores soluções em cada categoria que cobrimos.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Links Afiliados</h2>
                  <p className="text-muted-foreground">
                    Para manter nosso site e continuar oferecendo conteúdo de qualidade, utilizamos links de afiliados. 
                    Isso significa que podemos receber uma pequena comissão se você fizer uma compra através dos links 
                    em nosso site, sem qualquer custo adicional para você. Isso não influencia nossas recomendações - 
                    apenas sugerimos produtos que realmente acreditamos serem de alta qualidade e bom valor.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Contato</h3>
                  <p className="text-muted-foreground mb-4">
                    Tem alguma pergunta ou sugestão? Entre em contato conosco:
                  </p>
                  <p className="text-muted-foreground">Email: contato@blogrecomenda.com.br</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Sugerir Produto</h3>
                  <p className="text-muted-foreground mb-4">
                    Há algum produto que você gostaria que analisássemos?
                  </p>
                  <Link to="/contato">
                    <button className="bg-primary text-white px-4 py-2 rounded-md w-full hover:bg-primary/90 transition-colors">
                      Sugerir produto
                    </button>
                  </Link>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Políticas</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link 
                        to="/politica-de-privacidade" 
                        className="text-primary hover:underline"
                      >
                        Política de Privacidade
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/termos-de-uso" 
                        className="text-primary hover:underline"
                      >
                        Termos de Uso
                      </Link>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
