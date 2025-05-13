
import { DefaultSeoProps } from 'next-seo';

const SEO_CONFIG: DefaultSeoProps = {
  titleTemplate: '%s | BlogRecomenda',
  defaultTitle: 'BlogRecomenda - As Melhores Recomendações de Produtos',
  description: 'Recomendações imparciais dos melhores produtos e equipamentos testados por especialistas.',
  canonical: 'https://blogrecomenda.com.br',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://blogrecomenda.com.br',
    siteName: 'BlogRecomenda',
    images: [
      {
        url: 'https://blogrecomenda.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BlogRecomenda',
      },
    ],
  },
  twitter: {
    handle: '@blogrecomenda',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
};

export default SEO_CONFIG;
