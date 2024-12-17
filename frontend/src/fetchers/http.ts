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

export const login = (credentials: {email: string, password: string}) => fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...credentials})
  }).then((res) => res.json());

export const saveMyData = (data: any) => fetch(`${API_BASE_URL}/data`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({data})
}).then((res) => res.json());
