export const initialUserState: User = {
  username: '',
  email: '',
  role: '',
  _id: '',
  firstName: '',
  lastName: '',
  password: '',
}

export const initalCartItemsState: CartItem[] = []

export const initialDishFilterState: DishFilter = {
  type: '',
  cuisine: '',
  category: '',
}
export const initialDishState: Dish = {
  name: '',
  description: '',
  price: 0,
  cuisine: undefined,
  category: undefined,
  type: undefined,
}
