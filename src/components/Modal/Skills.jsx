import TwoColumnSelector from "@/components/Modal/TwoColumnSelector";
import styles from "./TwoColumn.module.css";
import skillstyle from "./Skills.module.css";

const SkillsViewer = ({ open, onClose }) => {
  return (
    <TwoColumnSelector
      open={open}
      onClose={onClose}
      items={[
        {
          label: "Process Automation",
          content: (
            <div className={styles.content}>
              <h1>Process Automation</h1>
              <p>Process automation is about designing systems that can run tasks, make decisions, or move data between tools without human input, based on pre-defined rules. It's important because it reduces errors, saves time, and lets people focus on work that actually needs human judgment.</p>
              <p>I started getting into processs automation when I worked at the MSU Library…</p>
              <p>I did the same thing during my data science internship at iSON Xperiences…</p>
              <p>Automation is powerful because it frees up time from mundane tasks…</p>
            </div>
          )
        },
        {
          label: "Rust",
          content: (
            <div className={styles.content}>
              <h1>Rust</h1>
              <p>Rust is a modern systems programming language…</p>
              <p>I used Rust to create a blazingly fast sorting algorithm…</p>
            </div>
          )
        },
        {
          label: "Nix",
          content: (
            <div className={styles.content}>
              <h1>Nix</h1>
              <p>Nix is a tool that lets you define your entire software environment…</p>
            </div>
          )
        },
        {
          label: "Vim",
          content: (
            <div className={styles.content}>
              <h1>Vim</h1>
              <p>Before the mouse became standard, we still had to write and edit text …</p>
            </div>
          )
        }
      ]}
    />
  );
};

export default SkillsViewer;
