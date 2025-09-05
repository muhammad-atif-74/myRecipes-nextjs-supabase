import Link from 'next/link';
import { BsEmojiFrown } from "react-icons/bs";

export default function NotFound() {
    return (
        <main className="flex h-[80vh] flex-col items-center justify-center gap-2">
            <BsEmojiFrown className="text-6xl text-gray-400" />
            <h2 className="text-3xl font-semibold">404 Page Not Found</h2>
            <p>Could not find the requested invoice.</p>
            <Link
                href="/"
                className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primaryHover"
            >
                Continue Browsing
            </Link>
        </main>
    );
}