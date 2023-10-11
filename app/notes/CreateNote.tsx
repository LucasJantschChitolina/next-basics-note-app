"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const create = async () => {
    await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setContent("");
    setTitle("");

    router.refresh();
  };

  return (
    <form
      onSubmit={create}
      className="flex flex-col bg-slate-100 p-4 w-[300px] space-y-4"
    >
      <h3 className="font-semibold text-2xl">Create Note</h3>
      <input
        className="rounded-sm p-4"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="rounded-sm p-4"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button
        className="bg-yellow-400 rounded-md hover:bg-yellow-500"
        type="submit"
      >
        Create note
      </button>
    </form>
  );
}
