// import React, { useState } from "react";
// import "./Chatbot.css";
// import { Link } from "react-router-dom";

// const ChatbotPage = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hello! How can I assist you today?", sender: "bot" },
//   ]);
//   const [input, setInput] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (input.trim() === "") return;

//     const newMessage = { text: input, sender: "user" };
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/api/v1/chatbot/query", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userQuery: input }),
//       });

//       const data = await response.json();
//       console.log(data.content)
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: data.data.content, sender: "bot" },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="chatbot-container">
//       {/* Profile Icon */}
//       <div className="profile-container">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//           alt="Profile"
//           className="profile-icon"
//           onClick={() => setProfileOpen(!profileOpen)}
//         />
//         {profileOpen && (
//           <div className="profile-dropdown">
//             <ul>
//               <Link to="/editprofilepage"><li>Edit Profile</li></Link>
//               <li>Settings</li>
//               <li>Logout</li>
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Sidebar Toggle Button */}
//       <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
//         ☰
//       </button>

//       {/* Sidebar */}
//       <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//         <div className="random">
//           <ul>
//             <li>Menu</li>
//             <li>Home</li>
//             <li>Settings</li>
//             <li>Help</li>
//           </ul>
//         </div>
//       </div>

//       {/* Chatbot UI */}
//       <div className="chatbot">
//         <div className="chat-header">Bridge AI</div>
//         <div className="chat-messages">
//           {messages.map((msg, index) => (
//             <div key={index} className={`message ${msg.sender}`}>
//               {msg.text}
//             </div>
//           ))}
//           {loading && <div className="message bot">Typing...</div>}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button onClick={handleSend} disabled={loading}>
//             {loading ? "Processing..." : "➤"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatbotPage;


import React, { useState } from "react";
import "./Chatbot.css";
import { Link } from "react-router-dom";
const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [profiles, setProfiles] = useState([]); // Store extracted profiles
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/v1/chatbot/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery: input }),
      });

      const data = await response.json();
      console.log(data);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.data.content, sender: "bot" },
      ]);

      // If profiles exist, update state
      if (data.data.profiles && data.data.profiles.length > 0) {
        setProfiles(data.data.profiles);
      }

    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      {/* Profile Icon */}
      <div className="profile-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Profile"
          className="profile-icon"
          onClick={() => setProfileOpen(!profileOpen)}
        />
        {profileOpen && (
          <div className="profile-dropdown">
            <ul>
              <Link to="/editprofilepage"><li>Edit Profile</li></Link>
              <li>Settings</li>
              <Link to="/logoutpage"><li>Logout</li></Link>
            </ul>
          </div>
        )}
      </div>

      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="random">
          <ul>
            <li>Menu</li>
            <li>Home</li>
            <li>Settings</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      {/* Chatbot UI */}
      <div className="chatbot">
        <div className="chat-header">Bridge AI</div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="message bot">Typing...</div>}
          {/* Display Profile Links */}
          {profiles.length > 0 && (
            <div className="profiles-section">
              <h3>Profiles Found:</h3>
              {profiles.map((profile, index) => (
                <div key={index} className="profile-link">
                  <p><strong>{profile.name}</strong></p>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  {" | "}
                  <a href={profile.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? "Processing..." : "➤"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
