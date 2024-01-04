import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
  return (
    <div className="flex justify-between items-center m-4 p-2 bg-dark-2 rounded">
      <div className="flex">
        <div className="mr-2">
          <Image
            src={imgUrl}
            alt={name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-base-semibold">{name}</h1>
          <p className="text-small-regular">@{username}</p>
        </div>
      </div>
      <Link href={`/profile/${id}`}>
        <Button className="bg-purple-700">View</Button>
      </Link>
    </div>
  );
};
export default UserCard;
