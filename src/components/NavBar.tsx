import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="grid grid-cols-3 bg-[#001e29] text-white">
      <div></div>
      <Link
        href="/"
        className="py-0 text-center text-xl font-bold text-[hsl(185,80%,65%)] md:py-4"
      >
        DART GAMES
      </Link>
      <div className="flex items-center justify-end gap-4">
        <div className="dropdown relative flex flex-col items-end justify-center">
          <span className="rounded-md shadow-sm">
            <button
              className="inline-flex w-full justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-medium leading-5 text-white transition hover:bg-white/20"
              type="button"
              aria-haspopup="true"
              aria-expanded="true"
              aria-controls="headlessui-menu-items-117"
            >
              <span>Select a game</span>
              <svg
                className="ml-2 -mr-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </span>
          <div className="dropdown-menu invisible origin-top-right -translate-y-2 scale-95 transform transition">
            <div className="absolute right-0 mt-4 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white/10 shadow-lg outline-none">
              <div className="py-1">
                <Link
                  href="/high-segment-scoring"
                  tabIndex={0}
                  className="flex w-full px-4 py-2 text-left text-sm"
                >
                  High Segment Scoring
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button
          className="mr-5 h-fit rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          onClick={session ? () => void signOut() : () => void signIn()}
        >
          {session ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
