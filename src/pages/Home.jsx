import Teacher from '../components/addTeacher'
import Student from '../components/addStudent'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Home = () => {
  const role = 'ADMIN'
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!token) navigate('/login')
  // }, [token])
  return <>{ <Teacher />}</>
}

export default Home
