import TwoColumnSelector from "@/components/Modal/TwoColumnSelector";
import styles from "./TwoColumn.module.css";
import skillsstyles from './Skills.module.css';

const SkillsViewer = ({ open, onClose }) => {
  return (
    <TwoColumnSelector
      open={open}
      onClose={onClose}
      items={[
        {
          label: "Python",
          content: (
            <div className={skillsstyles.skillContent}>
              <h1>Python</h1>
              <p>Python is a versatile, high-level programming language used for web development, automation, AI, and data science. Its readability and rich library ecosystem make it ideal for rapid development.</p>
              <p>I mostly use Python at hackathons where we only have 24 hours for our submissions, and rapid prototyping helps us deliver quickly.</p>
              <p>I've used Python libraries such as Selenium for automation, and AI libraries like NLTK, OpenCV, SciPy, Pandas for data science courses, internships, and hackathon projects. For example, in our Journalingo project, I applied Computer Vision and NLP to analyze user body language and speech to detect hidden emotions.</p>
            </div>
          )
        },
        {
          label: "C++",
          content: (
            <div className={skillsstyles.skillContent}>
              <h1>C++</h1>
              <p>C++ is a high-performance programming language often used in systems programming, game development, and applications requiring speed and memory control.</p>
              <p>I've used C++ for low-level microcontrollers, such as telemetry for rockets at MSU Rocketry Club, and for hackathon projects like <a href="https://devpost.com/software/fire-detector" target="_blank">No Sweat</a>, where we programmed an Arduino to detect fires in a dorm room.</p>
            </div>
          )
        },
        {
          label: "Rust",
          content: (
            <div className={skillsstyles.skillContent}>
              <h1>Rust</h1>
              <p>Rust is a modern systems programming language emphasizing safety and speed. It prevents common errors like null pointer dereferencing and data races.</p>
              <p>I use Rust for performance-critical projects. For instance, at the MSU library, I implemented a sorting algorithm for <a href="https://en.wikipedia.org/wiki/Library_of_Congress_Classification" target="_blank">LCC call numbers</a> because Python was too slow for millions of items.</p>
              <p>Rust's ownership and borrowing model ensures memory safety, preventing leaks, use-after-free errors, and dangling pointers—common pitfalls in C++ development.</p>
              <p>Rust also enforces compile-time checks for data races in concurrent code, allowing high-performance systems programming with greater confidence.</p>
              <p>~ A message from a NON-Rust apologist: pick the right tool for the job.</p>
            </div>
          )
        },
        {
          label: "Web Technologies",
          content: (
            <div className={skillsstyles.skillContent}>
              <h1>Web Technologies</h1>
              <p>I enjoy working with web technologies because they make software accessible. I use various JavaScript frameworks:</p>
              <ul>
                <li><strong>Vue:</strong> Chrome extensions adapting hackathon projects</li>
                <li><strong>Next.js:</strong> Portfolio website (server-side rendering & Vercel hosting)</li>
                <li><strong>Flask:</strong> Backend-intensive projects like computer vision or NLP</li>
                <li><strong>Vanilla JS & CSS:</strong> Lightweight projects and prototypes</li>
              </ul>
            </div>
          )
        },
        {
          label: "Process Automation",
          content: (
            <div className={skillsstyles.skillContent}>
              <h1>Process Automation</h1>
              <p>Automation saves time, reduces errors, and frees humans for strategic work.</p>
              <p>At the MSU library, I automated cataloging and deal-finding tasks using Python. Later, during a Data Science internship at iSON Xperiences, I built maintainable automation scripts to retrieve data from our CX app, Genesys.</p>
            </div>
          )
        },
        {
          label: "Artificial Intelligence",
          content: (
            <div className={skillsstyles.skillContent}>
              <h1>Artificial Intelligence</h1>
              <p>AI enables systems to learn from data and make decisions, powering recommendation engines, NLP, and predictive analytics.</p>
              <p>My AI experience comes from formal training and hackathon projects. Key areas include:</p>
              <h2>Machine Learning</h2>
              <p>Worked on models like XGBoost for 1.8M datapoints with 87% accuracy.</p>
              <h2>Computer Vision</h2>
              <p>Body language analysis model detecting emotions at Purdue's Boilermake X.</p>
              <h2>Natural Language Processing (NLP)</h2>
              <p>Analyzed journal entries to detect emotions and developed search engines prioritizing human-generated content over AI-generated pages.</p>
              <h2>LLM Engineering</h2>
              <p>Fine-tuned models for semantic understanding, including custom vectorization for Wolverine Code Companion to answer engineering questions accurately.</p>
            </div>
          )
        },
        {
          label: "Linux",
          content: (
            <div className={skillsstyles.skillContent}>
              <h1>Linux</h1>
              <p>Linux is a widely used open-source operating system for servers, development, and embedded systems.</p>
              <p>It’s my primary OS <a href="https://www.github.com/swefton/dotfiles" target="_blank">since 2024</a>. I used it to build stable systems for the MSU Rocketry team and contribute to open-source projects in my free time.</p>
            </div>
          )
        },
        {
          label: "Nix",
          content: (
            <div className={skillsstyles.skillContent}>
              <h1>Nix</h1>
              <p>Nix ensures reproducible software environments across machines, preventing dependency conflicts.</p>
              <p>I used Nix for personal projects and deployments at the MSU library, ensuring consistent software versions and easy rollbacks.</p>
            </div>
          )
        },
        {
          label: "Vim",
          content: (
            <div className={skillsstyles.skillContent}>
              <h1>Vim</h1>
              <p>Vim is a highly configurable text editor optimized for speed. Mastery allows rapid editing and navigation without a mouse.</p>
              <p>I use Vim to keep hands on the keyboard, improving efficiency and reflecting my commitment to optimization.</p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ofhEORlO2Z4?si=t8zoE_SG9y08Pz8E"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          )
        }
      ]}
    />
  );
};

export default SkillsViewer;
