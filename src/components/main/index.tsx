import { useJi } from "@/ji-context";
import JsonForm from "./json-form";

export default function Main() {
  const { json } = useJi();

  return (
    <div className="flex w-full flex-col bg-white p-5 shadow">
      <div></div>
      {json ? <pre>{JSON.stringify(json, null, 2)}</pre> : <JsonForm />}
    </div>
  );
}
