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

  .wrapper { width: 100%; max-width: 480px; padding: 24px; }

  .page-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #6c63ff;
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
    padding: 32px;
    margin-bottom: 16px;
  }

  .counter-display {
    text-align: center;
    padding: 36px 20px;
    background: #22222f;
    border-radius: 12px;
    margin-bottom: 28px;
  }

  .counter-number {
    font-family: 'JetBrains Mono', monospace;
    font-size: 96px;
    font-weight: 700;
    line-height: 1;
    background: linear-gradient(135deg, #6c63ff, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .counter-label {
    color: #888899;
    font-size: 12px;
    margin-top: 10px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 2px;
  }

  .btn-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  .btn {
    padding: 11px 28px;
    border-radius: 10px;
    border: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
  }

  .btn:disabled { opacity: 0.35; cursor: not-allowed; }

  .btn-inc { background: rgba(67,233,123,0.15); color: #43e97b; border: 1px solid rgba(67,233,123,0.3); }
  .btn-inc:hover:not(:disabled) { background: rgba(67,233,123,0.25); transform: translateY(-1px); }

  .btn-dec { background: rgba(255,107,107,0.15); color: #ff6b6b; border: 1px solid rgba(255,107,107,0.3); }
  .btn-dec:hover:not(:disabled) { background: rgba(255,107,107,0.25); transform: translateY(-1px); }

  .btn-reset { background: #22222f; color: #e8e8f0; border: 1px solid #2e2e42; }
  .btn-reset:hover { background: #2e2e42; transform: translateY(-1px); }

  .warning { text-align: center; font-size: 12px; color: #ff6b6b; margin-bottom: 16px; }

  .info-card {
    background: rgba(108,99,255,0.06);
    border: 1px solid rgba(108,99,255,0.2);
    border-radius: 12px;
    padding: 18px 20px;
  }

  .info-title { font-size: 12px; color: #888899; margin-bottom: 8px; font-weight: 600; }
  .info-text { font-size: 13px; color: #888899; line-height: 1.7; }

  code {
    color: #6c63ff;
    background: #22222f;
    padding: 2px 6px;
    border-radius: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
  }
`;

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => Math.max(0, c - 1));
  const reset = () => setCount(0);

  return (
    <>
      <style>{css}</style>
      <div className="wrapper">
        <div className="page-tag">Task 1 · React State</div>
        <div className="page-title">Counter Application</div>
        <div className="page-subtitle">Manage dynamic data with useState</div>

        <div className="card">
          <div className="counter-display">
            <div className="counter-number">{count}</div>
            <div className="counter-label">CURRENT COUNT</div>
          </div>

          {count === 0 && (
            <div className="warning">⚠ Count cannot go below 0</div>
          )}

          <div className="btn-row">
            <button className="btn btn-inc" onClick={increment}>＋ Increment</button>
            <button className="btn btn-dec" onClick={decrement} disabled={count === 0}>− Decrement</button>
            <button className="btn btn-reset" onClick={reset}>↺ Reset</button>
          </div>
        </div>

        <div className="info-card">
          <div className="info-title">💡 How It Works</div>
          <div className="info-text">
            Uses <code>useState(0)</code> to store the count. Increment adds 1, Decrement subtracts 1
            (minimum 0), and Reset returns the count back to 0.
          </div>
        </div>
      </div>
    </>
  );
}

export default Counter;
