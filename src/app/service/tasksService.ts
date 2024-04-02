export const getTasks = async () => {
  const response = await fetch('http://localhost:4000/task');
  return response.json();
};
