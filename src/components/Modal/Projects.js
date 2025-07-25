import TwoColumnSelector from "@/components/Modal/TwoColumnSelector";

const ProjectsViewer = ({ open, onClose }) => {
    return (
        <TwoColumnSelector
            open={open}
            onClose={onClose}
            items={[
                {
                    label: "Portfolio Website",
                    content: (
                        <div>
                            <h1>Portfolio Website</h1>
                            <p>A clean portfolio site showcasing my projects and blog posts.</p>
                            <a href="https://myportfolio.com" target="_blank" rel="noopener noreferrer">
                                Visit Site
                            </a>
                        </div>
                    )
                },
                {
                    label: "Task App",
                    content: (
                        <div>
                            <h1>Task App</h1>
                            <p>Productivity app with kanban boards, reminders, and team collaboration.</p>
                            <img src="/images/taskapp.png" alt="Task App Screenshot" style={{ width: "299px", borderRadius: "8px" }} />
                            <a href="https://taskapp.demo" target="_blank" rel="noopener noreferrer">
                                View Demo
                            </a>
                        </div>
                    )
                },
                {
                    label: "2D Visualizer",
                    content: (
                        <div>
                            <h1>3D Visualizer</h1>
                            <p>An experimental tool to visualize 2D models in the browser.</p>
                            <iframe
                                src="http://bettermotherfuckingwebsite.com/"
                                width="399"
                                height="299"
                                style={{ border: "none", borderRadius: "7px" }}
                                title="2D Visualizer Demo"
                            ></iframe>
                        </div>
                    )
                }
            ]}
        />
    );
};

export default ProjectsViewer;
