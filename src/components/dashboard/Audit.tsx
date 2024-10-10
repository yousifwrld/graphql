import { useEffect, useState } from "react";
import { getUserIdFromCookie } from "../../utils/cookies";
import { fetchGraphQL } from "../../utils/query";

function Audit() {
  // Define the structure for the audit data and the state variables
  interface AuditInterface {
    grade: number;
  }
  const [audits, setAudits] = useState<AuditInterface[] | null>(null);

  // Function to fetch and set user info
  useEffect(() => {
    const fetchAudits = async () => {
      const userID = getUserIdFromCookie();

      // Query to get the audits where the user was the auditor
      const query = `
      {
        audit (where: {auditorId: {_eq: ${userID}}}) {
          grade
        }
      }
    `;
      const data = await fetchGraphQL(query);
      // Check if data exists
      if (data && data.audit && data.audit.length > 0) {
        // Filter the audit data to only include non-null grades
        const audits: AuditInterface[] = data.audit.filter(
          (audit: AuditInterface) => audit.grade !== null
        );
        console.log(audits);
        setAudits(audits);
        //TODO: Further filter audits based on passed or failed, > 1 == passed, < 1 == failed
      }
    };
    fetchAudits();
  }, []);
  return (
    <>
      <p className="text-white">Total audits: {audits?.length || 0}</p>
      <p className="text-white">
        Passed audits: {audits?.filter((audit) => audit.grade >= 1).length || 0}
      </p>
      <p className="text-white">
        Failed audits: {audits?.filter((audit) => audit.grade < 1).length || 0}
      </p>
    </>
  );
}

export default Audit;
