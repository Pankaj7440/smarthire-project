import { useState, useEffect } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // Fetch all jobs on load
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log("Error fetching jobs:", err);
    }
  };

  // Add new job (for recruiter)
  const addJob = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/jobs", { title, company, location, description });
      setJobs([...jobs, res.data]);
      setTitle(""); setCompany(""); setLocation(""); setDescription("");
      alert("Job added successfully!");
    } catch (err) {
      console.log(err);
      alert("Error adding job");
    }
  };

  // Apply to job (for candidate)
  const applyJob = async (jobId) => {
    try {
      // Hardcoded candidate ID for testing
      const candidateId = "YOUR_CANDIDATE_ID"; // replace with login user id later
      const res = await axios.post("/api/jobs/apply", { candidateId, jobId });
      alert("Applied successfully!");
    } catch (err) {
      alert(err.response?.data?.msg || "Error applying!");
    }
  };

  return (
    <div>
      <h2>Add Job</h2>
      <form onSubmit={addJob}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button type="submit">Add Job</button>
      </form>

      <h2>All Jobs</h2>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            {job.title} - {job.company} - {job.location}
            <button style={{ marginLeft: "10px" }} onClick={() => applyJob(job._id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jobs;
