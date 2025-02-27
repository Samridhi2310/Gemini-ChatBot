import Image from "next/image";
import DataRequest from "./dataRequest";

export default function Home() {
  return(
   <div className="bg-[url(/chatbot.png)] bg-fixed min-h-screen ">
    <DataRequest/>
   </div>
  );
  }

