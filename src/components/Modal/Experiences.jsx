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
                <p className={styles.experienceTime}>Jan 2023 - Present</p>
              </div>
              <p>My day to day activities include shelving media, managing reservations, patron services.</p>
              <p>On the side, I like to pitch, prototype, develop open source tools for the DMC to automate administrative busy work. I manage the <a>DMC Organization</a> and maintain several tools.</p>
              <p>CallSort is a tool developed to adress a limitation in current spreadsheet software which wouldn't allow libraries to sort items by callnumber. As such, I developed an algorithm to sort these callnumbers with error checking and created a performant cross platform desktop application using Rust and JavaScript that can sort our entire collection in a fraction of a second.</p>
            </div>
          )
        },
        {
          label: "Data Science Intern @ iSON",
          content: (
              <div className={`${styles.experienceContent} content`}>
              <div className={styles.experienceMetadata}>
                <h1 className={styles.experienceTitle}>Data Science Intern</h1>
                <h2 className={styles.experienceCompany}> iSON Xperiences Ltd.</h2>
                <p className={styles.experienceTime}>Jul 2023 - August 2023</p>
              </div>
              <p>iSON offers loans, my intern project was to conduct an exploratory data analysis on a dataset of loan defaulters and develop a model to predict which defaulters are most likely to repay their loan, so that they can be prioritized on the call center rotation. My analysis was conducted on a 1.8 million data point set and I developed a boosted linear regression model to predict paying customers with 81% accuracy.</p>
              <p>My department would receive data every monday on which we would test, train, and analyze. However, this data was from Africa and due to time zones we'd have to wait an hour or two every monday before we could get the security clearance to access the data on Gensys. Obseving this deficiency, I created a secure automated data pipline that was able to securely store credentials and retrieve the relevant data sets saving our team at least an hour every week.</p>
            </div>
          )
        }
      ]}
    />
  );
};

export default ExperiencesViewer;