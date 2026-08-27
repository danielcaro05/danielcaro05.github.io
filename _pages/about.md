---
permalink: /
title: "Daniel Caro"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<div class="home-hero">
  <div class="hero-badge">
    <span class="pulse-dot"></span>
    Engineering & Applied AI
  </div>
  
  <h1 class="hero-title">Building grounded AI systems & spatial models.</h1>
  
  <p class="hero-description">
    Specializing in multimodal vision-language models (VLMs), edge inference optimization, local RAG architecture, and analytical pipeline engineering. Focused on benchmarking model reliability in real-world environments.
  </p>

  <div class="hero-cta">
    <a href="https://github.com/danielcaro05" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
      GitHub Profile
    </a>
    <a href="files/resume.pdf" target="_blank" class="btn btn-outline">
      Resume (PDF)
    </a>
  </div>
</div>

<hr class="section-divider">

<h2 class="section-title">Projects</h2>
<p class="section-subtitle">Deep learning evaluation, benchmark construction, and local software design.</p>

<div class="projects-grid">
  <a href="sure-2026.html" class="project-card">
    <div class="project-header">
      <span class="project-category">Research Program</span>
      <span class="project-year">2026</span>
    </div>
    <h3 class="project-title">Summer Undergraduate Research Experience</h3>
    <p class="project-description">
      Research notes, progress updates, and project outcomes from SURE 2026. Explore the investigation process, experiments, and final deliverables.
    </p>
    <div class="project-tags">
      <span class="tag">Research</span>
      <span class="tag">Documentation</span>
      <span class="tag">Project Tracking</span>
    </div>
  </a>

  <div class="project-card placeholder">
    <div class="project-header">
      <span class="project-category">Category / Domain</span>
      <span class="project-year">Year</span>
    </div>
    <h3 class="project-title">Project 2 Title</h3>
    <p class="project-description">
      Brief overview of Project 2. Replace this text with a short summary of the key goals, engineering challenges, and results.
    </p>
    <div class="project-tags">
      <span class="tag">Tool 1</span>
      <span class="tag">Tool 2</span>
      <span class="tag">Framework</span>
    </div>
  </div>

  <div class="project-card placeholder">
    <div class="project-header">
      <span class="project-category">Category / Domain</span>
      <span class="project-year">Year</span>
    </div>
    <h3 class="project-title">Project 3 Title</h3>
    <p class="project-description">
      Brief overview of Project 3. Replace this text with a short summary of the key goals, engineering challenges, and results.
    </p>
    <div class="project-tags">
      <span class="tag">Tool 1</span>
      <span class="tag">Tool 2</span>
      <span class="tag">Framework</span>
    </div>
  </div>
</div>

<hr class="section-divider">

<h2 class="section-title">Technical Toolkit</h2>

<div class="skills-grid">
  <div class="skill-card">
    <h3 class="skill-category">Languages & Core</h3>
    <ul class="skill-list">
      <li>Python</li>
      <li>MATLAB App Designer</li>
      <li>C++ / C Runtime Tools</li>
      <li>SQL & Vector Databases</li>
    </ul>
  </div>

  <div class="skill-card">
    <h3 class="skill-category">AI Frameworks & Inference</h3>
    <ul class="skill-list">
      <li>Vision-Language Models (VLMs)</li>
      <li>GGUF / 4-bit & 8-bit Quantization</li>
      <li>llama.cpp & Local RAG Systems</li>
      <li>PyTorch / Model Fine-tuning</li>
    </ul>
  </div>

  <div class="skill-card">
    <h3 class="skill-category">Analytics & Tooling</h3>
    <ul class="skill-list">
      <li>Data Cleaning & Numerical Analysis</li>
      <li>Git / Version Control</li>
      <li>Matplotlib & Data Visualization</li>
      <li>Analytical Modeling</li>
    </ul>
  </div>
</div>

<hr class="section-divider">

<div class="footer-cta">
  <div class="footer-text">
    <h3>Let's Connect</h3>
    <p>Open to discussions on AI research, software engineering, and collaborative projects.</p>
  </div>
  <div class="footer-links">
    <a href="mailto:daniel.caro@umich.edu" class="btn btn-secondary">Email Me</a>
    <a href="https://linkedin.com/in/danielcaro05" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">LinkedIn</a>
  </div>
</div>

<style>
.home-hero {
  text-align: center;
  padding: 3rem 0;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.1);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #60a5fa;
  margin-bottom: 1.5rem;
}

.pulse-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #60a5fa;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  color: #fff;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.hero-description {
  max-width: 42rem;
  margin: 0 auto 2rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: #94a3b8;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-secondary {
  background: #0f172a;
  border-color: #334155;
  color: #cbd5e1;
}

.btn-secondary:hover {
  background: #1e293b;
  border-color: #475569;
  color: #fff;
}

.btn-outline {
  background: #020617;
  border-color: #1e293b;
  color: #94a3b8;
}

.btn-outline:hover {
  background: #0f172a;
  border-color: #334155;
  color: #e2e8f0;
}

.section-divider {
  border: none;
  border-top: 1px solid rgba(148, 163, 184, 0.15);
  margin: 3rem 0;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #94a3b8;
  margin-bottom: 2rem;
}

.projects-grid {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1.5rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.projects-grid::-webkit-scrollbar {
  display: none;
}

.project-card {
  flex: 0 0 380px;
  scroll-snap-align: start;
  border-radius: 0.75rem;
  border: 1px solid #1e293b;
  background: rgba(15, 23, 42, 0.5);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.project-card:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: #0f172a;
}

.project-card.placeholder {
  pointer-events: none;
  opacity: 0.7;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-category {
  font-size: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #60a5fa;
}

.project-year {
  font-size: 0.75rem;
  color: #64748b;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  transition: color 0.2s ease;
}

.project-card:hover .project-title {
  color: #60a5fa;
}

.project-description {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.375rem;
  background: rgba(30, 41, 59, 0.8);
  color: #cbd5e1;
}

.skills-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.skill-card {
  border-radius: 0.5rem;
  border: 1px solid #1e293b;
  background: rgba(15, 23, 42, 0.3);
  padding: 1.25rem;
}

.skill-category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #60a5fa;
  margin-bottom: 0.75rem;
}

.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skill-list li {
  font-size: 0.875rem;
  color: #cbd5e1;
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.skill-list li:last-child {
  border-bottom: none;
}

.skill-list li::before {
  content: "• ";
  color: #60a5fa;
  font-weight: bold;
}

.footer-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding: 2rem 0;
}

@media (min-width: 768px) {
  .footer-cta {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.footer-text h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.25rem;
}

.footer-text p {
  font-size: 0.875rem;
  color: #94a3b8;
}

.footer-links {
  display: flex;
  gap: 1rem;
}
</style>