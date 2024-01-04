"use client"

import { fetchUserPosts } from "@/lib/actions/user.actions";
import ThreadCard from "./ThreadCard";

const ThreadTab = ({
  currentUserId,
  accountId,
  accountType,
  data
}: {
  currentUserId: string;
  accountId: string;
  accountType: string;
  data: any;
}) => {
  // const result = await fetchUserPosts(accountId);
  // console.log("postsss", result);
  const result = data;
  return (
    <div>
      {result &&
        result.threads.reverse().map((thread) => (
          <div className="">
            <ThreadCard
              key={thread._id}
              id={thread._id.toString()}
              currentUserId={currentUserId}
              parentId={thread.parentId}
              content={thread.text}
              author={
                accountType === "User"
                  ? { name: result.name, image: result.image, id: result.id }
                  : {
                      name: thread.author.name,
                      image: thread.author.image,
                      id: thread.author.id,
                    }
              }
              community={thread.community}
              createdAt={thread.createdAt}
              // comments={post.children}
            />
          </div>
        ))}
    </div>
  );
};
export default ThreadTab;
