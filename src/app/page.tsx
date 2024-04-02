"use client";
import { useEffect, useState } from 'react'
import { getTasks, deleteTaskById } from './service/tasksService';
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
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { toast } from 'react-hot-toast';


const page = () => {

  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const handleEdit = (task: Task) => {
    router.push(`/task/${task.id}`);
  };

  const handleDelete = async (taskToDelete: Task) => {
    const deleteTask = async () => {
      await deleteTaskById(taskToDelete.id);
      setTasks((prev) => prev.filter((task: Task) => task.id !== taskToDelete.id));
    }

    try {
      await deleteTask();
    } catch (error) {
      console.log(error);
    }
  }

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
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task: Task) => (
            <TableRow key={task.id} className={`flex-grow ${task.isComplete ? 'bg-lime-300' : ''}`}>
              <TableCell className="font-medium">{task.name}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.author}</TableCell>
              <TableCell className="text-right">{task.isComplete ? "Completed" : "Pending"}</TableCell>
              <TableCell className='text-center'>
                <section className='flex gap-5'>
                  <Button variant="link" className="flex-grow" onClick={() => handleEdit(task)} >Edit</Button>
                  {
                    !task.isComplete &&
                    <Button variant="default" className="flex-grow bg-amber-400" onClick={() => toast.success('Hello, Next.js with React-Hot-Toast!', {
                      duration: 700,
                      position: 'bottom-right'
                    })}>
                      Complete
                    </Button>
                  }
                  <Button variant="destructive" className="flex-grow " >
                    <AlertDialog>
                      <AlertDialogTrigger>Delete</AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your task
                            and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(task)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </Button>
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