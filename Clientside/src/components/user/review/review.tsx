import "./review.css";
import { useState } from "react";
import { ChangeEvent,FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../axiosInstances/userInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function ReviewModal() {
  const nav=useNavigate()
  const [content, setContent] = useState<string>("");

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };


  const userData = localStorage.getItem('userData')
  const userDatajson=userData?JSON.parse(userData):null;
 console.log(userDatajson.user._id);
 const id=userDatajson.user._id
 

  




  const handlePost = (e:FormEvent) => {
    console.log("post submitted");
    
    e.preventDefault()
    axiosInstance.post(`/review/${id}`,{content}).then((response)=>{
      console.log(response.data);
      toast.success(response.data.message)
      setTimeout(()=>{
        nav('/userhome')

      },2000)
    
      
    })
    .catch((error)=>{
     toast.error(error)
      
      
    })



  };

  return (
    
    <div className="specific-page"  >
        <ToastContainer />
   <div className="review-container">
        <div className="post">
          <div className="text">Thanks for rating us!</div>
        </div>

        <form className="review-form"  onSubmit={handlePost}>
          <header></header>
          <div className="textarea">
            <textarea
              value={content}
              onChange={handleContentChange}
              cols={30}
              placeholder="Describe your experience.."
            ></textarea>
          </div>
          <div className="btn">
            <button type="submit" >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
