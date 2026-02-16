import { twMerge } from "tailwind-merge";
import type { IconProps } from "./types/IconProps";

function DangerIcon({ className }: IconProps) {
  return (
    <svg
      className={twMerge("w-4 h-4", className)}
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.833496 19.5L10.0002 3.66667L19.1668 19.5H0.833496ZM3.7085 17.8333H16.2918L10.0002 7L3.7085 17.8333ZM10.0002 17C10.2363 17 10.4342 16.9201 10.5939 16.7604C10.7536 16.6007 10.8335 16.4028 10.8335 16.1667C10.8335 15.9306 10.7536 15.7326 10.5939 15.5729C10.4342 15.4132 10.2363 15.3333 10.0002 15.3333C9.76405 15.3333 9.56614 15.4132 9.40641 15.5729C9.24669 15.7326 9.16683 15.9306 9.16683 16.1667C9.16683 16.4028 9.24669 16.6007 9.40641 16.7604C9.56614 16.9201 9.76405 17 10.0002 17ZM9.16683 14.5H10.8335V10.3333H9.16683V14.5Z"
        className="fill-current"
      />
    </svg>
  );
}

export { DangerIcon };
