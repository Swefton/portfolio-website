import TwoColumnSelector from "@/components/Modal/TwoColumnSelector";
import styles from './TwoColumn.module.css';

const ExperiencesViewer = ({ open, onClose }) => {
  return (
    <TwoColumnSelector
      open={open}
      onClose={onClose}
      items={[
        {
          // https://liveon.msu.edu/ResidentAssistantPositionDescription
          label: "RA @ REHS MSU",
          content: (
            <div className={`${styles.experienceContent} content`}>
              <div className={styles.experienceMetadata}>
                <h1 className={styles.experienceTitle}>Resident Assistant</h1>
                <h2 className={styles.experienceCompany}>REHS MSU</h2>
                <p className={styles.experienceTime}>Aug 2024 - Present</p>
              </div>
              <p>Supervised a residential floor of over 50 students and fostered a welcoming, inclusive community environment.</p>
              <p>Completed three weeks of intensive training on conflict mediation, crisis response, and student development.</p>
              <p>Collaborated with Assistant Community Directors and fellow RAs to plan and host events for the East Neighborhood.</p>
              <p>Responded to student conduct and wellness issues during duty shifts, ensuring safety and university policy compliance.</p>
              <p>Received the Excellence in inclusive living award from REHS in April 2025 for my commitment to creating an open safe space for my floor.</p>
              <p>Being an RA was my favorite extracuricular at unversity and it taught me how to lead a floor, manage conflict and nurture talent while also teaching me how to work with a team to manage a community as large BLANK stuents to uphold university values.</p>
            </div>
          )
        },
        {
          label: "Student Library Assistant @ DMC MSU",
          content: (
            <div className={`${styles.experienceContent} content`}>
              <div className={styles.experienceMetadata}>
                <h1 className={styles.experienceTitle}>Student Library Assistant</h1>
                <h2 className={styles.experienceCompany}> Digital Multimedia Center MSU Library</h2>
                <p className={styles.experienceTime}>Jab 2023 - Present</p>
              </div>
              <p>My day to day activities include shelving media, managing reservations, patron services.</p>
              <p>On the side, I like to pitch, prototype, develop open source tools for the DMC to automate administrative busy work. I manage the <a>DMC Organization</a> and maintain several tools.</p>
              <p>CallSort is a tool developed to adress a limitation in current spreadsheet software which wouldn't allow libraries to sort items by callnumber. As such, I developed an algorithm to sort these alrothms with error checking and created a performant cross platform desktop application using Rust and JavaScript that can sort our entire collection in a fraction of a second.</p>
            </div>
          )
        },
        {
          label: "Data Science Intern @ iSON",
          content: (
            <div className="content">
              <h1>Data Science Intern @ iSON</h1>
              <h2>Predictive Analytics & Dashboard Development</h2>
              <p>
                Interned on the Predictive Analytics team in East Lansing,
                working with time-series forecasting, pipeline automation, and
                stakeholder reporting.
              </p>
              <p>
                Developed dashboard visualizations using Plotly Dash and
                integrated Mailgun API to deliver automated daily KPI emails
                to leadership.
              </p>
              <img
                src="https://placehold.co/600x300?text=iSON+Analytics+Dashboard&font=roboto"
                alt="Analytics dashboard placeholder"
              />
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Sample analytics dashboard walkthrough"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <p>
                Built predictive models that delivered an 18 % improvement in
                forecast accuracy through feature engineering and hyperparameter tuning.
              </p>
              <p>
                Automated data ingestion pipelines that reduced processing time
                from two hours to five minutes via scheduling and error handling.
              </p>
              <p>
                Prepared weekly analysis reports highlighting trends in
                data volumes, session durations, and conversion rate metrics.
              </p>
              <p>
                The full project code and documentation are available on{" "}
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                .
              </p>
              <p>
                Feel free to duplicate this setup so each modal tab includes
                enough content to exercise scrollbar width, track styling,
                custom thumb, headings, paragraphs, images, links, and iframe
                borders.
              </p>
            </div>
          )
        }
      ]}
    />
  );
};

export default ExperiencesViewer;