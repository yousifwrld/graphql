import { useEffect, useState } from "react";
import { fetchGraphQL } from "../../utils/query";
import LineChartComponent from "../charts/LineChart";

interface TransactionInterface {
  id: number;
  amount: number;
  createdAt: string;
}

function XpOverMonths() {
  // State for monthly XP, initialized to an array of objects
  const [monthlyXp, setMonthlyXp] = useState<{ name: string; xp: number }[]>(
    []
  );

  useEffect(() => {
    const fetchXp = async () => {
      // Query to get all xp transactions in order
      const query = `
      {
        transaction(where:{type: { _eq: "xp" } } , order_by: { id: asc }) {
          id
          amount
          createdAt
        }
      }`;

      const data = await fetchGraphQL(query);

      // Check if data exists
      if (data && data.transaction && data.transaction.length > 0) {
        const transactions: TransactionInterface[] = data.transaction;
        const monthlyXp = getMonthlyXp(transactions);
        setMonthlyXp(monthlyXp);
      }
    };
    fetchXp();
  }, []);

  return (
    <>
      <LineChartComponent xpData={monthlyXp} />
    </>
  );
}

export default XpOverMonths;

// Helper functions

function getYearAndMonth(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}

// Group transactions by month and sum XP for each month
function getMonthlyXp(
  transactions: TransactionInterface[]
): { name: string; xp: number }[] {
  const monthlyXpMap = transactions.reduce((acc, transaction) => {
    const yearMonth = getYearAndMonth(transaction.createdAt);

    if (!acc[yearMonth]) {
      acc[yearMonth] = 0;
    }

    // Add the XP amount to the corresponding month and convert to kilobytes
    acc[yearMonth] += transaction.amount / 1000;

    return acc;
  }, {} as { [key: string]: number });

  // Convert the monthly XP object into an array of { name, xp } objects
  return Object.keys(monthlyXpMap).map((month) => ({
    name: month,
    xp: parseFloat(monthlyXpMap[month].toFixed(2)),
  }));
}
