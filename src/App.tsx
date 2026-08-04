import { useEffect, useState } from "react";
import {
  ArrowDown,
  BadgeCheck,
  BookOpenCheck,
  ChevronRight,
  Handshake,
  HeartPulse,
  Menu,
  Scale,
  ShieldCheck,
  Target,
  X,
} from "lucide-react";

const navItems = [
  ["Start", "start"],
  ["Zur Person", "person"],
  ["Leitung", "leitung"],
  ["Motivation", "motivation"],
  ["Konzept", "konzept"],
  ["Vision", "vision"],
  ["Schlusswort", "schlusswort"],
];

const motivation = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Verantwortung",
    text: "Ich möchte Verantwortung für das Department und seine Mitarbeiter übernehmen, Entscheidungen nachvollziehbar treffen und den Ablauf als Sheriff umfassend kennenlernen.",
  },
  {
    icon: Handshake,
    number: "02",
    title: "Mitarbeiterpflege",
    text: "Meine HR-Erfahrung möchte ich nutzen, um ansprechbar zu sein, Kollegen zu unterstützen und durch klare Kommunikation ein verlässliches Arbeitsumfeld zu schaffen.",
  },
  {
    icon: Target,
    number: "03",
    title: "Aktivität",
    text: "Das LSCSD soll im Stadtgeschehen wieder sichtbarer werden, gemeinsam Events anfahren und durch interne Veranstaltungen neuen Zusammenhalt entwickeln.",
  },
];

const departments = [
  ["PU", "Patrol Unit"],
  ["DU", "Detective Unit"],
  ["SED", "Special Enforcement Division"],
  ["IAD", "Internal Affairs Division"],
  ["HR", "Human Resources"],
  ["PRD", "Park Ranger Division"],
];

const ranks = [
  [25, "County Sheriff", "Leitung"], [24, "Undersheriff", "Co-Leitung"],
  [23, "HR Curator", "HR"], [22, "Department Curator", "Alle Abteilungen"],
  [21, "Assistant Sheriff", "Leitung"], [20, "Area Commander", "Management"],
  [19, "Deputy Commander", "Management"], [18, "Captain", "PU"],
  [17, "SED Captain", "SED"], [16, "SED Lieutenant", "SED"],
  [15, "IAD Supervisor", "IAD"], [14, "HR Supervisor", "HR"],
  [13, "Senior Detective", "DU"], [12, "Detective", "DU"],
  [11, "Senior Ranger", "PRD"], [10, "Ranger", "PRD"],
  [9, "SED Trainee", "SED"], [8, "IAD Trainee", "IAD"],
  [7, "HR Trainee", "HR"], [6, "Media Deputy", "PRD · Media"],
  [5, "Senior Deputy", "PU"], [4, "Deputy", "PU"],
  [3, "Junior Deputy", "PU"], [2, "Trainee", "Academy · PU"],
  [1, "Suspended", "Außer Dienst"],
];

