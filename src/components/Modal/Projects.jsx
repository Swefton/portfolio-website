import TwoColumnSelector from "@/components/Modal/TwoColumnSelector";
import styles from './TwoColumn.module.css';

const ProjectsViewer = ({ open, onClose }) => {
    return (
        <TwoColumnSelector
            open={open}
            onClose={onClose}
            items={[
                {
                    label: "OpenFiche",
                    content: (
                        <div className={styles.projectContent}>
                        <div className={styles.projectHeader}>
                            <h1 className={styles.projectTitle}>OpenFiche</h1>
                            <p className={styles.projectDescription}>
                            A post-AI academic browser and search engine that filters out low-quality AI-generated content, highlighting trustworthy, human-written sources.
                            </p>
                        </div>
                        <p>
                            Born out of frustration with the current AI-dominated search landscape serving AI slop, OpenFiche reimagines web search for academic and research-heavy use cases. Drawing inspiration from microfiche machines, OpenFiche surfaces reliable, high-quality content from curated sources like NPR, CNN, and Wikipedia. By combining a webgraph-based PageRank algorithm with keyword relevance scoring (via NLTK), the system returns search results that are both authoritative and contextually relevant.
                        </p>
                        <p>
                            On the front-end, we built a minimalist browser with React and Flask, hosted on Vercel at <a href="https://reada.wiki" target="_blank">reada.wiki</a>. The custom OpenFiche browser is a lightweight Chromium abstraction built with QT, featuring a git-style history graph, distraction-free reader mode, and intuitive tab management. These tools aim to streamline research workflows and reduce cognitive overhead.
                        </p>
                        <p>
                            We scraped over 320,000 pages using custom crawling infrastructure and managed to scale PageRank computation on consumer hardware, even after facing IP bans and complex metadata inconsistencies. This project taught us the real-world limits of scraping at scale, and how crucial metadata standards are when building academic tooling.
                        </p>
                        <p>
                            This project was our submission for Spartahack X at which we won an award for "Specialized Mastery". Our web browser's git style history viewer was a very well liked feature and so I ported it to chromium browsers as an extension.
                        </p>
                        <div className={styles.projectTags}>
                            <span className={styles.projectTag}>React</span>
                            <span className={styles.projectTag}>Flask</span>
                            <span className={styles.projectTag}>Python</span>
                            <span className={styles.projectTag}>Web Crawler</span>
                            <span className={styles.projectTag}>PageRank</span>
                            <span className={styles.projectTag}>NLTK</span>
                            <span className={styles.projectTag}>QT</span>
                            <span className={styles.projectTag}>Chromium</span>
                        </div>
                        </div>
                    )
                },
                {
                    label: "Journalingo",
                    content: (
                        <div className={styles.projectContent}>
                        <div className={styles.projectHeader}>
                            <h1 className={styles.projectTitle}>Journalingo</h1>
                            <p className={styles.projectDescription}>
                            A video-based emotional journaling app that analyzes facial expressions to provide insights and feedback on emotional well-being.
                            </p>
                        </div>
                        <p>
                            Journalingo was built around the idea that self reflection has biases and can create echo chambers. With Journalingo, users record short video entries that are analyzed using a combination of OpenAI's GPT-4, Whisper, and Hugging Face APIs. The system interprets emotional tone, facial expressions, and spoken content to deliver a tailored emotional breakdown to reveal emotions that the user wasn't ready to admit.
                        </p>
                        <p>
                            Users receive a personalized PDF report summarizing their emotional patterns, mood shifts, and recommendations for improved mental clarity. Our aim was to make the act of journaling more interactive, less text-heavy, and ultimately more accessible to people who find video expression more natural.
                        </p>
                        <p>
                            Since we were handling sensitive data, we architected a secure system that keeps user data safe with secure authentication. Our analysis model was also computationally expensive and so we used Google Cloud Platform and cloud functions to analyze videos on the cloud for a smooth user experience.
                        </p>
                        <p>
                            Journalingo was our submission for Uncommon Hacks 2024 (University of Chicago Hackathon) where we won an award for Best Use of Auth0.
                        </p>
                        <h2>Demo</h2>
                        <p>Our live demo was taken down because running the cloud functions without credits from the event is expensive and also because of how sensitive video journal entries can be, our project was meant to be a fun proof of concept for the event. However, this is an example analysis that we ran.</p>
                        <div className={styles.projectTags}>
                            <span className={styles.projectTag}>Flask</span>
                            <span className={styles.projectTag}>GPT-4</span>
                            <span className={styles.projectTag}>Whisper</span>
                            <span className={styles.projectTag}>Hugging Face</span>
                            <span className={styles.projectTag}>Google Cloud</span>
                            <span className={styles.projectTag}>MongoDB</span>
                            <span className={styles.projectTag}>Bootstrap</span>
                            <span className={styles.projectTag}>Facial Recognition</span>
                        </div>
                        </div>
                    )
                },
                {
                    label: "Alexandria",
                    content: (
                        <div className={styles.projectContent}>
                        <div className={styles.projectHeader}>
                            <h1 className={styles.projectTitle}>Alexandria</h1>
                            <p className={styles.projectDescription}>
                            Local AI-powered documentation search tool that lives in your terminal - indexing your dependencies and answering dev questions instantly, with zero network calls.
                            </p>
                        </div>
                        <p>
                            Alexandria was inspired by the growing frustration developers face when constantly switching between browser tabs and struggling with unfamiliar libraries. Instead of relying on general-purpose AI assistants or documentation sites, Alexandria brings the intelligence directly to the terminal. It scans your codebase for dependencies, indexes documentation for all of these dependencies, and enables fast, offline question-answering based on your actual stack.
                        </p>
                        <p>
                            The tool automatically detects dependencies across ecosystems—Python, Node.js, Rust, Go, Java, and more—by parsing standard files like <code>requirements.txt</code>, <code>package.json</code>, <code>go.mod</code>, and <code>Cargo.toml</code>. It builds persistent vector embeddings of relevant documentation using FAISS, then responds to user queries through a local Ollama-hosted AI model—meaning no API keys, no telemetry, no data leaks.
                        </p>
                        <p>
                            Alexandria supports fast and accurate documentation retrieval even on modest hardware. It filters out noise from <code>venv/</code> and <code>node_modules/</code>, stores embeddings for future reuse, and offers a sleek command-line interface built with Rich. Key commands include <code>alexandria scan</code> and <code>alexandria chat</code>, enabling natural language queries like “How do I use FastAPI middleware?” with instant, relevant output.
                        </p>
                        <p>
                            Challenges included multi-language support, indexing only meaningful libraries, and tuning FAISS for speed without sacrificing answer quality. We also debated UI form factors before committing to a CLI-first design inspired by man pages and minimalism. Alexandria ultimately proved faster and more reliable than mainstream LLM tools, especially when context-aware documentation is critical.
                        </p>
                        <div className={styles.projectTags}>
                            <span className={styles.projectTag}>Python</span>
                            <span className={styles.projectTag}>CLI</span>
                            <span className={styles.projectTag}>FAISS</span>
                            <span className={styles.projectTag}>Ollama</span>
                            <span className={styles.projectTag}>Rich</span>
                            <span className={styles.projectTag}>Offline AI</span>
                            <span className={styles.projectTag}>Dependency Parsing</span>
                            <span className={styles.projectTag}>Vector Search</span>
                        </div>
                        </div>
                    )
                },
                {
                label: "Callsort",
                content: (
                    <div className={styles.projectContent}>
                    <div className={styles.projectHeader}>
                        <h1 className={styles.projectTitle}>Callsort</h1>
                        <p className={styles.projectDescription}>
                        A cross-platform desktop app for one-click sorting of Library of Congress call number data in Excel/CSV—parsed, validated, and ordered precisely to support cataloging workflows.
                        </p>
                    </div>
                    <p>
                        Developed to address a recurring frustration at the MSU library: Excel and other spreadsheet tools cannot reliably sort LC call numbers, particularly when data contains inconsistencies or formatting quirks. Callsort solves this gap by parsing full call number syntax (class letters, numbers, Cutter, suffixes), validating formats, and sorting items into correct LC order—even across messy, real-world datasets.
                    </p>
                    <p>
                        Built using a robust Rust core for blazing fast and accurate parsing, paired with a Vue.js frontend bundled with Tauri for native GUI support across Windows, macOS, and Linux.
                    </p>
                    <p>
                        We're especially proud that Callsort delivers an immediate, tangible win: library staff and researchers can now sort tens of thousands of items in proper LC order in seconds. The tool is licensed under MIT and publicly hosted on GitHub, fostering community visibility and potential contributions.
                    </p>
                    <div className={styles.projectTags}>
                        <span className={styles.projectTag}>Rust</span>
                        <span className={styles.projectTag}>Tauri</span>
                        <span className={styles.projectTag}>Vue.js</span>
                        <span className={styles.projectTag}>Cross-Platform</span>
                        <span className={styles.projectTag}>LC Call Numbers</span>
                        <span className={styles.projectTag}>Excel/CSV</span>
                        <span className={styles.projectTag}>Parsing & Sorting</span>
                        <span className={styles.projectTag}>MIT License</span>
                    </div>
                    </div>
                )
                },         
                {
                label: "Wolverine Code Companion",
                content: (
                    <div className={styles.projectContent}>
                    <div className={styles.projectHeader}>
                        <h1 className={styles.projectTitle}>Wolverine Code Companion</h1>
                        <p className={styles.projectDescription}>
                        A Visual Studio extension powered by a locally embedded LLM, tailored to support specific university courses.
                        </p>
                    </div>
                    <p>
                        As AI tools grew in popularity, we noticed a drop in peer-to-peer communication in entry-level CS courses. Wolverine Code Companion was built to reintroduce collaborative learning - embedding course material directly into a shared model that evolves through student queries, notes, and examples.
                    </p>
                    <p>
                        The extension integrates LLaMA 3 with real syllabi and assignments from University of Michigan CS courses. This gives students precise, context-aware support - whether they're debugging an assignment or reviewing concepts like recursion in the scope of their curriculum.
                    </p>
                    <p>
                        At a time when most vectorization methods were closed-source, we developed a custom chunking and embedding algorithm in-house. Our approach outperformed GPT-3 in quoting exact pages and references from course content, enabling highly specific, document-grounded responses.
                    </p>
                    <div className={styles.projectTags}>
                        <span className={styles.projectTag}>Visual Studio</span>
                        <span className={styles.projectTag}>LLM Integration</span>
                        <span className={styles.projectTag}>EdTech</span>
                        <span className={styles.projectTag}>Course-Aware AI</span>
                        <span className={styles.projectTag}>University of Michigan</span>
                        <span className={styles.projectTag}>Curriculum Alignment</span>
                    </div>
                    </div>
                )
                }
            ]}
        />
    );
};

export default ProjectsViewer;
