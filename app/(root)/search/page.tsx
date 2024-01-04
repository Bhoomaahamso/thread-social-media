import { fetchUsers, getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import UserCard from "@/components/UserCard";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUser(user.id);
  if (!userInfo || userInfo.onboarded === false) redirect("/onboard");

  const result = await fetchUsers({ userId: user.id });
  console.log("usezs", result);
  return (
    <div>
      <div className="">
        <h1 className="text-heading1-bold m-6 ">Search</h1>
      </div>
      <div className="">
        {result.users.map((person) => (
          <>
            <UserCard
              key={person.id}
              id={person.id}
              name={person.name}
              username={person.username}
              imgUrl={person.image}
              personType="User"
            />
          </>
        ))}
      </div>
    </div>
  );
}
