import React, { useEffect, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, MapPin, Menu, X, Code2, Database, BrainCircuit, Sparkles, Terminal, Layers3, ExternalLink, ChevronDown, Eye } from 'lucide-react'
import { profile, projects, skillGroups, experience, education } from './data'

const nav = [['About', '#about'], ['Work', '#work'], ['Journey', '#journey'], ['Stack', '#stack'], ['Contact', '#contact']]
const filters = ['All work', 'AI & Data', 'Development']
const iconMap = { 'Languages': Code2, 'Frontend & Backend': Layers3, 'Data & Analytics': Database, 'AI & Integrations': BrainCircuit, 'Tools & Platforms': Terminal }

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target) }
    }), { threshold: 0.12 })
    nodes.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [])
}

function OrbitalGraphic() {
  const orbitItems = ['JS', 'PY', 'SQL', 'AI', 'REACT', 'JAVA']
  return <div className="orbital-scene" aria-label="Animated technology orbit">
    <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="orbit orbit-three"></div>
    <div className="orbital-core"><span className="core-glow"></span><Code2 size={40}/><small>BUILD / LEARN / SHIP</small></div>
    {orbitItems.map((item, i) => <div key={item} className={`orbit-node node-${i}`}><span>{item}</span></div>)}
    <div className="orbit-caption caption-top">ENGINEERING</div><div className="orbit-caption caption-bottom">CREATIVITY × LOGIC</div>
  </div>
}

function ProjectArtwork({ type }) {
  return <div className={`project-art ${type}`}>
    <div className="art-top"><span className="art-dot"></span><span className="art-dot"></span><span className="art-dot"></span><span className="art-label">LIVE PREVIEW / 0{type.length % 5 + 1}</span></div>
    {type === 'visual-ai' && <div className="ai-art"><div className="ai-orb"><BrainCircuit size={46}/></div><div className="ai-lines"><i/><i/><i/><i/></div><div className="ai-chip">ASK YOUR DATA <ArrowUpRight size={13}/></div></div>}
    {type === 'visual-chart' && <div className="chart-art"><div className="chart-bars">{[32,57,43,77,61,91,69,100,74,85].map((h,i)=><i key={i} style={{'--h':`${h}%`}}/>)}</div><div className="chart-foot"><b>ACCIDENT INSIGHTS</b><span>+ DATA VIEW</span></div></div>}
    {type === 'visual-bank' && <div className="bank-art"><div className="bank-card"><span>TRANSACTION FLOW</span><strong>₹ 24,850</strong><small>MONTHLY OVERVIEW</small><div className="bank-wave"></div></div><div className="bank-mini"><i/><i/><i/></div></div>}
    {type === 'visual-vault' && <div className="vault-art"><div className="vault-ring"><div><Layers3 size={40}/><b>SAFE</b></div></div><span className="vault-tag">ENCRYPTED SPACE</span></div>}
    {type === 'visual-vet' && <div className="vet-art"><div className="vet-cross">✳</div><div className="vet-pet">♡</div><span className="vet-pill">AI CARE ASSISTANT</span><span className="vet-pulse"></span></div>}
    {type === 'visual-code' && <div className="code-art"><div className="code-window"><span>mentor.jsx</span><p><i>01</i> <b>function</b> <em>learn</em>() {'{'}</p><p><i>02</i> &nbsp; build(<strong>'skills'</strong>);</p><p><i>03</i> &nbsp; repeat();</p><p><i>04</i> {'}'}</p><div className="code-cursor"></div></div></div>}
  </div>
}

