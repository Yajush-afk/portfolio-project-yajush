import aboutData from '../data/about.json';
import educationData from '../data/education.json';
import achievementsData from '../data/achievements.json';
import projectsData from '../data/projects.json';
import excusesData from '../data/excuses.json';
import quotesData from '../data/quotes.json';
import socialPostsData from '../data/social_posts.json';
import currentlyLearningData from '../data/currently_learning.json';

// Types (inferred or explicit)
export interface Project {
    id: string;
    title: string;
    description: string;
    tech_stack: string[];
    github_link: string | null;
    demo_link: string | null;
    image_url: string | null;
}

export interface Achievement {
    id: string;
    type: string;
    title: string;
    issuer: string;
    date: string;
    credential_link: string | null;
    image_url: string | null;
    description?: string;
}

export interface SocialPost {
    content: string;
    link: string;
    date: string;
}

export interface SocialPosts {
    x_post?: SocialPost;
    linkedin_post?: SocialPost;
}

export const getAboutData = () => aboutData;

export const getEducationData = () => educationData;

export const getAchievementsData = () => achievementsData;

export const getProjectsData = () => projectsData;

export const getSocialPostsData = () => socialPostsData;

export const getCurrentlyLearningData = () => currentlyLearningData;

export const getRandomExcuse = () => {
    const excuses = excusesData.excuses;
    if (!excuses || excuses.length === 0) {
        return "No excuses found!";
    }
    const randomIndex = Math.floor(Math.random() * excuses.length);
    return excuses[randomIndex];
};

export const getDailyQuote = () => {
    const quotes = quotesData.quotes;
    if (!quotes || quotes.length === 0) {
        return "No quotes found.";
    }

    // Deterministic quote based on date (same as backend logic)
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const quoteIndex = dayOfYear % quotes.length;
    return quotes[quoteIndex];
};
