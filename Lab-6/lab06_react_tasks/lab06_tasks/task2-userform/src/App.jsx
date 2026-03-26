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

  .wrapper { width: 100%; max-width: 500px; padding: 24px; }

  .page-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #f7971e;
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
  }

  .card-title {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .label {
    font-size: 11px;
    font-weight: 600;
    color: #888899;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
    display: block;
  }

  .input {
    width: 100%;
    padding: 12px 16px;
    background: #22222f;
    border: 1px solid #2e2e42;
    border-radius: 10px;
    color: #e8e8f0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 16px;
  }

  .input:focus { border-color: #f7971e; }
  .input::placeholder { color: #555566; }

  .btn-row { display: flex; gap: 10px; margin-top: 4px; }

  .btn {
    padding: 11px 24px;
    border-radius: 10px;
    border: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
  }

  .btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .btn-submit { background: #f7971e; color: #0f0f13; }
  .btn-submit:hover:not(:disabled) { background: #ffab40; transform: translateY(-1px); }

  .btn-clear { background: #22222f; color: #e8e8f0; border: 1px solid #2e2e42; }
  .btn-clear:hover { background: #2e2e42; }

  .result-card {
    background: rgba(247,151,30,0.07);
    border: 1px solid rgba(247,151,30,0.25);
    border-radius: 16px;
    padding: 24px 28px;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .result-title {
    font-size: 13px;
    font-weight: 700;
    color: #f7971e;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .result-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #2e2e42;
    font-size: 14px;
  }

  .result-row:last-child { border-bottom: none; }
  .result-key { color: #888899; }
  .result-val { color: #e8e8f0; font-weight: 600; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
`;

function UserForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) return;
    setSubmitted({ name, email });
    setName("");
    setEmail("");
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setSubmitted(null);
  };

  const isReady = name.trim() && email.trim();

  return (
    <>
      <style>{css}</style>
      <div className="wrapper">
        <div className="page-tag">Task 2 · State + Event Handling</div>
        <div className="page-title">User Form App</div>
        <div className="page-subtitle">Controlled inputs with onChange and Submit handling</div>

        <div className="card">
          <div className="card-title">📋 Fill In Your Details</div>

          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            placeholder="Enter your full name..."
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <div className="btn-row">
            <button className="btn btn-submit" onClick={handleSubmit} disabled={!isReady}>
              Submit →
            </button>
            <button className="btn btn-clear" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>

        {submitted && (
          <div className="result-card">
            <div className="result-title">✅ Submitted Data</div>
            <div className="result-row">
              <span className="result-key">Name</span>
              <span className="result-val">{submitted.name}</span>
            </div>
            <div className="result-row">
              <span className="result-key">Email</span>
              <span className="result-val">{submitted.email}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserForm;
