import { useNavigate } from 'react-router-dom'
import Course from '../components/addCourse'
import { useEffect } from 'react'
function Courses() {
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token])

  return <>{token && role === 'TEACHER' ? <Course /> : null}</>
}

export default Courses
