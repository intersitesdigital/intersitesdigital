import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title} | Intersites Digital</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}