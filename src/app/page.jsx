import Image from "next/image";
import DataRequest from "./components/dataRequest";
import FormData from "./components/formData";
import Schemavalidation from "./components/schemavalidation";

export default function Home() {
  return(
   <div className="bg-[url(/chatbot.png)] bg-cover min-h-screen ">
    {/* <DataRequest/> */}
    <FormData/>
    {/* <Schemavalidation/> */}
   </div>
  );
  }

