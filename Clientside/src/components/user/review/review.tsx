import "./review.css";
import { useState } from "react";
import { ChangeEvent,FormEvent } from "react";





function ReviewModal() {
  const [content, setContent] = useState<string>("");

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handlePost = (e:FormEvent) => {
    e.preventDefault()

    console.log("reviewsubmitted");
    console.log("lallalsasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal");
    
  };

  return (
    
    <div className="specific-page"  >
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
