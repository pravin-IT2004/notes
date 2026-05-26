import { useState, useEffect } from "react";
import "./App.css";
import FeatureCard from "./components/FeatureCard";
import StepCard from "./components/StepCard";
import NotesForm from "./components/NotesForm";
import NotesList from "./components/NotesList";

const FEATURES = [
  {
    title: "📄 Smart Notes",
    desc: "Convert long content into clean, structured study notes instantly.",
  },
  {
    title: "🧠 AI Summarization",
    desc: "Advanced AI simplifies complex topics into easy explanations.",
  },
  {
    title: "⚡ Fast Output",
    desc: "Generate notes in seconds with multiple formats.",
  },
  {
    title: "⬇️ Export Anytime",
    desc: "Download or copy notes for offline study.",
  },
];

const STEPS = [
  {
    number: "1",
    title: "Enter Topic",
    desc: "Provide subject name, topic, or paste content.",
  },
  {
    number: "2",
    title: "Choose Format",
    desc: "Select notes type like bullet points, Q & A, or detailed notes.",
  },
  {
    number: "3",
    title: "Generate",
    desc: "Click generate and get AI-powered study notes instantly.",
  },
];

function App() {
  const [notes, setNotes] = useState([]);

  // =========================
  // LOAD NOTES FROM MONGODB
  // =========================
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.log("Error loading notes:", err);
      }
    };

    fetchNotes();
  }, []);

  // =========================
  // ADD NOTE (SAVE TO DB)
  // =========================
  const addNote = async (note) => {
    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      const data = await res.json();
      setNotes((prev) => [data, ...prev]);
    } catch (err) {
      console.log("Add note error:", err);
    }
  };

  // =========================
  // DELETE NOTE (DB + UI)
  // =========================
  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
      });

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="container header-container">
          <a href="#home" className="logo">
            Notes<span>Generator</span><em>.</em>
          </a>

          <nav className="nav">
            <a href="#features">Features</a>
            <a href="#how">How it Works</a>
            <a href="#generator">Generate</a>
          </nav>

          <a href="#generator" className="btn-primary">
            Try Now
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-content container">
          <h1>
            AI-Powered <span>Study Notes</span> Generator
          </h1>

          <p>
            Turn any topic, textbook content, or syllabus into clear,
            structured and exam-ready notes instantly using AI.
          </p>

          <div className="hero-buttons">
            <a href="#generator" className="btn-primary">
              Generate Notes
            </a>
            <a href="#features" className="btn-secondary">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section">
        <div className="container">
          <h2>Why Students Love It</h2>

          <div className="grid">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                desc={feature.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section alt">
        <div className="container">
          <h2>How It Works</h2>

          <div className="steps">
            {STEPS.map((step, index) => (
              <StepCard
                key={index}
                number={step.number}
                title={step.title}
                desc={step.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* GENERATOR */}
      <section id="generator" className="section">
        <div className="container">
          <h2>Create Your Notes</h2>

          <div className="generator">
            <NotesForm addNote={addNote} />
            <NotesList notes={notes} deleteNote={deleteNote} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p className="logo">
            Notes<span>Generator</span><em>.</em>
          </p>

          <p>AI-powered learning assistant for students © 2026</p>

          <div className="footer-nav">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#generator">Generate</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;