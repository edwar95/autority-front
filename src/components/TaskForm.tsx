"use client"
import React, { useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,

} from './ui/form'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from './ui/button';
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"
import { Task } from '../types/task'
import { useRouter } from 'next/navigation'

export const formSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(1000),
  isComplete: z.boolean().default(false),
  author: z.string().min(3).max(255),
});

type TaskFormProps = {
  handleSubmit: (values: z.infer<typeof formSchema>) => void
  task?: Task
  type: "create" | "update"
}

const TaskForm = ({ handleSubmit, task, type }: TaskFormProps) => {


  const router = useRouter();
  const initialValues = {
    ...task
  }

  if (task) {
    initialValues.name = task.name
    initialValues.description = task.description
    initialValues.author = task.author
    initialValues.isComplete = task.isComplete
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-4 place-items-center">
        <section >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className='text-left'>
                <FormLabel className='text-black-400'>Task Name</FormLabel>
                <FormControl>
                  <Input placeholder="Add a task name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className='text-left'>
                <FormLabel className='text-black-400'>Task Description</FormLabel>
                <FormControl>
                  <Input placeholder="Add a task description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className='text-left'>
                <FormLabel className='text-black-400'>Task Author</FormLabel>
                <FormControl>
                  <Input placeholder="Add a task author..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isComplete"
            render={({ field }) => (
              <FormItem className='content-start'>
                <FormLabel className='text-black-400 pr-5'>Completed?</FormLabel>
                <FormControl >
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className='grid gap-4 grid-cols-2'>
          <Button variant="secondary" type="button" className='text-center border-double' onClick={
            () => router.push('/')
          }>Cancel</Button>
          <Button type="submit" className='text-center'>{
            type === 'create' ? 'Create Task' : 'Update Task'
          }</Button>

        </section>
      </form>
    </Form >
  )
}

export default TaskForm