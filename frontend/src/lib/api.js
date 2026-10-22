import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const client = axios.create({ baseURL: API, withCredentials: true });

export const submitEnquiry = (data) => client.post("/enquiries", data);
export const fetchContent = () => client.get("/content");
export const login = (email, password) => client.post("/auth/login", { email, password });
export const fetchMe = () => client.get("/auth/me");
export const logout = () => client.post("/auth/logout");
export const fetchLeads = () => client.get("/admin/leads");
export const deleteLead = (id) => client.delete(`/admin/leads/${id}`);
export const updateContent = (data) => client.put("/admin/content", data);
export const fetchPage = () => client.get('/page-content');
export const savePage = (page, revision) => client.put('/admin/page-content', { page, revision });
export const updateLead = (id, data) => client.patch(`/admin/leads/${id}`, data);
export const fetchMedia = () => client.get('/admin/media');
export const deleteMedia = (id) => client.delete(`/admin/media/${id}`);
export const uploadMedia = (file) => { const data = new FormData(); data.append('file', file); return client.post('/admin/media', data, { headers:{'Content-Type':undefined} }); };
export const fetchLeadPage = (params) => client.get('/admin/leads/page', { params });
export const exportLeads = (params) => client.get('/admin/leads/export', { params, responseType:'blob' });
export const exportLeadsExcel = (params) => client.get('/admin/leads/export.xlsx', { params, responseType:'blob' });

export function formatApiError(err) {
  const detail = err?.response?.data?.detail;
  if (detail == null) return err?.message || "Something went wrong.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  return String(detail);
}
