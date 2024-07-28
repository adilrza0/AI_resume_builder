import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import axios from "axios";
export default function Dashboard() {
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    GetResumesList();
  }, []);

  const GetResumesList = () => {
    GlobalApi.GetUserResumes().then((resp) => {
      console.log(resp.data);
      setResumeList(resp.data);
    });
    // axios.get("http://localhost:4500/resume",{headers:{
    //   'Content-Type':'application/json',
    //   'Authorization':`${localStorage.getItem('token')}`}
    // })
    // .then((resp) => {
    //   console.log(resp.data);
    //   setResumeList(resp.data);
    // });
  };
  return (
    <div className="p-0 md:px-20 lg:px-32">
      <h2 className=" font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to you next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <AddResume />
        {
          resumeList.map((resume, index) => (
              <ResumeCardItem
                resume={resume}
                key={index}
                refreshData={GetResumesList}
              />
            ))
          // : [1, 2, 3, 4].map((item, index) => (
          //     <div className="h-[280px] rounded-lg bg-slate-200 animate-pulse"></div>
          //   ))
          }
      </div>
    </div>
  );
}
