export interface AdminComponent {
  id: number;
  name: string;
}

export interface AdminConfig {
  page: number;
  componentId: number;
}

export interface Config extends AdminConfig {
  component: {
    name: string;
  }
}

export interface AdminData {
  components: AdminComponent[],
  configs: AdminConfig[],
}
