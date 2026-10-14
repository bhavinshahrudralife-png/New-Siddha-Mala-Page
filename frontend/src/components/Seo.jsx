import { useEffect } from 'react';
import { usePage, mediaUrl } from '../context/PageContext';

export function Seo() {
  const page = usePage();
  useEffect(() => {
    document.title = page.seo.title;
    const origin = process.env.REACT_APP_BACKEND_URL.replace(/\/$/,'');
    const canonical = `${origin}/siddha-mala.html`;
    const meta = (name,value,property=false) => {
      const attr = property ? 'property' : 'name'; let el = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr,name); document.head.appendChild(el); }
      el.content = value;
    };
    meta('description',page.seo.description); meta('og:title',page.seo.title,true); meta('og:description',page.seo.description,true);
    meta('og:type','website',true); meta('og:url',canonical,true); meta('og:image',new URL(mediaUrl(page.seo.image),origin).href,true);
    let link = document.head.querySelector('link[rel="canonical"]'); if (!link) { link = document.createElement('link'); link.rel='canonical'; document.head.appendChild(link); } link.href = canonical;
    let schema = document.getElementById('rudralife-schema'); if (!schema) { schema=document.createElement('script'); schema.id='rudralife-schema'; schema.type='application/ld+json'; document.head.appendChild(schema); }
    schema.textContent=JSON.stringify({ '@context':'https://schema.org', '@type':'WebPage', name:page.seo.title, description:page.seo.description, url:canonical, about:{ '@type':'Thing', name:page.hero.title } });
    return () => schema.remove();
  },[page]);
  return null;
}