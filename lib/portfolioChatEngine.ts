import { education } from "@/app/data/education";
import { experience } from "@/app/data/experiance";
import { additionalData, contactDetails, socialMediaLinks } from "@/app/data/otherLinks";
import { projects } from "@/app/data/projects";
import { skills } from "@/app/data/skills";



function normalize(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9+#.\s-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function hasAny(text: string, terms: string[]) {
    return terms.some((term) => text.includes(term));
}

function formatList(items: string[]) {
    return items.join(", ");
}


function getAdditionalValue(name: string): string {
    const item = additionalData.find(
        (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    return item?.value ?? "This information is not available.";
}

function getContactAnswer(): string {
    return [
        "You can contact Saroj through:",
        ...contactDetails.map(
            (item) => `${item.name}: ${item.value.trim()}`
        ),
        "",
        "You can also connect through:",
        ...socialMediaLinks.map(
            (item) => `${item.title}: ${item.url}`
        ),
    ].join("\n");
}

function getSocialLinksAnswer(): string {
    return socialMediaLinks
        .map((item) => `${item.title}: ${item.url}`)
        .join("\n");
}

const starterQuestions = [
    "How many years of experience do you have?",
    "Tell me about your projects",
    "What are your technical skills?",
    "What is your educational background?",
];

const followUpQuestions = {
    experience: [
        "Which companies have you worked for?",
        "What were your main responsibilities?",
        "What kind of teams have you worked with?",
    ],
    skills: [
        "What is your experience with React and Next.js?",
        "What backend technologies do you use?",
        "Which tools do you use for testing and deployment?",
    ],
    projects: [
        "Tell me more about the Journal Manager project",
        "Which technologies have you used in your projects?",
        "What e-commerce projects have you worked on?",
    ],
    education: [
        "What did you study in college?",
        "Where did you complete your degree?",
        "What was your CGPA?",
    ],
    contact: [
        "What is your email address?",
        "Where can I find your LinkedIn profile?",
        "What are your preferred work locations?",
    ],
};

export function getSuggestedQuestions(question?: string): string[] {
    if (!question?.trim()) {
        return starterQuestions;
    }

    const q = normalize(question);

    if (hasAny(q, ["project", "projects", "built", "developed", "application"])) {
        return followUpQuestions.projects;
    }

    if (hasAny(q, ["skill", "skills", "technology", "technologies", "tech stack", "frontend", "backend", "database"])) {
        return followUpQuestions.skills;
    }

    if (hasAny(q, ["education", "degree", "college", "university", "graduation", "diploma", "cgpa"])) {
        return followUpQuestions.education;
    }

    if (hasAny(q, ["contact", "email", "phone", "linkedin", "github", "location", "remote"])) {
        return followUpQuestions.contact;
    }

    return followUpQuestions.experience;
}

export function getPortfolioSectionLink(
    question: string
): { label: string; href: string } | null {
    const q = normalize(question);

    if (
        hasAny(q, [
            "contact",
            "reach you",
            "get in touch",
            "phone number",
            "email address",
            "linkedin",
            "github",
            "social media",
        ])
    ) {
        return { label: "View contact section", href: "/contact" };
    }

    if (
        hasAny(q, [
            "project",
            "projects",
            "portfolio work",
            "built",
            "developed",
            "application",
        ]) ||
        projects.some((project) => q.includes(normalize(project.title)))
    ) {
        return { label: "View projects", href: "/#projects" };
    }

    if (
        hasAny(q, [
            "education",
            "degree",
            "college",
            "university",
            "graduation",
            "diploma",
            "cgpa",
            "percentage",
            "academic",
        ])
    ) {
        return { label: "View education", href: "/#education" };
    }

    if (
        hasAny(q, [
            "skill",
            "skills",
            "technology",
            "technologies",
            "tech stack",
            "techstack",
            "programming language",
            "frontend",
            "backend",
            "database",
            "testing",
            "deployment",
            "cloud",
        ]) ||
        skills.some((category) =>
            category.items.some((item) => q.includes(normalize(item)))
        )
    ) {
        return { label: "View skills", href: "/#skills" };
    }

    if (
        hasAny(q, [
            "experience",
            "years of",
            "worked at",
            "work history",
            "employment history",
            "previous employer",
            "company",
            "companies",
            "responsibilities",
            "salary",
            "ctc",
            "notice period",
            "location",
            "relocate",
            "remote",
        ])
    ) {
        return { label: "View experience", href: "/#experience" };
    }

    return null;
}


function getExperienceSummary() {
    return experience
        .map(
            (job) =>
                `${job.role} at ${job.company} (${job.period}). ` +
                job.points.join(" ")
        )
        .join("\n\n");
}

function getProjectsSummary() {
    return projects
        .map(
            (project) =>
                `${project.title}: ${project.description} ` +
                `Technologies: ${project.technologies.join(", ")}. ` +
                `Link: ${project.url}`
        )
        .join("\n\n");
}

export function answerPortfolioQuestion(question: string): string {
    const q = normalize(question);

    if (!q) {
        return "Please enter a question about my portfolio.";
    }


    // Contact details
    if (
        hasAny(q, ["contact", "reach you", "get in touch", "phone number", "email address"])
    ) {
        return getContactAnswer();
    }

    // Email only
    if (hasAny(q, ["email", "email id", "email address"])) {
        const email = contactDetails.find(
            (item) => item.name.toLowerCase() === "email"
        );

        return email
            ? `You can email Saroj at ${email.value}.`
            : "Email information is not available.";
    }

    // Social profiles
    if (
        hasAny(q, ["linkedin", "github", "social media", "social profile", "github profile"])
    ) {
        return getSocialLinksAnswer();
    }

    // Expected compensation
    if (
        hasAny(q, ["expected ctc", "salary expectation", "expected salary", "salary expected"])
    ) {
        return `Saroj's expected CTC is ${getAdditionalValue("Expected CTC")}.`;
    }

    // Last compensation
    if (hasAny(q, ["last ctc", "previous ctc", "current ctc", "previous salary"])) {
        return `Saroj's last CTC was ${getAdditionalValue("Last CTC")}.`;
    }

    // React experience
    if (
        hasAny(q, ["react experience", "experience in react", "years of react", "how many years react"])
    ) {
        return `Saroj has ${getAdditionalValue("React Experience")} of React.js experience.`;
    }

    // Node.js / Express.js experience
    if (
        hasAny(q, ["node experience", "node.js experience", "express experience", "backend experience", "experience in node"])
    ) {
        return `Saroj has ${getAdditionalValue("Node.js/Express.js Experience")} of Node.js and Express.js experience.`;
    }

    // Preferred work locations
    if (
        hasAny(q, ["preferred location", "preferred locations", "relocate", "work location", "open to remote", "remote work"])
    ) {
        return `Saroj is open to opportunities in ${getAdditionalValue("Preferred Location")}.`;
    }

    // Current location
    if (
        hasAny(q, ["current location", "where are you located", "based in", "location are you in"])
    ) {
        return `Saroj's listed location is ${getAdditionalValue("Current Location")}.`;
    }


    // Compensation is not present in the supplied portfolio data.
    if (
        hasAny(q, [
            "notice period",
        ])
    ) {
        return "This information is not available in my published portfolio details. Please contact me directly to discuss it.";
    }

    // Total professional experience
    if (
        hasAny(q, [
            "total experience",
            "overall experience",
            "years of experience",
            "how many years",
            "how long have",
            "professional experience",
            "relevant experience",
            "work experience",
            "career experience",
        ])
    ) {
        return (
            "My listed professional experience spans February 2020 " +
            "to July 2026, approximately 6 years and 5 months. " +
            "Please refer to the Experience section for my roles and responsibilities."
        );
    }

    // Individual employment history
    if (
        hasAny(q, [
            "company",
            "companies",
            "worked at",
            "work history",
            "employment history",
            "previous employer",
            "previous company",
            "job role",
            "designation",
            "responsibilities",
        ])
    ) {
        return getExperienceSummary();
    }

    // Specific projects
    const matchedProject = projects.find((project) => {
        const title = normalize(project.title);
        return q.includes(title) || title.includes(q);
    });

    if (matchedProject) {
        return (
            `${matchedProject.title}\n\n` +
            `${matchedProject.description}\n\n` +
            `Technologies: ${formatList(matchedProject.technologies)}\n` +
            `Project link: ${matchedProject.url.trim()}`
        );
    }

    if (
        hasAny(q, [
            "project",
            "projects",
            "portfolio work",
            "built",
            "developed",
            "application",
        ])
    ) {
        return getProjectsSummary();
    }

    // Education
    if (
        hasAny(q, [
            "education",
            "degree",
            "college",
            "university",
            "graduation",
            "diploma",
            "cgpa",
            "percentage",
            "academic",
        ])
    ) {
        return education
            .map(
                (item) =>
                    `${item.degree} in ${item.field} — ${item.institution}. ` +
                    `${item.duration}. ${item.score}.`
            )
            .join("\n\n");
    }

    // Skills
    if (
        hasAny(q, [
            "skill",
            "skills",
            "technology",
            "technologies",
            "tech stack",
            "techstack",
            "programming language",
            "frontend",
            "backend",
            "database",
            "testing",
            "deployment",
            "cloud",
        ])
    ) {
        return skills
            .map(
                (category) =>
                    `${category.category}: ${formatList(category.items)}`
            )
            .join("\n\n");
    }

    // Specific technology questions
    const knownTechnologies = skills.flatMap((category) =>
        category.items.map((item) => ({
            item,
            category: category.category,
        }))
    );

    const matchedTechnologies = knownTechnologies.filter(({ item }) =>
        q.includes(normalize(item))
    );

    if (matchedTechnologies.length > 0) {
        const names = matchedTechnologies.map(({ item }) => item);

        const relatedJobs = experience.filter((job) =>
            job.points.some((point) =>
                names.some((name) =>
                    normalize(point).includes(normalize(name))
                )
            )
        );

        const relatedProjects = projects.filter((project) =>
            project.technologies.some((technology) =>
                names.some(
                    (name) => normalize(technology) === normalize(name)
                )
            )
        );

        let answer = `My portfolio lists experience with ${formatList(names)}.`;

        if (relatedJobs.length > 0) {
            answer +=
                "\n\nRelated roles: " +
                relatedJobs
                    .map((job) => `${job.role} at ${job.company}`)
                    .join("; ") +
                ".";
        }

        if (relatedProjects.length > 0) {
            answer +=
                "\n\nRelated projects: " +
                relatedProjects.map((project) => project.title).join(", ") +
                ".";
        }

        return answer;
    }

    // Greeting
    if (hasAny(q, ["hi", "hello", "hey", "good morning", "good evening"])) {
        return "Hi! Welcome to my portfolio. You can ask me about my experience, skills, projects, education, or technical background.";
    }

    return (
        "I can answer questions using the information available in my portfolio, " +
        "including my experience, skills, projects, and education. " +
        "Try asking about a specific project, technology, or previous role."
    );
}
