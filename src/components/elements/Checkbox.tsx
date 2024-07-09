"use client";

import { Checkbox as ICheckBox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

/**
 * Checkbox Component.
 * Likely checkbox in html but we already styled it. If you want to custom this component, please change its attributes correctly.
 *
 * @param icon - The icon to display inside the checkbox.
 * @param style - The style of the checkbox.
 */
export default function Checkbox({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: string;
}) {
  const [enabled, setEnabled] = useState(false);

  return (
    <ICheckBox
      checked={enabled}
      onChange={setEnabled}
      className={
        typeof style === "string"
          ? style
          : "inline-block border group data-[checked]:bg-green-100 data-[checked]:border-0 bg-white/100 ring-1 ring-white/15 ring-inset size-4 rounded-md"
      }
    >
      {children ? (
        children
      ) : (
        <CheckIcon className="hidden size-4 fill-green-950 group-data-[checked]:block" />
      )}
    </ICheckBox>
  );
}
