import { useEffect } from "react";

function XpOverTime() {
  useEffect(() => {
    const fetchXp = async () => {
      // Query to get all xp transactions in order
      const query = `
      {
        transaction(where:{type: { _eq: "xp" } } , order_by: { id: asc }) {
          id
          amount
          path
        }
      }`;
    };
    fetchXp();
  }, []);

  return <div></div>;
}

export default XpOverTime;
