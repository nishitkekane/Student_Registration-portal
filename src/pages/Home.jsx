import Teacher from '../components/addTeacher'
import Student from '../components/addStudent'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Home = () => {
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token])
  return <>{token && (role === 'ADMIN' ? <Teacher /> : <Student />)}</>
}

export default Home
