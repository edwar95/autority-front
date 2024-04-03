export type Task = {
  id: number;
  name: string;
  description: string;
  author: string;
  isComplete: boolean;
};

export type NewTask = {
  name: string;
  description: string;
  author: string;
  isComplete: boolean;
};
