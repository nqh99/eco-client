import Checkbox from "@/components/elements/Checkbox";
import { TvIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function Home() {
  return (
    <main className="px-8">
      <Checkbox>
        {/* <CheckIcon className="hidden size-4 fill-green-950 group-data-[checked]:block" /> */}
      </Checkbox>
    </main>
  );
}
