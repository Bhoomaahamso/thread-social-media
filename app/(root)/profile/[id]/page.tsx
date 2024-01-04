import { fetchUserPosts, getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import ProfileHeader from "@/components/ProfileHeader";
import { redirect, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants/menuOptions";
import Image from "next/image";
import ThreadTab from "@/components/ThreadTab";
import ProfileTabs from "@/components/ProfileTabs";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUser(params.id);
  if (!userInfo || userInfo.onboarded === false) redirect("/onboard");

  //   const profile = await getProfile(params.id);
  const data = await fetchUserPosts(userInfo.id);
  console.log("postsss", data);

  return (
    <div className="">
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mx-8">
       <ProfileTabs user={user} userInfo={userInfo} data={JSON.parse(JSON.stringify(data))} />
      </div>
    </div>
  );
}
