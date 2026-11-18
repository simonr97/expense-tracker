// ---------------------- FORM Inteface ----------------------
export interface CategoryForm {
  name: string;
  icon: string;
  color: string;
}
// ---------------------- FORM Inteface ----------------------

// Look used when there is no category (or none picked yet): avatar fallback and create-panel preview.
export const defaultCategoryLook = {
  color: '#768bad',
  icon: 'receipt-text',
};

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