function ProjectCard({ project, index, onQuickView }) {
  return <article className="project-card" data-reveal style={{'--delay': `${index * 75}ms`}}>
    <a className="project-visual-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} repository`}><ProjectArtwork type={project.visual}/><span className="art-open"><ArrowUpRight size={20}/></span></a>
    <div className="project-meta"><span>{project.category}</span><span>{project.number} / 06</span></div>
    <h3>{project.title}</h3><p>{project.description}</p>
    <div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
    <div className="project-actions">
      <button className="text-link quick-view" onClick={() => onQuickView(project)}><Eye size={15}/> Quick view</button>
      <a className="text-link" href={project.github} target="_blank" rel="noreferrer">Repository <ArrowUpRight size={15}/></a>
    </div>
  </article>
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All work')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [typed, setTyped] = useState('')
  useReveal()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const phrase = 'Software Developer'
    let i = 0
    const id = setInterval(() => { i++; setTyped(phrase.slice(0, i)); if (i >= phrase.length) clearInterval(id) }, 72)
    return () => clearInterval(id)
  }, [])
  const filteredProjects = useMemo(() => projects.filter(p => activeFilter === 'All work' || (activeFilter === 'AI & Data' ? p.type === 'data' || p.type === 'ai' : p.type === 'dev')), [activeFilter])
  useEffect(() => {
    if (!quickView) return
    const onKey = (event) => { if (event.key === 'Escape') setQuickView(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [quickView])

  return <div className="site-shell">
    <div className="noise"></div>
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <a className="brand" href="#home" aria-label="Shrinivas Karad home"><span className="brand-mark">SK<span>.</span></span><span className="brand-text">SHRINIVAS KARAD<small>PORTFOLIO / 2026</small></span></a>
      <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>{nav.map(([label, href], i) => <a key={label} href={href} onClick={() => setMenuOpen(false)}><span>0{i+1}</span>{label}</a>)}</nav>
      <a className="header-cta" href={`mailto:${profile.email}`}>LET'S TALK <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-pulse"></span> AVAILABLE FOR OPPORTUNITIES <span className="eyebrow-line"></span> INDIA</div>
          <h1>Building digital<br/>things with <span className="gradient-word">purpose.</span></h1>
          <div className="hero-subline"><span className="type-cursor">{typed || 'S'}</span><span className="hero-dot">/</span><span>Data · AI · Web</span></div>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions"><a className="button-primary" href="#work">Explore my work <ArrowDownRight size={17}/></a><a className="button-quiet" href="#contact">Get in touch <ArrowUpRight size={16}/></a></div>
          <div className="hero-bottomline"><span><MapPin size={13}/> {profile.location}</span><span className="scroll-hint">SCROLL TO EXPLORE <span>↓</span></span></div>
        </div>
        <div className="hero-visual"><div className="visual-index">FIG. 01 — MY DIGITAL UNIVERSE</div><OrbitalGraphic/><div className="visual-coordinate">18°24' N<br/>76°34' E</div><div className="visual-note">CURIOUS BY DEFAULT.<br/>BUILT THROUGH PRACTICE.</div></div>
        <div className="hero-watermark">SK<span>®</span></div>
      </section>

      <section className="marquee-band" aria-label="Areas of interest"><div className="marquee-track">{Array.from({length:2},(_,i)=><div className="marquee-group" key={i}>{['SOFTWARE ENGINEERING','DATA STORYTELLING','APPLIED AI','PRODUCT THINKING','CONTINUOUS LEARNING'].map((s,j)=><span key={s}>{s}<i>✳</i></span>)}</div>)}</div></section>

      <section className="about section-wrap section-pad" id="about">
        <div className="section-kicker" data-reveal><span>01 / THE PERSON</span><span>ABOUT ME</span></div>
        <div className="about-grid">
          <h2 data-reveal>Curiosity turns<br/>into <span className="outline-word">creation.</span></h2>
          <div className="about-copy" data-reveal><p className="lead">I’m an IT engineering student who likes to understand how things work—and then build something useful from that understanding.</p><p>My interests sit at the intersection of software development, analytics, and AI. From writing SQL queries to creating dashboards and experimenting with AI-powered tools, I learn best by making real projects.</p><a href="#journey" className="inline-arrow">A little more about my journey <ArrowDownRight size={16}/></a></div>
        </div>
        <div className="principles-grid" data-reveal><div><span>01</span><Code2/><h3>Build to learn</h3><p>Hands-on projects over just theory.</p></div><div><span>02</span><Database/><h3>Make data useful</h3><p>Turn information into clear decisions.</p></div><div><span>03</span><BrainCircuit/><h3>Explore what’s next</h3><p>Use AI thoughtfully to solve problems.</p></div></div>
      </section>

      <section className="work section-wrap section-pad" id="work">
        <div className="section-kicker" data-reveal><span>02 / SELECTED WORK</span><span>THINGS I’VE BUILT & EXPLORED</span></div>
        <div className="work-heading" data-reveal><h2>Proof of <span className="gradient-word">practice.</span></h2><p>Projects are where ideas meet implementation.<br/>Pick a category and explore.</p></div>
        <div className="filter-row" data-reveal>{filters.map(f=><button key={f} className={activeFilter===f?'filter-active':''} onClick={()=>setActiveFilter(f)}>{f}<span>{f==='All work'?'06':f==='AI & Data'?'03':'03'}</span></button>)}</div>
        <div className="projects-grid" key={activeFilter}>{filteredProjects.map((p,i)=><ProjectCard key={p.number} project={p} index={i} onQuickView={setQuickView}/>)}</div>
        <div className="work-footer" data-reveal><span>MORE CODE, EXPERIMENTS & NOTES</span><a href={profile.github} target="_blank" rel="noreferrer">Visit GitHub <Github size={16}/><ArrowUpRight size={14}/></a></div>
      </section>

      <section className="journey section-wrap section-pad" id="journey">
        <div className="section-kicker" data-reveal><span>03 / THE JOURNEY</span><span>LEARNING IN PUBLIC</span></div>
        <div className="journey-layout"><div className="journey-title" data-reveal><h2>In progress.<br/><span className="outline-word">On purpose.</span></h2><p>A growing foundation in technology, shaped by study, training, and building things one step at a time.</p><div className="journey-stamp"><span>EST.</span><b>2021</b><small>THE LEARNING NEVER STOPS</small></div></div>
          <div className="timeline"><div className="timeline-label" data-reveal>TRAINING & EXPERIENCE</div>{experience.map((item,i)=><article className="timeline-item" data-reveal key={item.role}><div className="timeline-dot">{String(i+1).padStart(2,'0')}</div><div className="timeline-content"><div className="timeline-date">{item.period}</div><h3>{item.role}</h3><span className="timeline-org">{item.organization}</span><p>{item.description}</p></div><ArrowUpRight className="timeline-arrow" size={18}/></article>)}<div className="timeline-label education-label" data-reveal>EDUCATION</div>{education.map((item,i)=><article className="timeline-item education-item" data-reveal key={item.degree}><div className="timeline-dot"><span>ED</span></div><div className="timeline-content"><div className="timeline-date">{item.period}</div><h3>{item.degree}</h3><span className="timeline-org">{item.school}</span><p>{item.result}</p></div></article>)}</div>
        </div>
      </section>

      <section className="stack section-wrap section-pad" id="stack">
        <div className="section-kicker" data-reveal><span>04 / MY TOOLKIT</span><span>TOOLS I’M GROWING WITH</span></div>
        <div className="stack-intro" data-reveal><h2>Good tools.<br/><span className="gradient-word">Better questions.</span></h2><p>I keep expanding my toolkit by using technologies in projects, not just collecting names.</p></div>
        <div className="skills-grid">{skillGroups.map((group,i)=>{const Icon=iconMap[group.title]||Sparkles;return <article className="skill-card" data-reveal key={group.title} style={{'--delay':`${i*70}ms`}}><div className="skill-card-top"><span>0{i+1}</span><Icon size={20}/></div><h3>{group.title}</h3><div className="skill-pills">{group.skills.map((skill,j)=><span key={skill} style={{'--pill-delay':`${j*45}ms`}}>{skill}</span>)}</div><div className="skill-card-line"></div></article>})}</div>
      </section>

      <section className="contact section-wrap section-pad" id="contact">
        <div className="contact-panel" data-reveal><div className="contact-orbit"></div><div className="contact-kicker"><span className="status-pulse"></span> OPEN TO LEARNING & COLLABORATION</div><h2>Have a good<br/>problem? <span>Let’s talk.</span></h2><p>Interested in an opportunity, a project, or a thoughtful conversation about technology? My inbox is open.</p><a className="contact-button" href={`mailto:${profile.email}`}><Mail size={17}/> Start a conversation <ArrowUpRight size={17}/></a><div className="contact-email">{profile.email}</div></div>
        <div className="social-row" data-reveal><span>LET’S CONNECT</span><div><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={13}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={13}/></a><a href={`mailto:${profile.email}`}><Mail size={16}/> Email <ArrowUpRight size={13}/></a></div></div>
      </section>
    </main>
    {quickView && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setQuickView(null) }}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={() => setQuickView(null)} aria-label="Close project details"><X size={20}/></button>
        <div className="modal-art"><ProjectArtwork type={quickView.visual}/></div>
        <div className="modal-content">
          <div className="project-meta"><span>{quickView.category}</span><span>PROJECT {quickView.number}</span></div>
          <h2 id="modal-title">{quickView.title}</h2>
          <p>{quickView.description}</p>
          <h3>TECH STACK</h3>
          <div className="tag-list">{quickView.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
          <a className="button-primary modal-repo" href={quickView.github} target="_blank" rel="noreferrer">Open GitHub repository <ArrowUpRight size={16}/></a>
          <small className="modal-note">Some entries are project concepts or explorations, as noted in their descriptions.</small>
        </div>
      </section>
    </div>}
    <footer className="site-footer section-wrap"><a className="footer-brand" href="#home">SK<span>.</span></a><span>DESIGNED WITH INTENTION · BUILT WITH CURIOSITY</span><a href="#home">BACK TO TOP ↑</a><small>© {new Date().getFullYear()} SHRINIVAS KARAD</small></footer>
  </div>
}
