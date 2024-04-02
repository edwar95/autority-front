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
