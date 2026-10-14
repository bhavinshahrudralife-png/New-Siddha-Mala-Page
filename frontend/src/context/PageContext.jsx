import { createContext, useContext, useEffect, useState } from 'react';
import { fetchPage, fetchContent } from '../lib/api';
import { DEFAULT_PAGE, mergePage } from '../data/pageDefaults';

const PageContext = createContext(DEFAULT_PAGE);
export const usePage = () => useContext(PageContext);
export function PageProvider({ children }) {
  const [page, setPage] = useState(DEFAULT_PAGE);
  useEffect(() => {
    let live = true;
    const load = () => Promise.all([fetchPage(), fetchContent()]).then(([p,c]) => { if (live) setPage(mergePage(p.data.page, c.data)); }).catch(() => {});
    load(); window.addEventListener('focus', load);
    return () => { live = false; window.removeEventListener('focus', load); };
  }, []);
  return <PageContext.Provider value={page}>{children}</PageContext.Provider>;
}

export function mediaUrl(url) {
  return url?.startsWith('/api/') ? `${process.env.REACT_APP_BACKEND_URL}${url}` : url;
}