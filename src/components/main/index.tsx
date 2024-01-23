import { Button } from "@/components/ui/button";
import { useJi } from "@/ji-context";
import { ArrowLeft } from "lucide-react";
import JsonForm from "./json-form";
import JiVis from "./vis";

export default function Main() {
  const { json, removeJson } = useJi();

  return (
    <div className="flex w-full flex-col bg-white p-5 shadow">
      {json ? (
        <>
          <div className="mb-3 flex flex-row items-center space-x-2">
            <div>
              <Button variant="outline" onClick={removeJson}>
                <ArrowLeft size="18" className="mr-2" /> Reset
              </Button>
            </div>
            <div></div>
          </div>
          <div className="flex w-full flex-row justify-center">
            <JiVis />
          </div>
        </>
      ) : (
        <JsonForm />
      )}
    </div>
  );
}
