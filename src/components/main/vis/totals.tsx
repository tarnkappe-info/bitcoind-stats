import { useEffect, useState } from "react";
import { MappedData } from ".";

const calculateTotals = (data: MappedData[]) => {
  let sent = 0;
  let received = 0;
  for (const { amountReceived, amountSent } of data) {
    if (amountSent) {
      sent += amountSent;
    }
    if (amountReceived) {
      received += amountReceived;
    }
  }
  return { sent, received };
};

export const Totals = ({ data }: { data: MappedData[] }) => {
  const [{ sent, received }, setTotals] = useState({
    sent: 0,
    received: 0,
  });

  useEffect(() => {
    setTotals(calculateTotals(data));
  }, [data]);

  return (
    <div className="flex justify-center divide-x">
      <div className="flex flex-col items-center space-y-1 p-4">
        <p className="text-2xl font-bold">{received.toFixed(8)}</p>
        <p className="text-lg font-semibold">Total Received</p>
      </div>
      <div className="flex flex-col items-center space-y-1 p-4">
        <p className="text-2xl font-bold">{sent.toFixed(8)}</p>
        <p className="text-lg font-semibold">Total Sent</p>
      </div>
    </div>
  );
};
