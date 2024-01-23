import { UTCDate } from "@date-fns/utc";
import { z } from "zod";

export const recordSchema = z.object({
  address: z.string(),
  category: z.enum(["send", "receive"]),
  amount: z.number(),
  label: z.string().optional(),
  vout: z.number().optional(),
  confirmations: z.number().min(0).optional(),
  blockhash: z.string().optional(),
  blockheight: z.number().optional(),
  blockindex: z.number().optional(),
  blocktime: z.number().optional(),
  txid: z.string(),
  walletconflicts: z.array(z.unknown()).optional(),
  time: z.number().transform((n) => new UTCDate(n * 1000)), // convert time to UTC
  timereceived: z.number().optional(), // convert time to UTC
  "bip125-replaceable": z.string().optional(),
  abandoned: z.boolean().optional(),
});
export type Record = z.infer<typeof recordSchema>;

export const jsonSchema = z.object({
  result: z.array(recordSchema).min(1),
});
export type Json = z.infer<typeof jsonSchema>;
