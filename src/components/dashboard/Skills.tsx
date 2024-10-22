import { useEffect, useState } from "react";
import { fetchGraphQL } from "../../utils/query";
import RadarChartComponent from "../charts/RadarChart";

// Define interface for Skill
interface SkillInterface {
  amount: number;
  type: string;
}

function Skills() {
  // State for skills, initialized to an empty array
  const [skills, setSkills] = useState<
    { name: string; amount: number }[] | null
  >(null);
  // Error and loading state
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      // Query to get the all the skills gained
      const query = `{
            transaction (where: {type: {_like: "%skill_%"}} order_by: {id: asc}) {
              amount
              type
            }
            }
        `;

      try {
        const data = await fetchGraphQL(query);

        // Check if data exists
        if (data && data.transaction && data.transaction.length > 0) {
          const skills: SkillInterface[] = data.transaction;
          // Get the top 6 skills
          const topSkills = getTopSkills(skills);
          setSkills(topSkills);
        } else {
          setError("Could not fetch skills data");
        }
      } catch (error: any) {
        setError(
          error.message ||
            "An unexpected error occurred while fetching skills data"
        );
      } finally {
        // Set loading to false after fetching data, regardless of success or failure
        setIsLoading(false);
      }
    };
    // Call the function on component mount
    fetchSkills();
  }, []);

  return (
    <>
      {isLoading && (
        <p className="text-white text-center text-lg text-bold mb-2">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-white text-center text-lg text-bold mb-2">{error}</p>
      )}
      {skills && (
        <div>
          <RadarChartComponent data={skills} />
        </div>
      )}
    </>
  );
}

export default Skills;

// helper function to get the top 6 skills
function getTopSkills(skills: SkillInterface[]) {
  const topSkills = skills.reduce((acc, skill) => {
    const skillType = skill.type.split("_")[1]; // Extract the skill type from the key
    // Check if the skill type exists in the accumulator, if it does, add the amount to it, else create a new key with the amount
    if (acc[skillType]) {
      acc[skillType] += skill.amount;
    } else {
      acc[skillType] = skill.amount;
    }
    return acc;
  }, {} as { [key: string]: number }); // Initialize the accumulator as an empty object

  // Convert the object into an array of { name: string; amount: number }
  return (
    Object.entries(topSkills)
      // Sort the skills by amount in descending order
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, amount]) => ({ name, amount })) // Map the key-value pairs to the desired format
  );
}
