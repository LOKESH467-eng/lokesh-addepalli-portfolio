import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Code2, Cpu, Github, Globe2, Linkedin, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import profileAsset from "@/assets/lokesh-profile.png.asset.json";
import project1 from "@/assets/project-1.png.asset.json";
import project2 from "@/assets/project-2.png.asset.json";
import project3 from "@/assets/project-3.png.asset.json";
import project4 from "@/assets/project-4.png.asset.json";
import project5 from "@/assets/project-5.png.asset.json";
import project6 from "@/assets/project-6.png.asset.json";
import { submitContactMessage } from "@/lib/contact.functions";

const projects = [
  { number: "01", title: "Interactive web experiences", type: "Creative development", image: project1.url, imageAlt: "Interactive web project featuring a 3D web interface", tags: ["React", "Three.js", "WebGL"] },
  { number: "02", title: "Next-level gaming UI", type: "Product design & engineering", image: project2.url, imageAlt: "Gaming interface and character selection experience", tags: ["React", "UI engineering", "3D"] },
  { number: "03", title: "A portfolio in motion", type: "Creative direction", image: project3.url, imageAlt: "A vibrant creative developer portfolio website", tags: ["Web design", "Animation", "Frontend"] },
  { number: "04", title: "Worlds built for play", type: "Gaming web design", image: project4.url, imageAlt: "Colorful illustrated gaming website concept", tags: ["Design systems", "React", "Motion"] },
  { number: "05", title: "Building fast, reliably", type: "Motion & interaction", image: project5.url, imageAlt: "A vivid purple motion-focused web portfolio", tags: ["GSAP", "ScrollTrigger", "WebGL"] },
  { number: "06", title: "A portfolio, step by step", type: "Learning experience", image: project6.url, imageAlt: "Dark portfolio website with a 3D character portrait", tags: ["HTML", "CSS", "JavaScript"] },
];

