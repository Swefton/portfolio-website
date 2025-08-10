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
                            My team noticed search results getting worse and found <a href="https://downloads.webis.de/publications/papers/bevendorff_2024a.pdf" target="_blank"><span>studies</span></a> showing AI is messing with SEO tags. OpenFiche is a search engine for academic research that focuses on reliable sources like <span>NPR</span>, <span>CNN</span>, and <span>Wikipedia</span>. It uses a webgraph-based <span>PageRank</span> with keyword relevance scoring (via <span>NLTK</span>) to deliver results avoiding low quality AI generated results.
                        </p>
                        <p>
                            The search engine was built with <span>React</span> and is live at <a href="https://reada.wiki" target="_blank"><span>reada.wiki</span></a>. The custom OpenFiche browser is a lightweight Chromium wrapper made with <span>Python</span> and <span>QT</span>, featuring a git-style history graph, distraction-free reader mode, and easy tab management to help streamline research.
                        </p>
                        <p>
                            We scraped over <span>320,000 pages</span> using custom crawlers and managed to run PageRank on consumer hardware, even with IP bans and messy metadata. This project showed us the real challenges of scraping at scale and why good metadata matters.
                        </p>
                        <p>
                            We submitted this project to <span>Spartahack X</span> and won the <span>"Specialized Mastery"</span> award. The git-style history viewer was a well-loved feature, so I later ported it as a Chromium extension.
                        </p>
                        <div className={styles.projectTags}>
                            <span className={styles.projectTag}>Algorithm Engineering</span>
                            <span className={styles.projectTag}>NLP</span>
                            <span className={styles.projectTag}>Python</span>
                            <span className={styles.projectTag}>Flask</span>
                            <span className={styles.projectTag}>React</span>
                            <span className={styles.projectTag}>QT</span>
                        </div>
                        </div>
                    )
                },
                {
                    label: "Journalingo",
                    content: (
                        <div className={styles.projectContent}>
                        <div className={styles.projectHeader}>
                            <h1 className={styles.projectTitle}>
                            <span>Journalingo</span>
                            </h1>
                            <p className={styles.projectDescription}>
                            A video-based emotional journaling app that analyzes facial expressions to provide insights on emotional well-being.
                            </p>
                        </div>
                        <p>
                            Journalingo addresses the biases of self-reflection by letting users record short videos. Using custom <span>computer vision</span> techniques and <span>NLP</span>, our model and algorithm analyzes facial expressions, emotional tone, and speech to reveal hidden emotions.
                        </p>
                        <p>
                            Users get a personalized <span>PDF report</span> summarizing emotional patterns, mood shifts, and recommendations for mental clarity.
                        </p>
                        <p>
                            Since we handled <span>sensitive data</span>, we designed a secure system with strong authentication. Due to the heavy analysis workload, video processing runs on a powerful server on <span>Google Cloud</span> for smooth performance.
                        </p>
                        <p>
                            It was hard to test our model's accuracy for an abstract concept like this, but our model could expertly distinguish <span>faked emotions</span> from actors, separating real sadness from scripted sadness.
                        </p>
                        <p>
                            Journalingo was our submission for <span>Uncommon Hacks 2024</span> (University of Chicago Hackathon), where we won <span>Best Use of Auth0</span>.
                        </p>
                        <h2>Demo</h2>
                        <p>
                            The live demo was taken down due to <span>cloud costs</span> and <span>data sensitivity</span>, but here is an example analysis we ran.
                        </p>
                        <div className={styles.projectTags}>
                            <span className={styles.projectTag}>Facial Recognition</span>
                            <span className={styles.projectTag}>Computer Vision</span>
                            <span className={styles.projectTag}>NLP</span>
                            <span className={styles.projectTag}>Sentiment Analysis</span>
                            <span className={styles.projectTag}>Flask</span>
                            <span className={styles.projectTag}>Google Cloud</span>
                            <span className={styles.projectTag}>MongoDB</span>
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
                            Local AI-powered documentation search tool that lives in your terminal — indexing dependencies and answering dev questions instantly, with zero network calls.
                            </p>
                        </div>
                        <p>
                            Developers spend a lot of time digging through docs, and even when using LLMs, issues arise because of recent <span>library refactors</span> or AI hallucinations on niche APIs. Alexandria solves this by <span>indexing documentation</span> for all your project’s libraries, providing <span>context-aware info</span> to improve LLM answers.
                        </p>
                        <p>
                            It detects dependencies across languages by analyzing common files, then extracts and chunks relevant docs using <span>web scraping</span> and stores embeddings with <span>FAISS</span>. Queries are handled locally via an <span>Ollama-hosted model</span> — no API keys, no data leaks.
                        </p>
                        <p>
                            Alexandria delivers <span>fast, accurate search</span> on modest hardware. It caches embeddings, filters noise, and offers a clean CLI built with <span>Rich</span>. Commands like <code>alexandria scan</code> and <code>alexandria chat</code> let you ask natural language questions and get instant, relevant answers.
                        </p>
                        <div className={styles.projectTags}>
                            <span className={styles.projectTag}>Python</span>
                            <span className={styles.projectTag}>FAISS</span>
                            <span className={styles.projectTag}>Vector Search</span>
                            <span className={styles.projectTag}>Web Scraping</span>
                            <span className={styles.projectTag}>Chunking</span>
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
                        A cross-platform desktop app for one-click sorting of Library of Congress call numbers in Excel/CSV - parsing, validating, and ordering data precisely to support cataloging workflows.
                        </p>
                    </div>
                    <p>
                        Callsort was created to solve a common pain point at the MSU library: standard spreadsheet tools <span>can't sort LC call numbers</span>, especially when the data is messy or inconsistently formatted. Callsort parses the <span>full call number syntax</span>, validates it, and sorts items in proper LC order - even on imperfect real-world data.
                    </p>
                    <p>
                        The core is built in <span>Rust</span> for <span>fast sorting of over a million items insantly</span>, while the <span>Vue.js frontend</span> bundled with <span>Tauri</span> provides a native experience on Windows, macOS, and Linux.
                    </p>
                    <p>
                        The result is a practical tool that lets library staff and researchers browse our collection in order of their Callnumber. It's <span>open-source</span> under the MIT license and available on GitHub, encouraging community collaboration.
                    </p>
                    <div className={styles.projectTags}>
                        <span className={styles.projectTag}>Rust</span>
                        <span className={styles.projectTag}>Vue.js</span>
                        <span className={styles.projectTag}>Tauri</span>
                        <span className={styles.projectTag}>Software Development</span>
                        <span className={styles.projectTag}>Algorithm Engineering</span>
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
                        As AI tools grew popular, we noticed a drop in peer communication in entry-level CS courses. Wolverine Code Companion reintroduces collaborative learning by <span>embedding course material into a shared, evolving model</span> built from student queries, notes, and examples.
                    </p>
                    <p>
                        The extension integrates <span>LLaMA 3</span> with real syllabi and assignments from University of Michigan CS courses, providing <span>context-aware, curriculum-aligned support</span> for debugging and concept review like recursion within students' actual coursework.
                    </p>
                    <p>
                        When most vectorization methods were closed-source, we developed a <span>custom chunking and embedding pipeline</span> with in-house transformers and tokenization optimizations. Our approach outperformed GPT-3 on <span>document retrieval and precise citation</span>, enabling highly specific, <span>grounded LLM responses</span>.
                    </p>
                    <div className={styles.projectTags}>
                        <span className={styles.projectTag}>LLM Engineering</span>
                        <span className={styles.projectTag}>Transformers</span>
                        <span className={styles.projectTag}>Vector Embeddings</span>
                        <span className={styles.projectTag}>Tokenization</span>
                    </div>
                    </div>
                )
                }
            ]}
        />
    );
};

export default ProjectsViewer;
