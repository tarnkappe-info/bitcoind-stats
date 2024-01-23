import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns/format";
import { MappedData } from ".";

export default function JiOverviewTable({ data }: { data: MappedData[] }) {
  return (
    <div>
      <h2 className="mb-2 block text-xl font-semibold">
        Overview ({data.length} transactions)
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date (UTC)</TableHead>
            <TableHead>Wallet</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Txid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{format(item.time, "dd/MMM/yyyy - p")}</TableCell>
              <TableCell>{item.wallet}</TableCell>
              <TableCell>{item.amountSent ?? item.amountReceived}</TableCell>
              <TableCell>{item.txid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
