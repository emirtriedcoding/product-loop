import Feedback from "@/components/feedback/Feedback"

export const metadata = {
    title : "پروداکت لوپ - انتقادات و پیشنهادات"
}

const FeedbackPage = () => {
  return (
    <div className="flex justify-center h-screen p-5" >
       <Feedback />
    </div>
  )
}

export default FeedbackPage