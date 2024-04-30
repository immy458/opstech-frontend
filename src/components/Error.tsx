import { Result } from 'antd'
import E404 from '../assets/404.svg'
import { useNavigate } from 'react-router-dom'

function Error() {
  const navigate = useNavigate()

  return (
    <div className='flex justify-center'>
      <Result
        className='my-3'
        subTitle="You're either misspelling the URL
        or requesting a page that's no longer here."
        icon={<object data={E404} />}
        extra={
          <button
            onClick={() => navigate('/')}
            className='p-3 border-b rounded-xl bg-primaryMedium duration-300 cursor-pointer border-gray-600 text-left'
          >
            Back Home
          </button>
        }
      />
    </div>
  )
}

export default Error
