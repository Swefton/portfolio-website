import { useState } from 'react';

import TwoColumnSelector from "@/components/Modal/TwoColumnSelector";
import projectsstyles from './Projects.module.css'

const ProjectsViewer = ({ open, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <TwoColumnSelector
            open={open}
            onClose={onClose}
            items={[
                {
                    label: "OpenFiche",
                    content: (
                        <div className={projectsstyles.projectContent}>
                            <div className={projectsstyles.projectHeader}>
                                <div className={projectsstyles.projectHeaderTop}>
                                    <h1 className={projectsstyles.projectTitle}>OpenFiche</h1>
                                    <a
                                    href="https://github.com/Swefton/OpenFiche"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={projectsstyles.iconLink}
                                    >
                                        <img src="/github.svg" alt="GitHub" className={projectsstyles.githubIcon} />
                                    </a> 
                                </div>

                                <p className={projectsstyles.projectDescription}>
                                    A post-AI academic browser and search engine that filters out low-quality AI-generated content, highlighting trustworthy, human-written sources.
                                </p>
                                <div className={projectsstyles.projectTags}>
                                    <span className={projectsstyles.projectTag}>Algorithm Engineering</span>
                                    <span className={projectsstyles.projectTag}>NLP</span>
                                    <span className={projectsstyles.projectTag}>Python</span>
                                    <span className={projectsstyles.projectTag}>Flask</span>
                                    <span className={projectsstyles.projectTag}>React</span>
                                    <span className={projectsstyles.projectTag}>QT</span>
                                </div>
                            </div>
                            <p>
                                My team noticed search results getting worse and found{" "}
                                <a
                                    href="https://downloads.webis.de/publications/papers/bevendorff_2024a.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    studies
                                </a>{" "}
                                showing AI is messing with SEO tags. OpenFiche is a search engine for academic research that focuses on reliable sources like{" "}
                                <span>NPR</span>, <span>CNN</span>, and <span>Wikipedia</span>. It uses a webgraph-based <span>PageRank</span> with keyword relevance scoring (via <span>NLTK</span>) to deliver results avoiding low quality AI generated results.
                            </p>
                            <p>
                                The search engine was built with <span>React</span> and is live at{" "}
                                <a href="https://reada.wiki" target="_blank" rel="noopener noreferrer">
                                    reada.wiki
                                </a>. The custom OpenFiche browser is a lightweight Chromium wrapper made with <span>Python</span> and <span>QT</span>, featuring a git-style history graph, distraction-free reader mode, and easy tab management to help streamline research.
                            </p>
                            <p>
                                We scraped over <span>320,000 pages</span> using custom crawlers and managed to run PageRank on consumer hardware, even with IP bans and messy metadata. This project showed us the real challenges of scraping at scale and why good metadata matters.
                            </p>
                            <p>
                                We submitted this project to <span>Spartahack X</span> and won the <span>"Specialized Mastery"</span> award. The git-style history viewer was a well-loved feature, so I later ported it as a Chromium extension.
                            </p>

                            <div className={projectsstyles.openFicheCarousel}>
                                <div className={projectsstyles.carouselContainer}>
                                    <div
                                        className={projectsstyles.carouselTrack}
                                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    >
                                        <div className={projectsstyles.carouselSlide}>
                                            <img
                                                src="/pictures/openfiche/us%20with%20sparty.jpg"
                                                alt="Team with Sparty mascot at hackathon"
                                            />
                                        </div>
                                        <div className={projectsstyles.carouselSlide}>
                                            <img
                                                src="/pictures/openfiche/walking.jpg"
                                                alt="Team walking at hackathon venue"
                                            />
                                        </div>
                                        <div className={projectsstyles.carouselSlide}>
                                            <img
                                                src="/pictures/openfiche/winning.jpeg"
                                                alt="Team celebrating victory at Spartahack X"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={projectsstyles.carouselControls}>
                                    <button
                                        className={projectsstyles.carouselButton}
                                        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                                        disabled={currentSlide === 0}
                                    >
                                        Previous
                                    </button>
                                    <div className={projectsstyles.carouselIndicators}>
                                        {[0, 1, 2].map((index) => (
                                            <div
                                                key={index}
                                                className={`${projectsstyles.carouselDot} ${currentSlide === index ? projectsstyles.active : ''}`}
                                                onClick={() => setCurrentSlide(index)}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        className={projectsstyles.carouselButton}
                                        onClick={() => setCurrentSlide(Math.min(2, currentSlide + 1))}
                                        disabled={currentSlide === 2}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    label: "Journalingo",
                    content: (
                        <div className={projectsstyles.projectContent}>
                            <div className={projectsstyles.projectHeader}>
                                <div className={projectsstyles.projectHeaderTop}>
                                    <h1 className={projectsstyles.projectTitle}>Journalingo</h1>
                                    <a
                                    href="https://github.com/Swefton/Impact-AVS"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={projectsstyles.iconLink}
                                    >
                                        <img src="/github.svg" alt="GitHub" className={projectsstyles.githubIcon} />
                                    </a> 
                                </div>
                                <p className={projectsstyles.projectDescription}>
                                    A video-based emotional journaling app that analyzes facial expressions to provide insights on emotional well-being.
                                </p>
                                <div className={projectsstyles.projectTags}>
                                    <span className={projectsstyles.projectTag}>Facial Recognition</span>
                                    <span className={projectsstyles.projectTag}>Computer Vision</span>
                                    <span className={projectsstyles.projectTag}>NLP</span>
                                    <span className={projectsstyles.projectTag}>Sentiment Analysis</span>
                                    <span className={projectsstyles.projectTag}>Flask</span>
                                    <span className={projectsstyles.projectTag}>Google Cloud</span>
                                    <span className={projectsstyles.projectTag}>MongoDB</span>
                                </div>
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
                                The live demo was taken down due to <span>cloud costs</span> and <span>data sensitivity</span>, but here's an example of our analysis in action:
                            </p>

                            <h3>Dashboard Preview</h3>
                            <img
                                src="/pictures/journalingo/dashboard.png"
                                alt="Journalingo Dashboard"
                                className={projectsstyles.demoImage}
                            />

                            <div className={projectsstyles.journalingoDemoContainer}>
                                <div className={projectsstyles.journalingoDemoLeft}>
                                    <h3>Video Analysis Demo</h3>
                                    <div className={projectsstyles.videoWrapper}>
                                        <iframe
                                            width="560"
                                            height="315"
                                            src="https://www.youtube.com/embed/UqHh6TvGQIQ?si=y__5fA7xbErgviPl"
                                            title="Journalingo Video Demo"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                                <div className={projectsstyles.journalingoDemoRight}>
                                    <h3>Generated Analysis Report</h3>
                                    <div className={projectsstyles.pdfPreview}>
                                        <div className={projectsstyles.pdfPreviewContent}>
                                            <h3>Emotional Analysis Report</h3>
                                            <p>
                                                This comprehensive report contains the detailed emotional analysis generated from the video demonstration, including mood patterns, authenticity scores, and personalized recommendations.
                                            </p>
                                        </div>
                                        <a
                                            href="/Laurie Report.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={projectsstyles.pdfViewButton}
                                        >
                                            View PDF
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className={projectsstyles.demoExplanation}>
                                <p>
                                    The video shows our demo participant, and the PDF contains the comprehensive emotional analysis that Journalingo generated from this exact video session.
                                </p>
                            </div>
                        </div>
                    )
                },
                {
                    label: "Alexandria",
                    content: (
                        <div className={projectsstyles.projectContent}>
                            <div className={projectsstyles.projectHeader}>
                                <div className={projectsstyles.projectHeaderTop}>
                                    <h1 className={projectsstyles.projectTitle}>Alexandria</h1>
                                    <a
                                    href="https://github.com/Swefton/hackillinois25"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={projectsstyles.iconLink}
                                    >
                                        <img src="/github.svg" alt="GitHub" className={projectsstyles.githubIcon} />
                                    </a> 
                                </div>
                                <p className={projectsstyles.projectDescription}>
                                    Local AI-powered documentation search tool that lives in your terminal — indexing dependencies and answering dev questions instantly, with zero network calls.
                                </p>
                                <div className={projectsstyles.projectTags}>
                                    <span className={projectsstyles.projectTag}>Python</span>
                                    <span className={projectsstyles.projectTag}>FAISS</span>
                                    <span className={projectsstyles.projectTag}>Vector Search</span>
                                    <span className={projectsstyles.projectTag}>Web Scraping</span>
                                    <span className={projectsstyles.projectTag}>Chunking</span>
                                </div>
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
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/dX99uC0Ek-c?si=HRqe2T9EPQg9miMX"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )
                },
                {
                    label: "Callsort",
                    content: (
                        <div className={projectsstyles.projectContent}>
                            <div className={projectsstyles.projectHeader}>
                                <div className={projectsstyles.projectHeaderTop}>
                                    <h1 className={projectsstyles.projectTitle}>Callsort</h1>
                                    <a
                                    href="https://github.com/Digital-Multimedia-Center/Callsort"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={projectsstyles.iconLink}
                                    >
                                        <img src="/github.svg" alt="GitHub" className={projectsstyles.githubIcon} />
                                    </a> 
                                </div>
                                <p className={projectsstyles.projectDescription}>
                                    A cross-platform desktop app for one-click sorting of Library of Congress call numbers in Excel/CSV - parsing, validating, and ordering data precisely to support cataloging workflows.
                                </p>
                                <div className={projectsstyles.projectTags}>
                                    <span className={projectsstyles.projectTag}>Rust</span>
                                    <span className={projectsstyles.projectTag}>Vue.js</span>
                                    <span className={projectsstyles.projectTag}>Tauri</span>
                                    <span className={projectsstyles.projectTag}>Software Development</span>
                                    <span className={projectsstyles.projectTag}>Algorithm Engineering</span>
                                </div>
                            </div>
                            <p>
                                Callsort was created to solve a common pain point at the MSU library: standard spreadsheet tools <span>can't sort LC call numbers</span>, especially when the data is messy or inconsistently formatted. Callsort parses the <span>full call number syntax</span>, validates it, and sorts items in proper LC order - even on imperfect real-world data.
                            </p>
                            <p>
                                The core is built in <span>Rust</span> for <span>fast sorting of over a million items instantly</span>, while the <span>Vue.js frontend</span> bundled with <span>Tauri</span> provides a native experience on Windows, macOS, and Linux.
                            </p>
                            <p>
                                The result is a practical tool that lets library staff and researchers browse our collection in order of their Callnumber. It's <span>open-source</span> under the MIT license and available on GitHub, encouraging community collaboration.
                            </p>
                            <img src="pictures/callsort/demo.gif" alt="Callsort Demo" />
                        </div>
                    )
                },
                {
                    label: "Wolverine Code Companion",
                    content: (
                        <div className={projectsstyles.projectContent}>
                            <div className={projectsstyles.projectHeader}>
                                <div className={projectsstyles.projectHeaderTop}>
                                    <h1 className={projectsstyles.projectTitle}>Wolverine Code Companion</h1>
                                    <a
                                    href="https://github.com/Sidd-satish12/Wolverine-Code-Companion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={projectsstyles.iconLink}
                                    >
                                        <img src="/github.svg" alt="GitHub" className={projectsstyles.githubIcon} />
                                    </a> 
                                </div>
                                <p className={projectsstyles.projectDescription}>
                                    A Visual Studio extension powered by a locally embedded LLM, tailored to support specific university courses.
                                </p>
                                <div className={projectsstyles.projectTags}>
                                    <span className={projectsstyles.projectTag}>LLM Engineering</span>
                                    <span className={projectsstyles.projectTag}>Transformers</span>
                                    <span className={projectsstyles.projectTag}>Vector Embeddings</span>
                                    <span className={projectsstyles.projectTag}>Tokenization</span>
                                </div>
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
                            <img src="pictures/wolverine/demo.png" alt="Callsort Demo" />
                        </div>
                    )
                }
            ]}
        />
    );
};

export default ProjectsViewer;
