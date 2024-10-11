import { useEffect, useState } from "react";
import { getUserIdFromCookie } from "../../utils/cookies";
import { fetchGraphQL } from "../../utils/query";

function Audit() {
  // Define the structure for the audit data and the state variables
  interface AuditInterface {
    grade: number;
  }
  const [auditsDone, setAuditsDone] = useState<AuditInterface[] | null>(null);
  const [auditsReceived, setAuditsReceived] = useState<AuditInterface[] | null>(
    null
  );

  // Function to fetch and set user info
  useEffect(() => {
    const fetchAudits = async () => {
      const userID = getUserIdFromCookie();

      // Query with variables to get the audit history for the user
      const query = `
      query getAudits($userID: Int!) {
        auditsReceived: audit(where: { auditorId: { _neq: $userID } }) {
          grade
        }
        auditsDone: audit(where: { auditorId: { _eq: $userID } }) {
          grade
        }
      }
    `;

      const data = await fetchGraphQL(query, { userID });
      // Check if data exists
      if (data && data.auditsDone && data.auditsReceived) {
        // Filter the audit data to only include non-null grades
        const auditsDone: AuditInterface[] = data.auditsDone.filter(
          (audit: AuditInterface) => audit.grade !== null
        );
        const auditsReceived: AuditInterface[] = data.auditsReceived.filter(
          (audit: AuditInterface) => audit.grade !== null
        );

        // Set the audit data in state
        setAuditsDone(auditsDone);
        setAuditsReceived(auditsReceived);
      }
    };
    fetchAudits();
  }, []);
  return (
    <>
      <p className="text-white">
        Audits done: {auditsDone ? auditsDone.length : 0}
      </p>
      <p className="text-white">
        Audits received: {auditsReceived ? auditsReceived.length : 0}
      </p>
    </>
  );
}

export default Audit;
