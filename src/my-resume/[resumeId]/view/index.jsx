import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../service/GlobalApi";
import Header from "@/components/ui/custom/Header";
import { Button } from "@/components/ui/button";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import { RWebShare } from "react-web-share";
import ReactToPrint from "react-to-print";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumid } = useParams();
  const componentRef = useRef();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumid).then((resp) => {
      console.log(resp.data);
      setResumeInfo(resp.data);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share the unique
            resume URL with your friends and family.
          </p>
          <div className="flex justify-between px-44 my-10">
            <ReactToPrint
              trigger={() => <Button>Download</Button>}
              content={() => componentRef.current}
            />

            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open the URL to see it",
                url: `/my-resume/${resumid}/view`,
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
              }}
              onClick={() => console.log("Shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview ref={componentRef} />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
