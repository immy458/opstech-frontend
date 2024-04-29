import { useEffect, useMemo, useState } from 'react'
import { AiFillMinusCircle, AiFillShopping, AiFillCloseCircle } from 'react-icons/ai'
import { initalCartItemsState } from '../../constants/initialStates'
import { CartService } from '../../services/cartService'
import { AxiosError } from 'axios'
import { notification } from 'antd'
import { AiFillPlusCircle } from 'react-icons/ai'

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initalCartItemsState)

  const getTotalValue = useMemo(() => {
    return cartItems.reduce((acc, cur) => {
      return acc + cur.quantity * (cur.dish as Dish).price
    }, 0)
  }, [cartItems])

  const [api, contextHolder] = notification.useNotification()

  const getCartItems = async () => {
    try {
      const response = await CartService.getCartItems()
      console.log(response.data)
      setCartItems((response.data as Cart).items)
    } catch (error) {
      const axiosError = error as AxiosError
      api.error({
        message: 'Forgot Password',
        description: (axiosError.response?.data as APIResult).error || axiosError.message,
        duration: 60,
      })
    }
  }

  const incrementQty = async (dishId: string, dishName: string) => {
    try {
      await CartService.addCartItem(dishId)
      const response = await CartService.getCartItems()
      setCartItems((response.data as Cart).items)

      api.success({
        message: 'Quantity Incremented',
        description: `${dishName} qty has been incremented`,
        duration: 3,
      })
    } catch (error) {
      console.error('Error incrementing quantity:', error)
      const axiosError = error as AxiosError
      api.error({
        message: 'Forgot Password',
        description: (axiosError.response?.data as APIResult).error || axiosError.message,
        duration: 60,
      })
    }
  }
  const decrementQty = async (dishId: string, dishName: string) => {
    try {
      await CartService.decrementCartQty(dishId)
      const response = await CartService.getCartItems()
      setCartItems((response.data as Cart).items)

      api.success({
        message: 'Quantity Decremented',
        description: `${dishName} qty has been decremented`,
        duration: 3,
      })
    } catch (error) {
      console.error('Error decrementing quantity:', error)
      const axiosError = error as AxiosError
      api.error({
        message: 'Forgot Password',
        description: (axiosError.response?.data as APIResult).error || axiosError.message,
        duration: 60,
      })
    }
  }
  const removeItemFromCart = async (dishId: string, dishName: string) => {
    try {
      await CartService.removeItemFromCart(dishId)
      const response = await CartService.getCartItems()
      setCartItems((response.data as Cart).items)

      api.success({
        message: 'Dish Removed',
        description: `${dishName} has been removed from cart`,
        duration: 3,
      })
    } catch (error) {
      console.error('Error removing dish:', error)
      const axiosError = error as AxiosError
      api.error({
        message: 'Forgot Password',
        description: (axiosError.response?.data as APIResult).error || axiosError.message,
        duration: 60,
      })
    }
  }

  useEffect(() => {
    void getCartItems()
  }, [])

  return (
    <div className='w-full h-[85vh] flex flex-col items-center justify-center'>
      {contextHolder}
      <div className='w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 '>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-primaryMedium md:text-2xl'>
            Cart <AiFillShopping className='inline-block mb-2' />
          </h1>{' '}
          <p className='font-semibold'>Total: ₹{getTotalValue}</p>
        </div>
        <div className='flow-root'>
          {cartItems.length ? (
            <>
              <ul role='list' className='divide-y divide-gray-200'>
                {cartItems.map((cartItem) => (
                  <>
                    <li className='py-3 sm:py-4'>
                      <div className='flex items-center'>
                        <div className='flex-1 min-w-0 ms-4'>
                          <p className='text-base font-medium text-gray-900 truncate '>
                            {(cartItem.dish as Dish).name}
                          </p>
                          <div className='text-base text-gray-500 truncate flex items-center gap-x-2 mt-2'>
                            <span>Qty:</span>
                            <AiFillMinusCircle
                              className='text-3xl text-primaryMedium hover:text-primaryDark hover:cursor-pointer'
                              onClick={() =>
                                decrementQty(
                                  (cartItem.dish as Dish)._id ?? '',
                                  (cartItem.dish as Dish).name
                                )
                              }
                            />
                            <span className='font-bold text-lg'>{cartItem.quantity}</span>
                            <AiFillPlusCircle
                              className='text-3xl text-primaryMedium hover:text-primaryDark hover:cursor-pointer'
                              onClick={() =>
                                incrementQty(
                                  (cartItem.dish as Dish)._id ?? '',
                                  (cartItem.dish as Dish).name
                                )
                              }
                            />
                          </div>
                        </div>
                        <p className='inline-flex items-center text-lg font-semibold'>
                          ₹ {cartItem.quantity * (cartItem.dish as Dish).price}
                        </p>

                        <p className='inline-flex items-center text-lg font-semibold'>
                          <AiFillCloseCircle
                            className='text-3xl  hover:cursor-pointer ml-2'
                            style={{ color: 'red' }}
                            onClick={() =>
                              removeItemFromCart(
                                (cartItem.dish as Dish)._id ?? '',
                                (cartItem.dish as Dish).name
                              )
                            }
                          />
                        </p>
                      </div>
                    </li>
                  </>
                ))}
              </ul>
            </>
          ) : (
            <p>No Items in cart</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
