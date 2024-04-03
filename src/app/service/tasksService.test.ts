import {
  getTasks,
  deleteTaskById,
  markAsCompleted,
  getTask,
  updateTask,
  createTask,
} from './tasksService';
import { NewTask, Task } from '../../types/task';

global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({ rates: { CAD: 1.42 } }),
}) as jest.MockedFunction<typeof fetch>;

describe('getTasks', () => {
  beforeEach(() => {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it('should fetch tasks from the API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([{ id: 1, title: 'Task 1' }]),
    });

    const response = await getTasks();
    expect(response).toEqual([{ id: 1, title: 'Task 1' }]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/task`
    );
  });
});

describe('deleteTaskById', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
  });

  it('should delete a task by id', async () => {
    const id = 1;

    const response = await deleteTaskById(id);

    expect(response).toEqual({});
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${id}`,
      {
        method: 'DELETE',
      }
    );
  });
});

describe('markAsCompleted', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
  });

  it('should mark a task as completed', async () => {
    const task: Task = {
      id: 1,
      name: 'Task 1',
      isComplete: false,
      author: 'Author',
      description: 'Description',
    };

    const response = await markAsCompleted(task);

    expect(response).toEqual({});
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${task.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, isComplete: true }),
      }
    );
  });
});

describe('deleteTaskById', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
  });

  it('should delete a task by id', async () => {
    const id = 1;

    const response = await deleteTaskById(id);

    expect(response).toEqual({});
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${id}`,
      {
        method: 'DELETE',
      }
    );
  });
});

describe('markAsCompleted', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
  });

  it('should mark a task as completed', async () => {
    const task: Task = {
      id: 1,
      name: 'Task 1',
      isComplete: false,
      author: 'Author',
      description: 'Description',
    };

    const response = await markAsCompleted(task);

    expect(response).toEqual({});
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${task.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, isComplete: true }),
      }
    );
  });
});

describe('markAsCompleted', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
  });

  it('should mark a task as completed', async () => {
    const task: Task = {
      id: 1,
      name: 'Task 1',
      isComplete: false,
      author: 'Author',
      description: 'Description',
    };

    const response = await markAsCompleted(task);

    expect(response).toEqual({});
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${task.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, isComplete: true }),
      }
    );
  });
});

describe('getTask', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ id: 1, title: 'Task 1' }),
    });
  });

  it('should fetch a task from the API', async () => {
    const id = 1;

    const response = await getTask(id);

    expect(response).toEqual({ id: 1, title: 'Task 1' });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${id}`
    );
  });

  it('should throw an error if task is not found', async () => {
    const id = 1;

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(getTask(id)).rejects.toThrow('Task not found');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${id}`
    );
  });

  it('should throw an error if an error occurs during the request', async () => {
    const id = 1;

    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    await expect(getTask(id)).rejects.toThrow('Task not found');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${id}`
    );
  });
});

describe('updateTask', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
  });

  it('should update a task', async () => {
    const task: Task = {
      id: 1,
      name: 'Task 1',
      isComplete: false,
      author: 'Author',
      description: 'Description',
    };

    const response = await updateTask(task);

    expect(response).toEqual({});
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${task.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      }
    );
  });
});
describe('createTask', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
  });

  it('should create a new task', async () => {
    const task: NewTask = {
      name: 'New Task',
      description: 'Task Description',
      author: 'Author',
      isComplete: false,
    };

    const response = await createTask(task);

    expect(response).toEqual({});
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/task`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      }
    );
  });
});
