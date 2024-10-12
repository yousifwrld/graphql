import { useEffect, useState } from "react";
import { getUserIdFromCookie } from "../../utils/cookies";
import { fetchGraphQL } from "../../utils/query";
import BarChartComponent from "../charts/BarChart";

function Audit() {
  // Define the structure for the audit data and the state variables
  interface AuditInterface {
    grade: number;
  }
  // State variables for the audit data, initialized to null
  const [auditsDone, setAuditsDone] = useState<AuditInterface[] | null>(null);
  const [auditsReceived, setAuditsReceived] = useState<AuditInterface[] | null>(
    null
  );
  const [auditRatio, setAuditRatio] = useState<number | null>(null);

  // Function to fetch and set user info
  useEffect(() => {
    const fetchAudits = async () => {
      const userID = getUserIdFromCookie();

      // Query with variables to get the audit history and ratio for the user
      const query = `
      query getAudits($userID: Int!) {
        auditsReceived: audit(where: { auditorId: { _neq: $userID } }) {
          grade
        }
        auditsDone: audit(where: { auditorId: { _eq: $userID } }) {
          grade
        }

        xpUp: transaction_aggregate(where: { type: { _eq: "up" } }) {
          aggregate {
            sum {
              amount
            }
          }
        }
        xpDown: transaction_aggregate(where: { type: { _eq: "down" } }) {
          aggregate {
            sum {
              amount
            }
          }
        }
      }
    `;

      const data = await fetchGraphQL(query, { userID });
      // Check if data exists
      if (
        data &&
        data.auditsDone &&
        data.auditsReceived &&
        data.xpUp &&
        data.xpDown
      ) {
        // Filter the audit data to only include non-null grades
        const auditsDone: AuditInterface[] = data.auditsDone.filter(
          (audit: AuditInterface) => audit.grade !== null
        );
        const auditsReceived: AuditInterface[] = data.auditsReceived.filter(
          (audit: AuditInterface) => audit.grade !== null
        );

        // Calculate audit ratio, round to 1 decimal place then format back to float instead of string
        const xpReceived = data.xpUp.aggregate.sum.amount;
        const xpDone = data.xpDown.aggregate.sum.amount;
        const auditRatio = parseFloat((xpReceived / xpDone).toFixed(1));

        // Set the audit data in state
        setAuditsDone(auditsDone);
        setAuditsReceived(auditsReceived);
        setAuditRatio(auditRatio);
      }
    };
    fetchAudits();
  }, []);
  return (
    <>
      {/* render the bar chart with the audit data */}
      <BarChartComponent
        auditsDone={auditsDone ? auditsDone.length : 0}
        auditsReceived={auditsReceived ? auditsReceived.length : 0}
      />

      {auditRatio ? (
        <div className="text-center text-white">
          <h1 className="text-2xl">Audit Ratio: {auditRatio}</h1>
        </div>
      ) : (
        <div>
          <p className="text-center text-white">
            Could not calculate audit ratio
          </p>
        </div>
      )}
    </>
  );
}

export default Audit;
