import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { isAIConfigured, sendMessageWithHandling } from './../../../../service/AIModal';
import { toast } from 'sonner';
const PROMPT='position title: {positionTitle}. Based on the position title, give me 5-7 concise bullet points for resume experience (no experience level labels and no JSON array). Return valid HTML list items (e.g., <ul><li>...</li></ul>).'
function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
    const [value,setValue]=useState(defaultValue);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [loading,setLoading]=useState(false);
    const GenerateSummeryFromAI=async()=>{
     
      if(!resumeInfo?.experience?.[index]?.title)
      {
        toast('Please Add Position Title');
        return ;
      }
      setLoading(true)
      const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title);
      try {
        const result = await sendMessageWithHandling(prompt);
        const resp = result.response.text();
        setValue(resp.replace('[','').replace(']',''));
      } catch (e) {
        const msg = typeof e?.message === 'string' && e.message.includes('429')
          ? 'AI rate limit exceeded. Please wait a minute and try again, or configure your own API key.'
          : (e.code === 'AI_NOT_CONFIGURED' ? 'AI is not configured. Set VITE_GOOGLE_AI_API_KEY in your .env.' : 'Failed to generate content. Please try again.');
        toast(msg);
      } finally {
        setLoading(false);
      }
    }
  
    return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        disabled={loading}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Brain className='h-4 w-4'/> Generate from AI 
           </>
        }
         </Button>
      </div>
    <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value);
        onRichTextEditorChange(e)
      }}>
         <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
         
         
        </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor