import Link from "next/link";

function JobCard({ job }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company} - {job.location}</p>
      <p className="text-green-600 font-bold">{job.salary}</p>
      <Link href={`/jobs/${job._id}`} className="text-blue-500">View Details</Link>
    </div>
  );
}


export default JobCard