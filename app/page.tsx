import CheckAuth from "@/components/CheckAuth";
import Image from "next/image";
import Smiley from "../public/yellow-smiley.png";
import Logout from "@/components/Logout";
import WelcomeMessage from "@/components/WelcomeMessage";

export default function Home() {
  return (
    <CheckAuth>
      <div className="mt-24">
        <WelcomeMessage />

        <div className="flex justify-center items-center">
          <Image
            width={300}
            height={300}
            src={Smiley}
            alt="Very happy yellow smiley"
          ></Image>
        </div>

        <Logout />
      </div>
    </CheckAuth>
  );
}
