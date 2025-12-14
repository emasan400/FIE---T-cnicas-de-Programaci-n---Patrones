
export enum ModuleType {
  DATA_ENTRY = 'DATA_ENTRY',
  NAVIGATION = 'NAVIGATION',
  INFO_MGMT = 'INFO_MGMT',
  REAL_WORLD = 'REAL_WORLD'
}

export interface Student {
  id: string;
  name: string;
  major: string;
  gpa: number;
  status: 'Active' | 'Graduated' | 'On Leave';
}

export interface NotificationItem {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface WizardData {
  step: number;
  name: string;
  email: string;
  preferences: string;
}

export interface DragItem {
  id: string;
  content: string;
  listId: 'todo' | 'done';
}
