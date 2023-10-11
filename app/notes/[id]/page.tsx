async function getNote(noteId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    {
      //   next: { revalidate: 10 }, // this implements ISR
    }
  );

  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);

  return (
    <div className="py-4 space-y-8">
      <h1 className="font-medium">
        notes/<span className="font-normal text-slate-500">{note.id}</span>
      </h1>

      <div className="h-48 bg-yellow-300 p-8 space-y-4 shadow-md">
        <h3 className="text-slate-800 font-bold text-2xl">{note.title}</h3>
        <h3>{note.content}</h3>
        <h3>{note.created}</h3>
      </div>
    </div>
  );
}
