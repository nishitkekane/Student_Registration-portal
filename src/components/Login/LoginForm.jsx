'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'

import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import './LoginForm.css'
import { useNavigate } from 'react-router-dom'

// Zod Schema.
const formSchema = z.object({
  email: z.string().email('This is not a valid email.'),
  password: z.string(),
})

export function LoginForm() {
  const navigate = useNavigate()

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // const [
  //   onSubmit,
  //   {
  //     data: userData,
  //     isLoading: isUserLoading,
  //     isError: isUserError,
  //     refetch: userRefetch,
  //   },
  // ] = useLazyQuery({
  //   queryKey: ['random-user'],
  //   queryFn: () => {
  //     return axios
  //       .get('https://randomuser.me/api/')
  //       .then((res) => res.data.results[0])
  //   },
  // })

  // 2. Define a submit handler.
  async function onSubmit(values, e) {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/authenticate',
        {
          email: values.email,
          password: values.password,
        }
      )

      localStorage.setItem('role', response.data.role)
      localStorage.setItem('token', response.data.access_token)
      navigate('/')
    } catch (error) {
      console.error('Login Failed:', error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center flex-col rounded px-2 py-4 shadow-[#d5df47] shadow-lg dark:text-black"
      >
        {/* Top Heading! */}
        <div className="px-2 py-2 mb-8 text-3xl font-bold">
          Login To Learn! 📚
        </div>

        {/* Username! */}
        <div className="w-2/3 mb-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-bold text-lg mr-96">
                  Email:
                </FormLabel>
                <FormControl>
                  <Input {...field} className="shadow-md shadow-yellow-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Password! */}
        <div className="w-2/3 mb-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-bold text-lg mr-96">
                  Password:
                </FormLabel>
                <FormControl>
                  <Input {...field} className="shadow-md shadow-yellow-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button! */}
        <div>
          <Button
            type="submit"
            className="mt-2 px-6 py-3 bg-green-600 dark:bg-purple-600 dark:hover:border-2 dark:hover:border-purple-900 dark:hover:text-purple-800 dark:hover:bg-white hover:bg-white hover:border-2 hover:border-green-500 hover:text-black"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
