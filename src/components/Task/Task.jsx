import React, { useState, useRef } from 'react'
import { Button } from '../ui/button'
import { Pen, X } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'

// Define action types
const actionTypes = {
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_CHECKBOX: 'TOGGLE_CHECKBOX',
  EDIT_TASK: 'EDIT_TASK',
}

const Task = (props) => {
  // Edit Mode to have Input Like Feature!
  const [editMode, setEditMode] = useState(false)
  const [editedTaskName, setEditedTaskName] = useState(props.taskName)

  // Dispatch action to delete task!
  const deleteTaskHandler = () => {
    props.dispatch({ type: actionTypes.DELETE_TASK, payload: props.id })
  }

  // Dispatch action to toggle checkbox!
  const toggleCheckboxHandler = () => {
    props.dispatch({ type: actionTypes.TOGGLE_CHECKBOX, payload: props.id })
  }

  // Dispatch action to save the task!
  const saveEdit = () => {
    props.dispatch({
      type: actionTypes.EDIT_TASK,
      payload: { id: props.id, taskName: editedTaskName },
    })
    setEditMode(false)
  }

  // Cancel editing task!
  const cancelEdit = () => {
    setEditedTaskName(props.taskName)
    setEditMode(false)
  }

  return (
    <div className="flex flex-row gap-2 mb-2 justify-between items-end">
      {/* Heading And CheckBox! */}
      <div className="flex gap-2 items-center justify-center">
        {/* Checkbox! */}
        <Checkbox checked={props.checked} onClick={toggleCheckboxHandler} />

        {/* Showing input when edit else taskName! */}
        {editMode ? (
          <Input
            type="text"
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
            className="w-full"
          />
        ) : (
          <h2 className={props.checked ? 'line-through' : ''}>
            {props.taskName}
          </h2>
        )}
      </div>

      {/* Edit and Delete Buttons! */}
      {editMode ? (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={saveEdit}
            className="w-auto px-2 py-2 hover:border-2 hover:border-green-500 bg-green-500"
          >
            Save
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={cancelEdit}
            className="w-auto px-2 py-2 bg-red-500"
          >
            Cancel
          </Button>
        </div>
      ) : (
        // When not in edit mode!
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setEditMode(true)}
            className="hover:border-2 hover:border-gray-600"
          >
            <Pen className="text-green-400" />
          </Button>
          <Button
            onClick={deleteTaskHandler}
            variant="destructive"
            size="icon"
            className="bg-red-500"
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  )
}

export default Task
