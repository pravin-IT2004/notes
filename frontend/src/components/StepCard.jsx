function StepCard({ number, title, desc }) {
  return (
    <div className="card step">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default StepCard;