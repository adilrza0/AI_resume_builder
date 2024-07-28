import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "../../../service/GlobalApi";
import { useNavigate } from "react-router-dom";


export default function AddResume() {
  const [openDialog, setDialog] = useState(false);
  const [loading,setLoading] = useState(false)
  const [resumeTitle,setResumeTitle] = useState()
  const navigate = useNavigate()



  const onCreate=()=>{
    setLoading(true)
    GlobalApi.CreateNewResume({jobTitle:resumeTitle})
    .then((res)=>{
      if(res){
        setLoading(false)
        navigate(`/dashboard/resume/${res.data._id}/edit`)
      }
    })
    .catch((err)=>{
      setLoading(false)
      console.error(err)
    })
  }
  return (
    <div>
      <div
        className="p-14 py-24 items-center flex justify-center bg-secondary
         rounded-lg mt-10 h-[280px] hover:scale-1105 transition-all hover:shadow-md 
         cursor-pointer border-dashed"
        onClick={() => setDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
       
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Resume</DialogTitle>
            <DialogDescription>
                <p>Add title for you new resume</p>
              <Input className='my-2' placeholder="Ex.Ful lStack resume" onChange={(e)=>setResumeTitle(e.target.value)} />
            </DialogDescription>
            <div className="flex justify-end gap-5">
                <Button variant="ghost" onClick={()=>setDialog(false)} >Cancel</Button>
                <Button disabled={!resumeTitle} onClick={onCreate}>{loading?<Loader2 className="animate-spin"/>: 'Create'}</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
