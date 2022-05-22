export const fetchNotes = async () => {
  const res = await fetch(`${process.env.BASE_URL}api/note`);
  const notes = res.json();
  return notes;
}