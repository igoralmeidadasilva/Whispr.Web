export interface PagedModel<T> {
  items: T[];
  totalCount: number;
  next: string | null;
  previous: string | null;
}