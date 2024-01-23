import { DatePickerWithRange } from "@/components/date-range-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { useJson } from "@/ji-context";
import { cn } from "@/lib/utils";
import type { UTCDate } from "@date-fns/utc";
import { ToggleGroupItem } from "@radix-ui/react-toggle-group";
import validate from "bitcoin-address-validation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import JiChart from "./chart";
import JiOverviewTable from "./table";

export type Filters = {
  showSent: boolean;
  showReceived: boolean;
  wallet?: string;
  date?: DateRange;
};

export type MappedData = {
  amountSent: number | null;
  amountReceived: number | null;
  time: UTCDate;
  wallet: string;
  txid: string;
};

export default function JiVis() {
  const { result } = useJson();
  const [filters, setFilters] = useState<Filters>({
    showSent: true,
    showReceived: true,
  });
  const [data, setData] = useState<MappedData[]>([]);

  useEffect(() => {
    if (result) {
      let nData: MappedData[] = result.map((item) => ({
        amountSent: item.category === "send" ? item.amount : null,
        amountReceived: item.category === "receive" ? item.amount : null,
        time: item.time,
        wallet: item.address,
        txid: item.txid,
      }));
      if (filters.wallet && validate(filters.wallet)) {
        nData = nData.filter((item) => item.wallet === filters.wallet);
      }
      if (filters.date) {
        nData = nData.filter((item) => {
          const date = item.time;
          return (
            (filters.date?.from ? date >= filters.date.from : true) &&
            (filters.date?.to ? date <= filters.date.to : true)
          );
        });
      }
      setData(nData);
    }
  }, [result, filters]);

  console.log("Vis");

  return (
    <div className="flex w-full flex-col space-y-2">
      <div className="mb-3 flex flex-row items-center space-x-2">
        <div className="flex max-w-xs flex-row items-center justify-start space-x-2">
          <Label>Transaction Type</Label>
          <ToggleGroup
            className="justify-start"
            variant="outline"
            onValueChange={(value) =>
              setFilters({
                ...filters,
                showSent: value.includes("showSent"),
                showReceived: value.includes("showReceived"),
              })
            }
            value={["showSent", "showReceived"].filter((value) => {
              if (value === "showSent") return filters.showSent;
              if (value === "showReceived") return filters.showReceived;
              return false;
            })}
            type="multiple"
          >
            <ToggleGroupItem value="showSent">Sent</ToggleGroupItem>
            <ToggleGroupItem value="showReceived"> Received</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <Separator orientation="vertical" />
        <div className="flex w-full max-w-xs flex-row items-center justify-start space-x-2">
          <Label htmlFor="filterWallet">Wallet</Label>
          <Input
            id="filterWallet"
            type="text"
            value={filters.wallet}
            onChange={(e) => setFilters({ ...filters, wallet: e.target.value })}
            placeholder="Enter a BTC address"
            className={cn("w-full", {
              "border-red-500": filters.wallet && validate(filters.wallet),
            })}
          />
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-row items-center justify-start space-x-2">
          <Label>Date</Label>
          <DatePickerWithRange
            date={filters.date}
            setDate={(date) => setFilters({ ...filters, date })}
          />
        </div>
      </div>
      <JiChart data={data} filters={filters} />
      <JiOverviewTable data={data} />
    </div>
  );
}
