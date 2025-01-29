import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-blue-500">
      <ul className="flex justify-around text-white">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
        <li>
          <Link href="/signin">Sign In</Link>
        </li>
        <li>
          <Link href="/locations">Locations</Link>
        </li>
      </ul>
    </nav>
  );
}
