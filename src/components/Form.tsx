"use client"
import React from 'react'
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
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"

import { toast } from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(1000),
  isCompleted: z.boolean().default(false),
  author: z.string().min(3).max(255),
});


const TaskForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      author: "",
      isCompleted: false,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    toast.success(`Task created successfully`, {
      duration: 900,
      position: 'bottom-right'
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 place-items-center pt-20">
        <section >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className='text-left'>
                <FormLabel className='text-black-400'>Task Name</FormLabel>
                <FormControl>
                  <Input placeholder="Add a task name" {...field} />
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
                  <Input placeholder="Add a task description..." {...field} />
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
                  <Input placeholder="Add a task author..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isCompleted"
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

        <Button type="submit" className='text-center'>Submit</Button>
      </form>
    </Form>
  )
}

export default TaskForm