import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="grid grid-cols-2 bg-black text-white">
      <Link
        href="/"
        className="py-0 ml-5 text-xl font-bold text-zinc-400 md:py-4"
      >
        DART GAMES
      </Link>
      <div className="flex items-center justify-end" onClick={session ? () => void signOut() : () => void signIn()}>
        <div className="flex items-end gap-2 px-4 py-2 hover:bg-white/20 rounded-md mr-5" onClick={session ? () => void signOut() : () => void signIn()}>
          <button className="text-sm font-medium text-white transition ">
            {session ? "Sign out" : "Sign in"}
          </button>
          {session ? <FaSignOutAlt /> : <FaSignInAlt />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