const skills = ["Python", "Machine Learning", "Deep Learning", "Java", "HTML & CSS", "Generative AI"];
const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lokesh Addepalli — AI/ML Engineer & Developer" },
      { name: "description", content: "The portfolio of Lokesh Addepalli: AI/ML engineering, thoughtful interfaces, and interactive web projects." },
      { property: "og:title", content: "Lokesh Addepalli — AI/ML Engineer & Developer" },
      { property: "og:description", content: "Selected projects and work by Lokesh Addepalli, AI/ML Engineer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [loaderValue, setLoaderValue] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const submitMessage = useServerFn(submitContactMessage);
  const contactForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let scrollInstance: { destroy: () => void } | undefined;
    let context: { revert: () => void } | undefined;
    let cancelled = false;
    const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("locomotive-scroll")]).then(([gsapModule, triggerModule, scrollModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const LocomotiveScroll = scrollModule.default;
      scrollInstance = new LocomotiveScroll({ lenisOptions: { smoothWheel: motionAllowed, lerp: 0.085 } });
      const lenis = (scrollInstance as unknown as { lenisInstance?: { on: (event: string, callback: () => void) => void } }).lenisInstance;
      lenis?.on("scroll", () => ScrollTrigger.update());
      if (!motionAllowed) {
        setLoaderValue(100);
        setShowLoader(false);
        setPageReady(true);
      } else {
        const loadingProgress = { value: 0 };
        gsap.to(loadingProgress, {
          value: 100,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => setLoaderValue(Math.round(loadingProgress.value)),
          onComplete: () => {
            gsap.to(".preloader-inner", { autoAlpha: 0, y: -10, duration: 0.3, ease: "power2.in" });
            gsap.to(".preloader", { autoAlpha: 0, scale: 0.98, duration: 0.55, delay: 0.18, ease: "power2.inOut", onComplete: () => { setShowLoader(false); setPageReady(true); } });
          },
        });
      }
      context = gsap.context(() => {
        if (!motionAllowed) {
          gsap.set("[data-reveal], .hero-copy, .portrait-wrap", { autoAlpha: 1, y: 0, filter: "blur(0px)" });
          return;
        }
        gsap.fromTo(".hero-copy > *", { autoAlpha: 0, y: 34, filter: "blur(8px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.13, ease: "power3.out", delay: 0.25 });
        gsap.fromTo(".portrait-wrap", { autoAlpha: 0, x: 38 }, { autoAlpha: 1, x: 0, duration: 1.1, ease: "power3.out", delay: 0.45 });
        gsap.to(".orbit-dot", { y: -16, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.45 });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 32, filter: "blur(8px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%", once: true } });
        });
        gsap.fromTo(".project-card", { autoAlpha: 0, y: 30, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".project-grid", start: "top 82%", once: true } });
        gsap.fromTo(".contact-field", { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".contact-form", start: "top 82%", once: true } });
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }).catch(() => {
      setLoaderValue(100);
      setShowLoader(false);
      setPageReady(true);
      document.querySelectorAll<HTMLElement>("[data-reveal], .hero-copy, .portrait-wrap").forEach((element) => {
        element.style.opacity = "1";
        element.style.visibility = "visible";
      });
    });

    return () => {
      cancelled = true;
      context?.revert();
      scrollInstance?.destroy();
    };
  }, []);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setFormMessage("");
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setFormMessage("Please complete all fields.");
      setSubmitting(false);
      return;
    }
    try {
      await submitMessage({ data: { name, email, message } });
      contactForm.current?.reset();
      setFormMessage("Thanks — your message has been sent.");
    } catch {
      setFormMessage("Your message could not be sent. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={`portfolio-shell${pageReady ? " portfolio-ready" : ""}`}>
      {showLoader && <div className="preloader" role="status" aria-label="Loading portfolio"><div className="preloader-inner"><div className="preloader-wordmark">L<span>.</span></div><p>LOADING PORTFOLIO</p><div className="loading-track"><span style={{ width: `${loaderValue}%` }} /></div><span className="loading-number">{String(loaderValue).padStart(2, "0")}<small> / 100</small></span></div></div>}
      <div className="ambient-grid" aria-hidden="true" />
      <div className="site-frame">
        <header className="site-header">
          <a className="wordmark" href="#home" aria-label="Lokesh Addepalli, home"><span className="wordmark-icon">L<span>.</span></span><span>lokesh<span className="wordmark-muted">.dev</span></span></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a className="nav-link nav-current" href="#home">Home</a>
            {navItems.map((item) => <a className="nav-link" key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <Button asChild variant="outline" className="header-cta"><a href="#contact">Let’s talk <ArrowUpRight aria-hidden="true" /></a></Button>
          <Button variant="outline" size="icon" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
        </header>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight aria-hidden="true" /></a>)}</nav>}

        <section className="hero-section" id="home">
          <div className="spline-scene" aria-hidden="true"><iframe title="Interactive 3D scene" src="https://my.spline.design/projectpromoclickzoom-NSsEBo4Sc39i7uPu0gPqsAA3/" loading="lazy" tabIndex={-1} /></div>
          <div className="hero-copy">
            <div className="availability"><span className="status-light" /> LOKESH ADDEPALLI / PORTFOLIO</div>
            <p className="eyebrow hero-eyebrow">AI / ML ENGINEER <span>·</span> DEVELOPER</p>
            <h1>Building what<br />comes <span className="gradient-text">next.</span></h1>
            <p className="hero-description">Hi, I’m Lokesh Addepalli. I turn ambitious ideas into intelligent systems and digital experiences that feel unmistakably human.</p>
            <div className="hero-actions"><Button asChild className="primary-cta"><a href="#contact">Hire me <ArrowUpRight aria-hidden="true" /></a></Button><a href="#projects" className="text-action">Explore my work <ArrowDown aria-hidden="true" /></a></div>
            <div className="hero-meta"><span>INTELLIGENCE</span><span className="meta-divider" /><span>ENGINEERING</span><span className="meta-divider" /><span>IMAGINATION</span></div>
          </div>
          <div className="portrait-wrap" aria-label="Portrait of Lokesh">
            <div className="portrait-ring" />
            <div className="portrait-wash" />
            <img className="portrait-image" src={profileAsset.url} alt="Illustrated portrait of Lokesh Addepalli" fetchPriority="high" />
            <div className="orbit-label orbit-label-ai"><span className="orbit-dot" /> AI / ML <span>✳</span></div>
            <div className="orbit-label orbit-label-code"><Code2 aria-hidden="true" /> CREATIVE CODE</div>
            <div className="hero-index"><span>01</span><span className="index-line" /><span>SCROLL TO EXPLORE</span></div>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span />SCROLL TO DISCOVER</a>
        </section>

        <div className="ticker" aria-label="Focus areas"><div className="ticker-track"><span>INTELLIGENCE, WITH INTENTION</span><Sparkles aria-hidden="true" /><span>BUILT FOR WHAT’S NEXT</span><Sparkles aria-hidden="true" /><span>INTELLIGENCE, WITH INTENTION</span><Sparkles aria-hidden="true" /><span>BUILT FOR WHAT’S NEXT</span></div></div>

        <section className="about-section section-space" id="about">
          <div className="section-heading" data-reveal><p className="eyebrow">A LITTLE ABOUT ME</p><span className="section-number">01 / 03</span></div>
          <div className="about-content">
            <div className="about-title" data-reveal><h2>Curiosity,<br />put to <span className="gradient-text">work.</span></h2><div className="about-marker"><ArrowDownRight aria-hidden="true" /><span>SCROLLING<br />THROUGH IDEAS</span></div></div>
            <div className="about-story" data-reveal><p className="about-lede">I’m an engineer with a deep interest in the space where <span>artificial intelligence</span>, craft, and real-world impact meet.</p><p className="body-copy">From exploring machine learning to building expressive web experiences, I love turning complexity into something people can use, understand, and remember. I’m always learning, always iterating, and always looking for a better question to ask.</p>
              <div className="skill-block"><div className="skill-heading"><span>AREAS I WORK IN</span><span>06 SELECTED</span></div><div className="skill-list">{skills.map((skill, index) => <div className="skill-item" key={skill}><span className="skill-count">0{index + 1}</span><span>{skill}</span><ArrowUpRight aria-hidden="true" /></div>)}</div></div>
            </div>
          </div>
          <div className="capability-strip" data-reveal><div><Cpu aria-hidden="true" /><span>Machine intelligence</span></div><div><Code2 aria-hidden="true" /><span>Thoughtful engineering</span></div><div><Globe2 aria-hidden="true" /><span>Digital experiences</span></div></div>
        </section>

        <section className="projects-section section-space" id="projects">
          <div className="section-heading" data-reveal><p className="eyebrow">SELECTED PROJECTS</p><span className="section-number">02 / 03</span></div>
          <div className="projects-intro" data-reveal><div><h2>Ideas, <span className="gradient-text">in motion.</span></h2><p>A selection of experiments, interfaces, and ideas brought to life.</p></div><a className="project-count" href="#contact"><span>HAVE A PROJECT?</span><ArrowUpRight aria-hidden="true" /></a></div>
          <div className="project-grid">{projects.map((project) => <article className="project-card" key={project.number}><div className="project-visual"><img src={project.image} alt={project.imageAlt} loading="lazy" /><span className="project-no">/{project.number}</span><span className="project-open" aria-hidden="true"><ArrowUpRight /></span></div><div className="project-info"><div><p className="project-type">{project.type}</p><h3>{project.title}</h3></div><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
          <div className="projects-note" data-reveal><span>BUILT WITH CURIOSITY <Sparkles aria-hidden="true" /></span><p>Every project starts with a question worth exploring.</p><a href="#contact">Have one in mind? <ArrowRight aria-hidden="true" /></a></div>
        </section>

        <section className="contact-section section-space" id="contact">
          <div className="section-heading" data-reveal><p className="eyebrow">LET’S CONNECT</p><span className="section-number">03 / 03</span></div>
          <div className="contact-layout"><div className="contact-copy" data-reveal><h2>Have something<br />in <span className="gradient-text">mind?</span></h2><p>Have an idea, a challenge, or just want to say hello? I’d love to hear from you.</p><p className="contact-invitation">Send me a note using the form, or find your way to the platforms below.</p><div className="social-links"><a href="https://github.com/LOKESH467-eng" target="_blank" rel="noreferrer" aria-label="Open GitHub"><Github /></a><a href="https://www.linkedin.com/in/lokesh-addepalli-8b79a1334" target="_blank" rel="noreferrer" aria-label="Open LinkedIn"><Linkedin /></a></div></div>
            <form className="contact-form" ref={contactForm} onSubmit={handleContactSubmit} data-reveal><div className="contact-field"><label htmlFor="contact-name">YOUR NAME</label><Input id="contact-name" name="name" placeholder="How should I call you?" autoComplete="name" required maxLength={100} /></div><div className="contact-field"><label htmlFor="contact-email">EMAIL ADDRESS</label><Input id="contact-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength={255} /></div><div className="contact-field"><label htmlFor="contact-message">YOUR MESSAGE</label><Textarea id="contact-message" name="message" placeholder="Tell me a little about it…" rows={4} required maxLength={2000} /></div><div className="form-bottom"><span className="form-note">I’ll get back to you as soon as I can.</span><Button className="send-button" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send a message"}<ArrowUpRight aria-hidden="true" /></Button></div><p className="form-status" aria-live="polite">{formMessage}</p></form>
          </div>
        </section>

        <footer className="site-footer"><a className="wordmark footer-mark" href="#home"><span className="wordmark-icon">L<span>.</span></span><span>lokesh<span className="wordmark-muted">.dev</span></span></a><span className="footer-credit">DESIGNED WITH INTENTION <span>·</span> © 2026 LOKESH ADDEPALLI</span><a className="back-top" href="#home">BACK TO TOP <ArrowUpRight aria-hidden="true" /></a></footer>
      </div>
    </main>
  );
}