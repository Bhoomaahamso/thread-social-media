"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import connectToDB from "../mongoose";
import { getUser } from "./user.actions";
import User from "../models/user.model";

interface Params {
  userId: string;
  text: string;
  path: string;
}

export async function createThread({ userId, text, path }: Params) {
  try {
    connectToDB();

    const thread = await Thread.create({
      author: userId,
      text: text,
    });

    const user = await User.findOne({ _id: userId });
    console.log('this user', user);
    await user.threads.push(thread._id);
    user.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function addComment({
  threadId,
  currentUserId,
  text,
  path,
}: {
  threadId: string;
  currentUserId: string;
  text: string;
  path: string;
}) {
  try {
    connectToDB();

    const thread = await Thread.findOne({ _id: threadId });
    console.log('ttttt', thread)
    if (!thread) throw new Error("Could not find thread");

    const newThread = await Thread.create({
      author: JSON.parse(currentUserId),
      text: text,
      parentId: threadId
    });

    await thread.children.push(newThread._id)
    thread.save();
    revalidatePath(path);
  } catch (error: any) {
    throw new Error("Error creating comment: " + error.message);
  }
}

export async function getThreadById(id: string) {
  connectToDB();

  const thread = await Thread.findById(id)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "children",
      model: Thread,
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    })
    .exec();

  return thread;
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
      select: "_id id name parentId image", // i added
    })
    // .populate({
    //   path: "community",
    //   model: Community,
    // })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Count the total number of top-level posts (threads) i.e., threads that are not comments.
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const posts = await postsQuery.exec();
  // console.log('count',posts)

  const isNext = totalPostsCount > skipAmount + posts.length;
  // return posts;
  return { posts, isNext };
}
