import { useState } from 'react';
import { motion,useReducedMotion } from 'framer-motion';
import { Maximize2,LocateFixed } from 'lucide-react';
import { mediaUrl } from '../context/PageContext';

export function verifiedLocations(bead,image) {
  return (bead.locations||[]).filter(p=>p.verified&&p.image===image&&Number.isFinite(p.x)&&Number.isFinite(p.y));
}

export function MalaLocator({image,bead,label,fullLabel,note}) {
  const [ratio,setRatio]=useState(408/612);const [full,setFull]=useState(false);const [previous,setPrevious]=useState(bead.id);
  if(previous!==bead.id){setPrevious(bead.id);setFull(false);}
  const locations=verifiedLocations(bead,image);const first=locations[0];const reduced=useReducedMotion();
  const zoom=first&&!full?1.75:1;
  return <div className="mala-locator" data-testid="mala-locator"><div className="locator-topline"><span className="small-index">THE COMPLETE SIDDHA MALA</span><button className="locator-reset" onClick={()=>setFull(!full)} data-testid="locator-reset" disabled={!first} aria-pressed={full}>{full?<LocateFixed size={14}/>:<Maximize2 size={14}/>} {full?label:fullLabel}</button></div><div className="locator-viewport"><div className="locator-photo-box" style={{aspectRatio:ratio}}><motion.div className="locator-photo-stage" data-testid="locator-stage" data-zoom={zoom} animate={{scale:zoom,x:first&&!full?`${(50-first.x)*(zoom-1)}%`:'0%',y:first&&!full?`${(50-first.y)*(zoom-1)}%`:'0%'}} transition={{duration:reduced?0:.8,ease:[.22,1,.36,1]}}><img src={mediaUrl(image)} alt="Full Siddha Mala, bead placement view" onLoad={e=>setRatio(e.currentTarget.naturalWidth/e.currentTarget.naturalHeight)} data-testid="locator-mala-image"/>{locations.map((point,i)=><span key={point.id} className="locator-point" style={{left:`${point.x}%`,top:`${point.y}%`,'--locator-scale':1/zoom}} data-testid={`locator-marker-${bead.id}-${i}`} aria-label={`${bead.name}, verified location ${i+1}`}><span>{bead.id}</span></span>)}</motion.div></div></div><div className="locator-caption" data-testid="locator-placement-status">{first?<><LocateFixed size={14}/><span>{bead.name} · {locations.length===1?'1 verified location':`${locations.length} verified locations`}</span></>:<span>{note}</span>}</div></div>;
}