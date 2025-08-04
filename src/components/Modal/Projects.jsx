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
                            A digital archive management system for organizing and accessing historical documents with advanced search capabilities and metadata tagging.
                            </p>
                        </div>
                        <div className={styles.projectTags}>
                            <span className={styles.projectTag}>React</span>
                            <span className={styles.projectTag}>Node.js</span>
                            <span className={styles.projectTag}>MongoDB</span>
                            <span className={styles.projectTag}>ElasticSearch</span>
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
                    label: "Pursonify Us",
                    content: (
                        <div>
                            <h1>Pursonify Us</h1>
                        </div>
                    )
                },
                {
                    label: "E-commerce Web Scraper",
                    content: (
                        <div>
                            <h1>E-commerce Web Scraper</h1>
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
