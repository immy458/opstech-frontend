import { FormEvent, useState } from 'react'
import { initialDishState } from '../../constants/initialStates'
import { Select, notification } from 'antd'
import { DISH_CATEGORIES, DISH_CUISINE, DISH_TYPES } from '../../constants'
import { DishService } from '../../services/dishServices'
import { AxiosError } from 'axios'
import Spinner from '../../components/Spinner'

const AddDish = () => {
  const [api, contextHolder] = notification.useNotification()

  const [dish, setDish] = useState<Dish>(initialDishState)
  const [loading, setLoading] = useState<boolean>(false)

  const addDish = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      validateInputFields(dish.price, 'Price')
      validateInputFields(dish.type, 'Type')
      validateInputFields(dish.category, 'Category')
      validateInputFields(dish.cuisine, 'Cuisine')

      await DishService.addDish(dish)
      setDish(initialDishState)
      api.success({
        message: 'Added Dish',
        description: 'Dish added successfully',
        duration: 30,
      })
    } catch (error) {
      console.error('Error adding dish:', error)
      const axiosError = error as AxiosError
      api.error({
        message: 'Error',
        description: (axiosError.response?.data as APIResult)?.error || axiosError.message,
        duration: 30,
      })
    } finally {
      setLoading(false)
    }
  }

  const validateInputFields = (inputField: string | undefined | number, label: string) => {
    if (!inputField) {
      throw new Error(`${label} is required`)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full p-8'>
      {contextHolder}
      <form
        className='space-y-4 md:space-y-6 w-full max-w-md  rounded-lg shadow p-8'
        onSubmit={(e) => addDish(e)}
      >
        <h1 className='text-xl font-bold leading-tight tracking-tight text-primaryMedium md:text-2xl'>
          Add Dish
        </h1>
        <fieldset className='space-y-4 md:space-y-6'>
          <div>
            <label htmlFor='dishName' className='block mb-2 text-sm font-medium text-gray-900'>
              Dish Name
            </label>
            <input
              name='dishName'
              id='dishName'
              placeholder='Enter Dish Name'
              className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
              required={true}
              value={dish.name}
              onChange={(e) => setDish((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor='description' className='block mb-2 text-sm font-medium text-gray-900'>
              Description
            </label>
            <textarea
              name='description'
              rows={3}
              id='description'
              placeholder='Enter Description'
              className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
              required={true}
              value={dish.description}
              onChange={(e) => setDish((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-900'>
              Price
            </label>
            <input
              type='number'
              name='price'
              id='price'
              placeholder='Enter price'
              className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
              required={true}
              value={dish.price}
              onChange={(e) => setDish((prev) => ({ ...prev, price: Number(e.target.value) }))}
            />
          </div>
          <div className='flex items-center gap-x-4'>
            <p className='font-bold'>Type: </p>
            <Select
              style={{ width: 150 }}
              placeholder='Select Type'
              options={DISH_TYPES.map((dish) => ({ value: dish, label: dish }))}
              value={dish.type}
              onChange={(value) => setDish((prev) => ({ ...prev, type: value }))}
            />
          </div>
          <div className='flex items-center gap-x-4'>
            <p className='font-bold'>Cuisine: </p>
            <Select
              style={{ width: 150 }}
              placeholder='Select Type'
              options={DISH_CUISINE.map((cuisine) => ({ value: cuisine, label: cuisine }))}
              value={dish.cuisine}
              onChange={(value) => setDish((prev) => ({ ...prev, cuisine: value }))}
            />
          </div>
          <div className='flex items-center gap-x-4'>
            <p className='font-bold'>Cartegory: </p>
            <Select
              style={{ width: 150 }}
              placeholder='Select Type'
              options={DISH_CATEGORIES.map((category) => ({ value: category, label: category }))}
              value={dish.category}
              onChange={(value) => setDish((prev) => ({ ...prev, category: value }))}
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='p-3 border-b rounded-xl bg-primaryMedium duration-300 cursor-pointer border-gray-600 text-left'
            >
              Add Dish {loading && <Spinner size='md' className='ml-2' />}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default AddDish
