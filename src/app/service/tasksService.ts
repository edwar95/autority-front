import { Task } from '../../types/task';

export const getTasks = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task`);
  return response.json();
};

export const deleteTaskById = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/task/${id}`,
    {
      method: 'DELETE',
    }
  );
  return response.json();
};

export const markAsCompleted = async (task: Task) => {
  const t: Task = {
    ...task,
    isComplete: true,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/task/${t.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(t),
    }
  );
  return response.json();
};
