"use client";

import Link from "next/link";
import CreateNote from "./CreateNote";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30",
    { cache: "no-store" } // equivalent to getServerSideProps
  );

  const data = await res.json();

  return data?.items as any[];
}

export default async function NotesPage() {
  // this is a server component by default

  const notes = await getNotes();

  return (
    <div className="space-y-4">
      <h1>Notes</h1>

      <CreateNote />

      <div className="grid py-4 gap-4 grid-cols-4">
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}

function Note({ note }: any) {
  const router = useRouter();

  const deleteNote = async () => {
    await fetch(
      `http://127.0.0.1:8090/api/collections/notes/records/${note.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    router.refresh();
  };

  const { id, title, content, created } = note || {};

  return (
    <div className="h-48 bg-yellow-300 py-8 px-4 space-y-4 shadow-md">
      <div className="relative flex items-center justify-between">
        <h2 className="text-slate-800 font-bold text-2xl">{title}</h2>
        <button
          className="bg-yellow-300 absolute right-0 top-0"
          onClick={deleteNote}
        >
          <Trash className="h-5 w-5 text-red-500" />
        </button>
      </div>
      <h5>{content}</h5>
      <p>{created}</p>
      <Link href={`/notes/${id}`}>View note </Link>
    </div>
  );
}
