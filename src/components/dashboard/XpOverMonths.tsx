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
  const [totalXp, setTotalXp] = useState<number>(0);

  useEffect(() => {
    const fetchXp = async () => {
      // Query to get all xp transactions in bh module in order
      const query = `
      {
        transaction(
          where: { 
            type: { _eq: "xp" }, 
            event: { object: { name: { _eq: "Module" } } } 
          }, 
          order_by: { id: asc }
        ) {
          id
          amount
          createdAt
          }
        }
      `;

      const data = await fetchGraphQL(query);

      // Check if data exists
      if (data && data.transaction && data.transaction.length > 0) {
        const transactions: TransactionInterface[] = data.transaction;

        // Get monthly and total XP
        const monthlyXp = getMonthlyXp(transactions);
        const totalxp = getTotalXp(transactions);
        setMonthlyXp(monthlyXp);
        setTotalXp(totalxp);
      }
    };
    fetchXp();
  }, []);

  return (
    <>
      <LineChartComponent xpData={monthlyXp} />
      {totalXp ? (
        <div className="text-center text-white">
          <h1 className="text-2xl">Total XP: {totalXp} kB</h1>
        </div>
      ) : (
        <div>
          <p className="text-center text-white">Could not calculate total XP</p>
        </div>
      )}
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

function getTotalXp(transactions: TransactionInterface[]): number {
  // Get the total xp
  const totalXp = transactions.reduce((acc, transaction) => {
    return acc + transaction.amount / 1000;
  }, 0);
  // Return the total as a float with no decimal places
  return parseFloat(totalXp.toFixed(0));
}
