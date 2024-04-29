import { useEffect, useState } from 'react'
import { DishService } from '../../services/dishServices'
import { AxiosError } from 'axios'
import { Select, Skeleton, Tag, notification } from 'antd'
import { DISH_CATEGORIES, DISH_CUISINE, DISH_TYPES } from '../../constants'
import { AiFillFilter } from 'react-icons/ai'
import { CartService } from '../../services/cartService'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedDishFilter } from '../../store/actions/dishActions'

const Dishes = () => {
  const [api, contextHolder] = notification.useNotification()
  const dispatch = useDispatch()

  const [dishes, setDishes] = useState<Dish[]>([])
  const dishFilter = useSelector((state: RootState) => state.dishFilters)
  const [loading, setLoading] = useState<boolean>(false)

  const resetFilter = () => {
    dispatch(
      setSelectedDishFilter({
        type: '',
        cuisine: '',
        category: '',
      })
    )
  }

  const getDishes = async () => {
    try {
      setLoading(true)
      const response = await DishService.getDishes(dishFilter)
      setDishes(response.data as Dish[])
    } catch (error) {
      console.error('Error fetching dishes:', error)
      const axiosError = error as AxiosError
      api.error({
        message: 'Forgot Password',
        description: (axiosError.response?.data as APIResult).error || axiosError.message,
        duration: 60,
      })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      void getDishes()
    }, 2000)
  }, [dishFilter])

  const addToCart = async (dishId: string, dishName: string) => {
    try {
      await CartService.addCartItem(dishId)
      api.success({
        message: 'Added to cart',
        description: `${dishName} successfully added to cart`,
        duration: 3,
      })
    } catch (error) {
      console.error('Error fetching dishes:', error)
      const axiosError = error as AxiosError
      api.error({
        message: 'Forgot Password',
        description: (axiosError.response?.data as APIResult).error || axiosError.message,
        duration: 60,
      })
    }
  }

  return (
    <>
      {contextHolder}
      <div className='md:p-16 p-4'>
        <div className='rounded-lg shadow-lg  p-4'>
          <div className='flex items-start justify-between'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-primaryMedium md:text-2xl'>
              Filters <AiFillFilter className='inline-block mb-2' />
            </h1>
            <button
              className='text-primaryDark bg-primaryMedium hover:text-primaryLight hover:bg-primaryDark  rounded-lg text-sm px-2 py-1'
              onClick={resetFilter}
            >
              <span>Clear Filters</span>
            </button>
          </div>
          <div className='flex flex-wrap justify-between gap-4 mt-4'>
            <div className='flex items-center gap-x-4'>
              <p className='font-bold'>Type: </p>
              <Select
                style={{ width: 150 }}
                placeholder='Select Type'
                options={DISH_TYPES.map((dish) => ({ value: dish, label: dish }))}
                disabled={loading}
                value={dishFilter.type === '' ? undefined : dishFilter.type}
                onChange={(value) =>
                  dispatch(setSelectedDishFilter({ ...dishFilter, type: value }))
                }
              />
            </div>
            <div className='flex items-center gap-x-4'>
              <p className='font-bold'>Cuisine: </p>
              <Select
                style={{ width: 150 }}
                placeholder='Select Type'
                options={DISH_CUISINE.map((cuisine) => ({ value: cuisine, label: cuisine }))}
                disabled={loading}
                value={dishFilter.cuisine === '' ? undefined : dishFilter.cuisine}
                onChange={(value) =>
                  dispatch(setSelectedDishFilter({ ...dishFilter, cuisine: value }))
                }
              />
            </div>
            <div className='flex items-center gap-x-4'>
              <p className='font-bold'>Cartegory: </p>
              <Select
                style={{ width: 150 }}
                placeholder='Select Type'
                options={DISH_CATEGORIES.map((category) => ({ value: category, label: category }))}
                disabled={loading}
                value={dishFilter.category === '' ? undefined : dishFilter.category}
                onChange={(value) =>
                  dispatch(setSelectedDishFilter({ ...dishFilter, category: value }))
                }
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className='flex flex-wrap gap-10 w-full pt-10'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='w-[500px] md:w-[350px] md:h-[auto] lg:w-[500px] lg:h-[290px]  rounded-lg shadow-lg flex flex-col gap-y-5  pb-7 bg-gray-100'
              >
                <div className='flex flex-col gap-y-5  px-10 pt-3 pb-7 hover:bg-gray-100 '>
                  <div className='flex items-center justify-between'>
                    <Skeleton.Button active={loading} size={'small'} shape='square' />
                    <Skeleton.Button active={loading} size={'small'} shape='square' />
                  </div>
                  <Skeleton.Input active={loading} size={'large'} />
                  <Skeleton.Input active={loading} size={'small'} />
                  <Skeleton.Input active={loading} size={'small'} />
                  <div className='flex items-center justify-between'>
                    <Skeleton.Button active={loading} size={'large'} shape='square' />
                    <Skeleton.Button active={loading} size={'large'} shape='square' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-wrap gap-10 py-10'>
            {dishes.length === 0 ? (
              <p className='text-gray-700'>No dishes to display</p>
            ) : (
              dishes.map((dish) => (
                <div
                  key={dish._id}
                  className='w-[500px] md:w-[350px] md:h-[auto] lg:w-[500px] lg:h-[290px]  rounded-lg shadow-lg'
                >
                  <div className='flex flex-col gap-y-5  px-10 pt-3 pb-7 hover:bg-gray-100 '>
                    <div className='flex items-center justify-between'>
                      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
                        {dish.name}
                      </h5>
                      <Tag color={dish.type === 'Veg' ? 'green' : 'red'} className='text-sm'>
                        {dish.type}
                      </Tag>
                    </div>
                    <p className='font-normal text-gray-700 '>{dish.description}</p>
                    <p className='text-gray-700'>
                      Category: <span className='font-bold italic'>{dish.category}</span>
                    </p>
                    <p className='text-gray-700'>
                      Cuisine: <span className='font-bold italic'>{dish.cuisine}</span>
                    </p>
                    <div className='flex items-center justify-between'>
                      <span className='text-3xl font-bold text-gray-900 '>₹{dish.price}</span>
                      <button
                        className='text-primaryDark bg-primaryMedium hover:text-primaryLight hover:bg-primaryDark  rounded-lg text-sm px-3 py-2'
                        onClick={() => addToCart(dish._id ?? '', dish.name)}
                      >
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Dishes
