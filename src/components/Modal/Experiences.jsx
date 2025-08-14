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
                <p className={styles.experienceTime}>Aug 2024 - <span>Present</span></p>
              </div>
              <p>
                As a <span>Resident Assistant</span>, I worked to <span>build an inclusive community</span> and foster student success academically and personally. This meant <span>supporting students' academic goals</span>, <span>responding to emergencies</span>, and <span>actively engaging with the community</span> through events and connection-building initiatives as well as generally guiding students to appropriate resources.
              </p>
              <p>
                I completed three weeks of <span>intensive training on conflict mediation</span>, crisis response, and student development, then applied these skills while supervising a residential floor of <span>over 50 students</span>.
              </p>
              <p>
                Collaborating closely with Assistant Community Directors and fellow RAs, I planned and hosted events for the East Neighborhood, addressed student conduct and wellness concerns during duty shifts, and ensured both safety and <span>university policy compliance</span>.
              </p> 
              <p>
                In April 2025, I was honored to receive the <span>Excellence in Inclusive Living Award</span> from REHS for my commitment to fostering an open and supportive community.
              </p>
              <p>
                Being an RA was my <span>favorite extracurricular experience</span> at university. It taught me how to lead a floor, manage conflict, nurture talent, and work effectively with a team.
              </p>
              <img src="/pictures/RA/team.png" alt="Team with Sparty mascot at hackathon" />
            </div>
          )
        },
        {
          label: "Student Library Assistant @ DMC MSU",
          content: (
            <div className={`${styles.experienceContent} content`}>
              <div className={styles.experienceMetadata}>
                <h1 className={styles.experienceTitle}>
                  <span>Student Library Assistant</span>
                </h1>
                <h2 className={styles.experienceCompany}>
                  Digital Multimedia Center MSU Library
                </h2>
                <p className={styles.experienceTime}>
                  Jan 2023 - <span>Present</span>
                </p>
              </div>
              <p>
                My day to day activities include shelving media, managing room reservations, and patron services.
              </p>
              <p>
                On the side, I like to pitch, prototype, and develop <span>open source tools</span> for the DMC to 
                <span> automate administrative busy work</span>. I manage the DMC GitHub Organization and maintain 
                several open source tools.
              </p>
              <p>
                My work for the DMC can be found on the organization page <a>here</a>.
              </p>
            </div>
          )
        },
        {
          label: "Data Science Intern @ iSON",
          content: (
            <div className={`${styles.experienceContent} content`}>
              <div className={styles.experienceMetadata}>
                <h1 className={styles.experienceTitle}>
                  <span>Data Science Intern</span>
                </h1>
                <h2 className={styles.experienceCompany}>
                  iSON Xperiences Ltd.
                </h2>
                <p className={styles.experienceTime}>
                  Jul 2023 - <span>Aug 2023</span>
                </p>
              </div>
              <p>
                As part of my internship, I conducted exploratory data analysis on a dataset of loan defaulters and built a <span>boosted linear regression model</span> to predict which defaulters were most likely to repay. The model, trained on <span>1.8 million records</span>, achieved <span>81% accuracy</span> and helped prioritize customers for call center follow-up, saving time.
              </p>
              <p>
                I also developed a <span>secure automated data pipeline</span> to store credentials and retrieve weekly datasets from <span>Gensys</span> (CX service ran on AWS), eliminating delays caused by time zone differences and saving the team over an hour each week while <span>improving data security</span> by limiting file access to the automated process, in line with the cybersecurity principle of <span>least privilege</span>. I also wrote <span>documentation</span> for my pipeline and code to allow maintenance after my departure.
              </p>
            </div>
          )
        }
      ]}
    />
  );
};

export default ExperiencesViewer;