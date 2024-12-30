export interface Pagination<T> {
  meta: {
    total: number
    limit: number
  }
  results: T
}
