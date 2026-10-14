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

export function formatApiError(err) {
  const detail = err?.response?.data?.detail;
  if (detail == null) return err?.message || "Something went wrong.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  return String(detail);
}
