function FeatureCard({ title, desc, icon }) {
  return (
    <div className="card">
      {icon && <div style={{ fontSize: "28px" }}>{icon}</div>}
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default FeatureCard;