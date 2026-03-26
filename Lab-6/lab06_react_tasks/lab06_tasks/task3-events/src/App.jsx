import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Space Grotesk', sans-serif;
    background: #0f0f13;
    color: #e8e8f0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wrapper { width: 100%; max-width: 560px; padding: 24px; }

  .page-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #43e97b;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .page-title { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
  .page-subtitle { font-size: 13px; color: #888899; margin-bottom: 28px; }

  .card {
    background: #1a1a24;
    border: 1px solid #2e2e42;
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 16px;
    transition: background 0.5s;
  }

  .card-title {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .action-btn {
    padding: 22px 14px;
    border-radius: 14px;
    border: 1px solid #2e2e42;
    background: #22222f;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #e8e8f0;
  }

  .action-btn:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(0,0,0,0.4); }

  .action-icon { font-size: 30px; margin-bottom: 10px; display: block; }

  .message-box {
    margin-top: 20px;
    padding: 14px 18px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    animation: pop 0.3s ease;
  }

  @keyframes pop {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }

  .events-card {
    background: rgba(67,233,123,0.05);
    border: 1px solid rgba(67,233,123,0.2);
    border-radius: 12px;
    padding: 16px 20px;
  }

  .events-title { font-size: 11px; color: #888899; font-weight: 600; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }

  .event-tags { display: flex; gap: 8px; flex-wrap: wrap; }

  .event-tag {
    background: #22222f;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    color: #43e97b;
    font-family: 'JetBrains Mono', monospace;
  }
`;

const COLORS = ["#6c63ff", "#ff6b6b", "#43e97b", "#f7971e", "#38bdf8", "#f472b6"];

function Actions() {
  const [message, setMessage]   = useState("");
  const [msgStyle, setMsgStyle] = useState({});
  const [bgTint, setBgTint]     = useState("transparent");
  const [msgKey, setMsgKey]     = useState(0);

  const fire = (msg, color) => {
    setMessage(msg);
    setMsgStyle({ background: color + "22", border: `1px solid ${color}55`, color });
    setMsgKey(k => k + 1);
  };

  const handleShowMessage = () => fire("🎉 Hello! The Show Message event was triggered!", "#6c63ff");

  const handleChangeColor = () => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    setBgTint(color + "18");
    fire(`🎨 Background changed to ${color}!`, "#f7971e");
  };

  const handleAlert = () => fire("🚨 Alert! This message was triggered by the Show Alert button.", "#ff6b6b");

  const buttons = [
    { label: "Show Message",  icon: "💬", action: handleShowMessage, hoverColor: "#6c63ff" },
    { label: "Change Color",  icon: "🎨", action: handleChangeColor, hoverColor: "#f7971e" },
    { label: "Show Alert",    icon: "🚨", action: handleAlert,       hoverColor: "#ff6b6b" },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="wrapper">
        <div className="page-tag">Task 3 · Event Handling</div>
        <div className="page-title">Interactive Buttons</div>
        <div className="page-subtitle">onClick, onMouseOver, and onMouseOut events in action</div>

        <div className="card" style={{ background: bgTint !== "transparent" ? bgTint : "" }}>
          <div className="card-title">🎮 Click a Button</div>

          <div className="action-grid">
            {buttons.map(({ label, icon, action, hoverColor }) => (
              <button
                key={label}
                className="action-btn"
                onClick={action}
                onMouseOver={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.borderColor = hoverColor + "66"; }}
                onMouseOut={e =>  { e.currentTarget.style.color = "#e8e8f0"; e.currentTarget.style.borderColor = "#2e2e42"; }}
              >
                <span className="action-icon">{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {message && (
            <div key={msgKey} className="message-box" style={msgStyle}>
              {message}
            </div>
          )}
        </div>

        <div className="events-card">
          <div className="events-title">Events Used</div>
          <div className="event-tags">
            {["onClick", "onMouseOver", "onMouseOut"].map(e => (
              <span key={e} className="event-tag">{e}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Actions;
