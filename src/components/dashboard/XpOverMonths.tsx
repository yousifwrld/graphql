import { useEffect, useState } from "react";
import { fetchGraphQL } from "../../utils/query";
import LineChartComponent from "../charts/LineChart";

interface TransactionInterface {
  id: number;
  amount: number;
  createdAt: string;
  eventId: number;
}

function XpOverMonths() {
  // State for monthly XP, initialized to an array of objects
  const [monthlyXp, setMonthlyXp] = useState<{ name: string; xp: number }[]>(
    []
  );
  const [totalXp, setTotalXp] = useState<number>(0);

  useEffect(() => {
    const fetchXp = async () => {
      // Query to get all xp transactions in order
      const query = `
      {
        transaction(where:{type: { _eq: "xp" } } , order_by: { id: asc }) {
          id
          amount
          createdAt
          eventId
        }
      }`;

      const data = await fetchGraphQL(query);

      // Check if data exists
      if (data && data.transaction && data.transaction.length > 0) {
        const transactions: TransactionInterface[] = data.transaction;

        // Find the second lowest eventId
        const secondLowestEventId = getSecondLowestEventId(transactions);

        // Filter transactions with the second lowest eventId
        const filteredTransactions = transactions.filter(
          (transaction) => transaction.eventId === secondLowestEventId
        );
        console.log(filteredTransactions);

        // Get monthly XP
        const monthlyXp = getMonthlyXp(filteredTransactions);
        setMonthlyXp(monthlyXp);
        const totalxp = getTotalXp(filteredTransactions);
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
          <h1 className="text-2xl">Total XP: {totalXp}</h1>
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

// Function to get the second lowest eventId
function getSecondLowestEventId(
  transactions: TransactionInterface[]
): number | null {
  const uniqueEventIds = Array.from(
    new Set(transactions.map((t) => t.eventId))
  );

  if (uniqueEventIds.length < 2) {
    return null; // Handle case where there isn't a second lowest
  }

  uniqueEventIds.sort((a, b) => a - b); // Sort eventIds in ascending order
  return uniqueEventIds[1]; // Return the second lowest eventId
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
  // Return the total as a float rounded to 2 decimal places
  return parseFloat(totalXp.toFixed(2));
}
