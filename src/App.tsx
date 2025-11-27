import { useEffect, useState } from 'react';
import { Github, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticlesBackground from './components/ParticlesBackground';
import './App.css';
import profilePic from './assets/profile.jpeg';

// --- CONFIGURATION ---
const GITHUB_USERNAME = 'tom89622';

// --- TYPES ---
interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
}

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("GitHub API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <ParticlesBackground />

      <motion.div
        className="content-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* HERO SECTION */}
        <header style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <motion.img
            src={profilePic}
            alt="Profile"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid var(--accent-color)'
            }}
          />
          <div>
            <motion.h1 variants={itemVariants}>Jen-Hung Chang</motion.h1>
            <motion.p className="role" variants={itemVariants}>
              Duke ECE Master's Student | Backend & Cloud Infrastructure Engineer
            </motion.p>
            <motion.p className="bio" variants={itemVariants}>
              Specializing in building scalable backend systems, cloud infrastructure (AWS), and distributed computing.
              Passionate about high-performance computing, fault tolerance, and DevOps automation.
            </motion.p>
            <motion.div className="social-links" variants={itemVariants}>
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="btn">
                <Github size={20} /> GitHub
              </a>
              <a href="mailto:jenhung.chang@duke.edu" className="btn">
                <Mail size={20} /> Contact
              </a>
            </motion.div>
          </div>
        </header>

        {/* SKILLS SECTION */}
        <motion.section variants={itemVariants}>
          <h2>Technical Stack</h2>
          <div className="grid">
            <motion.div className="card" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" }}>
              <h3>Languages</h3>
              <p>Java, C++, Python, TypeScript, Bash, SQL, Verilog</p>
            </motion.div>
            <motion.div className="card" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" }}>
              <h3>Backend & Cloud</h3>
              <p>Spring Boot, Node.js, Docker, Kubernetes, AWS (Lambda, EC2, S3), CI/CD (GitHub Actions)</p>
            </motion.div>
            <motion.div className="card" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" }}>
              <h3>Systems</h3>
              <p>Distributed Storage, High-Performance Computing, Linux Kernel, Network Programming</p>
            </motion.div>
          </div>
        </motion.section>

        {/* FEATURED PROJECTS (Hardcoded) */}
        <motion.section variants={itemVariants}>
          <h2>Featured Projects</h2>
          <div className="grid">
            <motion.div className="card" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" }}>
              <h3>RDMA Subsystem for xv6-riscv</h3>
              <p>Engineered a full-stack RDMA subsystem for xv6-riscv, enabling zero-copy user-space I/O and cutting kernel mediation latency by 80%. Implemented Verbs-compatible API and interrupt-safe DMA security.</p>
              <div className="tags">
                <span className="tag">Kernel Networking</span>
                <span className="tag">RISC-V</span>
                <span className="tag">Systems Infrastructure</span>
              </div>
            </motion.div>
            <motion.div className="card" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" }}>
              <h3>CollabSpace – Serverless P2P Collaboration Engine</h3>
              <p>Architected a serverless P2P collaboration infrastructure, reducing backend costs by 95%+. Designed a modular CRDT + Version Vector framework for deterministic convergence.</p>
              <div className="tags">
                <span className="tag">Distributed Systems</span>
                <span className="tag">WebRTC</span>
                <span className="tag">CRDT</span>
              </div>
            </motion.div>
            <motion.div className="card" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" }}>
              <h3>Lemonaid - AI RAG System</h3>
              <p>Built an AI-powered RAG system with FastAPI, Gemini API, and PostgreSQL (pgvector), cutting inquiry time from weeks to under an hour. Engineered a multi-environment CI/CD pipeline.</p>
              <div className="tags">
                <span className="tag">RAG</span>
                <span className="tag">LLM</span>
                <span className="tag">FastAPI</span>
                <span className="tag">AWS</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* GITHUB AUTO-FETCH */}
        <motion.section variants={itemVariants}>
          <h2>Latest Code Activity</h2>
          {loading ? (
            <div className="loading">Initializing connection to GitHub API...</div>
          ) : (
            <div className="grid">
              {repos.map((repo) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="card"
                  style={{ display: 'block' }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>{repo.name}</h3>
                    <ExternalLink size={16} color="#38bdf8" />
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                    {repo.description || 'No description provided.'}
                  </p>
                  <div className="tags">
                    <span className="tag">{repo.language || 'Code'}</span>
                    <span className="tag">★ {repo.stargazers_count}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.section>

        <footer style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
          <p>Deployed on AWS Amplify • Built with React & TypeScript</p>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;
