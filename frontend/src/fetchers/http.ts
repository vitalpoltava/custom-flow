import {API_BASE_URL} from "./config";
import {AdminConfig, AdminData} from "../types";

export const getAdminData = (): Promise<AdminData> => fetch(`${API_BASE_URL}/admin`).then((res) => res.json());
export const saveConfigs = (configs: AdminConfig[]) => fetch(`${API_BASE_URL}/admin/configs`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({configs})
}).then((res) => res.json());
