export interface Car {
  mark_id: string;
  folder_id: string;
  modification_id: string;
  complectation_name: string;
  body_type: string;
  price: number;
  image: string;
}

export interface CarsResponse {
  data: Car[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export type SortOrder = 'asc' | 'desc' | null; 