function DepartmentSeal({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "department-seal compact" : "department-seal"} aria-label="LSCSD-inspiriertes Siegel">
      <div className="seal-ring">
        <span className="seal-top">Los Santos County</span>
        <div className="seal-center"><ShieldCheck size={compact ? 19 : 31} strokeWidth={1.35} /><strong>LSCSD</strong><small>Applicant</small></div>
        <span className="seal-bottom">Sheriff’s Department</span>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("start");

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
      const current = [...navItems].reverse().find(([, id]) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= window.innerHeight * 0.42;
      });
      if (current) setActiveSection(current[1]);
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#start" aria-label="Zur Startseite">
          <span className="mini-badge"><ShieldCheck size={17} strokeWidth={1.7} /></span>
          <span><strong>LSCSD</strong><small>Applicant Portal</small></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Navigation öffnen" aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="Hauptnavigation">
          {navItems.map(([label, id]) => <a className={activeSection === id ? "active" : ""} href={`#${id}`} onClick={closeMenu} key={id}>{label}</a>)}
        </nav>
        <div className="case-chip"><span /> Akte RR-0804</div>
      </header>

      <main>
        <section className="hero" id="start">
          <div className="map-grid" aria-hidden="true" />
          <div className="emergency-lights" aria-hidden="true"><span className="blue-light" /><span className="red-light" /></div>
          <div className="hero-copy" data-reveal>
            <p className="eyebrow"><span /> Los Santos County Sheriff’s Department</p>
            <h1>Bewerbung <em>–</em><br /><span>Rainer Rose</span></h1>
            <p className="hero-intro">Meine Bewerbung für eine erste Amtszeit als Sheriff – mit Führungserfahrung aus dem HR-Bereich, klarer Verantwortung und dem Ziel, das Department wieder aktiver zu gestalten.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#person">Bewerbung öffnen <ChevronRight size={18} /></a>
              <span className="file-number">AKTENNUMMER <strong>RR-0804</strong></span>
            </div>
          </div>
          <div className="hero-mark" data-reveal aria-label="Los Santos County Sheriff-Abzeichen">
            <div className="badge-star"><div className="badge-core"><ShieldCheck size={48} strokeWidth={1.25} /><span>LS</span><small>COUNTY</small></div></div>
            <p>Integrity · Service · Respect</p>
          </div>
          <a className="scroll-cue" href="#person" aria-label="Zum nächsten Abschnitt"><ArrowDown size={18} /></a>
        </section>

        <div className="insignia-rail" aria-label="LSCSD Werte">
          <DepartmentSeal compact />
          <span><ShieldCheck size={16} /> Integrity</span><i />
          <span><Scale size={16} /> Fairness</span><i />
          <span><Handshake size={16} /> Service</span>
          <DepartmentSeal compact />
        </div>

        <section className="section person-section" id="person">
          <div className="watermark-seal" aria-hidden="true"><DepartmentSeal /></div>
          <div className="section-label" data-reveal><span>01</span> Zur Person</div>
          <div className="person-grid">
            <article className="id-card" data-reveal>
              <div className="id-card-top"><span>Applicant Identification</span><BadgeCheck size={19} /></div>
              <div className="portrait"><span>RR</span><small>Applicant</small></div>
              <dl>
                <div><dt>Name</dt><dd>Rainer Rose</dd></div>
                <div><dt>ID</dt><dd>113765</dd></div>
                <div><dt>OOC-Alter</dt><dd>30 Jahre</dd></div>
                <div><dt>Ort</dt><dd>Los Santos County</dd></div>
                <div><dt>Status</dt><dd className="status"><span /> Bewerbung eingereicht</dd></div>
              </dl>
              <div className="barcode" aria-hidden="true" />
              <small className="id-number">RR / 0804 / LSC</small>
            </article>
            <div className="person-copy" data-reveal>
              <p className="eyebrow">Persönliche Vorstellung</p>
              <h2>Bereit, mich <span>einzubringen.</span></h2>
              <p className="lead">Mein Name ist Rainer Rose. Ich möchte mich beim Los Santos County Sheriff’s Department bewerben und mich dort zuverlässig, professionell und aktiv einbringen.</p>
              <p>Durch meine mehrfachen Tätigkeiten als HR-Kurator und in der HR-Leitung bringe ich Erfahrung in Mitarbeiterbetreuung, Kommunikation und internen Abläufen mit. Nun möchte ich meine erste Amtszeit als Leader antreten, mehr über den Ablauf als Sheriff lernen und Verantwortung für das gesamte Department übernehmen.</p>
              <div className="values-row"><span>Verlässlich</span><span>Professionell</span><span>Aktiv</span></div>
            </div>
          </div>
        </section>

        <section className="section leadership-section" id="leitung">
          <div className="section-heading" data-reveal>
            <div className="section-label"><span>02</span> Vorgeschlagene Leitung</div>
            <h2>Ein Team mit <span>Verantwortung.</span></h2>
            <p>Die Besetzung der Co-Leitung wird ergänzt, sobald Namen und Bilder final abgestimmt sind.</p>
          </div>
          <div className="leadership-grid">
            <article className="leader-profile lead-profile" data-reveal>
              <div className="profile-photo rainer-photo"><img src="/team/rainer-rose.png" alt="Rainer Rose" /><span>Vorgeschlagener Leader</span></div>
              <div className="profile-info"><span className="role-tag">Vorgeschlagener Leader</span><h3>Rainer Rose</h3><p>Erste angestrebte Amtszeit als Sheriff</p><dl><div><dt>ID</dt><dd>113765</dd></div><div><dt>OOC-Alter</dt><dd>30 Jahre</dd></div><div><dt>Erfahrung</dt><dd>HR-Kurator</dd></div><div><dt>Führung</dt><dd>Mehrfache HR-Leitung</dd></div><div><dt>Schwerpunkt</dt><dd>Mitarbeiterpflege & Aktivität</dd></div></dl></div>
            </article>
            <article className="leader-profile co-profile" data-reveal>
              <div className="profile-photo"><img src="/team/alice-berlin.png" alt="Alice Berlin" /><span>Co-Leitung 01</span></div>
              <div className="profile-info"><span className="role-tag">Vorgeschlagene Co-Leitung 01</span><h3>Alice Berlin</h3><p>Derzeitige SD-Leitung</p><div className="experience-chip">Erfahrung · Department-Leitung</div></div>
            </article>
            <article className="leader-profile co-profile" data-reveal>
              <div className="profile-photo kevin-photo"><img src="/team/kevin-hoch.png" alt="Kevin Hoch" /><span>Co-Leitung 02</span></div>
              <div className="profile-info"><span className="role-tag">Vorgeschlagene Co-Leitung 02</span><h3>Kevin Hoch</h3><p>Erfahrungsprofil wird ergänzt.</p></div>
            </article>
          </div>
          <aside className="leadership-note" data-reveal>
            <div className="note-symbol"><BadgeCheck size={38} strokeWidth={1.35} /><span>Erste Amtszeit</span></div>
            <div className="note-copy"><span>Offenheit & Lernbereitschaft</span><h3>Bereit, Führung zu lernen.</h3><p>Ich möchte offen sagen, dass ich bisher noch keine Leader-Position ausgeübt habe. Meiner Ansicht nach lernt man Führung nicht allein in der Theorie – man muss Verantwortung selbst übernehmen, um den Job und seine Abläufe wirklich zu verstehen.</p><p>Fehler gehören dazu. Entscheidend ist, daraus zu lernen, Feedback anzunehmen und sich von erfahrenen Menschen etwas zeigen zu lassen. Mit genau dieser Haltung möchte ich meine erste Amtszeit antreten.</p></div>
          </aside>
        </section>

        <section className="section motivation-section" id="motivation">
          <div className="vertical-mark" aria-hidden="true">LS COUNTY · SHERIFF’S DEPARTMENT</div>
          <div className="section-heading" data-reveal>
            <div className="section-label"><span>03</span> Motivation</div>
            <h2>Was mich <span>antreibt.</span></h2>
            <p>Mein Ziel ist eine greifbare, verlässliche Leitung, die Mitarbeiter unterstützt und gemeinsame Aktivität fördert.</p>
          </div>
          <div className="card-grid">
            {motivation.map(({ icon: Icon, number, title, text }) => (
              <article className="motive-card" data-reveal key={title}>
                <div className="card-icon"><Icon size={26} strokeWidth={1.5} /></div><span className="card-number">{number}</span>
                <h3>{title}</h3><p>{text}</p><div className="card-line" />
              </article>
            ))}
          </div>
        </section>

        <section className="section concept-section" id="konzept">
          <div className="section-heading" data-reveal>
            <div className="section-label"><span>04</span> Department-Konzept</div>
            <h2>Struktur schafft <span>Orientierung.</span></h2>
            <p>Sechs Abteilungen und eine transparente Laufbahn mit klarer Zuordnung zu Führungsebene, Management und Fachabteilung.</p>
          </div>
          <div className="department-grid">
            {departments.map(([code, name]) => <article className="department-card" data-reveal key={code}><strong>{code}</strong><span>{name}</span></article>)}
          </div>
          <div className="rank-panel" data-reveal>
            <div className="rank-panel-head"><div><span>Rangstruktur & Abteilungen</span><h3>25 Dienstgrade</h3></div><small>Rang 25 → Rang 01</small></div>
            <div className="rank-list">
              {ranks.map(([level, title, area]) => <div className={Number(level) === 1 ? "rank-row suspended" : Number(level) >= 22 ? "rank-row executive" : "rank-row"} key={level}><span className="rank-level">{String(level).padStart(2, "0")}</span><strong>{title}</strong><small>{area}</small></div>)}
            </div>
          </div>
          <div className="training-banner" data-reveal>
            <div className="training-title"><BookOpenCheck size={34} strokeWidth={1.35} /><div><span>Priorität</span><h3>SCHULUNGEN & AUSBILDUNGEN</h3></div></div>
            <div className="combat-medic"><HeartPulse size={28} /><div><strong>Combat-Medic-Schulung</strong><p>Die Vision von Alice Berlin soll fortgeführt werden: Einsatzkräfte werden gezielt in erweiterter Erster Hilfe geschult, damit sie in Notfällen bis zum Eintreffen des Rettungsdienstes sicher unterstützen können.</p></div></div>
          </div>
        </section>

        <section className="section vision-section" id="vision">
          <div className="vision-medallion" data-reveal><DepartmentSeal /></div>
          <div className="section-label" data-reveal><span>05</span> Vision</div>
          <div className="quote-wrap" data-reveal>
            <span className="quote-mark">“</span>
            <blockquote>Ein starkes Department entsteht durch <em>Verlässlichkeit</em>, <em>Zusammenhalt</em> und professionelles Auftreten.</blockquote>
          </div>
          <div className="vision-goals" data-reveal><div><strong>Präsenz</strong><p>Das LSCSD soll wieder aktiver am Stadtgeschehen teilnehmen und gemeinsam Events anfahren.</p></div><div><strong>Department-Leben</strong><p>Interne Veranstaltungen sollen Zusammenhalt, Austausch und Motivation der Mitarbeiter stärken.</p></div><div><strong>Mitarbeiterpflege</strong><p>Ansprechbarkeit, konstruktives Feedback und eine verlässliche Betreuung bilden die Grundlage der Führung.</p></div></div>
          <div className="future-note" data-reveal><span>Ausblick</span><p>Units, Zuständigkeiten, Rangstruktur und weiterführende Konzepte werden später gemeinsam und sorgfältig ergänzt.</p></div>
        </section>

        <section className="section closing-section" id="schlusswort">
          <div className="closing-badge" data-reveal><div className="badge-star small"><div className="badge-core"><ShieldCheck size={34} /><span>LS</span></div></div></div>
          <div data-reveal>
            <p className="eyebrow centered">Schlusswort</p>
            <h2>Vielen Dank für die Zeit<br />und das <span>Interesse.</span></h2>
            <p>Ich freue mich auf ein persönliches Gespräch.</p>
            <div className="signature">Rainer Rose</div>
            <div className="submitted"><span /> Application submitted <small>Case RR-0804</small></div>
          </div>
        </section>
      </main>
      <footer><span>LSCSD Applicant Portal</span><span>Rainer Rose · RR-0804</span><span>Los Santos County</span></footer>
    </div>
  );
}

export default App;
