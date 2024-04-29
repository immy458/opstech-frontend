import { useEffect, useState } from 'react'
import { DishService } from '../../services/dishServices'
import { AxiosError } from 'axios'
import { Skeleton, Tag, notification } from 'antd'

const Dishes = () => {
  const [api, contextHolder] = notification.useNotification()

  const [dishes, setDishes] = useState<Dish[]>([])
  const [dishFilter, setDishFilter] = useState<DishFilter>({})
  const [loading, setLoading] = useState<boolean>(false)

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
  }, [])

  return (
    <>
      {contextHolder}
      <div className='md:p-16 p-4'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-primaryMedium md:text-2xl'>
          All Dishes
        </h1>
        <div className='flex flex-wrap gap-10 py-10'>
          {dishes.map((dish) => (
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
                  <button className='text-primaryDark bg-primaryMedium hover:text-primaryLight hover:bg-primaryDark  rounded-lg text-sm px-3 py-2'>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <div className='flex flex-wrap gap-10 w-full'>
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
        )}
      </div>
    </>
  )
}

export default Dishes
