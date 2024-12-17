export interface AdminComponent {
  id: number;
  name: string;
}

export interface AdminConfig {
  page: number;
  componentId: number;
}

export interface AdminData {
  components: AdminComponent[],
  configs: AdminConfig[],
}
