import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

export default async function Page({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: Props) {
  return (
    <div className="m-8 ">
      <div className="flex items-center">
        <div className="rounded w-24 h-24">
          <Image src={imgUrl} width={96} height={96} alt={username} className="rounded-full" />
        </div>
        <div className="m-4">
          <h3>{name}</h3>
          <p>@{username}</p>
        </div>
      </div>
      <div className="my-8 w-full bg-slate-800 h-[2px]" />
      <div className="">
        <p>{bio}</p>
      </div>
    </div>
  );
}
