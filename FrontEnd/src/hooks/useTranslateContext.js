import { useContext } from 'react'
import { ApiContext } from '../context/ApiContext'

const useTranslateContext = () => {
  return useContext(ApiContext)
}

export default useTranslateContext
