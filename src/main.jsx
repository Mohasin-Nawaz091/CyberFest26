import React, {useEffect, useRef, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ChevronDown, Menu, X, Linkedin, Instagram, Youtube, ShieldCheck, Sparkles, MapPin, CalendarDays, Users, ArrowRight, Check, Images, Send, Trophy, Code2, Mic2, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const speakers = [
  {name:'Muhammad Jawad', role:'Director CyberPashto and the event head', topic:'Turning intelligence into action', img:'assets/speakers/jawad.jpg'},
   {name:'Fawad Bacha', role:'CEO of CyberPashto', topic:'Following the evidence', img:'assets/speakers/fawadb.jpg'},
  {name:'Hisham Sarwar', role:'CEO of innovistaofficialpk', topic:'Zero Trust & the next security frontier', img:'assets/speakers/hisham.jpg'},
  {name:'Fawad Kamal', role:'Community Manager @gdglivepakistan', topic:'Inside the modern threat landscape', img:'assets/speakers/fawad.png'},
  {name:'Afsar Afghan', role:'Artist and Social Media Influencer', topic:'Securing AI before it scales', img:'assets/speakers/afsar-afghan.jpg'},
  {name:'Adnan Malik', role:'CEO of SecurePurple', topic:'Cloud-native defense by design', img:'assets/speakers/adnan.jfif'},
  
 
  {name:'Jalal Rehman', role:'Hosting Cyberfest', topic:'Breaking assumptions, building resilience', img:'assets/speakers/jalal.jpg'},

  {name:'Asif Taj', role:'Seasoned Flutter Developer', topic:'From alert fatigue to autonomous SOCs', img:'assets/speakers/asift.jpg'},
];

const agenda = [
  ['01','09:00 — 10:00','Opening Keynote','The cyber landscape is changing fast. Start with the signals, risks and opportunities that will shape the year ahead.','Ayesha Khan'],
  ['02','10:15 — 11:00','Inside the Threat Landscape','Real-world attack patterns, practical defenses and the habits security teams need before the next incident.','Daniel Reed'],
  ['03','11:15 — 12:00','AI Security: Hype to Hardening','What happens when AI becomes part of every workflow — and how to protect the models, data and people around it.','Maya Chen'],
  ['04','12:00 — 13:00','Cyber Community Lunch','Meet builders, defenders, founders and students over an informal lunch designed for useful conversations.','CyberFest Team'],
  ['05','13:00 — 14:00','Cloud Defense by Design','Architecting resilient cloud systems with identity-first controls, observability and smart automation.','Omar Malik'],
  ['06','14:15 — 15:15','Hands-on Red Team Lab','A guided practical session where you can see how attackers chain small weaknesses into big outcomes.','Hamza Shah'],
  ['07','15:30 — 16:15','Future of Digital Trust','A forward-looking panel on privacy, identity, AI and the next generation of digital trust.','CyberFest Panel'],
  ['08','16:30 — 17:00','Closing: Build What Comes Next','Key takeaways, community shout-outs and the next chapter for Pakistan’s cyber community.','CyberFest Team']
];

const faqs = [
  ['What is CyberFest?','CyberFest is a technology and cybersecurity gathering bringing students, developers, security professionals, founders and industry leaders together for talks, workshops, CTF activities and meaningful networking.'],
  ['When is the event?','CyberFest 2026 is taking place in September 2026 in Dishover. The final day, venue and session timings can be updated here as the event schedule is confirmed.'],
  ['Who can attend?','Anyone curious about cybersecurity and technology can register — from students and beginners to experienced professionals, founders and researchers.'],
  ['Can I register for more than one activity?','Yes. The registration form lets you select multiple activities, including CyberFest attendance, CTF participation, workshops and other available experiences.'],
  ['Is registration free?','CyberFest uses registration for attendance. Any activity-specific requirements will be clearly shown on the registration form.'],
  ['How can my company sponsor CyberFest?','Reach out through the sponsor/contact route and the CyberFest team can share available partnership opportunities.']
];

const sponsors = ['INNOVISTA','SecurePurple','RESECURITY','VERIFIED PAKISTAN','HUM NEWS','MASH CREATIVE STUDIOS','GDG FAST NUCES','GDG UET PESHAWAR','TECH TRIBE SOCIETY','HUMAN CARE','Black Byt3','SOLUTIONERS','HADAF COLLEGES','ASADR','AWKUM','MATRIX PAKISTAN','GITHUB EDUCATION'];

const galleryImages = [
  ['CyberFest 2025 / Main Stage','https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=88'],
  ['CyberFest 2025 / Community','https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1000&q=88'],
  ['CyberFest 2025 / Keynote','https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=88'],
  ['CyberFest 2024 / Workshop','https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=88'],
  ['CyberFest 2024 / Networking','https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=88'],
  ['CyberFest 2024 / Speakers','https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=88'],
  ['CyberFest 2023 / Crowd','https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=88'],
  ['CyberFest 2023 / Learning Lab','https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=88'],
  ['CyberFest 2023 / Community','https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=88'],
  ['CyberFest 2022 / Stage','https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1000&q=88'],
  ['CyberFest 2022 / Team','https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=88'],
  ['CyberFest 2022 / Moments','https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=88']
];

const registrationOptions = [
  {id:'cyberfest', title:'CyberFest Main Event', desc:'Talks, keynotes, community sessions and the full event experience.', icon:ShieldCheck},
  {id:'ctf', title:'CTF Competition', desc:'Join the Capture The Flag experience and test your practical security skills.', icon:Trophy},
  {id:'workshops', title:'Hands-on Workshops', desc:'Reserve interest in practical labs, demos and guided technical sessions.', icon:Code2},
  {id:'networking', title:'Networking & Community', desc:'Connect with students, professionals, founders and security teams.', icon:Users},
  {id:'speakers', title:'Speaker Sessions', desc:'Get access to the talks and expert-led sessions across the program.', icon:Mic2},
  {id:'student', title:'Student Community', desc:'Join student-focused activities, mentorship and learning opportunities.', icon:GraduationCap}
];

function App(){
  const path=window.location.pathname.replace(/\/+$/,'') || '/';
  if(path==='/registration') return <RegistrationPage/>;
  if(path==='/gallery') return <GalleryPage/>;
  return <HomePage/>;
}

function useMotion(){
  const app=useRef(null);
  useEffect(()=>{
    const lenis=new Lenis({duration:1.15,smoothWheel:true,touchMultiplier:1.4});
    const raf=(time)=>lenis.raf(time*1000);
    const cursor=document.querySelector('.cursor-glow');
    const onMove=(e)=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';}};
    window.addEventListener('pointermove',onMove);
    gsap.ticker.add(raf); gsap.ticker.lagSmoothing(0);
    const ctx=gsap.context(()=>{
      gsap.from('.nav-inner',{y:-35,opacity:0,duration:1,ease:'power3.out',delay:.15});
      gsap.from('.page-hero .hero-kicker',{y:25,opacity:0,duration:.8,ease:'power3.out',delay:.3});
      gsap.from('.page-hero .hero-title .line',{yPercent:110,opacity:0,stagger:.08,duration:1.05,ease:'power4.out',delay:.42});
      gsap.from('.page-hero .hero-copy',{y:25,opacity:0,duration:.8,ease:'power3.out',delay:.8});
      gsap.from('.page-hero .hero-actions',{y:25,opacity:0,duration:.8,ease:'power3.out',delay:.95});
      gsap.to('.hero-orb',{yPercent:18,rotate:20,ease:'none',scrollTrigger:{trigger:'.page-hero',start:'top top',end:'bottom top',scrub:1}});
      gsap.utils.toArray('.reveal').forEach((el,i)=>gsap.from(el,{y:55,opacity:0,duration:.9,ease:'power3.out',delay:(i%4)*.05,scrollTrigger:{trigger:el,start:'top 86%',once:true}}));
      gsap.utils.toArray('.line-grow').forEach(el=>gsap.from(el,{scaleX:0,transformOrigin:'left center',duration:1.1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
      gsap.to('.marquee-track',{xPercent:-25,ease:'none',duration:28,repeat:-1});
      gsap.to('.grid-glow',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.experience',start:'top bottom',end:'bottom top',scrub:1}});
      document.querySelectorAll('[data-count]').forEach(el=>{const end=Number(el.dataset.count),obj={v:0};gsap.to(obj,{v:end,duration:2,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%',once:true},onUpdate:()=>el.textContent=Math.floor(obj.v).toLocaleString()});});
      document.querySelectorAll('.magnetic').forEach(el=>{const move=(e)=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.12;const y=(e.clientY-r.top-r.height/2)*.12;el.style.transform=`translate(${x}px,${y}px)`};const leave=()=>el.style.transform='translate(0,0)';el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);});
      document.querySelectorAll('.tilt').forEach(el=>{const move=(e)=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${y*-5}deg) rotateY(${x*5}deg) translateY(-3px)`};const leave=()=>el.style.transform='perspective(900px) rotateX(0) rotateY(0) translateY(0)';el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);});
    },app);
    return()=>{ctx.revert();gsap.ticker.remove(raf);lenis.destroy();window.removeEventListener('pointermove',onMove)};
  },[]);
  return app;
}

function go(path){window.location.href=path;}
function Header({active=''}){
  const [menuOpen,setMenuOpen]=useState(false);
  const links=[['Experience','#experience'],['Speakers','#speakers'],['Agenda','#agenda'],['Gallery','/gallery'],['FAQ','#faq']];
  const home=window.location.pathname==='/' || window.location.pathname==='';
  const click=(href)=>{setMenuOpen(false); if(href.startsWith('#')){if(home) document.querySelector(href)?.scrollIntoView({behavior:'smooth'});else go('/'+href);} else go(href)};
  return <header className="nav"><div className="nav-inner">
    <button className="brand brand-button" onClick={()=>go('/')}><img src="assets/stroke.png" alt="CyberFest logo" className="brand-logo"/></button>
    <nav className={menuOpen?'nav-links open':'nav-links'}>{links.map(([x,h])=><button key={x} className={active===x.toLowerCase()?'active':''} onClick={()=>click(h)}>{x}</button>)}</nav>

    <button
      className="nav-ticket magnetic"
      style={{
        backgroundImage: 'url(assets/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onClick={() => go('/registration')}
    >
      Register Now <ArrowUpRight size={15}/>
    </button>
    <button className="menu-btn" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
  </div></header>
}

function HomePage(){
  const app=useMotion();
  const [faqOpen,setFaqOpen]=useState(0);
  const scrollTo=(id)=>document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
  return <div ref={app} className="site"><div className="cursor-glow"/><Header/>
    <main id="top">
      <section className="hero page-hero"><div className="hero-bg-grid"/><div className="hero-orb"/><div className="hero-inner">
        <div className="hero-kicker"><span className="pulse"/> SEPTEMBER 2026 <i/> DISHOVER <i/> CYBER COMMUNITY EVENT</div>
       
        <h1 className="hero-title">
          <span className="line">WHERE CYBER</span>
          <span
            className="line accent-line"
            style={{
              backgroundImage: 'url(assets/bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block'
            }}
          >
            MINDS <em>MEET</em>
          </span>
          <span className="line">THE FUTURE<span className="dot" style={{color: '#c0f107'}}>.</span></span>
        </h1>

        {/* <h1 className="hero-title"><span className="line">WHERE CYBER</span><span className="line accent-line">MINDS <em>MEET</em></span><span className="line">THE FUTURE<span className="dot">.</span></span></h1> */}
        <p className="hero-copy">A high-energy gathering for cybersecurity builders, ethical hackers, students, founders and the people shaping a safer digital future.</p>
        <div className="hero-actions"><button className="btn btn-primary magnetic"  style={{
        backgroundImage: 'url(assets/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }} onClick={()=>go('/registration')}>Register Yourself <ArrowUpRight size={17}/></button><button className="btn btn-ghost magnetic" onClick={()=>scrollTo('#agenda')}>Explore agenda <ArrowRight size={17}/></button></div>
        <div className="hero-meta"><div><strong>15+</strong><span>DAYS<br/>OF IMPACT</span></div><div><strong>10+</strong><span>EXPERT<br/>VOICES</span></div><div><strong>5000+</strong><span>CYBER<br/>MINDS</span></div></div>
      </div><div className="hero-media"><img className="hero-image" src="assets/card2.jpg"/><div className="media-overlay"/><div className="media-label"><span>LIVE / SEPT 2026</span><b>CyberFest</b></div></div></section>
      <section className="marquee" aria-label="CyberFest topics"><div className="marquee-track">{[...sponsors,...sponsors].map((s,i)=><React.Fragment key={i}><span>{s}</span><img src="assets/stroke.png" alt="logo" /></React.Fragment>)}</div></section>
      <section className="section experience" id="experience"><div className="grid-glow"/><SectionHead kicker="THE EXPERIENCE" title={<>More than a conference.<br/><span  style={{
              backgroundImage: 'url(assets/bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block'
            }}>Built for momentum.</span></>} text="Every part of CyberFest is designed to move you from listening to doing — with sharp ideas, practical sessions and people worth knowing."/><div className="experience-grid">{[['01','Live Intelligence','Hear from security leaders, researchers and practitioners unpacking the threats and opportunities shaping tomorrow.'],['02','Hands-on Labs','Step beyond the slides with practical workshops, red-team thinking and guided security challenges.'],['03','Real Connections','Meet the builders, founders and defenders creating Pakistan’s next generation of cyber talent.'],['04','Future Focus','Explore AI security, cloud defense, digital trust and the technologies rewriting the security playbook.']].map(([n,t,d])=><article className="experience-card reveal tilt" key={n}><div className="card-number">{n}</div><div className="icon-box"><Sparkles size={18}/></div><h3>{t}</h3><p>{d}</p><ArrowUpRight className="card-arrow" size={19}/></article>)}</div></section>
      <section className="section speakers" id="speakers"><SectionHead kicker="MEET THE SPEAKERS" title={<>People who <span  style={{
              backgroundImage: 'url(assets/bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block'
            }}>build, break</span><br/>and defend.</>} text="A mix of security practitioners, technology leaders and ambitious minds bringing real-world experience to the stage."/><div className="speaker-grid">{speakers.map((s,i)=><article className="speaker-card reveal tilt" key={s.name}><div className="speaker-img"><img src={s.img}/><div className="speaker-shade"/><div className="speaker-social"><Linkedin size={13}/><Instagram size={13}/></div><span className="speaker-num">0{i+1}</span></div><div className="speaker-info"><h3>{s.name}</h3><p>{s.role}</p><small>{s.topic}</small></div></article>)}</div></section>
      <section className="section agenda-section" id="agenda"><SectionHead kicker="EXPLORE THE AGENDA" title={<>One day. <span>Eight moments</span><br/>worth showing up for.</>} text="A fast-moving program balancing big-picture ideas, practical learning and time to connect."/><div className="agenda-wrap"><div className="agenda-intro"><span>SEPTEMBER / 2026</span><strong>THE DAY<br/>AT A GLANCE</strong><p>Times are provisional and can be updated as the final CyberFest program is confirmed.</p></div><div className="agenda-list">{agenda.map(([n,time,title,desc,speaker])=><article className="agenda-row reveal" key={n}><div className="agenda-no">{n}</div><div className="agenda-time">{time}</div><div className="agenda-main"><h3>{title}</h3><p>{desc}</p></div><div className="agenda-speaker">{speaker}</div><ArrowUpRight size={18}/></article>)}</div></div></section>
      <section className="section stats-section"><div className="stats-grid"><Stat n="500" suffix="+" label="registered community"/><Stat n="20" suffix="+" label="speakers & mentors"/><Stat n="12" suffix="" label="hands-on sessions"/><Stat n="01" suffix="" label="unforgettable day"/></div></section>
      <section className="section gallery" id="venue"><SectionHead kicker="WHAT YOU CAN EXPECT" title={<>A room full of <span>energy.</span><br/>A community full of ideas.</>} text="From keynote moments to focused conversations, CyberFest is designed to feel immersive from the first step in."/><div className="gallery-grid"><div className="gallery-item big reveal"><img src={galleryImages[0][1]}/><span>01 / THE MAIN STAGE</span></div><div className="gallery-item reveal"><img src={galleryImages[1][1]}/><span>02 / PURPOSEFUL NETWORKING</span></div><div className="gallery-item reveal"><img src={galleryImages[2][1]}/><span>03 / HANDS-ON LEARNING</span></div><div className="gallery-copy reveal"><Images/><h3>Explore the <span>CyberFest gallery.</span></h3><p>See highlights from previous years, community moments, workshops and the people who make CyberFest what it is.</p><button className="text-link magnetic" onClick={()=>go('/gallery')}>Open full gallery <ArrowUpRight size={16}/></button></div></div></section>
      <section className="section sponsors" id="sponsors"><SectionHead kicker="POWERED BY THE COMMUNITY" title={<>Backed by <span  style={{
              backgroundImage: 'url(assets/bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block'
            }}>bold builders.</span></>} text="Partner with CyberFest to put your brand in the room with the next generation of technology and security talent."/><div className="sponsor-wall">{sponsors.map((s,i)=><div className="sponsor reveal" key={s}><span>{i%3===0?'◆':i%3===1?'◉':'✦'}</span>{s}</div>)}</div><button className="text-link magnetic">Become a sponsor <ArrowUpRight size={16}/></button></section>
      <section className="section testimonials"><SectionHead kicker="PAST ATTENDEES" title={<>The kind of event <span  style={{
              backgroundImage: 'url(assets/bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block'
            }}>people remember.</span></>} text="A few sample voices inspired by the reference design — replace these with real CyberFest attendee testimonials when available."/><div className="testimonial-grid">{[['“The sessions cut through the noise. I left with practical ideas I could take straight back to our security team.”','Security Lead'],['“The best part was the people. Students, engineers and industry folks all in one room, actually talking.”','Software Engineer'],['“It felt ambitious without feeling intimidating. Exactly what a growing cyber community needs.”','Cybersecurity Student']].map(([q,r],i)=><article className="quote-card reveal" key={i}><div className="stars">★★★★★</div><p>{q}</p><div className="quote-author"><span>{['AK','SR','HM'][i]}</span><div><b>{['Amina Khan','Saad Riaz','Hina Malik'][i]}</b><small>{r}</small></div></div></article>)}</div></section>
      <section className="section venue"><div className="venue-card reveal"><div className="venue-copy"><span className="eyebrow">THE VENUE / DISHOVER</span><h2>A place built for <span>big ideas.</span></h2><p>CyberFest will bring the community together in Dishover this September. Final venue details and the exact address will be published with registration.</p><div className="venue-facts"><div><MapPin/><b>Dishover</b><small>Event location</small></div><div><CalendarDays/><b>September 2026</b><small>Event month</small></div><div><Users/><b>500+ capacity</b><small>Community scale</small></div></div></div><div className="venue-art"><img src="assets/logo.png" alt="CyberFest logo" className="venue-logo" style={{maxWidth:'100%',height:'auto',objectFit:'contain'}}/></div></div></section>
      <section className="section faq" id="faq"><SectionHead kicker="FREQUENTLY ASKED QUESTIONS" title={<>You ask.<br/><span>We’ve got answers.</span></>} text="A few quick details about CyberFest. More event information will be added as September gets closer."/><div className="faq-list">{faqs.map(([q,a],i)=><div className={'faq-item '+(faqOpen===i?'active':'')} key={q}><button onClick={()=>setFaqOpen(faqOpen===i?-1:i)}><span>{q}</span><ChevronDown size={20}/></button><div className="faq-answer"><p>{a}</p></div></div>)}</div></section>
      <CTA/>
    </main><Footer/></div>
}

function CTA(){return <section className="cta" style={{backgroundImage:'url(assets/bg.png)', backgroundSize:'cover', backgroundPosition:'center'}}><div className="cta-grid"/><div className="cta-inner"><span className="eyebrow" style={{color:'black'}}>SEPTEMBER 2026 / DISHOVER</span><h2>Don’t just watch<br/>the future. <span style={{color:'black'}}>shape it.</span></h2><p style={{color:'black'}}>Choose the CyberFest activities you want to join. You can register for the main event, CTF, workshops and other experiences in one form.</p><button className="btn btn-primary magnetic" onClick={()=>go('/registration')}>Register Yourself <ArrowUpRight size={17}/></button><div className="cta-note" style = {{color:'black'}}><Users size={15}/ > One registration. Multiple CyberFest experiences.</div></div></section>}

function RegistrationPage(){
  const app=useMotion();
  const [selected,setSelected]=useState(['cyberfest']);
  const [submitted,setSubmitted]=useState(false);
  const toggle=(id)=>setSelected(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const submit=(e)=>{e.preventDefault();setSubmitted(true);window.scrollTo({top:0,behavior:'smooth'});};
  return <div ref={app} className="site inner-page"><div className="cursor-glow"/><Header active="registration"/>
    <main>
      <section className="inner-hero page-hero"><div className="hero-bg-grid"/><div className="hero-orb"/><div className="inner-hero-content"><span className="eyebrow">CYBERFEST 2026 / REGISTRATION</span><h1 className="inner-title">Register <span>yourself.</span><br/>Choose your experience.</h1><p>There are no ticket tiers or ticket sales here. Tell us what you want to be part of and register once for the CyberFest experiences that interest you.</p><div className="hero-actions"><button className="btn btn-ghost magnetic" onClick={()=>go('/')}>Back to CyberFest <ArrowRight size={17}/></button></div></div></section>
      <section className="registration-section section"><div className="registration-layout">
        <div className="registration-intro reveal"><span className="eyebrow">01 / SELECT EXPERIENCES</span><h2>One form.<br/><span>Multiple choices.</span></h2><p>Select everything you want to attend. You can choose CyberFest itself, CTF, workshops, networking and student-focused activities together.</p><div className="selection-count"><strong>{selected.length}</strong><span>experience{selected.length===1?'':'s'} selected</span></div></div>
        <form className="registration-form" onSubmit={submit}>
          <div className="form-block"><span className="form-label">WHAT DO YOU WANT TO JOIN?</span><div className="option-grid">{registrationOptions.map(({id,title,desc,icon:Icon})=>{const active=selected.includes(id);return <button type="button" className={'register-option '+(active?'selected':'')} key={id} onClick={()=>toggle(id)}><span className="option-icon"><Icon size={20}/></span><span className="option-text"><b>{title}</b><small>{desc}</small></span><span className="option-check">{active?<Check size={15}/>:null}</span></button>})}</div></div>
          <div className="form-block"><span className="form-label">YOUR DETAILS</span><div className="form-grid"><label>Full Name<input required name="name" placeholder="Your full name"/></label><label>Email Address<input required type="email" name="email" placeholder="you@example.com"/></label><label>Phone Number<input name="phone" placeholder="+92 3XX XXXXXXX"/></label><label>Organization / University<input name="organization" placeholder="Company, university or community"/></label><label>City<input name="city" placeholder="Peshawar"/></label><label>Experience Level<select name="level" defaultValue="student"><option value="student">Student / Beginner</option><option value="intermediate">Intermediate</option><option value="professional">Professional</option><option value="expert">Security Expert / Researcher</option></select></label></div></div>
          <div className="form-block"><span className="form-label">CTF / WORKSHOP NOTES</span><label className="full-label">Anything we should know?<textarea name="notes" placeholder="Tell us about your CTF experience, interests or accessibility needs..." rows="5"/></label></div>
          <div className="form-actions"><button className="btn btn-primary magnetic" disabled={selected.length===0}>Submit Registration <Send size={16}/></button><small>By registering, you agree to receive CyberFest event updates and registration-related communication.</small></div>
          {submitted&&<div className="success-panel"><Check/><div><b>Registration captured in this demo.</b><span>Connect this form to your backend/API to store registrations and send confirmations.</span></div></div>}
        </form>
      </div></section>
      <section className="section registration-note"><div className="note-card reveal"><Sparkles/><div><span className="eyebrow">BUILT FOR CYBERFEST</span><h3>Register once. Pick more than one thing.</h3><p>For the final production version, this form can connect to Firebase, MongoDB, Google Sheets, a custom API or any registration backend you choose.</p></div></div></section>
    </main><Footer/></div>
}

function GalleryPage(){
  const app=useMotion();
  const [filter,setFilter]=useState('All Years');
  const years=['All Years','2025','2024','2023','2022'];
  const filtered=galleryImages.filter(([label])=>filter==='All Years'||label.includes(filter));
  return <div ref={app} className="site inner-page"><div className="cursor-glow"/><Header active="gallery"/>
    <main>
      <section className="inner-hero gallery-hero page-hero"><div className="hero-bg-grid"/><div className="hero-orb"/><div className="inner-hero-content"><span className="eyebrow">CYBERFEST ARCHIVE / PAST YEARS</span><h1 className="inner-title">Moments from <span>the community.</span></h1><p>Explore the energy, people, workshops and stages from previous CyberFest editions. This archive is ready for your official event photography.</p><div className="hero-actions"><button className="btn btn-ghost magnetic" onClick={()=>go('/')}>Back home <ArrowRight size={17}/></button><button className="btn btn-primary magnetic" onClick={()=>go('/registration')}>Register Yourself <ArrowUpRight size={17}/></button></div></div></section>
      <section className="section archive-section"><div className="archive-head"><div><span className="eyebrow">PHOTO ARCHIVE</span><h2>CyberFest <span>through the years.</span></h2></div><div className="filter-tabs">{years.map(y=><button className={filter===y?'active':''} key={y} onClick={()=>setFilter(y)}>{y}</button>)}</div></div><div className="archive-grid">{filtered.map(([label,img],i)=><figure className="archive-item reveal tilt" key={label}><img src={img}/><div className="archive-overlay"><span>{label.split(' / ')[0]}</span><b>{label.split(' / ')[1]}</b></div><small>{String(i+1).padStart(2,'0')}</small></figure>)}</div></section>
      <section className="cta gallery-cta"><div className="cta-grid"/><div className="cta-inner"><span className="eyebrow">SEPTEMBER 2026 / DISHOVER</span><h2>Make the next<br/><span>gallery wall.</span></h2><p>Join CyberFest 2026 and become part of the next chapter of the community.</p><button className="btn btn-primary magnetic" onClick={()=>go('/registration')}>Register Yourself <ArrowUpRight size={17}/></button></div></section>
    </main><Footer/></div>
}

function Footer(){return <footer><div className="footer-main"><button className="brand brand-button" onClick={()=>go('/')}><img src="assets/stroke.png" alt="CyberFest logo" style={{width:'70px',height:'40px'}}/><span>CYBER<span>FEST</span></span><small>26</small></button><p>Cybersecurity, technology and the people building a safer digital future.</p><div className="footer-links"><button onClick={()=>go('/')}>Experience</button><button onClick={()=>{go('/')}}>Speakers</button><button onClick={()=>go('/')}>Agenda</button><button onClick={()=>go('/gallery')}>Gallery</button><button onClick={()=>go('/registration')}>Register</button></div><div className="socials"><a href="#" aria-label="LinkedIn"><Linkedin/></a><a href="#" aria-label="Instagram"><Instagram/></a><a href="#" aria-label="YouTube"><Youtube/></a></div></div><div className="footer-bottom"><span>© 2026 CyberFest. All rights reserved.</span><span>Designed for the CyberFest community.</span></div></footer>}
function SectionHead({kicker,title,text}){return <div className="section-head reveal"><span className="eyebrow">{kicker}</span><h2>{title}</h2><div className="head-bottom"><span className="line-grow"/><p>{text}</p></div></div>}
function Stat({n,suffix,label}){return <div className="stat reveal"><strong><span data-count={Number(n)}>{n}</span>{suffix}</strong><small>{label}</small></div>}
createRoot(document.getElementById('root')).render(<App/>);
