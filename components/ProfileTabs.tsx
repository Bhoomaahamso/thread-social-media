"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants/menuOptions";
import Image from "next/image";
import ThreadTab from "@/components/ThreadTab";

const ProfileTabs = ({user, userInfo, data}: any) => {

    console.log('lll', data)
  return (
    <>
     <Tabs defaultValue="threads" className="w-full ">
          <TabsList className="w-full">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} className="flex-1 " value={tab.value}>
                <Image src={tab.icon} alt={tab.label} width={24} height={24} />
                <p className="max-sm:hidden">{tab.label}</p>
              </TabsTrigger>
            ))}
            {/* <TabsTrigger className="flex-1 " value="replies">
              Replies
            </TabsTrigger> */}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent key={tab.label} value="threads">
              {/* Make changes to your account here. */}
              <ThreadTab
                currentUserId={user?.id}
                accountId={userInfo?.id}
                accountType="User"
                data={data}
              />
            </TabsContent>
          ))}
          <TabsContent value="replies">Change your password here.</TabsContent>
        </Tabs>
    </>
  )
}
export default ProfileTabs