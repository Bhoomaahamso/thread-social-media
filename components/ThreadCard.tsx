"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments?: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

export default function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  isComment = false,
}: Props) {
  if (!author) return null;
  // console.log('author', author.id);
  return (
    <div className="">
      <div
        className={`flex gap-4 p-6  mx-4  rounded ${
          !isComment &&
          "mt-8 bg-slate-900 border-2 border-solid border-slate-700"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className=" w-9">
            <Link href={`/profile/${author.id}`} className="">
              <Image
                className="rounded-full"
                src={author.image}
                width={36}
                height={36}
                alt={"image"}
              />
            </Link>
          </div>
          <div className="mt-1 bg-slate-600 h-full w-[1px]" />
        </div>
        <div className="text-gray-300">
          <Link href={`/profile/${author.id}`} className="w-fit">
            <h2 className="w-fit text-heading4-medium">{author.name}</h2>
          </Link>
          <div className="mt-3">
            <p>{content}</p>
            {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p> */}
          </div>
          <div className="flex gap-4 mt-4 cursor-pointer">
            {/* <Image
              src={"/assets/heart-gray.svg"}
              width={24}
              height={24}
              alt=""
            /> */}
            <Link href={`/thread/${id}`}>
              {/* <Image src={"/assets/reply.svg"} width={24} height={24} alt="" /> */}
              <Button className="flex items-center rounded-full text-small-regular h-[32px]  bg-purple-700 hover:bg-purple-800">
                Reply
              </Button>{" "}
            </Link>
            {/* <Image src={"/assets/repost.svg"} width={24} height={24} alt="" />
            <Image src={"/assets/share.svg"} width={24} height={24} alt="" /> */}
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
