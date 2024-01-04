import AccountDetails from "@/components/AccountDetails";
import { currentUser } from "@clerk/nextjs";
import { getUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if(!user) redirect('/sign-up');

  // console.log(user);
  const userData = await getUser(user.id); // from DB
  if(userData.onboard === true) redirect('/');

  const userInfo = {
    id: user?.id,
    name: userData?.name || user?.firstName,
    username: userData?.username || user?.username,
    bio: userData?.bio || "",
    profile: userData?.profile_image || user?.imageUrl,
  };
  return (
    <>
      <main className="p-8 text-white w-full box-border">
        <div className="">
          <h3 className="text-2xl ">Onboard</h3>
          <p className="my-2">Please fill the following details</p>
        </div>
        <div className="bg-slate-500 p-10 m-10 max-w-full rounded">
          <AccountDetails user={userInfo} />
        </div>
      </main>
    </>
  );
}
