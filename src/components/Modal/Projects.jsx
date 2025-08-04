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
                        <div>
                            <h1>Journalingo</h1>
                        </div>
                    )
                },
                {
                    label: "Alexandria",
                    content: (
                        <div>
                            <h1>Alexandria</h1>
                        </div>
                    )
                },
                {
                    label: "Wolverine Helper",
                    content: (
                        <div>
                            <h1>Wolverine Helper</h1>
                        </div>
                    )
                },
                {
                    label: "Callsort",
                    content: (
                        <div>
                            <h1>Callsort</h1>
                        </div>
                    )
                },
                {
                    label: "No Sweat",
                    content: (
                        <div>
                            <h1>No Sweat</h1>
                        </div>
                    )
                }
            ]}
        />
    );
};

export default ProjectsViewer;
