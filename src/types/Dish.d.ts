interface DishFilter {
  type: string
  cuisine: string
  category: string
}

interface Dish {
  _id?: string
  name: string
  description: string
  price: number
  cuisine:
    | 'Indian'
    | 'Chinese'
    | 'Italian'
    | 'Mexican'
    | 'Japanese'
    | 'Thai'
    | 'Mediterranean'
    | 'Other'
  category: 'Main Course' | 'Dessert' | 'Drinks' | 'Other'
  type: 'Veg' | 'Non-veg'
}
