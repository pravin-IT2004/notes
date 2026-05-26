import { useState } from "react";

function NotesForm({ addNote }) {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("bullet");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject || !topic) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          topic,
          type, // ✅ IMPORTANT FIX
          generatedText: `Notes for ${subject} - ${topic} (${type})`,
        }),
      });

      const data = await res.json();

      addNote(data);

      setSubject("");
      setTopic("");
      setType("bullet");
    } catch (error) {
      console.log("Error saving note:", error);
    }

    setLoading(false);
  };

  return (
    <div className="card input-card">
      <h3>Generate Notes</h3>

      {/* SUBJECT */}
      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      {/* TOPIC */}
      <input
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      {/* TYPE SELECTION (NEW IMPORTANT FEATURE) */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="bullet">Bullet Points</option>
        <option value="qa">Q & A</option>
        <option value="detailed">Detailed Notes</option>
      </select>

      <button
        className="btn-primary full"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}

export default NotesForm;