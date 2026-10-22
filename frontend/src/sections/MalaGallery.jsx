import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { usePage } from '../context/PageContext';
import { ProductImage, Reveal, SectionHeading } from '../components/Editorial';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog';
export default function MalaGallery() {
  const {gallery:s} = usePage(); const [selected,setSelected] = useState(null);
  return <section id="collection" className="gallery-section section-space" data-testid="gallery-section"><div className="site-container"><SectionHeading section={s} id="gallery"/><div className="mala-gallery-grid">{s.items.map((item,i)=><Reveal className="mala-gallery-item" key={item.id} delay={i*.09}><button className="gallery-image-button" data-testid={`gallery-image-${item.id}`} onClick={()=>setSelected(item)} aria-label={`View ${item.title}`}><ProductImage src={item.image} alt={item.alt} loading="lazy"/><Maximize2 size={16}/></button><span className="small-index">0{i+1}</span><h3>{item.title}</h3><p>{item.caption}</p></Reveal>)}</div></div><Dialog open={!!selected} onOpenChange={value=>{if(!value)setSelected(null);}}><DialogContent className="gallery-dialog" data-testid="gallery-lightbox" data-lenis-prevent><DialogTitle>{selected?.title}</DialogTitle><DialogDescription>{selected?.caption}</DialogDescription>{selected && <ProductImage src={selected.image} alt={selected.alt}/>}</DialogContent></Dialog></section>;
}
