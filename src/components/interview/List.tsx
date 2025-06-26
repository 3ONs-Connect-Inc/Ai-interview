import { Link } from "react-router-dom";
import "../../styles/interview/list.scss";
import Button from "../ui/Button";

const List = () => {
  return (
    <div className="list">
      <h1 className="list__title">Hello Jane, your async interview is ready</h1>

      <div className="list__intro">
        <p>Welcome to your one-way video interview for the Product Manager role at Acme Corp.</p>
        <p><strong>Instructions:</strong> Each question will be revealed only after you start recording. You’ll have up to 10 minutes per response. Your webcam must remain active throughout. Be natural, and speak directly as if you’re in a real conversation.</p>
      </div>

      {[1, 2, 3].map((num) => (
        <div className="list__question-block" key={num}>
          <div className="list__interviewer">
            <img src={`interviewer${num}.jpg`} alt={`Interviewer ${num}`} className="list__avatar" />
            <strong className="list__name">
              {num === 1 && 'Sarah Johnson, Head of Product'}
              {num === 2 && 'David Lee, Engineering Director'}
              {num === 3 && 'Nina Patel, Group Product Manager'}
            </strong>
          </div>
          <h3 className="list__question-title">Question {num}</h3>
          <div  className="list__question-text">
            {num === 1 && "Tell us about a project you're most proud of and the impact it had."}
            {num === 2 && "Describe a time you had to resolve a conflict within your team. What did you do?"}
            {num === 3 && "In your experience, how do you balance short-term delivery pressure with long-term product vision?"}
          </div>
          <div className="list__timer" >Time Remaining: 10:00</div>
          <Link to="/interview-system-check">
          <Button 
          label="Start Recording" 
           className="list__button" 
           />
          </Link>
         
        </div>
      ))}

      <button className="list__submit">Submit Interview</button>
    </div>
  );
};

export default List;

