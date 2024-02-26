import React, { useEffect, useMemo, useState } from 'react'
import { Store } from 'react-notifications-component'
// importing all the files
import { addTaskHandler, deleteTask, fetchTodo, updateTask } from '../../api/index'
import AddTask from '../addtask/AddTask'
import Spinner from '../spinner/Spinner'
import ShowTask from '../showtask/ShowTask'
import Classes from '../container/TodoContainer.module.css'
import 'react-notifications-component/dist/theme.css'

export const TodoContainer = () => {
  // setting up the loading state
  const [isLoading, setIsLoading] = useState(true)
  // setting up the todo state
  const [Todo, setTodo] = useState([])
  // setting up the editing state
  const [isEdit, setIsEdit] = useState({
    edit: false,
    task: {}
  })
  // setting upt he userId
  const userId = 1;
  // making the notification variable for the react notifiation 
  const notifications = useMemo(() => {
    return {
      insert: "top",
      container: "top-left",
      animationIn: ["animate_animated", "animate_fadeIn"],
      animationOut: ["animate_animated", "animate_fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    }
  }, [])
  // adding functionality of the completing the task
  async function completed(task) {
    const index = Todo.findIndex((ele) => {
      return ele.id === task.id
    });
    setTodo((prev) => {
      prev[index].completed = true;
      return [...prev];
    })
    // settingup the notifications
    Store.addNotification({
      title: "Congratulations",
      message: 'Task copleted successfully',
      type: "success",
      ...notifications
    })
  }
    
    // setting up the function for updating the task
    async function updateHandler(task, requested) {
      if (requested) {
        setIsEdit({
          edit: true,
          task
        })
        return;
      }
      Store.addNotification({
        title: "In Progress",
        message: 'updatinmg data',
        type: "info",
        ...notifications,
      })
      const data = await updateTask(task)
      if (data.success) {
        Store.addNotification({
          title: "Hurry",
          message: "task updated successfully",
          type: 'success',
          ...notifications
        })
      } else {
        Store.addNotification({
          title: "Ohh God!",
          message: data.message,
          type: "error",
          ...notifications
        })
      }
      setIsEdit({
        edit: false,
        task: {}
      })
    }
  // setting up the function for deleting the particular task
  async function deleteHandler(id) {
    Store.addNotification({
      title: "In Progress",
      message: "Deleting data",
      type: 'info',
      ...notifications
    })
    const result = await deleteTask(id)
    let data;
    if (result.success) {
      const todo = Todo.filter((data) => {
        return data.id !== id;
      })
      setTodo(todo);
      Store.addNotification({
        title: 'Hurry',
        message: "Task deleted successfully",
        type: 'success',
        ...notifications
      })
    } else {
      Store.addNotification({
        title: "In Progress",
        message: data.message,
        type: "error",
        ...notifications
      })
    }
  }
  //adding a functionality to adding a new task in todo
  async function addData(title) {
    Store.addNotification({
      title: 'In Progress',
      message: "adding a data",
      type: "info",
      ...notifications
    })
    const data = await addTaskHandler(title, userId)
    if (data.success) {
      Store.addNotification({
        title: 'Hurry',
        message: "Task added successfully",
        type: "success",
        ...notifications
      })
      setTodo([data.data, ...Todo])
    } else {
      Store.addNotification({
        title: "Sorry",
        message: data.message,
        type: 'error',
        ...notifications
      })
    }
  }
  // using a useEffect hook for fetching all the data and getting all the todo data
  useEffect(() => {
    async function post() {
      Store.addNotification({
        title: 'In Progress',
        message: "fetching the data",
        type: 'info',
        ...notifications
      })
      const data = await fetchTodo()
      if (data.success) {
        setIsLoading(false);
        setTodo(data.data)
      } else {
        setIsLoading(false)
        Store.addNotification({
          title: "sorry",
          message: data.message,
          type: "error",
          ...notifications
        })
      }
    }
    post()
  }, [notifications])
  return (
    // container for todo app
    <div className={Classes.container}>
      <h1>!!Todo!!</h1>
      {/* component for adding a task */}
      <AddTask addtask={addData} isEdit={isEdit} updateHandler={updateHandler}
      />
      {/* component for rendering the task */}
      {
        isLoading ? (
          <Spinner />
        ) : (
          <ShowTask todo={Todo} delete={deleteHandler} completed={completed} updateHandler={updateHandler} />
        )
      }
    </div>
  )
}