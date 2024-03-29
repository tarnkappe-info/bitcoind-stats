import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useJi } from "@/ji-context";
import { useState } from "react";
import { ZodError } from "zod";
import { Input } from "../ui/input";

export default function JsonForm() {
  const [value, setValue] = useState("");
  const ji = useJi();

  return (
    <div className="flex w-full flex-col space-y-2">
      {ji.error ? (
        <div className="rounded-md bg-red-100 px-4 py-3 text-red-800">
          <span className="block text-xl font-semibold">Error</span>
          <div className="px-2">
            <JiError error={ji.error} />
          </div>
        </div>
      ) : null}
      <div className="w-full">
        <div className="mb-2 flex flex-row items-center">
          <Label htmlFor="json">JSON</Label>
          <div className="ml-2">
            <SetByUpload />
          </div>
        </div>
        <Textarea
          id="json"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          placeholder="Paste your JSON here"
          className={ji.error ? "border-red-500" : ""}
        />
      </div>
      <div className="text-center">
        <Button onClick={() => ji.setValue(value)} className="px-5">
          Proceed
        </Button>
      </div>
    </div>
  );
}

const JiError = ({ error }: { error: unknown }) => {
  if (!error) return null;
  if (error instanceof ZodError) {
    return (
      <div>
        <ul className="flex flex-col space-y-1">
          {error.issues.map((issue) => (
            <li key={issue.path.join(".")}>
              <span className="font-semibold">json.{issue.path.join(".")}</span>
              <span>: {issue.message}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (error instanceof Error) {
    return <p>{error.message}</p>;
  }
  return <pre>{JSON.stringify(error, null, 2)}</pre>;
};

const SetByUpload = () => {
  const ji = useJi();
  return (
    <Input
      type="file"
      onChange={({ target: { files } }) => {
        const file = files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result;
          if (typeof text !== "string") return;
          ji.setValue(text);
        };
        reader.readAsText(file);
      }}
    />
  );
};
