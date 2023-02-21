import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dart Games</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-zinc-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-5xl font-semibold tracking-tight text-white">
            Welcome to <span className="text-zinc-400">Dart Games</span>
          </h1>
          <AuthShowcase />
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        {sessionData ? (
          <div className="grid gap-4 text-white">
            <h4 className="mb-5 text-3xl">Start your Darting journey today</h4>
            <div className="grid place-content-center gap-4 text-center">
              <Link href={"/high-segment-scoring"} className="btn w-auto">
                High Segment Scoring
              </Link>
              <Link href={"/train-finishing"} className="btn w-auto">
                Train Finishing
              </Link>
            </div>
          </div>
        ) : (
          <button className="btn" onClick={() => void signIn()}>
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};
