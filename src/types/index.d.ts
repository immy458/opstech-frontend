interface APIResult {
  ok: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  error: string
}

interface ReduxAction<T> {
  type: string
  payload?: T
}

interface RootState {
  dishFilters: DishFilter
}
