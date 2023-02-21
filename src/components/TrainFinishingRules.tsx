import { MdClose } from "react-icons/md";

type Props = {
  onClose: (data: boolean) => void;
};

function TrainFinishingRules({ onClose }: Props) {
  return (
    <div className="h-modal fixed top-0 left-0 right-0 z-50 grid w-full place-content-center overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full">
      <div className="relative h-full w-full max-w-md md:h-auto">
        <div className="relative rounded-lg bg-zinc-700 shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <MdClose size={25} onClick={() => onClose(false)} />
          </button>
          <div className="rounded-t border-b px-6 py-4 dark:border-zinc-600">
            <h3 className="font-semibold dark:text-white lg:text-xl">
              How to play
            </h3>
          </div>
          <div className="p-6 text-zinc-300">
            <p className="text-md mb-2">Choosing mode:</p>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <span>Easy:</span>
              <span>4 thorws, 3 darts per throw</span>
              <span>Medium:</span>
              <span>3 thorws, 3 darts per throw</span>
              <span>Hard:</span>
              <span>2 thorws, 3 darts per throw</span>
              <span>Pro:</span>
              <span>1 thorws, 3 darts per throw</span>
            </div>
            <p className="text-md my-2">Gameplay:</p>
            <p className="text-sm ">
              You have a set amount of throws (determined by the mode) to finish
              the target score. Finishing is done in the same manner as in 501
              where you have to finish in a double. So to beat the game, you
              need to get to 0 from the target score before running out of
              throws and darts. If you manage to get to 0, you can increment the
              target by pressing the button &quot;+1 Target&quot;, otherwise
              you&apos;ll have to try again.
            </p>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainFinishingRules;
