import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { forwardRef, useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

const ResumePreview = forwardRef((props, ref) => {
    const { resumeInfo } = useContext(ResumeInfoContext);
   
  
    return (
      <div
        ref={ref}
        className="shadow-lg h-full p-14 border-t-[20px]"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      >
        {/* Personal Detail */}
        <PersonalDetailPreview resumeInfo={resumeInfo} />
        {/* Summery */}
        <SummeryPreview resumeInfo={resumeInfo} />
        {/* Professional Experience */}
        {resumeInfo?.experience?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}
        {/* Educational */}
        {resumeInfo?.education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
        {/* Skills */}
        {resumeInfo?.skills?.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
      </div>
    );
  });
  
  export default ResumePreview;