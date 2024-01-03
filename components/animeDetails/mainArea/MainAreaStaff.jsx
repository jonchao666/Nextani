import StaffCard from "./StaffCard";

import Link from "next/link";
export default function MainAreaStaff({ characters, staff, data }) {
  if (!staff) return null;
  return (
    <div className="grow mb-8">
      <div className="text-sm font-medium mb-2.5 flex justify-between">
        <span>Staff</span>
        <Link
          href={`/animeDetails/default?mal_id=${data.mal_id}`}
          scroll={false}
          className="text-sm text-primary font-normal "
        >
          Back
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-y-4 gap-x-8 ">
        {staff.map((person, index) => (
          <StaffCard key={index} person={person} />
        ))}
      </div>
    </div>
  );
}
