"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import connectToDB from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Param {
  userId: string;
  name: string;
  username: string;
  bio: string;
  image: string;
  path: string;
}

export const updateUser = async ({
  userId,
  name,
  username,
  bio,
  image,
  path,
}: Param) => {
  try {
    connectToDB();

    const user = await User.findOneAndUpdate(
      { id: userId },
      {
        id: userId,
        name,
        username,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    // console.log("user created", user);

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error) {}
};

export const getUser = async (userId: string) => {
  try {
    await connectToDB();
    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error("Could not find user: " + error.message);
  }
};

export const getProfile = async (userId: string) => {
  try {
    await connectToDB();
    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error("Could not find profile: " + error.message);
  }
};

export const fetchUserPosts = async (id: string) => {
  try {
    connectToDB();

    const threads = await User.findOne({ id: id })
      // .sort({ createdAt: "desc" })
      .populate({
        path: "threads",
        model: Thread,
        populate: [
          // {
          //   path: "community",
          //   model: Community,
          //   select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
          // },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "name image id", // Select the "name" and "_id" fields from the "User" model
            },
          },
        ],
      });
    return threads;
  } catch (error) {
    throw new Error("Could not find posts by user");
  }
};

export const fetchUsers = async ({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) => {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      // id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const users: FilterQuery<typeof User> = await User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error("Could not fetch Users" + error.message);
  }
};

export const getActivity = async (userId: string) => {
  try {
    connectToDB();

    const threads = await Thread.find({ author: userId });

    const childrenThreads = threads.reduce((acc, thread) => {
      return acc.concat(thread.children);
    }, []);

    const result = await Thread.find({
      _id: { $in: childrenThreads },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });
    return result;
  } catch (error: any) {
    throw new Error("Could not get Activity- " + error.message);
  }
};
