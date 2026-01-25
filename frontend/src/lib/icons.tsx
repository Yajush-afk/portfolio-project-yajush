import {
    SiHtml5, SiCss3, SiPython, SiCplusplus, SiFastapi, SiDjango, SiFlask,
    SiMysql, SiPostgresql, SiScikitlearn, SiTensorflow, SiPytorch,
    SiKaggle, SiGooglecolab, SiUbuntu, SiBrave, SiSpotify, SiGithub,
    SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiFramer,
    SiNumpy, SiPandas, SiScipy, SiJavascript
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FiSearch, FiCode, FiTerminal } from "react-icons/fi";
import { IconType } from "react-icons";

export const techStackIcons: Record<string, IconType> = {
    "HTML": SiHtml5,
    "HTML5": SiHtml5,
    "CSS": SiCss3,
    "CSS3": SiCss3,
    "Python": SiPython,
    "C++": SiCplusplus,
    "FastAPI": SiFastapi,
    "Django": SiDjango,
    "Flask": SiFlask,
    "MySQL": SiMysql,
    "PostgreSQL": SiPostgresql,
    "Postgres": SiPostgresql,
    "Scikit-learn": SiScikitlearn,
    "TensorFlow": SiTensorflow,
    "PyTorch": SiPytorch,
    "Kaggle": SiKaggle,
    "Colab": SiGooglecolab,
    "VS Code": VscVscode,
    "Ubuntu": SiUbuntu,
    "Brave": SiBrave,
    "Spotify": SiSpotify,
    "Perplexity": FiSearch,
    "GitHub": SiGithub,
    "Next.js": SiNextdotjs,
    "React": SiReact,
    "Tailwind CSS": SiTailwindcss,
    "TypeScript": SiTypescript,
    "Framer Motion": SiFramer,
    "Numpy": SiNumpy,
    "Pandas": SiPandas,
    "Scipy": SiScipy,
    "JS": SiJavascript,
    "JavaScript": SiJavascript
};

export const techStackUrls: Record<string, string> = {
    "HTML": "https://developer.mozilla.org/en-US/docs/Web/HTML",
    "HTML5": "https://developer.mozilla.org/en-US/docs/Web/HTML",
    "CSS": "https://developer.mozilla.org/en-US/docs/Web/CSS",
    "CSS3": "https://developer.mozilla.org/en-US/docs/Web/CSS",
    "Python": "https://www.python.org/",
    "C++": "https://isocpp.org/",
    "FastAPI": "https://fastapi.tiangolo.com/",
    "Django": "https://www.djangoproject.com/",
    "Flask": "https://flask.palletsprojects.com/",
    "MySQL": "https://www.mysql.com/",
    "PostgreSQL": "https://www.postgresql.org/",
    "Postgres": "https://www.postgresql.org/",
    "Scikit-learn": "https://scikit-learn.org/",
    "TensorFlow": "https://www.tensorflow.org/",
    "PyTorch": "https://pytorch.org/",
    "Kaggle": "https://www.kaggle.com/",
    "Colab": "https://colab.research.google.com/",
    "VS Code": "https://code.visualstudio.com/",
    "Ubuntu": "https://ubuntu.com/",
    "Brave": "https://brave.com/",
    "Spotify": "https://open.spotify.com/",
    "Perplexity": "https://www.perplexity.ai/",
    "GitHub": "https://github.com/",
    "Next.js": "https://nextjs.org/",
    "React": "https://react.dev/",
    "Tailwind CSS": "https://tailwindcss.com/",
    "TypeScript": "https://www.typescriptlang.org/",
    "Framer Motion": "https://www.framer.com/motion/",
    "Numpy": "https://numpy.org/",
    "Pandas": "https://pandas.pydata.org/",
    "Scipy": "https://scipy.org/",
    "JS": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "JavaScript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
};

export const techStackData = [
    {
        category: "Frontend", items: [
            { name: "HTML5", icon: SiHtml5, url: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "hover:text-orange-500" },
            { name: "CSS3", icon: SiCss3, url: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "hover:text-blue-500" }
        ]
    },
    {
        category: "Backend", items: [
            { name: "Python", icon: SiPython, url: "https://www.python.org/", color: "hover:text-yellow-400" },
            { name: "C++", icon: SiCplusplus, url: "https://isocpp.org/", color: "hover:text-blue-600" }
        ]
    },
    {
        category: "Frameworks", items: [
            { name: "FastAPI", icon: SiFastapi, url: "https://fastapi.tiangolo.com/", color: "hover:text-teal-400" },
            { name: "Django", icon: SiDjango, url: "https://www.djangoproject.com/", color: "hover:text-green-600" },
            { name: "Flask", icon: SiFlask, url: "https://flask.palletsprojects.com/", color: "hover:text-gray-400" }
        ]
    },
    {
        category: "Database", items: [
            { name: "MySQL", icon: SiMysql, url: "https://www.mysql.com/", color: "hover:text-blue-400" },
            { name: "PostgreSQL", icon: SiPostgresql, url: "https://www.postgresql.org/", color: "hover:text-blue-300" }
        ]
    },
    {
        category: "Data Science", items: [
            { name: "Scikit-learn", icon: SiScikitlearn, url: "https://scikit-learn.org/", color: "hover:text-orange-400" },
            { name: "TensorFlow", icon: SiTensorflow, url: "https://www.tensorflow.org/", color: "hover:text-orange-500" },
            { name: "PyTorch", icon: SiPytorch, url: "https://pytorch.org/", color: "hover:text-red-500" }
        ]
    },
    {
        category: "Platforms", items: [
            { name: "VS Code", icon: VscVscode, url: "https://code.visualstudio.com/", color: "hover:text-blue-500" },
            { name: "Kaggle", icon: SiKaggle, url: "https://www.kaggle.com/", color: "hover:text-blue-400" },
            { name: "Colab", icon: SiGooglecolab, url: "https://colab.research.google.com/", color: "hover:text-orange-400" }
        ]
    }
];

export const toolkitData = [
    { name: "VS Code", icon: VscVscode, url: "https://code.visualstudio.com/", color: "text-blue-500" },
    { name: "Terminal", icon: SiUbuntu, url: "https://ubuntu.com/", color: "text-orange-500" },
    { name: "Brave", icon: SiBrave, url: "https://brave.com/", color: "text-orange-600" },
    { name: "Spotify", icon: SiSpotify, url: "https://open.spotify.com/", color: "text-green-500" },
    { name: "Perplexity", icon: FiSearch, url: "https://www.perplexity.ai/", color: "text-teal-400" },
    { name: "GitHub", icon: SiGithub, url: "https://github.com/", color: "text-foreground" }
];
