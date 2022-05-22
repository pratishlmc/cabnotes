export const fetchTasks = async () => {
  const res = await fetch(`${process.env.BASE_URL}api/task`);
  const tasks = res.json();
  return tasks;
}