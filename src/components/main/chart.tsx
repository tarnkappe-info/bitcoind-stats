import { Label } from "@/components//ui/label";
import { Separator } from "@/components//ui/separator";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useJson } from "@/ji-context";
import { cn } from "@/lib/utils";
import { validate } from "bitcoin-address-validation";
import { format } from "date-fns/format";
import startCase from "lodash.startcase";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DatePickerWithRange } from "../date-range-picker";

type Filters = {
  showSent: boolean;
  showReceived: boolean;
  wallet?: string;
  date?: DateRange;
};

export default function JiChart() {
  const { result } = useJson();
  const [filters, setFilters] = useState<Filters>({
    showSent: true,
    showReceived: true,
  });

  let data = result.map((item) => ({
    amountSent: item.category === "send" ? item.amount : 0,
    amountReceived: item.category === "receive" ? item.amount : 0,
    time: item.time,
    wallet: item.address,
  }));

  const isWalletValid = filters.wallet ? validate(filters.wallet) : false;

  if (filters.wallet && isWalletValid) {
    data = data.filter((item) => item.wallet === filters.wallet);
  }

  if (filters.date) {
    data = data.filter((item) => {
      const date = item.time;
      return (
        (filters.date?.from ? date >= filters.date.from : true) &&
        (filters.date?.to ? date <= filters.date.to : true)
      );
    });
  }

  return (
    <div className="flex w-full flex-col">
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
              "border-red-500": filters.wallet && !isWalletValid,
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
      <div className="h-[800px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              type="category"
              tick={{ fontSize: 12 }}
              textAnchor="end"
              tickFormatter={(time) => format(time, "dd MMM yyyy")}
            />
            <YAxis />
            <Tooltip />
            <Legend formatter={(value) => startCase(value)} />
            {filters.showSent ? (
              <Line type="monotone" dataKey="amountSent" stroke="#8884d8" />
            ) : null}
            {filters.showReceived ? (
              <Line type="monotone" dataKey="amountReceived" stroke="#82ca9d" />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
