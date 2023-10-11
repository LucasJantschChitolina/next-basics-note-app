import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>
        This is the home page. Try to navigate to the{" "}
        <Link href="/notes">
          <strong>notes</strong>
        </Link>
      </p>
    </div>
  );
}
