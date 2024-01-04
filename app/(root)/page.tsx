import ThreadCard from "@/components/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect('/sign-up');

  const result = await fetchPosts();

  return (
    <>
      <section className="bg-dark-1 flex-1 text-white">
        <div className=" p-1 rounded m-4 flex-1">
          {result.posts.length === 0 ? (
            <p className="no-result">No threads found</p>
          ) : (
            <>
              {result.posts.map((post) => {
                const author = {
                  name: post.author.name,
                  image: post.author.image,
                  id: post.author.id
                }
                return(
                <ThreadCard
                  key={post._id}
                  id={post._id.toString()}
                  currentUserId={user.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={author}
                  community={post.community}
                  createdAt={post.createdAt}
                  // comments={post.children}
                />
              )})}
            </>
          )}
        </div>
      </section>
    </>
  );
}

/*
{
  _id: new ObjectId("651fb02b09e3b973d8899202"),
  text: 'test2',
  author: {
    _id: new ObjectId("651ec03146e7d12506d5de07"),
    id: 'user_2VIobH2eznTZGIoiVVQSByOabTx',
    __v: 2,
    bio: 'kjbkjbk',
    communities: [],
    image: 'https://utfs.io/f/650feb19-dca8-4297-b4c5-5d11596a94ac-17vq0.PNG',
    name: 'Pika',
    onboarded: true,
    threads: [ null, new ObjectId("651fb02b09e3b973d8899202") ],
    username: 'pika'
  },
  children: [],
  createdAt: 2023-10-06T06:58:51.336Z,
  __v: 0
}
*/
