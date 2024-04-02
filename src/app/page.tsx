"use client";
import { get } from 'http';
import { useEffect, useState } from 'react'
import { getTasks } from './service/tasksService';
import { Task } from '../types/task';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Button } from '../components/ui/button';


const page = () => {

  const [tasks, setTasks] = useState([]);


  useEffect(() => {

    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);


  return (

    <main>
      <Table>
        <TableCaption>A list of Tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Completed</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task: Task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.name}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.author}</TableCell>
              <TableCell className="text-right">{task.isComplete ? "Completed" : "Pending"}</TableCell>
              <TableCell className='text-left'>
                <section className='text-right'>
                  <Button variant="link" onClick={() => console.log("click")}>Edit</Button>
                  <Button variant="destructive" onClick={() => console.log("click")}>Delete</Button>
                </section>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}

export default page