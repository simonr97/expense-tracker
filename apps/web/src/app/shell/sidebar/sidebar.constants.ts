import { lucideDynamicIconImports } from "@lucide/icons/dynamic";

interface SidebarOption {
  id: number;
  label: string;
  route: string;
  icon: keyof typeof lucideDynamicIconImports;
}

export const sidebarOptions = {
  OVERVIEW: {
    id: 1,
    label: 'Overview',
    route: '',
    icon: 'house-heart'
  },
  EXPENSES: {
    id: 2,
    label: 'Expenses',
    route: '',
    icon: 'table-properties'
  },
  BUDGETS: {
    id: 3,
    label: 'Budgets',
    route: '',
    icon: 'calculator'
  },
  CATEGORIES: {
    id: 4,
    label: 'Categories',
    route: '',
    icon: 'tag'
  },
  REPORTS: {
    id: 5,
    label: 'Reports',
    route: '',
    icon: 'chart-no-axes-column'
  },
  SETTINGS: {
    id: 6,
    label: 'Settings',
    route: '',
    icon: 'settings'
  }
} satisfies Record<string,SidebarOption>;

export const sidebarOptionsFormatted = Object.values(sidebarOptions)
