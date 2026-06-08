export default function StatCard({ icon, label, value, colorClass = 'purple', change, changePct }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${colorClass}`}>{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {changePct !== undefined && (
        <div className={`stat-change ${changePct >= 0 ? 'positive' : 'negative'}`}>
          {changePct >= 0 ? '↑' : '↓'} {Math.abs(changePct)}% {change}
        </div>
      )}
    </div>
  );
}
