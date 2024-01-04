import CommentForm from "@/components/CommentForm";
import ThreadCard from "@/components/ThreadCard";
import { getThreadById } from "@/lib/actions/thread.actions";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const thread = await getThreadById(params.id);
  console.log("first thread", thread);

  const ch = thread.children;

  const userInfo = await getUser(user.id);
  if (!userInfo) return null;

  const author = {
    name: thread.author.name,
    image: thread.author.image,
    id: thread.author.id,
  };
  return (
    <div className="">
      <div className="">
        <ThreadCard
          key={thread._id}
          id={thread._id.toString()}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={author}
          community={thread.community}
          createdAt={thread.createdAt}
          // comments={thread.children}
        />
      </div>

      <div className="mt-4">
        <CommentForm
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="">
        {ch.map((comment) => {
          return (
            <div className="">
              <ThreadCard
                key={comment._id}
                id={comment._id.toString()}
                currentUserId={user.id}
                parentId={comment.parentId}
                content={comment.text}
                author={author}
                community={comment.community}
                createdAt={comment.createdAt}
                // comments={comment.children}
                isComment
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
