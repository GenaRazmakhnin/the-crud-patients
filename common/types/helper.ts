export interface Pagination {
  page:  number,
  limit: number,
  total?: number,
  search?: string
}

export interface ServerException {
  message: string,
  validation?: { name: string, message: string } 
}