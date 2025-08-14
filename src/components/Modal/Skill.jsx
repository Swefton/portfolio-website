import TwoColumnSelector from "@/components/Modal/TwoColumnSelector";
import styles from './TwoColumn.module.css';

const SkillsViewer = ({ open, onClose }) => {
  return (
    <TwoColumnSelector
      open={open}
      onClose={onClose}
      items={[
        {
          label: "Process Automation",
          content: (
            <div>
              <h1>Process Automation</h1>
              <p>Process automation is about designing systems that can run tasks, make decisions, or move data between tools without human input, based on pre-defined rules. It's important because it reduces errors, saves time, and lets people focus on work that actually needs human judgment.</p>
              <p>I started getting into processs automation when I worked at the MSU Library. I noticed my supervisor would spend dozens of hours when aquiring catalogue items finding deals, taking screenshots, naming those screenshots and neatly organizing them. When I saw this, I pitched, prototyped and developed a Python script to automate this process by scraping webpages for data and organizing it saving my supervisor a dozen hours fortnightly.</p>
              <p>I did the same thing during my data science internship at iSON Xperiences, where I automated our retrieval of weekly datasets, which would ordinarily take hours to get proper security clearance from the office in Africa, but a secure selenium pipeline allowed us to retrieve, store and index this data automatically.</p>
              <p>Automation is powerful because it frees up time from mundane tasks so that we can focus on the task at hand. Saving hours at my data science internship allowed us to run our models sooner which sped up our development time. But less appreciated, it reduces human effort. When renaming a file we didn't miss a letter and ruin the order of the files, it was consistent and reliable.</p>
            </div>
          )
        },
        {
          label: "Rust",
          content: (
            <div>
              <h1>Rust</h1>
              <p>Rust is a modern systems programming language focused on safety, speed, and concurrency. It was created to address the shortcomings of older low-level languages like C and C++, especially around memory safety and data races.</p>
              <p>I think the philosophy behind Rust is the borrow-checker. Instead of having the developer responsible for allocating and deallocating memory, Rust automatically frees memory when it falls out of scope, which means no memory leaks!. If used asidously by the programmer keeping scope in mind, it can be a powerful tool to create reliable memory safe software.</p>
              <p>Rust is a modern and trendy language, I picked it up from my friend who used it when researching psuedorandom number generator recommended it to me for its speed and developer experience allowing rapid prototyping in a low level language.</p>
              <p>I used Rust to create a blazingly fast sorting algorithm. Current spreadsheet software cannot sort library callnumbers, so I created software that sorts spreadsheets by callnumber, I used Rust for the sort because my software had to be built to sort millions of items and read large files while being fast enough to not hamper the user experience.</p>
            </div>
          )
        },
        {
          label: "Nix",
          content: (
            <div>
              <h1>Nix</h1>
              <p>Nix is a tool that lets you define your entire software environment in a single file, and then recreate that exact setup anywhere — right down to the version of each package. It's like taking a snapshot of your system that you can share, restore, or deploy with full confidence that it'll behave the same way every time.</p>
              <p>I got into Nix after switching to NixOS, a Linux distribution built around the idea of reproducibility. For example, I use it to snapshot all the software and configuration from my desktop, and carry that setup on a USB drive. That way, I can access my tools and environment from any machine — no matter the operating system.</p>
              <p>What I like most about Nix is that it represents a mindset. Instead of living with small annoyances in my setup, I chose to learn something new and fix the problem properly. Nix is a reminder that I'm not afraid to dive into a new tool if it means saving time and gaining control.</p>
            </div>
          )
        },
        {
          label: "Vim",
          content: (
            <div>
              <h1>Vim</h1>
              <p>Before the mouse became standard, we still had to write and edit text — and we did it with tools like Vim. Vim is a legendary, keyboard-driven text editor that's been around since 1991, designed for navigating and editing entirely through the keyboard using different modes (like Normal, Insert, and Visual).</p>
              <p>It's lightweight, fast, and runs just about anywhere — from full desktops to bare terminals on remote servers. I picked up Vim because I was tired of constantly reaching for the mouse just to move the cursor. There's definitely a learning curve, but once the muscle memory sets in, it feels incredibly fluid. I still have a lot to learn (like macros and registers), but I use it daily and genuinely enjoy the speed and control it gives me.</p>
            </div>
          )
        }
      ]}
    />
  );
};

export default SkillsViewer;