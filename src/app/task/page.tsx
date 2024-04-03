"use client"
import { useState } from 'react'
import TaskForm, { formSchema } from '../../components/TaskForm'
import { toast } from 'react-hot-toast';
import { z } from "zod"
import { NewTask } from '../../types/task';
import { createTask } from '../service/tasksService';
import { useRouter } from 'next/navigation';

const CreatePage = () => {
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const task: NewTask = {
      name: values.name,
      description: values.description,
      author: values.author,
      isComplete: values.isComplete
    }
    const createNewTask = async (newTask) => {
      try {
        const response = await createTask(newTask)

        if (response) {
          router.push("/")
          toast.success(`Task ${task.name} created successfully`, {
            duration: 1500,
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    createNewTask(task)
  }

  return (
    <div>
      <TaskForm
        handleSubmit={onSubmit}
        type='create'
      />
    </div>
  )
}

export default CreatePage