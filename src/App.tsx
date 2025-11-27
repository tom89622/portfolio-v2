import { useEffect, useState } from 'react';
import { Github, Mail, ExternalLink, Terminal, Server, Database } from 'lucide-react';
import './App.css';

// --- CONFIGURATION ---
const GITHUB_USERNAME = 'YOUR_GITHUB_USERNAME';

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

  return (
    <div className="container">
      {/* HERO SECTION */}
      <header>
        <h1>[Your Name]</h1>
        <p className="role">Duke ECE Master's Student | Systems & Cloud Engineer</p>
        <p className="bio">
          Specializing in low-level systems (C++), cloud infrastructure (AWS), and distributed computing.
          Building scalable solutions with a security-first mindset.
        </p>
        <div className="social-links">
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="btn">
            <Github size={18} /> GitHub
          </a>
          <a href="mailto:your.email@duke.edu" className="btn">
            <Mail size={18} /> Contact Me
          </a>
        </div>
      </header>

      {/* SKILLS SECTION */}
      <section>
        <h2>Technical Stack</h2>
        <div className="grid">
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Terminal color="#38bdf8" />
              <h3>Languages</h3>
            </div>
            <p>C++, Python, TypeScript, Bash, C, Rust</p>
          </div>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Server color="#38bdf8" />
              <h3>Systems</h3>
            </div>
            <p>Linux Kernel, RDMA, Docker, Kubernetes, OS Internals</p>
          </div>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Database color="#38bdf8" />
              <h3>Cloud & Data</h3>
            </div>
            <p>AWS (EC2, S3, Lambda), Distributed Storage, CI/CD</p>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS (Hardcoded) */}
      <section>
        <h2>Featured Projects</h2>
        <div className="grid">
          <div className="card">
            <h3>RDMA Subsystem for xv6</h3>
            <p>Designed a zero-copy networking subsystem for the xv6 research OS, reducing latency by 40% for kernel-bypass workloads.</p>
            <div className="tags">
              <span className="tag">C++</span>
              <span className="tag">Operating Systems</span>
              <span className="tag">Networking</span>
            </div>
          </div>
          <div className="card">
            <h3>Distributed Write-Back Cache</h3>
            <p>Implemented a highly consistent write-back cache for remote cloud storage, ensuring data integrity during network partitions.</p>
            <div className="tags">
              <span className="tag">Distributed Systems</span>
              <span className="tag">AWS</span>
              <span className="tag">Python</span>
            </div>
          </div>
        </div>
      </section>

      {/* GITHUB AUTO-FETCH */}
      <section>
        <h2>Latest Code Activity</h2>
        {loading ? (
          <div className="loading">Initializing connection to GitHub API...</div>
        ) : (
          <div className="grid">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="card"
                style={{ display: 'block' }}
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
              </a>
            ))}
          </div>
        )}
      </section>

      <footer style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
        <p>Deployed on AWS Amplify • Built with React & TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
