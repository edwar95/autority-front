"use client"
import TaskForm, { formSchema } from '../../../components/TaskForm'
import { Task } from '../../../types/task'
import { z } from 'zod'
import { getTask, updateTask } from '../../service/tasksService'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from "next/navigation";
import toast from 'react-hot-toast'

const EditPage = () => {
  const searchParams = useParams();
  const taskId = searchParams?.id;
  const router = useRouter();
  const [task, setTask] = useState<Task>()

  useEffect(() => {
    const getTaskDetails = async (id) => {
      try {
        const response = await getTask(id)
        setTask(response)
      } catch (error) {
        router.push('/')
        toast.error('Task not found', {
          duration: 2000,
          position: 'bottom-right'
        })
      }
    }
    getTaskDetails(taskId)
  }, [taskId])



  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const updateTaskDetails = async () => {
      try {
        await updateTask({ ...values, id: Number(taskId) })
        router.push('/')
        toast.success('Task updated successfully', {
          duration: 2000,
          position: 'bottom-right'
        })
      } catch (error) {
        router.push('/')
        toast.error('Something went wrong', {
          duration: 2000,
          position: 'bottom-right'
        })
      }
    }

    updateTaskDetails()
  }

  return (
    <div>
      {task &&
        <TaskForm
          type='update'
          task={task}
          handleSubmit={onSubmit}
        />}
    </div>
  )
}

export default EditPage