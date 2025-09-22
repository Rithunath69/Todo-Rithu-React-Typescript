import {useState} from 'react'
import TodoApp from './todo'
export default function Popup()
{
    const [showPopup, setShowPopup] = useState(true);
    const [time, setTime] = useState("")
    function updateTime()
    {
        // Logic to update the time frame
    }
    return(
        <div className={`popup ${showPopup ? 'show' : ''}`}>
            <div className="popup-content">
                <h2>Edit Time frame</h2>
                <input
                    type="number"
                    min="1"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder={time}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            updateTime();
                        }
          }}/>
                <button onClick={() => {setShowPopup(false)
                    setShowPopup(false)
                    if (time.trim() === "") {
                        alert("Please enter a valid time frame");
                        return;
                    }
                    alert(`Time frame updated to ${time}`);
                }}>Update</button>
            </div>
        </div>
    );
}