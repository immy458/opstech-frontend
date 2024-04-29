interface CartItem {
  dish: Dish | string
  quantity: number
  _id: string
}

interface Cart {
  _id: string
  user: string
  items: CartItem[]
}
