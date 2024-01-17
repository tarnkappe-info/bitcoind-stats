import { z } from "zod";

export const recordSchema = z.object({
  address: z.string(),
  category: z.enum(["send", "receive"]),
  amount: z.number(),
  label: z.string().optional(),
  vout: z.number().optional(),
  confirmations: z.number().min(0),
  blockhash: z.string().optional(),
  blockheight: z.number().optional(),
  blockindex: z.number().optional(),
  blocktime: z.number().optional(),
  txid: z.string(),
  walletconflicts: z.array(z.unknown()),
  time: z.number().transform((n) => new Date(n * 1000).toISOString()), // convert time to UTC
  timereceived: z.number().transform((n) => new Date(n * 1000).toISOString()), // convert time to UTC
  "bip125-replaceable": z.string().optional(),
  abandoned: z.boolean().optional(),
});
export type Record = z.infer<typeof recordSchema>;

export const jsonSchema = z.object({
  result: z.array(recordSchema),
});
export type Json = z.infer<typeof jsonSchema>;
