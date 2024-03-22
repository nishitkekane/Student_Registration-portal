import React, { useReducer, useState } from 'react'
import Task from '../components/Task/Task'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// Define action types!
const actionTypes = {
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  TOGGLE_CHECKBOX: 'TOGGLE_CHECKBOX',
}

// Reducer function!
const todoListReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return [...state, action.payload]

    case actionTypes.DELETE_TASK:
      return state.filter((task) => task.id !== action.payload)

    case actionTypes.EDIT_TASK:
      return state.map((task) =>
        task.id === action.payload.id
          ? // Modify the state.
            { ...task, taskName: action.payload.taskName }
          : task
      )

    case actionTypes.TOGGLE_CHECKBOX:
      return state.map((task) =>
        task.id === action.payload ? { ...task, checked: !task.checked } : task
      )

    default:
      return state
  }
}

function TaskPage() {
  // Initialize state using useReducer!
  const [todoList, dispatch] = useReducer(todoListReducer, [])
  const [newTask, setNewTask] = useState('')

  // React handle change!
  const handleChange = (event) => {
    setNewTask(event.target.value)
  }

  // Adding the Task!
  const addTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      checked: false,
    }
    dispatch({ type: actionTypes.ADD_TASK, payload: task })
    setNewTask('')
  }

  return (
    <div className="flex mt-4 max-lg:flex-col">
      {/* Form Of Task! */}
      <div className="flex flex-col gap-2 px-4 py-6 w-1/3 h-auto max-lg:w-full rounded-lg border-2 border-green-400 dark:border-purple-500">
        <div className="text-md mr-60">Add Tasks:</div>
        {/* Input And Button! */}
        <div>
          <Input onChange={handleChange} value={newTask} className="border-2" />
          <Button
            variant="outline"
            onClick={addTask}
            className="mt-3 border-green-300 hover:bg-green-700 hover:text-white dark:hover:bg-purple-600 dark:border-purple-600"
          >
            Add task
          </Button>
        </div>
      </div>

      {/* List of Tasks */}
      <div className="flex flex-col w-2/3 ml-12 px-4 py-4 border-2 border-blue-600 rounded-lg max-lg:ml-0 max-lg:mt-10">
        {todoList.map((task, key) => {
          return (
            <React.Fragment key={key}>
              <Task
                key={task.id}
                taskName={task.taskName}
                id={task.id}
                checked={task.checked}
                dispatch={dispatch}
              />
              <Separator key={key} className="mb-2" />
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default TaskPage
