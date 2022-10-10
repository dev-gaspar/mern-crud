import { VscEmptyWindow } from "react-icons/vsc";

export function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <VscEmptyWindow className="w-48 h-48 text-white" />
      <h1 className="text-white text-2xl">Not found 404</h1>
    </div>
  );
}
