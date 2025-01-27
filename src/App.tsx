import "./App.css";
import { useState} from "react";

export default function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const fetchPredictions = async () => {
    if (!name.trim()) {
      alert("Invalid Name - Please enter a valid name.");
      return;
    }
    try {
          const ageResponse = await fetch(`https://api.agify.io/?name=${name}`);
          const genderResponse = await fetch(`https://api.genderize.io/?name=${name}`);
          const ageData = await ageResponse.json();
          const genderData = await genderResponse.json();


          if(ageData.age){
            setAge(ageData.age);
          }else{
          alert("Unable to predict age.");
        }
          
          if(genderData.gender){
            setGender(genderData.gender);
          }else{
            alert("Unable to predict  gender.");
          }
    } catch (e) {
          console.error("Error fetching predictions:", e);
          alert("Failed to fetch predictions. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="header">Age & Gender Predictor</h1>
        <input
          type="text"
          placeholder="Enter a name...."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
        />
        <button className="predict" onClick={fetchPredictions}>Predict</button>
        {age !== null && (<p className="result">Predicted Age: {age}</p>)}
        {gender !== null && (<p className="result">Predicted Gender: {gender}</p>)}
      </div>
    </div>
  );
}
