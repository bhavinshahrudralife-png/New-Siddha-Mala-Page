import { useCallback,useEffect,useReducer,useState } from 'react';
import { useInView,useReducedMotion } from 'framer-motion';

const initial={index:0,paused:false,hovered:false,focusTarget:null,playOwner:null};
function sequenceReducer(state,action) {
  switch(action.type) {
    case 'select': return {...state,index:action.index,paused:true,playOwner:null};
    case 'follow': return {...state,index:action.index};
    case 'advance': return {...state,index:(state.index+1)%action.count};
    case 'toggle': return {...state,paused:!state.paused,playOwner:state.paused?action.target:null};
    case 'hover': return {...state,hovered:action.value};
    case 'focus': return {...state,focusTarget:action.target};
    default:return state;
  }
}

// An explicit Play owns ONLY that button's focus. Any other focused control pauses.
// Mouse hover always pauses; touch never creates sticky hover. No page auto-scrolling.
export function useVisibleSequence(ref,count,seconds,enabled) {
  const visible=useInView(ref,{amount:.4});const reduced=useReducedMotion();
  const [state,dispatch]=useReducer(sequenceReducer,initial);
  const [hidden,setHidden]=useState(document.hidden);
  useEffect(()=>{const fn=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',fn);return()=>document.removeEventListener('visibilitychange',fn);},[]);
  const focusBlocked=state.focusTarget&&state.focusTarget!==state.playOwner;
  const reason=!enabled?'disabled':reduced?'reduced-motion':state.paused?'manual':hidden?'hidden':!visible?'offscreen':state.hovered?'hover':focusBlocked?'focus':count<2?'single-item':'playing';
  const playing=reason==='playing';
  useEffect(()=>{
    if(!playing)return;
    const timer=setInterval(()=>dispatch({type:'advance',count}),Math.max(3,seconds)*1000);
    return()=>clearInterval(timer);
  },[playing,count,seconds,state.index]);
  const select=useCallback(i=>dispatch({type:'select',index:(i+count)%count}),[count]);
  const events={
    onPointerEnter:e=>{if(e.pointerType==='mouse')dispatch({type:'hover',value:true});},
    onPointerLeave:()=>dispatch({type:'hover',value:false}),
    onFocusCapture:e=>dispatch({type:'focus',target:e.target}),
    onBlurCapture:e=>{if(!e.currentTarget.contains(e.relatedTarget))dispatch({type:'focus',target:null});},
  };
  return {index:Math.min(state.index,Math.max(0,count-1)),select,follow:i=>dispatch({type:'follow',index:i}),playing,paused:state.paused,reduced,reason,
    toggle:e=>dispatch({type:'toggle',target:e.currentTarget}),events};
}