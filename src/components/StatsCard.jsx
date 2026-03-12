import React from 'react';

function StatsCard({ title, value, icon, color, trend }) {
  const colors = {
    primary: 'linear-gradient(135deg, #4361ee, #4cc9f0)',
    info: 'linear-gradient(135deg, #4895ef, #4cc9f0)',
    danger: 'linear-gradient(135deg, #f72585, #b5179e)',
    success: 'linear-gradient(135deg, #06d6a0, #4895ef)',
    warning: 'linear-gradient(135deg, #ffbe0b, #fb5607)'
  };

  return (
    <div className="stat-card">
      <div className="stat-icon" style={{background: colors[color]}}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="stat-label">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-trend">
        <i className="bi bi-arrow-up-circle-fill"></i>
        {trend}
      </div>
    </div>
  );
}

export default StatsCard;