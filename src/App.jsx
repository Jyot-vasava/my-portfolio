import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  Menu,
  X,
  ExternalLink,
  Code2,
  Database,
  Globe,
  ArrowDown,
  MapPin,
  Send,
  Zap,
  Users,
  Layers,
} from "lucide-react";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setFormStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "Message sent successfully!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          "An error occurred. Please try emailing directly at vasavajyotkumar@gmail.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "education",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const projects = [
    {
      title: "EstateNetwork",
      desc: "A full-stack real estate platform for browsing, searching, and filtering properties. Features JWT authentication, REST APIs, image uploads via Cloudinary, email with Nodemailer.",
      features: ["Property Listings", "JWT Auth", "Image Uploads"],
      tech: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redux",
        "Tailwind CSS",
        "Cloudinary",
      ],
      gradient: "from-yellow-900/40 to-orange-900/40",
      github: "https://github.com/Jyot-vasava/EstateNetwork",
    },
    {
      title: "PlayBox",
      desc: "An OTT content aggregator with tier-based subscription plans. Includes user and admin dashboards to manage content, users, analytics, reviews, and activity tracking.",
      features: ["Subscription Tiers", "Admin Dashboard", "Content Management"],
      tech: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redux",
        "Tailwind CSS",
      ],
      gradient: "from-purple-900/40 to-pink-900/40",
      github: "https://github.com/Jyot-vasava/PlayBox",
    },
    {
      title: "OTT Platform Database Design",
      desc: "A normalized relational database design for an OTT platform with ER diagrams, DDL scripts, and complex SQL queries ensuring data consistency.",
      features: ["ER Diagrams", "Normalization", "Complex Queries"],
      tech: ["PostgreSQL", "SQL", "draw.io"],
      gradient: "from-blue-900/40 to-cyan-900/40",
      github: "https://github.com/Jyot-vasava/OTT-Database-Design",
    },
  ];

  return (
    <div className="bg-black text-gray-100 min-h-screen">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all ${
          scrolled
            ? "bg-black/95 backdrop-blur-sm border-b border-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <a
              href="#home"
              onClick={() => scrollToSection("home")}
              className="text-2xl font-bold"
            >
              Jyot Vasava
            </a>
            <div className="hidden md:flex space-x-10">
              {[
                "Home",
                "About",
                "Skills",
                "Projects",
                "Education",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-colors ${
                    activeSection === item.toLowerCase()
                      ? "text-yellow-500"
                      : "text-gray-400 hover:text-yellow-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Education",
              "Contact",
            ].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-6 py-3 hover:bg-gray-800"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <p className="text-yellow-500 font-semibold mb-4 tracking-wider">
                HELLO!
              </p>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                I'm <span className="text-yellow-500">Jyot Vasava</span>
              </h1>
              <p className="text-2xl md:text-3xl font-bold mb-4">
                MERN Stack Developer
              </p>
              <p className="text-xl text-gray-400 mb-6">B.Tech ICT Student</p>
              <p className="text-lg text-gray-400 max-w-xl mx-auto md:mx-0 mb-10">
                Building scalable, user-centric web applications with modern
                technologies.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="flex items-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded transition-all transform hover:scale-105"
                >
                  My Works <ArrowDown size={20} />
                </button>
                <a
                  href="../public/Jyot_Vasava_Resume.pdf"
                  className="flex items-center gap-2 px-8 py-4 border-2 border-gray-700 hover:border-yellow-500 rounded transition-all transform hover:scale-105"
                >
                  <Download size={20} /> Download Resume
                </a>
              </div>
              <div className="flex justify-center md:justify-start gap-4">
                {[
                  { icon: Github, link: "https://github.com/Jyot-vasava" },
                  {
                    icon: Linkedin,
                    link: "https://www.linkedin.com/in/jyot-vasava-518617256/",
                  },
                  { icon: Mail, link: "mailto:vasavajyotkumar@gmail.com" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-yellow-500 hover:text-black transition-all transform hover:scale-110"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Profile Image */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-blue-900 rounded-full blur-3xl animate-pulse"></div>

                {/* Profile Image Container */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-yellow-500/30 shadow-2xl shadow-red-500/20">
                  {/* Replace the src with your image path */}
                  <img
                    src="../public/profile.JPG"
                    alt="Jyot Vasava"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div
                    className="absolute inset-0 bg-amber-950 flex items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-amber-800 flex items-center justify-center text-6xl font-bold text-black">
                        JV
                      </div>
                      <p className="text-sm text-gray-400">
                        Add your photo as
                        <br />
                        /public/profile.jpg
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-yellow-500 font-semibold mb-4 text-sm tracking-widest">
                ABOUT ME
              </p>
              <h2 className="text-5xl font-bold mb-6">
                Passionate Developer
                <br />
                <span className="text-yellow-500">Building the Future</span>
              </h2>
              <p className="text-gray-400 mb-6">
                I'm a B.Tech ICT student and MERN stack developer passionate
                about building scalable, user-centric web applications. With
                hands-on experience in React, Node.js, MongoDB, and REST APIs, I
                bring ideas to life through clean, maintainable code.
              </p>
              <p className="text-gray-400 mb-8">
                My strong foundation in Data Structures & Algorithms and
                Database Management Systems enables me to solve real-world
                problems.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "React.js",
                  "Node.js",
                  "MongoDB",
                  "TypeScript",
                  "PostgreSQL",
                ].map((s) => (
                  <span
                    key={s}
                    className="px-4 py-2 bg-gray-900 border border-gray-800 rounded text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Code2,
                  title: "Clean Code",
                  desc: "Maintainable solutions",
                },
                {
                  icon: Globe,
                  title: "Full Stack",
                  desc: "End-to-end development",
                },
                {
                  icon: Database,
                  title: "Database Design",
                  desc: "Efficient architecture",
                },
                { icon: Zap, title: "Problem Solver", desc: "DSA thinking" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-yellow-500 transition-colors"
                >
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="text-yellow-500" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-yellow-500 font-semibold mb-4 text-sm tracking-widest">
              MY SKILLS
            </p>
            <h2 className="text-5xl font-bold">
              Technical <span className="text-yellow-500">Expertise</span>
            </h2>
            <p className="text-gray-400 mt-4">
              A comprehensive toolkit for building modern web applications
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Code2,
                title: "Languages",
                skills: ["C", "C++", "JavaScript", "SQL", "TypeScript"],
              },
              {
                icon: Code2,
                title: "Frontend",
                skills: ["React.js", "Redux", "Tailwind CSS", "HTML5", "CSS3"],
              },
              {
                icon: Layers,
                title: "Backend & Database",
                skills: ["Node.js", "Express.js", "REST APIs", "MongoDB"],
              },
              {
                icon: Database,
                title: "Tools & Technologies",
                skills: [
                  "Git & GitHub",
                  "Postman",
                  "VS Code",
                  "Cloudinary",
                  "MATLAB",
                ],
              },
              {
                icon: Zap,
                title: "Core Strengths",
                skills: [
                  "Data Structures",
                  "Algorithms",
                  "DBMS",
                  "OOP",
                  "Clean Code",
                ],
              },
              {
                icon: Users,
                title: "Soft Skills",
                skills: [
                  "Team Collaboration",
                  "Adaptability",
                  "Time Management",
                  "Problem-solving",
                ],
              },
            ].map((cat, i) => (
              <div
                key={i}
                className="bg-black border border-gray-800 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <cat.icon className="text-yellow-500" size={24} />
                  <h3 className="text-xl font-bold">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-600 border border-yellow-500/30 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center ">
                <span className="text-3xl font-bold text-yellow-500">M</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  MERN Stack Specialist
                </h3>
                <p className="text-gray-400">
                  Proficient in React.js, and Node.js, MongoDB, Express.js -
                  delivering complete full-stack solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-yellow-500 font-semibold mb-4 text-sm tracking-widest">
              MY WORK
            </p>
            <h2 className="text-5xl font-bold mb-4">
              Featured <span className="text-yellow-500">Projects</span>
            </h2>
            <p className="text-gray-400">
              Showcasing my journey in building full-stack applications and other projects
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {projects.map((p, i) => (
              <div
                key={i}
                className={`bg-amber-950 rounded-lg p-8 hover:border-yellow-500 transition-all`}
              >
                <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                <p className="text-gray-300 text-sm mb-6">{p.desc}</p>
                <div className="mb-6">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-black/50 border border-gray-700 rounded text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-yellow-500 text-sm font-semibold"
                >
                  <Github size={16} /> View Code <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://github.com/Jyot-vasava"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-800 hover:border-yellow-500 rounded"
            >
              <Github size={20} /> View All Projects on GitHub{" "}
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-24 px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-yellow-500 font-semibold mb-4 text-sm tracking-widest">
              EDUCATION
            </p>
            <h2 className="text-5xl font-bold mb-4">
              Academic <span className="text-yellow-500">Journey</span>
            </h2>
            <p className="text-gray-400">
              Building a strong foundation for a career in technology
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800"></div>
            {[
              {
                current: true,
                title: "Bachelor of Technology (B.Tech)",
                subtitle: "Information and Communication Technology (ICT)",
                school: "Dhirubhai Ambani University",
                location: "Gandhinagar, Gujarat",
                year: "2022 – 2026",
              },
              {
                title: "Higher Secondary Education",
                subtitle: "GHSEB",
                school: "Reliance Foundation School",
                location: "Surat, Gujarat",
                year: "2021 – 2022",
              },
              {
                title: "Secondary Education",
                subtitle: "GSEB",
                school: "Reliance Foundation School",
                location: "Surat, Gujarat",
                year: "2019 – 2020",
              },
            ].map((edu, i) => (
              <div key={i} className="flex items-center gap-4 mb-12 last:mb-0">
                <div
                  className={`relative z-10 w-16 h-16 ${
                    edu.current
                      ? "bg-yellow-500"
                      : "bg-gray-800 border-2 border-gray-700"
                  } rounded-full flex items-center justify-center `}
                >
                  <div
                    className={`w-3 h-3 ${
                      edu.current ? "bg-black" : "bg-yellow-500"
                    } rounded-full`}
                  ></div>
                </div>
                <div
                  className={`bg-black border ${
                    edu.current ? "border-yellow-500" : "border-gray-800"
                  } rounded-lg p-6 flex-1`}
                >
                  {edu.current && (
                    <div className="inline-block px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full mb-3">
                      Current
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{edu.title}</h3>
                  <p className="text-yellow-500 font-semibold mb-3">
                    {edu.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <MapPin size={14} />
                    <span>{edu.school}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <MapPin size={14} />
                    <span>{edu.location}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-yellow-500 font-semibold mb-4 text-sm tracking-widest">
              GET IN TOUCH
            </p>
            <h2 className="text-5xl font-bold mb-4">
              Let's <span className="text-yellow-500">Connect</span>
            </h2>
            <p className="text-gray-400">
              Have a project in mind or want to collaborate? Feel free to reach
              out!
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-8">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "vasavajyotkumar@gmail.com",
                    link: "mailto:vasavajyotkumar@gmail.com",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+91 9998212821",
                    link: "tel:+919998212821",
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    value: "github.com/Jyot-vasava",
                    link: "https://github.com/Jyot-vasava",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "linkedin.com/in/jyot-vasava",
                    link: "https://www.linkedin.com/in/jyot-vasava-518617256/",
                  },
                ].map((c, i) => (
                  <a
                    key={i}
                    href={c.link}
                    target={c.link.startsWith("http") ? "_blank" : ""}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-yellow-500 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <c.icon className="text-yellow-500" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">{c.label}</p>
                      <p className="font-semibold">{c.value}</p>
                    </div>
                    <ExternalLink
                      className="text-gray-600 group-hover:text-yellow-500"
                      size={16}
                    />
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span className="text-sm">Surat, Gujarat, India</span>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    className="px-4 py-3 bg-black border border-gray-800 rounded focus:border-yellow-500 focus:outline-none"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    className="px-4 py-3 bg-black border border-gray-800 rounded focus:border-yellow-500 focus:outline-none"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <input
                  type="text"
                  placeholder="What's this about?"
                  value={formData.subject}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded focus:border-yellow-500 focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
                <textarea
                  placeholder="Tell me about your project..."
                  rows="5"
                  value={formData.message}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded focus:border-yellow-500 focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>

                {formStatus.message && (
                  <div
                    className={`p-3 rounded ${
                      formStatus.type === "success"
                        ? "bg-green-900/30 text-green-400 border border-green-800"
                        : "bg-red-900/30 text-red-400 border border-red-800"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}{" "}
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; 2025 Jyot Vasava.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
