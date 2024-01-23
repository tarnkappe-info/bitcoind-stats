import { format } from "date-fns/format";
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
import type { Filters, MappedData } from ".";

export default function JiChart({
  data,
  filters,
}: {
  data: MappedData[];
  filters: Filters;
}) {
  return (
    <div className="h-[800px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="10" />
          <XAxis
            dataKey="time"
            type="category"
            tick={{ fontSize: 12 }}
            textAnchor="end"
            tickFormatter={(time) => format(time, "dd MMM yyyy")}
            label={{
              value: "UTC Time",
              position: "insideBottom",
              offset: -5,
            }}
            padding={{ left: 30, right: 30 }}
          />
          <YAxis label={{ value: "BTC", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend wrapperStyle={{ bottom: 0, paddingTop: 5 }} />
          {filters.showSent ? (
            <Line
              name="Amount Sent"
              type="monotone"
              dataKey="amountSent"
              stroke="#8884d8"
              connectNulls
            />
          ) : null}
          {filters.showReceived ? (
            <Line
              name="Amount Received"
              type="monotone"
              dataKey="amountReceived"
              stroke="#82ca9d"
              connectNulls
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
