import { createContext, useContext, useState } from "react";
import { jsonSchema, type Json } from "./lib/schema";

type JiContext = {
  json: null | Json;
  error: unknown;
  setValue: (str: string) => void;
  removeJson: () => void;
};

const JiContext = createContext<JiContext>({
  json: null,
  error: null,
  setValue: () => {},
  removeJson: () => {},
});

export const JiProvider = ({ children }: { children: React.ReactNode }) => {
  const [json, setJson] = useState<Json | null>(null);
  const [error, setError] = useState<unknown>(null);

  const setValue = (str: string) => {
    try {
      setError(null);
      const parsed = JSON.parse(str);
      const json = jsonSchema.parse(parsed);
      setJson(json);
    } catch (error) {
      setError(error);
    }
  };

  const removeJson = () => setJson(null);

  return (
    <JiContext.Provider value={{ json, setValue, removeJson, error }}>
      {children}
    </JiContext.Provider>
  );
};

export const useJi = () => useContext(JiContext);

export const useJson = () => {
  const { json } = useJi();
  if (json === null) throw new Error("json is null");
  return json;
};
