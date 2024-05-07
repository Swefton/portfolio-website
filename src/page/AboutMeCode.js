const code = `# Define personal information
name = "Amrit Madhav Srivastava"
email = "srivas75@msu.edu"
phone = "+1 (517) 980-3378"

# Define education
university = "Michigan State University"
gpa = 3.8
degree = "Bachelor of Science in Computer Science"
minor = "Minor in Data Science"
start_date = "Aug 2022"
end_date = "May 2026"

# Define skills
skills = [
    "Python",
    "Web Automation",
    "Web testing",
    "Data Analysis/Modelling",
    "MongoDB",
    "Auth0",
    "Flask",
    "Amazon Certified Alexa Developer"
]

# Display personal information
print("Name:", name)
print("Email:", email)
print("Phone:", phone)
print()

# Display education
print("University:", university)
print("GPA:", gpa)
print("Degree:", degree)
print("Minor:", minor)
print("Duration:", start_date, "-", end_date)
print()

# Display skills
print("Skills:")
for skill in skills:
    print("-", skill)

`;

export default code;
