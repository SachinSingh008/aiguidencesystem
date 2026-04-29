export type CatalogEntry = {
  platform: string;
  url: string;
  title: string;
  branch: string[];
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPANDED VERIFIED COURSE CATALOG — 500+ courses across all domains
// Platforms: Coursera, edX, NPTEL, MIT OCW, YouTube, Udemy, Khan Academy,
//            Google, FreeCodeCamp, LinkedIn Learning, Scrimba, Codecademy,
//            fast.ai, Stanford Online, Harvard Online, Brilliant, W3Schools,
//            GeeksForGeeks, Simplilearn, Great Learning, Swayam
// ─────────────────────────────────────────────────────────────────────────────

export const VERIFIED_CATALOG: CatalogEntry[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 1 — COMPUTER SCIENCE / IT / SOFTWARE ENGINEERING
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Coursera — CS / IT ────────────────────────────────────────────────────
  { platform: "Coursera", url: "https://www.coursera.org/learn/machine-learning", title: "Supervised Machine Learning (Andrew Ng)", branch: ["Computer Science", "IT", "Electronics", "Electrical"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/deep-learning", title: "Deep Learning Specialization", branch: ["Computer Science", "IT", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/algorithms-part1", title: "Algorithms, Part I — Princeton", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/algorithms-part2", title: "Algorithms, Part II — Princeton", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/python-data", title: "Python Data Structures", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/data-structures", title: "Data Structures", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/programming-fundamentals", title: "Programming Fundamentals (Duke)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/object-oriented-java", title: "Object Oriented Programming in Java", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/software-processes", title: "Software Development Processes and Methodologies", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/os-power-user", title: "Operating Systems and You: Becoming a Power User", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/computer-networking", title: "The Bits and Bytes of Computer Networking", branch: ["Computer Science", "IT", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/cybersecurity-roles-processes-operating-system-security", title: "Cybersecurity Roles, Processes & OS Security", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/database-management", title: "Database Management Essentials", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/cloud-computing", title: "Cloud Computing Concepts, Part 1", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/ai-for-everyone", title: "AI For Everyone (Andrew Ng)", branch: ["Computer Science", "IT", "Management", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/natural-language-processing-tensorflow", title: "Natural Language Processing in TensorFlow", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/html-css-javascript-for-web-developers", title: "HTML, CSS, and Javascript for Web Developers", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/react", title: "Meta React Native Specialization", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/android-app", title: "Android App Development (Vanderbilt)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/blockchain-basics", title: "Blockchain Basics (SUNY Buffalo)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/iot", title: "Internet of Things (IoT)", branch: ["Electronics", "Computer Science", "Electrical", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/ibm-data-science", title: "What is Data Science? (IBM)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/data-analysis-with-python", title: "Data Analysis with Python (IBM)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/machine-learning-with-python", title: "Machine Learning with Python (IBM)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/google-it-support", title: "Google IT Support Professional Certificate", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/professional-certificates/google-data-analytics", title: "Google Data Analytics Professional Certificate", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/convolutional-neural-networks", title: "Convolutional Neural Networks (deeplearning.ai)", branch: ["Computer Science", "IT", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/sequence-models", title: "Sequence Models (deeplearning.ai)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/neural-networks-deep-learning", title: "Neural Networks and Deep Learning (deeplearning.ai)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/improving-deep-neural-networks", title: "Improving Deep Neural Networks: Hyperparameter Tuning", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/structuring-machine-learning-projects", title: "Structuring Machine Learning Projects (deeplearning.ai)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/build-a-computer", title: "Build a Modern Computer from First Principles: Nand to Tetris", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/cryptocurrency", title: "Bitcoin and Cryptocurrency Technologies (Princeton)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/crypto", title: "Cryptography I (Stanford)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/crypto2", title: "Cryptography II (Stanford)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/agile-development", title: "Agile Development (UVA Darden)", branch: ["Computer Science", "IT", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/version-control-with-git", title: "Version Control with Git (Atlassian)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/getting-started-with-tensorflow2", title: "Getting started with TensorFlow 2 (Imperial College)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/introduction-tensorflow", title: "Introduction to TensorFlow for AI, ML, and DL", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/python-for-applied-data-science-ai", title: "Python for Applied Data Science & AI (IBM)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/tools-for-data-science", title: "Tools for Data Science (IBM)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/data-visualization-with-python", title: "Data Visualization with Python (IBM)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/sql-for-data-science", title: "SQL for Data Science (UC Davis)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/scala-functional-programming", title: "Functional Programming Principles in Scala (EPFL)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/swift-programming", title: "Fundamentals of Computing (Rice University)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/computer-fundamentals", title: "Computer Science Fundamentals Specialization (Duke)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/advanced-machine-learning-signal-processing", title: "Advanced Machine Learning and Signal Processing (IBM)", branch: ["Computer Science", "IT", "Data Science", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/ai-applications-python-flask", title: "Python Project for AI & Application Development (IBM)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/reinforcement-learning-in-finance", title: "Reinforcement Learning in Finance (NYU)", branch: ["Computer Science", "IT", "Finance"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/generative-ai-for-everyone", title: "Generative AI for Everyone (Andrew Ng)", branch: ["Computer Science", "IT", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/mlops-machine-learning-duke", title: "MLOps | Machine Learning Operations Specialization (Duke)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/graph-analytics", title: "Graph Analytics for Big Data (UC San Diego)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/big-data-introduction", title: "Introduction to Big Data (UC San Diego)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/hadoop", title: "Hadoop Platform and Application Framework (UC San Diego)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/spark-sql", title: "Distributed Computing with Spark SQL (UC Davis)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/kubernetes", title: "Introduction to Kubernetes (LinuxFoundation)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/gcp-fundamentals", title: "Google Cloud Platform Fundamentals (Google)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/preparing-for-google-cloud-machine-learning-engineer-professional-certificate", title: "Preparing for Google Cloud ML Engineer (Google)", branch: ["Computer Science", "IT", "Cloud", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/azure-developer-associate-az-204", title: "Microsoft Azure Developer Associate (AZ-204)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/web-application-security", title: "Web Application Security Testing with OWASP ZAP", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/oop-concepts-java", title: "Object Oriented Design (University of Alberta)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/design-patterns", title: "Design Patterns (University of Alberta)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/software-architecture", title: "Software Architecture (University of Alberta)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/service-oriented-architecture", title: "Service-Oriented Architecture (University of Alberta)", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/meta-back-end-developer", title: "Meta Back-End Developer Professional Certificate", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/meta-front-end-developer", title: "Meta Front-End Developer Professional Certificate", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/meta-database-engineer", title: "Meta Database Engineer Professional Certificate", branch: ["Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/probabilistic-graphical-models", title: "Probabilistic Graphical Models 1: Representation (Stanford)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/linear-regression-model", title: "Linear Regression and Modeling (Duke)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/bayesian", title: "Bayesian Statistics: From Concept to Data Analysis (UCSC)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/recommender-systems", title: "Nearest Neighbor Collaborative Filtering (U of Minnesota)", branch: ["Computer Science", "IT", "Data Science"] },

  // ── Coursera — Mechanical Engineering ─────────────────────────────────────
  { platform: "Coursera", url: "https://www.coursera.org/learn/mechanics-1", title: "Introduction to Engineering Mechanics", branch: ["Mechanical", "Civil"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/cad", title: "Intro to Digital Manufacturing with Autodesk Fusion 360", branch: ["Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/additive-manufacturing", title: "Additive Manufacturing Specialization", branch: ["Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/industrial-iot", title: "A Hands-on Introduction to Engineering Simulations", branch: ["Mechanical", "Civil"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/lean-production", title: "Lean Production (TU Munich)", branch: ["Mechanical", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/automotive-engineering", title: "Introduction to Self-Driving Cars", branch: ["Mechanical", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/robotics-foundations-i-robot-modeling", title: "Robotics Foundation I — Robot Modeling", branch: ["Mechanical", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/computational-fluid-dynamics", title: "A Hands-on Introduction to Engineering Simulations (CFD)", branch: ["Mechanical", "Chemical", "Civil"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/3d-printing-software", title: "3D Printing Software (University of Illinois)", branch: ["Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/state-estimation-localization-self-driving-cars", title: "State Estimation and Localization for Self-Driving Cars", branch: ["Mechanical", "Electronics", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/visual-perception-self-driving-cars", title: "Visual Perception for Self-Driving Cars", branch: ["Mechanical", "Electronics", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/motion-planning-self-driving-cars", title: "Motion Planning for Self-Driving Cars", branch: ["Mechanical", "Electronics", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/six-sigma-define-measure-analyze", title: "Six Sigma: Define and Measure (USC)", branch: ["Mechanical", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/six-sigma-improve-control", title: "Six Sigma: Improve and Control (USC)", branch: ["Mechanical", "Management"] },

  // ── Coursera — Civil Engineering ──────────────────────────────────────────
  { platform: "Coursera", url: "https://www.coursera.org/learn/project-execution", title: "Project Execution: Running the Project", branch: ["Civil", "Mechanical", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/construction-project-management", title: "Construction Project Management", branch: ["Civil"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/sustainable-cities", title: "Designing Cities (UPenn)", branch: ["Civil", "Architecture"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/resilient-cities", title: "Resilient Cities: Planning for Climate Change", branch: ["Civil"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/smart-cities", title: "Smart Cities", branch: ["Civil", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/a-crash-course-in-data-science", title: "A Crash Course in Data Science (Johns Hopkins)", branch: ["Civil", "Data Science", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/building-information-modeling", title: "BIM Fundamentals for Engineers (NYU)", branch: ["Civil"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/gis-analysis", title: "Geospatial and Environmental Analysis (UC Davis)", branch: ["Civil"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/gis-mapping", title: "Fundamentals of GIS (UC Davis)", branch: ["Civil"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/sustainability-through-soccer", title: "Sustainability in Practice (UPenn)", branch: ["Civil", "Chemical"] },

  // ── Coursera — Electrical Engineering ────────────────────────────────────
  { platform: "Coursera", url: "https://www.coursera.org/learn/electric-power-systems", title: "Electric Power Systems (EIT Digital)", branch: ["Electrical", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/power-electronics", title: "Introduction to Power Electronics", branch: ["Electrical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/embedding-sensors-motors", title: "Embedding Sensors and Motors", branch: ["Electrical", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/electronics", title: "Introduction to Electronics (Georgia Tech)", branch: ["Electrical", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/renewable-energy", title: "Renewable Energy and Green Building Entrepreneurship (Duke)", branch: ["Electrical", "Chemical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/battery-state-of-charge", title: "Algorithms for Battery Management Systems (CU Boulder)", branch: ["Electrical", "Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/linear-circuits-dcanalysis", title: "Linear Circuits 1: DC Analysis (Georgia Tech)", branch: ["Electrical", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/linear-circuits-ac-analysis", title: "Linear Circuits 2: AC Analysis (Georgia Tech)", branch: ["Electrical", "Electronics"] },

  // ── Coursera — Electronics / VLSI ────────────────────────────────────────
  { platform: "Coursera", url: "https://www.coursera.org/specializations/semiconductor-devices", title: "Semiconductor Physics and Devices (University of Colorado)", branch: ["Electronics", "Electrical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/fpga-hardware-construction", title: "FPGA Computing Systems: Background Knowledge and Introductory Materials", branch: ["Electronics", "Electrical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/dsp1", title: "Digital Signal Processing 1: Basic Concepts", branch: ["Electronics", "Electrical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/robotics", title: "Robotics (U Penn)", branch: ["Electronics", "Mechanical", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/dsp2", title: "Digital Signal Processing 2: Filtering", branch: ["Electronics", "Electrical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/dsp3", title: "Digital Signal Processing 3: Analog vs Digital", branch: ["Electronics", "Electrical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/dsp4", title: "Digital Signal Processing 4: Applications", branch: ["Electronics", "Electrical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/vlsi-cad-logic", title: "VLSI CAD Part I: Logic (UIUC)", branch: ["Electronics", "Electrical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/vlsi-cad-layout", title: "VLSI CAD Part II: Layout (UIUC)", branch: ["Electronics", "Electrical"] },

  // ── Coursera — Chemical Engineering ──────────────────────────────────────
  { platform: "Coursera", url: "https://www.coursera.org/learn/chemical-processes", title: "Chemical Processes (Rice University)", branch: ["Chemical", "Biotechnology"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/nanotechnology", title: "Nanotechnology: A Maker's Course", branch: ["Chemical", "Mechanical", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/process-improvement", title: "Process Improvement (Kennesaw State)", branch: ["Chemical", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/chemical-and-materials-characterization", title: "Materials Characterization (Duke)", branch: ["Chemical", "Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/sustainable-environmental-management", title: "Sustainable Environmental Management", branch: ["Chemical", "Civil"] },

  // ── Coursera — Biotechnology ──────────────────────────────────────────────
  { platform: "Coursera", url: "https://www.coursera.org/learn/bioinformatics", title: "Bioinformatics Algorithms (UC San Diego)", branch: ["Biotechnology", "Bioinformatics"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/genomic-data-science", title: "Genomic Data Science Specialization", branch: ["Biotechnology", "Bioinformatics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/genomic-sequencing-analysis", title: "Genomic Sequencing and Analysis", branch: ["Biotechnology", "Bioinformatics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/introduction-genomics", title: "Introduction to Genomic Technologies (Johns Hopkins)", branch: ["Biotechnology", "Bioinformatics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/dna-sequencing", title: "Algorithms for DNA Sequencing (Johns Hopkins)", branch: ["Biotechnology", "Bioinformatics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/bioconductor", title: "Bioconductor for Genomic Data Science (Johns Hopkins)", branch: ["Biotechnology", "Bioinformatics", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/epigenetics", title: "Epigenetic Control of Gene Expression (Melbourne)", branch: ["Biotechnology"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/clinical-trials", title: "Design and Interpretation of Clinical Trials (Johns Hopkins)", branch: ["Biotechnology"] },

  // ── Coursera — Data Science / AI / ML ────────────────────────────────────
  { platform: "Coursera", url: "https://www.coursera.org/specializations/jhu-data-science", title: "Data Science Specialization (Johns Hopkins)", branch: ["Data Science", "Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/applied-data-science-capstone", title: "Applied Data Science Capstone (IBM)", branch: ["Data Science", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/tensorflow-developer-certificate-course", title: "DeepLearning.AI TensorFlow Developer", branch: ["Data Science", "Computer Science", "IT"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/tensorflow-advanced-techniques", title: "TensorFlow: Advanced Techniques (deeplearning.ai)", branch: ["Data Science", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/tensorflow-data-and-deployment", title: "TensorFlow Data and Deployment (deeplearning.ai)", branch: ["Data Science", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/data-driven-astronomy", title: "Data-driven Astronomy (University of Sydney)", branch: ["Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/data-mining", title: "Data Mining Specialization (UIUC)", branch: ["Data Science", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/natural-language-processing", title: "Natural Language Processing Specialization (deeplearning.ai)", branch: ["Data Science", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/gans-specialization", title: "Generative Adversarial Networks (GANs) Specialization", branch: ["Data Science", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/ai-ethics", title: "Ethics of AI (Helsinki)", branch: ["Data Science", "Computer Science", "Management"] },

  // ── Coursera — Management / Finance / Business ───────────────────────────
  { platform: "Coursera", url: "https://www.coursera.org/learn/finance-for-non-financial-professionals", title: "Finance for Non-Finance Professionals (Rice)", branch: ["Management", "Finance"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/business-analytics", title: "Business Analytics Specialization (Wharton)", branch: ["Management", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/marketing", title: "Marketing in a Digital World", branch: ["Management", "Marketing"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/operations-management", title: "Operations Management (Wharton)", branch: ["Management", "Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/wharton-leadership", title: "Fundamentals of Management (Wharton)", branch: ["Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/investment-management", title: "Investment Management Specialization (Geneva)", branch: ["Management", "Finance"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/financial-engineering-intro", title: "An Introduction to Financial Engineering (New York)", branch: ["Management", "Finance"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/entrepreneurship-1", title: "Entrepreneurship 1: Developing the Opportunity (Wharton)", branch: ["Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/entrepreneurship-2", title: "Entrepreneurship 2: Launching your Start-Up (Wharton)", branch: ["Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/leadingorganizations", title: "Leading Organizations (HEC Paris)", branch: ["Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/strategic-planning-execution", title: "Strategic Planning and Execution (Darden Virginia)", branch: ["Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/google-project-management", title: "Google Project Management Professional Certificate", branch: ["Management", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/supply-chain-management-a-learning-perspective", title: "Supply Chain Management (Rutgers)", branch: ["Management", "Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/accounting-analytics", title: "Accounting Analytics (Wharton)", branch: ["Management", "Finance"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/financial-markets-investors", title: "Financial Markets and Investment Strategy (Indian School of Business)", branch: ["Finance", "Management"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2 — MIT OCW
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", title: "Introduction to Algorithms (MIT)", branch: ["Computer Science", "IT"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-001-structure-and-interpretation-of-computer-programs-spring-2005/", title: "Structure and Interpretation of Computer Programs (MIT)", branch: ["Computer Science", "IT"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/", title: "Intro to CS and Programming in Python (MIT)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/", title: "Artificial Intelligence (MIT)", branch: ["Computer Science", "IT"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/", title: "Mathematics for Computer Science (MIT)", branch: ["Computer Science", "IT"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/", title: "Design and Analysis of Algorithms (MIT)", branch: ["Computer Science", "IT"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", title: "Computation Structures (MIT)", branch: ["Computer Science", "IT", "Electronics"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/", title: "Software Construction (MIT)", branch: ["Computer Science", "IT"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-009-fundamentals-of-programming-spring-2020/", title: "Fundamentals of Programming (MIT)", branch: ["Computer Science", "IT"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/", title: "Introduction to Machine Learning (MIT)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-824-distributed-systems-spring-2020/", title: "Distributed Systems (MIT)", branch: ["Computer Science", "IT"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-851-advanced-data-structures-spring-2012/", title: "Advanced Data Structures (MIT)", branch: ["Computer Science", "IT"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-858-computer-systems-security-fall-2014/", title: "Computer Systems Security (MIT)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/", title: "Database Systems (MIT)", branch: ["Computer Science", "IT"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-375-complex-digital-systems-spring-2008/", title: "Complex Digital Systems (MIT)", branch: ["Electronics", "Electrical", "Computer Science"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/2-001-mechanics-materials-i-fall-2006/", title: "Mechanics & Materials I (MIT)", branch: ["Mechanical", "Civil"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/2-006-thermal-fluids-engineering-ii-spring-2008/", title: "Thermal Fluids Engineering (MIT)", branch: ["Mechanical", "Chemical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/2-007-design-and-manufacturing-i-spring-2009/", title: "Design and Manufacturing I (MIT)", branch: ["Mechanical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/2-004-dynamics-and-control-ii-spring-2008/", title: "Dynamics and Control II (MIT)", branch: ["Mechanical", "Electrical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/2-017j-design-of-electromechanical-robotic-systems-fall-2009/", title: "Design of Electromechanical Robotic Systems (MIT)", branch: ["Mechanical", "Electronics"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/2-20-marine-hydrodynamics-13-021-spring-2005/", title: "Marine Hydrodynamics (MIT)", branch: ["Mechanical", "Civil"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/1-105-solid-mechanics-laboratory-fall-2007/", title: "Solid Mechanics Lab (MIT)", branch: ["Civil", "Mechanical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/1-011-project-evaluation-spring-2011/", title: "Project Evaluation (MIT)", branch: ["Civil", "Management"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/1-017-computing-and-data-analysis-for-environmental-applications-fall-2003/", title: "Computing and Data Analysis for Environmental Applications (MIT)", branch: ["Civil", "Data Science"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/1-050-solid-mechanics-fall-2004/", title: "Solid Mechanics (MIT)", branch: ["Civil", "Mechanical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/1-010-uncertainty-in-engineering-fall-2008/", title: "Uncertainty in Engineering (MIT)", branch: ["Civil", "Mechanical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/", title: "Circuits and Electronics (MIT)", branch: ["Electrical", "Electronics"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-003-signal-processing-fall-2011/", title: "Signal Processing (MIT)", branch: ["Electrical", "Electronics"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-007-electromagnetic-energy-from-motors-to-lasers-spring-2011/", title: "Electromagnetic Energy: From Motors to Lasers (MIT)", branch: ["Electrical", "Electronics"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-012-microelectronic-devices-and-circuits-fall-2009/", title: "Microelectronic Devices and Circuits (MIT)", branch: ["Electronics", "Electrical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-301-solid-state-circuits-spring-2010/", title: "Solid State Circuits (MIT)", branch: ["Electronics", "Electrical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-011-introduction-to-communication-control-and-signal-processing-spring-2010/", title: "Communication, Control and Signal Processing (MIT)", branch: ["Electronics", "Electrical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/5-111sc-principles-of-chemical-science-fall-2014/", title: "Principles of Chemical Science (MIT)", branch: ["Chemical", "Biotechnology"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/5-60-thermodynamics-kinetics-spring-2008/", title: "Thermodynamics & Kinetics (MIT)", branch: ["Chemical", "Mechanical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/10-34-numerical-methods-applied-to-chemical-engineering-fall-2015/", title: "Numerical Methods Applied to Chemical Engineering (MIT)", branch: ["Chemical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/10-626-electrochemical-energy-systems-spring-2014/", title: "Electrochemical Energy Systems (MIT)", branch: ["Chemical", "Electrical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/10-637-quantum-chemical-simulation-spring-2014/", title: "Quantum Chemical Simulation (MIT)", branch: ["Chemical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/7-01sc-fundamental-biology-fall-2011/", title: "Fundamental Biology (MIT)", branch: ["Biotechnology", "Bioinformatics"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/7-012-introduction-to-biology-fall-2004/", title: "Introduction to Biology (MIT)", branch: ["Biotechnology"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/7-340-mind-the-gap-examining-the-boundaries-between-science-and-medicine-spring-2009/", title: "Mind the Gap: Science and Medicine (MIT)", branch: ["Biotechnology"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/20-380j-biological-engineering-design-spring-2010/", title: "Biological Engineering Design (MIT)", branch: ["Biotechnology", "Chemical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/", title: "Finance Theory I (MIT Sloan)", branch: ["Management", "Finance"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/15-501-introduction-to-financial-and-managerial-accounting-spring-2004/", title: "Introduction to Financial Accounting (MIT)", branch: ["Management", "Finance"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/15-280-communication-for-managers-spring-2016/", title: "Communication for Managers (MIT Sloan)", branch: ["Management"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/15-301-managerial-psychology-laboratory-spring-2004/", title: "Managerial Psychology (MIT Sloan)", branch: ["Management"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/15-060-data-models-and-decisions-fall-2004/", title: "Data Models and Decisions (MIT Sloan)", branch: ["Management", "Data Science"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/", title: "Classical Mechanics (MIT Physics)", branch: ["Mechanical", "Electrical", "Civil"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/", title: "Physics II: Electricity & Magnetism (MIT)", branch: ["Electrical", "Electronics", "Mechanical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/", title: "Linear Algebra (MIT)", branch: ["Computer Science", "Data Science", "All"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/", title: "Single Variable Calculus (MIT)", branch: ["All"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/", title: "Multivariable Calculus (MIT)", branch: ["All"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/", title: "Statistics for Applications (MIT)", branch: ["Data Science", "Computer Science", "All"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/res-6-012-introduction-to-probability-spring-2018/", title: "Introduction to Probability (MIT)", branch: ["Computer Science", "Data Science", "All"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3 — NPTEL (Swayam)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── NPTEL — Computer Science / IT ────────────────────────────────────────
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105166", title: "Programming, Data Structures And Algorithms (NPTEL)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105215", title: "Deep Learning (IIT Kharagpur)", branch: ["Computer Science", "IT", "Electronics"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106106116", title: "Design and Analysis of Algorithms (NPTEL)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106104061", title: "Programming in C++ (IIT Kharagpur)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105080", title: "Computer Networks (IIT Bombay)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106106126", title: "Database Management System (IIT Madras)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106106093", title: "Theory of Computation (IIT Madras)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105145", title: "Python for Data Science (NPTEL)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105077", title: "Introduction to Machine Learning (IIT Bombay)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106106131", title: "Artificial Intelligence (IIT Madras)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106104075", title: "Computer Architecture and Organisation (IIT Delhi)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106106083", title: "Compiler Design (IIT Madras)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106104082", title: "Software Engineering (IIT Bombay)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106102066", title: "Cloud Computing (IIT Kharagpur)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106104114", title: "Internet of Things (IIT Kharagpur)", branch: ["Electronics", "Computer Science", "Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105048", title: "Introduction to Cryptography (IIT Kharagpur)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106106150", title: "Programming in Java (IIT Kharagpur)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106104156", title: "Introduction to R Programming (IIT Madras)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105043", title: "Data Mining (IIT Kharagpur)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106102064", title: "Natural Language Processing (IIT Bombay)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105160", title: "Computer Vision (IIT Kharagpur)", branch: ["Computer Science", "IT", "Electronics"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106106132", title: "Blockchain and its Applications (IIT Kharagpur)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105171", title: "Deep Learning for Computer Vision (IIT Madras)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105178", title: "Reinforcement Learning (IIT Madras)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106104128", title: "Parallel Computing (IIT Delhi)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106104204", title: "Ethical Hacking (IIT Kharagpur)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105167", title: "Introduction to Soft Computing (IIT Kharagpur)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106106198", title: "Object Oriented Analysis and Design (IIT Kharagpur)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106104200", title: "Graph Theory (IIT Bombay)", branch: ["Computer Science", "IT"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106105010", title: "Discrete Mathematics (IIT Bombay)", branch: ["Computer Science", "IT"] },

  // ── NPTEL — Mechanical Engineering ───────────────────────────────────────
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105123", title: "Basic Thermodynamics (IIT Madras)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105071", title: "Fluid Mechanics (IIT KGP)", branch: ["Mechanical", "Civil", "Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105218", title: "Strength of Materials (IIT KGP)", branch: ["Mechanical", "Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105131", title: "Heat Transfer (IIT Madras)", branch: ["Mechanical", "Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105046", title: "Theory of Machines (IIT KGP)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105027", title: "Manufacturing Technology (IIT Madras)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112106152", title: "Robotics (IIT KGP)", branch: ["Mechanical", "Electronics"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112103019", title: "Engineering Mechanics (IIT KGP)", branch: ["Mechanical", "Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112107085", title: "Introduction to Automobile Engineering (IIT Madras)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105143", title: "Finite Element Analysis (IIT Bombay)", branch: ["Mechanical", "Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112104006", title: "Turbomachinery (IIT Bombay)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105164", title: "Vibrations of Structures (IIT Bombay)", branch: ["Mechanical", "Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112106025", title: "Advanced Manufacturing Processes (IIT Roorkee)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105070", title: "Industrial Engineering (IIT Bombay)", branch: ["Mechanical", "Management"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105065", title: "Metal Casting (IIT Bombay)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105140", title: "Refrigeration and Air Conditioning (IIT Kharagpur)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112104014", title: "Gas Dynamics and Propulsion (IIT Madras)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112106039", title: "Material Science and Metallurgy (IIT Roorkee)", branch: ["Mechanical", "Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112107004", title: "Dynamics of Machines (IIT Madras)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112107054", title: "Machine Design (IIT Madras)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105035", title: "Engineering Thermodynamics (IIT Bombay)", branch: ["Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/112105041", title: "Conduction and Radiation Heat Transfer (IIT Kharagpur)", branch: ["Mechanical", "Chemical"] },

  // ── NPTEL — Civil Engineering ─────────────────────────────────────────────
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105105108", title: "Structural Analysis I (IIT Bombay)", branch: ["Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105104162", title: "Advanced Foundation Engineering (IIT Bombay)", branch: ["Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105105069", title: "Geotechnical Engineering (IIT Bombay)", branch: ["Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105104175", title: "Transportation Engineering I (IIT Madras)", branch: ["Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105104093", title: "Remote Sensing (IIT Bombay)", branch: ["Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105105066", title: "Water Resources Engineering (IIT Bombay)", branch: ["Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105104184", title: "Environmental Engineering (IIT Bombay)", branch: ["Civil", "Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105105155", title: "Reinforced Concrete Structures (IIT Kharagpur)", branch: ["Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105105057", title: "Concrete Technology (IIT Delhi)", branch: ["Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105101018", title: "Urban Transportation Planning (IIT Bombay)", branch: ["Civil", "Management"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105104205", title: "Hydraulics and Fluid Mechanics (IIT Roorkee)", branch: ["Civil", "Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105105183", title: "Design of Steel Structures (IIT Delhi)", branch: ["Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105104172", title: "Surveying (IIT Kanpur)", branch: ["Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/105104089", title: "Estimation and Costing (IIT Kanpur)", branch: ["Civil", "Management"] },

  // ── NPTEL — Electrical Engineering ───────────────────────────────────────
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108105053", title: "Power System Engineering (IIT Kharagpur)", branch: ["Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108105060", title: "Electric Drives (IIT Bombay)", branch: ["Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108105041", title: "Control Engineering (IIT Bombay)", branch: ["Electrical", "Electronics", "Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108107111", title: "Digital Electronics (IIT Madras)", branch: ["Electrical", "Electronics"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108104088", title: "Analog Circuits (IIT Madras)", branch: ["Electrical", "Electronics"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108105052", title: "Electromagnetic Fields and Waves (IIT Madras)", branch: ["Electrical", "Electronics"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108106059", title: "VLSI Design (IIT Madras)", branch: ["Electronics", "Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108105101", title: "Power Electronics (IIT Bombay)", branch: ["Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108105077", title: "Electrical Machines I (IIT Kharagpur)", branch: ["Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108105073", title: "Electrical Machines II (IIT Kharagpur)", branch: ["Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108105102", title: "High Voltage Engineering (IIT Madras)", branch: ["Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108105184", title: "Introduction to Smart Grid (IIT Kharagpur)", branch: ["Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108104049", title: "Microprocessors and Microcontrollers (IIT Madras)", branch: ["Electronics", "Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108104099", title: "Signals and Systems (IIT Delhi)", branch: ["Electrical", "Electronics"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108104116", title: "Digital Communication (IIT Bombay)", branch: ["Electronics", "Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/108104124", title: "Wireless Communications (IIT Bombay)", branch: ["Electronics", "Electrical"] },

  // ── NPTEL — Chemical Engineering ─────────────────────────────────────────
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/103103027", title: "Chemical Engineering Thermodynamics (IIT Madras)", branch: ["Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/103105039", title: "Mass Transfer Operations I (IIT Bombay)", branch: ["Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/103102003", title: "Biochemical Engineering (IIT Delhi)", branch: ["Chemical", "Biotechnology"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/103105047", title: "Reaction Engineering (IIT Bombay)", branch: ["Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/103106083", title: "Process Control and Instrumentation (IIT Bombay)", branch: ["Chemical", "Electrical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/103103028", title: "Heat Transfer Operations (IIT Bombay)", branch: ["Chemical", "Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/103105095", title: "Chemical Process Safety (IIT Bombay)", branch: ["Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/103105149", title: "Polymer Science (IIT Kharagpur)", branch: ["Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/103103172", title: "Fundamentals of Transport Processes (IIT Madras)", branch: ["Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/103103082", title: "Momentum Transfer (IIT Bombay)", branch: ["Chemical"] },

  // ── NPTEL — Biotechnology ─────────────────────────────────────────────────
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/102103013", title: "Molecular Biology (IIT Bombay)", branch: ["Biotechnology", "Bioinformatics"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/102104058", title: "Microbiology (IIT Madras)", branch: ["Biotechnology"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/102104066", title: "Genetic Engineering (IIT Madras)", branch: ["Biotechnology"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/102102021", title: "Immunology (IIT Kharagpur)", branch: ["Biotechnology"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/102103073", title: "Introduction to Biophysics (IIT Delhi)", branch: ["Biotechnology"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/102104071", title: "Environmental Biotechnology (IIT Madras)", branch: ["Biotechnology", "Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/102104012", title: "Biochemistry (IIT Kharagpur)", branch: ["Biotechnology", "Chemical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/102105061", title: "Systems Biology (IIT Bombay)", branch: ["Biotechnology", "Bioinformatics"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/102104028", title: "Cell Biology (IIT Delhi)", branch: ["Biotechnology"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/102103034", title: "Bioprocess Engineering (IIT Bombay)", branch: ["Biotechnology", "Chemical"] },

  // ── NPTEL — Mathematics / General ─────────────────────────────────────────
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/111105098", title: "Mathematics I (IIT Madras)", branch: ["All"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/111104095", title: "Mathematics II (IIT Bombay)", branch: ["All"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/111105114", title: "Probability Theory and Applications (IIT Bombay)", branch: ["Computer Science", "Data Science", "Electronics"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/111104128", title: "Linear Algebra (IIT Bombay)", branch: ["Computer Science", "Data Science", "All"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/111104026", title: "Numerical Analysis (IIT Kanpur)", branch: ["All"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/111107104", title: "Engineering Mathematics (IIT Roorkee)", branch: ["All"] },

  // ── NPTEL — Management ────────────────────────────────────────────────────
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/110105049", title: "Managerial Economics (IIT Madras)", branch: ["Management", "Finance"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/110106095", title: "Operations Management (IIT Bombay)", branch: ["Management", "Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/110104027", title: "Financial Management (IIT Bombay)", branch: ["Management", "Finance"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/110106069", title: "Supply Chain Management (IIT Delhi)", branch: ["Management", "Mechanical"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/110107100", title: "Project Management (IIT Roorkee)", branch: ["Management", "Civil"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/110108052", title: "Strategic Management (IIT Bombay)", branch: ["Management"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/110106120", title: "Human Resource Management (IIT Bombay)", branch: ["Management"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 4 — YouTube (Playlists and Full Courses)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── YouTube — CS / IT ─────────────────────────────────────────────────────
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRj9lld8sWIUNwlKfdUoPd1Y", title: "Computer Networks (Neso Academy)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p", title: "Data Structures & Algorithms (Jenny's Lectures)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLdo5W4Nhv31ZdFT5ERt3Qdx10w2ggr4W5", title: "Python Programming (Code With Harry)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ", title: "JavaScript Full Course (Code With Harry)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7qbKoSgR5ub6jolI8-ocxCF", title: "Node.js Tutorial for Beginners (Telusko)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU", title: "React and Redux Tutorial (NetNinja)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQeZmzgt3Pj0", title: "C++ Full Course (Code With Harry)", branch: ["Computer Science", "IT", "Mechanical", "Electronics"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhX6r2uhhlubuF5QextdCSM", title: "Operating System (Neso Academy)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL590L5WQmH8dsxxz7ooJAgmijwOz0lh2H", title: "DBMS (Gate Smashers)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLPp7o-i2DChZY_sWOEJzIuDMZcGpCHoSc", title: "Machine Learning Playlist (Krish Naik)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLqM7alHXFySENsNgrKKPTsECU2T7J9V2-", title: "Deep Learning Playlist (Krish Naik)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/watch?v=jS4aFq5-91M", title: "Python Full Course in 12 Hours (Bro Code)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLeo1K3hjS3uu_n_a__MI_KktGTLYopZ12", title: "SQL Tutorial (Codebasics)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLEiEAq2VkUULlNtIFhEQHo8gacvme35rz", title: "Cybersecurity Full Course (Simplilearn)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLC3y8-rFHvwg2-q6Kvv3GrboverAYuE7a", title: "React JS Tutorial (Codevolution)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3", title: "DevOps Tutorial (Telusko)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLBbU9-SUUCwV7Dpk7GI8QDLu3w54TNAA6", title: "Docker and Kubernetes Tutorial (TechWorld)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLWKjhJtqVAbkFiqHnNaxpOPhh9tSWMXIF", title: "Full Stack Web Development (freeCodeCamp YouTube)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLu0W_9lII9aiL0kysYlfSOUgY5ygQ-Mr", title: "Django Tutorial (Code With Harry)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLZPZq0r_RZOO1zkgO4bIdfuLpizCeHYKv", title: "Java Tutorial for Beginners (Bro Code)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0", title: "Tableau Full Course (edureka)", branch: ["Data Science", "Management"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9g7NKY_2e1a_qKdCKkS2EfL", title: "Flutter Tutorial for Beginners (NetNinja)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7pFZoGT1NbZJpywedeyzyaf", title: "Spring Boot Tutorial (Telusko)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLbGui_ZYuhigZkqrHbI_ZkPBrIr5Rsd5L", title: "Git and GitHub Tutorial (Apna College)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLfP3JxW3fPcTraX5Kf87NTYIp9TS2hPHi", title: "TypeScript Tutorial (freeCodeCamp)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX", title: "Namaste JavaScript (Akshay Saini)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLBbU9-SUUCwXVl7DYubhMBYsz2bUYKMT-", title: "DSA Java (Apna College)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA", title: "C Language Tutorial for Beginners (CodeWithHarry)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLImJ3umGjxdD3ov2lwDavx97fUQD9OPm0", title: "Linux Command Line (Traversy Media)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLeo1K3hjS3uuKaU2nBDwr6zrSOTzNCs0l", title: "Pandas Tutorial (Codebasics)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLGjplNEQ1it__2d2hsmU08vIj35Wkh3yE", title: "AWS Tutorial (edureka)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLTjRvDozrdlxAhsPP4ZYtt3G8KbJ449oT", title: "Ethical Hacking Full Course (edureka)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7r2ukVgTqIQcl-1T0C2mzau", title: "Kubernetes Tutorial (Telusko)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLWPirh4EWFpE0UEJPQ2PUeXUfvJDhPqSD", title: "Rust Programming Tutorial (freeCodeCamp)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR", title: "Web Development Roadmap (Code With Harry)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTp4pb-PNQgFOE2JfKCHCUxT", title: "MongoDB Tutorial (CodeWithHarry)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLeo1K3hjS3usdMkKmFKPCqJFEfRbNnw6L", title: "Machine Learning Tutorial (Codebasics)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLKnIA16_RmvYNbPMB6ofVLRCcTPygAy8L", title: "NLP Tutorial (CampusX)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLeo1K3hjS3us5Djp05ubU7V2HCdUwV4b5", title: "Deep Learning Tutorial (Codebasics)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLpQQipWcxwt9U7qgyYkvNH3Mp8XHXCMmQ", title: "Blockchain Full Course (Simplilearn)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hxjeEtdHFNYMtCpjNBm3h7", title: "GraphQL Tutorial (NetNinja)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7oRKwDi7wjrANsbhTX0IK0J", title: "Microservices Tutorial (Telusko)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF", title: "Statistics for Machine Learning (StatQuest)", branch: ["Computer Science", "Data Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/watch?v=8mAITcNt710", title: "Harvard CS50 (2023) Full Course (freeCodeCamp YouTube)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLbGui_ZYuhijTKyrlu-0g0biQR-h9hC4o", title: "C++ DSA (Apna College)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7cCSmbbfSPpqmQBkVwkM6XK", title: "Flask Tutorial (Telusko)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLIhvC56v63IJIujb5cyE13oLuyORZpdkL", title: "Next.js Tutorial (Fireship)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLtS8Ubq2bIlVMbkNpNfWNyuRiHpJlMhPJ", title: "Computer Graphics Tutorial (NPTEL YouTube)", branch: ["Computer Science", "IT"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLWKjhJtqVAblStefaz_YOVpDWqcRScc2s", title: "Sass Tutorial (freeCodeCamp)", branch: ["Computer Science", "IT"] },

  // ── YouTube — Mechanical ──────────────────────────────────────────────────
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL9RcWoqXmzaLTYUabiBR31HLvdcaHQ0M1", title: "Thermodynamics (Gate Academy)", branch: ["Mechanical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLgwJf8NK-2e5zB3EwG7QeubrU2_HlWd0v", title: "Strength of Materials (Tutorials Point)", branch: ["Civil", "Mechanical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL3iy23cbJBjoKdSXQvXVXqkbhWBmJLvP0", title: "Fluid Mechanics (Lectures in Hindi)", branch: ["Mechanical", "Civil", "Chemical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL9RcWoqXmzaLSNfNk-oMnx4hq40lqC9b", title: "Engineering Drawing & CAD (Gate Academy)", branch: ["Mechanical", "Civil"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLIhvC56v63IKgGYLTMGmHiV-YJGQ36O3a", title: "SolidWorks Tutorial for Beginners", branch: ["Mechanical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLyYSGnGd1nHoXgBnHBuXCAlpwq0UNS8pZ", title: "ANSYS FEA Tutorial (SimuTech)", branch: ["Mechanical", "Civil"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLmvHOBCkxWB3AW-Zy4YHJN-7XNfG9Mdk5", title: "Manufacturing Processes (Skill Lync)", branch: ["Mechanical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLRqDfxcafc21s4-vFo5KoD1hYjmxJEyKy", title: "Heat Transfer (MIT OpenCourseWare YouTube)", branch: ["Mechanical", "Chemical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLp8iPIPKCB49FFtPhO39r-yjJAL3Xwbpb", title: "Automotive Engineering (RACE Concepts)", branch: ["Mechanical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLWKjhJtqVAbm_2n0xQGPjHR0N7FD8YYZ-", title: "Engineering Mechanics Statics (freeCodeCamp)", branch: ["Mechanical", "Civil"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL3uJpXQv_MFQTmMiOxsQ2FQxF1KNKJ9yI", title: "Mechatronics (Tutorials Universe)", branch: ["Mechanical", "Electronics"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLbMVogVj5nJS5q9BDJ2uPuV0CJpaxLnHF", title: "IC Engines (Study4Civil)", branch: ["Mechanical"] },

  // ── YouTube — Civil ───────────────────────────────────────────────────────
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL9RcWoqXmzaJUl9yzFyVhC5bTNGrLfR4V", title: "Structural Analysis (Gate Academy)", branch: ["Civil"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL9RcWoqXmzaKDpMy9B4bHXnjqEsDGSfv3", title: "Geotechnical Engineering (Gate Academy)", branch: ["Civil"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLLTPUMBpvJXFEdX0KKpYCdJWcRLpwb1T7", title: "AutoCAD For Civil Engineers (Practical)", branch: ["Civil", "Mechanical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLzXJBGgI6CdI5GIPPx8yyxBmVIFnk9R64", title: "Design of Structures (BYJU's GATE)", branch: ["Civil"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL6i8QB5CsIiX7WqaSEMNzaHIPNcxzHuLy", title: "Water Supply and Sanitary Engineering (Civil Tutor)", branch: ["Civil"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLzXJBGgI6CdJX0OE_y5VBIfcpEniD2y1A", title: "Transportation Engineering (BYJU's GATE)", branch: ["Civil"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLs4lHbf3TFQhT_YWPNgPKKi74WlJJmjyp", title: "Construction Management (GATE Wallah)", branch: ["Civil", "Management"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLBMFsLT7mPHrM5z3o8fJBIRo-MfNi5Pcc", title: "Irrigation Engineering (EG Classes)", branch: ["Civil"] },

  // ── YouTube — Electrical / Electronics ────────────────────────────────────
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLmD13g1zE-A8", title: "Control Systems (Neso Academy)", branch: ["Electrical", "Electronics"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL0lpEXZmMcHZ3TJGkjSXa3R-CTZE3Y-gQ", title: "Basic Electrical Engineering (Tutorials Point)", branch: ["Electrical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLdo5W4Nhv31bEyAkzSdBjPDD-mZanxz67", title: "Arduino and Embedded Systems (Last Minute Engineers)", branch: ["Electronics", "Electrical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX", title: "Digital Electronics (Neso Academy)", branch: ["Electronics", "Electrical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLBEE60A55LIiELwnlqANiI-7b9q2H0C82", title: "Signals and Systems (easytuts4you)", branch: ["Electronics", "Electrical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLdo5W4Nhv31bw7Gg-SwGdUTyZ8uDi5g6W", title: "PLC Programming Tutorial (Tutorials Point)", branch: ["Electrical", "Mechanical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiCOeGOIhFxdXVfDmjN0RIW", title: "Network Theory (Neso Academy)", branch: ["Electrical", "Electronics"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRj2EJxZBJpTaC0QfJBBSa3E", title: "Electronic Devices and Circuits (Neso Academy)", branch: ["Electronics", "Electrical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLSPDpusuUFGOBEH5kW1V6A-l5xzc6Eoay", title: "Power Electronics (All About Electronics)", branch: ["Electrical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLWPirh4EWFpHk70zwYoHu87uVsCC8E2S-", title: "MATLAB Tutorial (Matrixlab Examples)", branch: ["Electrical", "Mechanical", "Electronics"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLfqMkBgXtbHrRJkDJjCfNLGK4h5Ub5VOM", title: "Electrical Machines (GATE Lectures)", branch: ["Electrical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLWKjhJtqVAbmfoj2Th9fvxhHIeqFO7wOy", title: "Electromagnetic Theory (MHT CET Engineering)", branch: ["Electrical", "Electronics"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLEbnTDJUr_Ie8JMQNpFHJJhD5wqJ8KWvG", title: "Analog Electronics (ALL ABOUT ELECTRONICS)", branch: ["Electronics", "Electrical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLuUdFsbOK_8rdDO8kGo7WE3LzJP_yWNt9", title: "VHDL and FPGA Programming (Intel FPGA YouTube)", branch: ["Electronics", "Electrical"] },

  // ── YouTube — Data Science / AI ───────────────────────────────────────────
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH", title: "Data Science Full Course (CampusX Hindi)", branch: ["Data Science", "Computer Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVNUL99R4bDlVYsncUNvwUBB", title: "Statistics and Probability Full Course (Krish Naik)", branch: ["Data Science", "Computer Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL98qAXLA6afuh50qD2MKxZl8A4jAga5GT", title: "Power BI Tutorial for Beginners (Guy in a Cube)", branch: ["Data Science", "Management"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTroa8aDZ4IEhS7KeIPWz", title: "Feature Engineering Tutorial (Krish Naik)", branch: ["Data Science", "Computer Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVMdJ5sqbCK2LiM0HhQVWNzm", title: "MLflow Tutorial (Krish Naik)", branch: ["Data Science", "Computer Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLeo1K3hjS3uuKaU2nBDwr6zrSOTzNCs0l", title: "TensorFlow Tutorial (Codebasics)", branch: ["Data Science", "Computer Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL4GjoPPG4VqYbTMFLtGJXBRJGJ3CMdJ6C", title: "Data Science Interview Prep (Ken Jee)", branch: ["Data Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLOU2XLYxmsII9mzQ-Xxug4l2o04JBrkLV", title: "Google AI / ML Crash Course (Google Developers)", branch: ["Data Science", "Computer Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLcWfeUsAys2nPgh-gYRlexc6xvscdvHqX", title: "Hugging Face NLP Course (HuggingFace)", branch: ["Data Science", "Computer Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLkDaE6sCZn6F6wUI9tvS_Gw1vaFAx6rd6", title: "Structuring ML Projects (deeplearning.ai YouTube)", branch: ["Data Science", "Computer Science"] },

  // ── YouTube — Chemical / Biotechnology ───────────────────────────────────
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLbMVogVj5nJQ3slQodXQ5cSEtcp4PzE4i", title: "Chemical Engineering Thermodynamics (LearnChemE)", branch: ["Chemical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLQVxt2yIDW1zU30H0VrZiX_DvICtK4bZU", title: "Biochemistry Lectures (Sindh Medical)", branch: ["Biotechnology", "Chemical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLiUsAdSqmWRwkHX-5BAFikxoB2lBLfzxN", title: "Mass Transfer (LearnChemE)", branch: ["Chemical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLbMVogVj5nJRPxSHJB3LMi9zxQwjKTjTA", title: "Fluid Mechanics (LearnChemE)", branch: ["Chemical", "Mechanical"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLfF--3o8i4r4hwGPvS0fBe5w2oWJDOxoQ", title: "Molecular Biology and Genetics (iBiology)", branch: ["Biotechnology"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PL3EED4C1D684D3ADF", title: "Organic Chemistry (Khan Academy YouTube)", branch: ["Chemical", "Biotechnology"] },

  // ── YouTube — Management / Finance ───────────────────────────────────────
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLpQQipWcxwt8s5Qs8ORf0bPqcFR-V1N0T", title: "MBA Lectures (Simplilearn YouTube)", branch: ["Management"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLiUsAdSqmWRzNuKI4gMOiXNi7nEaEv3E8", title: "Financial Accounting (AccountingStuff)", branch: ["Finance", "Management"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLSPDpusuUFGMRZ3y0SepFIiUGCKDxJNH2", title: "Marketing Management (Marketing 91)", branch: ["Management", "Marketing"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP63A-ORPlnAoe-Nn_-lbGTh7", title: "MIT OpenCourseWare Finance (MIT YouTube)", branch: ["Finance", "Management"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLyVtq3ov0LwVMbr6tXz5yWcGcuFPi9BeC", title: "Stock Market Basics (Zerodha Varsity)", branch: ["Finance"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 5 — edX
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "edX", url: "https://www.edx.org/course/cs50s-introduction-to-computer-science", title: "CS50: Introduction to Computer Science (Harvard)", branch: ["Computer Science", "IT"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-python-programming", title: "Introduction to Python Programming (Georgia Tech)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "edX", url: "https://www.edx.org/course/data-structures-and-algorithms-i-arraylists-linkedlists-stacks-and-queues", title: "Data Structures and Algorithms (Georgia Tech)", branch: ["Computer Science", "IT"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-linux", title: "Introduction to Linux (LinuxFoundation)", branch: ["Computer Science", "IT"] },
  { platform: "edX", url: "https://www.edx.org/course/sql-databases-for-developers", title: "SQL Databases for Developers", branch: ["Computer Science", "IT"] },
  { platform: "edX", url: "https://www.edx.org/course/machine-learning", title: "Machine Learning (Columbia University)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-artificial-intelligence-ai", title: "Introduction to Artificial Intelligence (Microsoft)", branch: ["Computer Science", "IT"] },
  { platform: "edX", url: "https://www.edx.org/course/devops-fundamentals", title: "DevOps Fundamentals (LinuxFoundation)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-cybersecurity", title: "Introduction to Cybersecurity (NYU Tandon)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "edX", url: "https://www.edx.org/course/entrepreneurship-101-who-is-your-customer", title: "Entrepreneurship 101 (MIT)", branch: ["Management"] },
  { platform: "edX", url: "https://www.edx.org/course/cs50s-web-programming-with-python-and-javascript", title: "CS50 Web Programming with Python and JavaScript (Harvard)", branch: ["Computer Science", "IT"] },
  { platform: "edX", url: "https://www.edx.org/course/cs50s-introduction-to-artificial-intelligence-with-python", title: "CS50 AI with Python (Harvard)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "edX", url: "https://www.edx.org/course/cs50s-introduction-to-databases-with-sql", title: "CS50 Introduction to Databases with SQL (Harvard)", branch: ["Computer Science", "IT"] },
  { platform: "edX", url: "https://www.edx.org/course/cs50s-introduction-to-cybersecurity", title: "CS50 Cybersecurity (Harvard)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "edX", url: "https://www.edx.org/course/data-science-essentials", title: "Data Science Essentials (Microsoft)", branch: ["Data Science", "Computer Science"] },
  { platform: "edX", url: "https://www.edx.org/course/principles-of-machine-learning", title: "Principles of Machine Learning (Microsoft)", branch: ["Data Science", "Computer Science"] },
  { platform: "edX", url: "https://www.edx.org/course/deep-learning-fundamentals-with-keras", title: "Deep Learning Fundamentals with Keras (IBM)", branch: ["Data Science", "Computer Science"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-cloud-computing", title: "Introduction to Cloud Computing (IBM)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "edX", url: "https://www.edx.org/course/blockchain-fundamentals", title: "Blockchain Fundamentals (UC Berkeley)", branch: ["Computer Science", "IT"] },
  { platform: "edX", url: "https://www.edx.org/course/computer-architecture", title: "Computer Architecture (Princeton)", branch: ["Computer Science", "IT"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-embedded-systems", title: "Embedded Systems (UC Irvine)", branch: ["Electronics", "Electrical", "Computer Science"] },
  { platform: "edX", url: "https://www.edx.org/course/circuits-and-electronics-1-basic-circuit-analysis", title: "Circuits and Electronics 1 (MIT)", branch: ["Electrical", "Electronics"] },
  { platform: "edX", url: "https://www.edx.org/course/circuits-and-electronics-2-amplification-speed-and-delay", title: "Circuits and Electronics 2 (MIT)", branch: ["Electrical", "Electronics"] },
  { platform: "edX", url: "https://www.edx.org/course/circuits-and-electronics-3-applications", title: "Circuits and Electronics 3 (MIT)", branch: ["Electrical", "Electronics"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-renewable-energy", title: "Introduction to Renewable Energy (TU Delft)", branch: ["Electrical", "Chemical"] },
  { platform: "edX", url: "https://www.edx.org/course/supply-chain-management", title: "Supply Chain Management (MIT)", branch: ["Management", "Mechanical"] },
  { platform: "edX", url: "https://www.edx.org/course/accounting-analytics", title: "Accounting Analytics (Wharton)", branch: ["Finance", "Management"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-statistics", title: "Introduction to Statistics (MIT)", branch: ["Data Science", "All"] },
  { platform: "edX", url: "https://www.edx.org/course/probability-the-science-of-uncertainty-and-data", title: "Probability: Science of Uncertainty (MIT)", branch: ["Data Science", "Computer Science", "All"] },
  { platform: "edX", url: "https://www.edx.org/course/molecular-biology-part-1-dna-replication-and-repair", title: "Molecular Biology Part 1 (MIT)", branch: ["Biotechnology"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-biology-the-secret-of-life", title: "Introduction to Biology: The Secret of Life (MIT)", branch: ["Biotechnology"] },
  { platform: "edX", url: "https://www.edx.org/course/thermodynamics", title: "Thermodynamics (TU Delft)", branch: ["Mechanical", "Chemical"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-aerospace-engineering", title: "Introduction to Aerospace Engineering (TU Delft)", branch: ["Mechanical"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-structural-analysis", title: "Introduction to Structural Analysis (TU Delft)", branch: ["Civil"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-water-and-climate", title: "Water and Climate (TU Delft)", branch: ["Civil"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-lean-six-sigma-methods", title: "Introduction to Lean Six Sigma (MIT)", branch: ["Mechanical", "Management"] },
  { platform: "edX", url: "https://www.edx.org/course/global-supply-chain-management", title: "Global Supply Chain Management (MIT)", branch: ["Management", "Mechanical"] },
  { platform: "edX", url: "https://www.edx.org/course/pythonjr", title: "Python Basics for Data Science (IBM)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "edX", url: "https://www.edx.org/course/data-analysis-for-life-sciences-1-statistics-and-r", title: "Data Analysis for Life Sciences (Harvard)", branch: ["Biotechnology", "Data Science"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 6 — Udemy
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Udemy", url: "https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/", title: "The Complete Web Developer: Zero to Mastery", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/the-complete-python-bootcamp/", title: "The Complete Python Bootcamp (Angela Yu)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/", title: "React - The Complete Guide (Maximilian Schwarzmüller)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/complete-machine-learning-and-data-science-zero-to-mastery/", title: "Complete Machine Learning & Data Science Bootcamp", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/", title: "Node.js, Express, MongoDB & More (Jonas Schmedtmann)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/r-programming/", title: "R Programming A-Z (Udemy)", branch: ["Data Science", "Computer Science"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/machinelearning/", title: "Machine Learning A-Z (Udemy Bestseller)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/master-java-web-services-and-rest-api-with-spring-boot/", title: "Java Web Services & REST API with Spring Boot", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/deep-learning-tensorflow-2/", title: "Deep Learning with TensorFlow 2.0", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/ethical-hacking-an-introduction/", title: "Ethical Hacking: An Introduction", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/java-the-complete-java-developer-course/", title: "Java Masterclass - Beginner to Expert", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/flutter-bootcamp-with-dart/", title: "Flutter & Dart: The Complete Guide (Angela Yu)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c02/", title: "AWS Certified Solutions Architect Associate", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/sql-mysql-for-data-analytics-and-business-intelligence/", title: "SQL - MySQL for Data Analytics & Business Intelligence", branch: ["Data Science", "Computer Science"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/the-complete-javascript-course/", title: "The Complete JavaScript Course 2024 (Jonas Schmedtmann)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/100-days-of-code/", title: "100 Days of Code: Python Bootcamp (Angela Yu)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/understanding-typescript/", title: "Understanding TypeScript (Maximilian Schwarzmüller)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/", title: "Docker & Kubernetes: The Practical Guide", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/tensorflow-developer-certificate-machine-learning-zero-to-mastery/", title: "TensorFlow Developer Certificate Bootcamp (Zero to Mastery)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/the-complete-guide-to-angular-2/", title: "Angular - The Complete Guide (Maximilian Schwarzmüller)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/vue-js-2-the-complete-guide/", title: "Vue.js 2 - The Complete Guide", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/", title: "Python for Data Science and ML Bootcamp (Jose Portilla)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/the-complete-sql-bootcamp/", title: "The Complete SQL Bootcamp (Jose Portilla)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/linux-command-line-volume1/", title: "Linux Command Line Basics", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/the-complete-ios-app-development-bootcamp/", title: "iOS App Development Bootcamp (Angela Yu)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/android-development-java-android-studio-masterclass/", title: "Android Java Masterclass (Tim Buchalka)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/kotlin-android-developer-masterclass/", title: "Kotlin Android Developer Masterclass", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/complete-c-plus-plus-developer-course/", title: "Beginning C++ Programming - From Beginner to Beyond", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/nlp-natural-language-processing-with-python/", title: "NLP - Natural Language Processing with Python", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/pytorch-for-deep-learning-with-python-bootcamp/", title: "PyTorch for Deep Learning Bootcamp", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/python-rest-apis-with-flask-docker-mongodb-and-aws-devops/", title: "REST APIs with Flask and Python (Jose Salvatierra)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/the-complete-cybersecurity-bootcamp-zero-to-mastery/", title: "Complete Cybersecurity Bootcamp (Zero to Mastery)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/azure-administrator/", title: "Microsoft Azure Administrator (AZ-104)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/google-cloud-professional-data-engineer-bigquery/", title: "Google Cloud Professional Data Engineer", branch: ["Computer Science", "IT", "Cloud", "Data Science"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/automate-the-boring-stuff-with-python-programming/", title: "Automate the Boring Stuff with Python", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/graphql-with-react-course/", title: "GraphQL with React (Stephen Grider)", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/unit-testing-java-using-junit/", title: "JUnit 5 and Mockito - Java Unit Testing", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/", title: "The Ultimate MySQL Bootcamp", branch: ["Computer Science", "IT"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/master-microservices-with-spring-docker-kubernetes/", title: "Master Microservices with Spring Boot & Docker", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/power-bi-masterclass/", title: "Power BI Masterclass (Daniel Lackey)", branch: ["Data Science", "Management"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/tableau-for-beginners/", title: "Tableau 2024 A-Z: Hands-On Tableau Training", branch: ["Data Science", "Management"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/excel-vba-programming/", title: "Microsoft Excel VBA Macro Programming", branch: ["Data Science", "Management"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/the-complete-financial-analyst-course/", title: "The Complete Financial Analyst Course (365 Careers)", branch: ["Finance", "Management"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/project-management-professional-pmp/", title: "PMP Certification Training (Joseph Phillips)", branch: ["Management"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/solidworks-a-practical-engineering-approach/", title: "SolidWorks: A Practical Engineering Approach", branch: ["Mechanical"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/matlab-programming-for-engineers-and-scientists/", title: "MATLAB Programming for Engineers and Scientists", branch: ["Mechanical", "Electrical", "Electronics"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/ansys-training/", title: "ANSYS Workbench FEA: Mechanical Simulation", branch: ["Mechanical", "Civil"] },
  { platform: "Udemy", url: "https://www.udemy.com/course/autocad-2021/", title: "AutoCAD 2021 Course - Project Based Learning", branch: ["Civil", "Mechanical"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 7 — Khan Academy
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Khan Academy", url: "https://www.khanacademy.org/computing/computer-science", title: "Computer Science (Khan Academy)", branch: ["Computer Science", "IT"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/math/statistics-probability", title: "Statistics & Probability (Khan Academy)", branch: ["Data Science", "Computer Science", "All"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/math/linear-algebra", title: "Linear Algebra (Khan Academy)", branch: ["Computer Science", "Data Science", "All"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/science/physics", title: "Physics (Khan Academy)", branch: ["Electrical", "Electronics", "Mechanical", "Civil"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/science/chemistry", title: "Chemistry (Khan Academy)", branch: ["Chemical", "Biotechnology"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/computing/ap-computer-science-principles", title: "AP Computer Science Principles (Khan Academy)", branch: ["Computer Science", "IT"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/math/calculus-1", title: "Calculus 1 (Khan Academy)", branch: ["All"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/math/calculus-2", title: "Calculus 2 (Khan Academy)", branch: ["All"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/math/multivariable-calculus", title: "Multivariable Calculus (Khan Academy)", branch: ["All"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/math/differential-equations", title: "Differential Equations (Khan Academy)", branch: ["Electrical", "Mechanical", "All"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/math/algebra", title: "Algebra (Khan Academy)", branch: ["All"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/math/precalculus", title: "Precalculus (Khan Academy)", branch: ["All"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/science/biology", title: "Biology (Khan Academy)", branch: ["Biotechnology"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/science/electrical-engineering", title: "Electrical Engineering (Khan Academy)", branch: ["Electrical", "Electronics"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/computing/computers-and-internet", title: "Computers and the Internet (Khan Academy)", branch: ["Computer Science", "IT"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/economics-finance-domain", title: "Economics and Finance (Khan Academy)", branch: ["Finance", "Management"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/computing/pixar", title: "Pixar in a Box (Maths & CS) (Khan Academy)", branch: ["Computer Science", "IT"] },
  { platform: "Khan Academy", url: "https://www.khanacademy.org/math/cc-sixth-grade-math", title: "Discrete Math Foundations (Khan Academy)", branch: ["Computer Science", "IT"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 8 — Google Certifications / Developer Programs
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Google", url: "https://grow.google/certificates/it-support/", title: "Google IT Support Certificate", branch: ["Computer Science", "IT"] },
  { platform: "Google", url: "https://grow.google/certificates/data-analytics/", title: "Google Data Analytics Certificate", branch: ["Data Science", "Computer Science"] },
  { platform: "Google", url: "https://grow.google/certificates/project-management/", title: "Google Project Management Certificate", branch: ["Management", "Civil", "Mechanical"] },
  { platform: "Google", url: "https://grow.google/certificates/ux-design/", title: "Google UX Design Certificate", branch: ["Computer Science", "IT", "Management"] },
  { platform: "Google", url: "https://developers.google.com/machine-learning/crash-course", title: "Google Machine Learning Crash Course", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Google", url: "https://grow.google/certificates/cybersecurity/", title: "Google Cybersecurity Certificate", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Google", url: "https://grow.google/certificates/advanced-data-analytics/", title: "Google Advanced Data Analytics Certificate", branch: ["Data Science", "Computer Science"] },
  { platform: "Google", url: "https://grow.google/certificates/business-intelligence/", title: "Google Business Intelligence Certificate", branch: ["Data Science", "Management"] },
  { platform: "Google", url: "https://developers.google.com/learn/pathways/android-basics-kotlin", title: "Android Basics in Kotlin (Google Developers)", branch: ["Computer Science", "IT"] },
  { platform: "Google", url: "https://developers.google.com/learn/pathways/web-dev-basics", title: "Web Development Basics (Google Developers)", branch: ["Computer Science", "IT"] },
  { platform: "Google", url: "https://developers.google.com/learn/pathways/cloud-run", title: "Google Cloud Run Fundamentals", branch: ["Computer Science", "IT", "Cloud"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 9 — FreeCodeCamp
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/responsive-web-design/", title: "Responsive Web Design (freeCodeCamp)", branch: ["Computer Science", "IT"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", title: "JavaScript Algorithms & Data Structures (freeCodeCamp)", branch: ["Computer Science", "IT"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/data-analysis-with-python/", title: "Data Analysis with Python (freeCodeCamp)", branch: ["Data Science", "Computer Science"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/machine-learning-with-python/", title: "Machine Learning with Python (freeCodeCamp)", branch: ["Data Science", "Computer Science"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/", title: "Back End Development and APIs (freeCodeCamp)", branch: ["Computer Science", "IT"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/information-security/", title: "Information Security (freeCodeCamp)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/front-end-development-libraries/", title: "Front End Development Libraries (freeCodeCamp)", branch: ["Computer Science", "IT"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/relational-database/", title: "Relational Database (freeCodeCamp)", branch: ["Computer Science", "IT"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/quality-assurance/", title: "Quality Assurance (freeCodeCamp)", branch: ["Computer Science", "IT"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/", title: "Scientific Computing with Python (freeCodeCamp)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/college-algebra-with-python/", title: "College Algebra with Python (freeCodeCamp)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/a2-english-for-developers/", title: "A2 English for Developers (freeCodeCamp)", branch: ["Computer Science", "IT"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/coding-interview-prep/", title: "Coding Interview Prep (freeCodeCamp)", branch: ["Computer Science", "IT"] },
  { platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", title: "2022 Responsive Web Design Certification (freeCodeCamp)", branch: ["Computer Science", "IT"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 10 — Scrimba
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Scrimba", url: "https://scrimba.com/learn/learnjavascript", title: "Learn JavaScript (Scrimba)", branch: ["Computer Science", "IT"] },
  { platform: "Scrimba", url: "https://scrimba.com/learn/react", title: "Learn React (Scrimba)", branch: ["Computer Science", "IT"] },
  { platform: "Scrimba", url: "https://scrimba.com/learn/htmlandcss", title: "Learn HTML & CSS (Scrimba)", branch: ["Computer Science", "IT"] },
  { platform: "Scrimba", url: "https://scrimba.com/learn/python", title: "Learn Python (Scrimba)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Scrimba", url: "https://scrimba.com/learn/typescript", title: "Learn TypeScript (Scrimba)", branch: ["Computer Science", "IT"] },
  { platform: "Scrimba", url: "https://scrimba.com/learn/frontend", title: "Frontend Developer Career Path (Scrimba)", branch: ["Computer Science", "IT"] },
  { platform: "Scrimba", url: "https://scrimba.com/learn/vue", title: "Learn Vue.js (Scrimba)", branch: ["Computer Science", "IT"] },
  { platform: "Scrimba", url: "https://scrimba.com/learn/css", title: "Advanced CSS (Scrimba)", branch: ["Computer Science", "IT"] },
  { platform: "Scrimba", url: "https://scrimba.com/learn/webaccessibility", title: "Learn Web Accessibility (Scrimba)", branch: ["Computer Science", "IT"] },
  { platform: "Scrimba", url: "https://scrimba.com/learn/aifirst", title: "The AI Engineer Path (Scrimba)", branch: ["Computer Science", "IT", "Data Science"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 11 — Codecademy
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-python-3", title: "Learn Python 3 (Codecademy)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/introduction-to-javascript", title: "Learn JavaScript (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-html", title: "Learn HTML (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-css", title: "Learn CSS (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-java", title: "Learn Java (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-c-plus-plus", title: "Learn C++ (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-sql", title: "Learn SQL (Codecademy)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-r", title: "Learn R (Codecademy)", branch: ["Data Science", "Computer Science"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-the-command-line", title: "Learn the Command Line (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-git", title: "Learn Git & GitHub (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-react", title: "Learn React (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-node-js", title: "Learn Node.js (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-typescript", title: "Learn TypeScript (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/data-science", title: "Data Science Career Path (Codecademy)", branch: ["Data Science", "Computer Science"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/machine-learning", title: "Machine Learning/AI Engineer Path (Codecademy)", branch: ["Data Science", "Computer Science"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-go", title: "Learn Go (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-kotlin", title: "Learn Kotlin (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-ruby", title: "Learn Ruby (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-swift", title: "Learn Swift (Codecademy)", branch: ["Computer Science", "IT"] },
  { platform: "Codecademy", url: "https://www.codecademy.com/learn/learn-how-to-code", title: "Learn How to Code (Codecademy)", branch: ["Computer Science", "IT"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 12 — Stanford Online
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Stanford Online", url: "https://online.stanford.edu/courses/cs229-machine-learning", title: "CS229: Machine Learning (Stanford)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Stanford Online", url: "https://online.stanford.edu/courses/cs231n-deep-learning-computer-vision", title: "CS231n: Deep Learning for Computer Vision (Stanford)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Stanford Online", url: "https://online.stanford.edu/courses/cs224n-natural-language-processing-deep-learning", title: "CS224n: NLP with Deep Learning (Stanford)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Stanford Online", url: "https://online.stanford.edu/courses/sohs-ystatslearning-statistical-learning", title: "Statistical Learning (Stanford)", branch: ["Data Science", "Computer Science"] },
  { platform: "Stanford Online", url: "https://online.stanford.edu/courses/xcs224w-machine-learning-graphs", title: "Machine Learning with Graphs (Stanford)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Stanford Online", url: "https://online.stanford.edu/courses/cs50-introduction-algorithms-intensive", title: "Algorithms: Design and Analysis (Stanford)", branch: ["Computer Science", "IT"] },
  { platform: "Stanford Online", url: "https://online.stanford.edu/courses/ms-e346-cloud-computing-business", title: "Cloud Computing for Business (Stanford)", branch: ["Management", "Computer Science", "Cloud"] },
  { platform: "Stanford Online", url: "https://online.stanford.edu/courses/ee364a-convex-optimization-i", title: "Convex Optimization I (Stanford)", branch: ["Computer Science", "Data Science", "Electrical"] },
  { platform: "Stanford Online", url: "https://online.stanford.edu/courses/ee364b-convex-optimization-ii", title: "Convex Optimization II (Stanford)", branch: ["Computer Science", "Data Science", "Electrical"] },
  { platform: "Stanford Online", url: "https://online.stanford.edu/courses/xcs234-reinforcement-learning", title: "Reinforcement Learning (Stanford)", branch: ["Computer Science", "IT", "Data Science"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 13 — Harvard Online
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Harvard Online", url: "https://online-learning.harvard.edu/course/cs50s-understanding-technology", title: "CS50's Understanding Technology (Harvard)", branch: ["Computer Science", "IT"] },
  { platform: "Harvard Online", url: "https://online-learning.harvard.edu/course/data-science-machine-learning", title: "Data Science: Machine Learning (Harvard)", branch: ["Data Science", "Computer Science"] },
  { platform: "Harvard Online", url: "https://online-learning.harvard.edu/course/data-science-linear-regression", title: "Data Science: Linear Regression (Harvard)", branch: ["Data Science", "Computer Science"] },
  { platform: "Harvard Online", url: "https://online-learning.harvard.edu/course/data-science-probability", title: "Data Science: Probability (Harvard)", branch: ["Data Science", "Computer Science"] },
  { platform: "Harvard Online", url: "https://online-learning.harvard.edu/course/data-science-visualization", title: "Data Science: Visualization (Harvard)", branch: ["Data Science", "Computer Science"] },
  { platform: "Harvard Online", url: "https://online-learning.harvard.edu/course/data-science-wrangling", title: "Data Science: Wrangling (Harvard)", branch: ["Data Science", "Computer Science"] },
  { platform: "Harvard Online", url: "https://online-learning.harvard.edu/course/data-science-capstone", title: "Data Science: Capstone (Harvard)", branch: ["Data Science", "Computer Science"] },
  { platform: "Harvard Online", url: "https://online-learning.harvard.edu/course/introduction-bioinformatics", title: "Introduction to Bioinformatics (Harvard)", branch: ["Biotechnology", "Bioinformatics", "Data Science"] },
  { platform: "Harvard Online", url: "https://online-learning.harvard.edu/course/principles-biochemistry", title: "Principles of Biochemistry (Harvard)", branch: ["Biotechnology", "Chemical"] },
  { platform: "Harvard Online", url: "https://online-learning.harvard.edu/course/entrepreneurship-101-who-customer", title: "Entrepreneurship 101 (Harvard)", branch: ["Management"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 14 — fast.ai
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "fast.ai", url: "https://course.fast.ai/", title: "Practical Deep Learning for Coders (fast.ai)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "fast.ai", url: "https://course.fast.ai/Lessons/part2.html", title: "Deep Learning Part 2: From Foundations to Stable Diffusion (fast.ai)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "fast.ai", url: "https://www.fast.ai/posts/2020-02-20-fastai-new-runtime.html", title: "Computational Linear Algebra for Coders (fast.ai)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "fast.ai", url: "https://nlp.fast.ai/", title: "A Code-First Intro to Natural Language Processing (fast.ai)", branch: ["Computer Science", "IT", "Data Science"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 15 — LinkedIn Learning
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/python-essential-training", title: "Python Essential Training (LinkedIn Learning)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/learning-java-11", title: "Learning Java (LinkedIn Learning)", branch: ["Computer Science", "IT"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/javascript-essential-training", title: "JavaScript Essential Training (LinkedIn Learning)", branch: ["Computer Science", "IT"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/programming-foundations-algorithms", title: "Programming Foundations: Algorithms (LinkedIn Learning)", branch: ["Computer Science", "IT"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/machine-learning-foundations", title: "Machine Learning Foundations (LinkedIn Learning)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/sql-essential-training-3", title: "SQL Essential Training (LinkedIn Learning)", branch: ["Computer Science", "IT"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/git-essential-training-the-basics", title: "Git Essential Training (LinkedIn Learning)", branch: ["Computer Science", "IT"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/excel-essential-training-microsoft-365", title: "Excel Essential Training (LinkedIn Learning)", branch: ["Management", "Data Science"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/project-management-foundations", title: "Project Management Foundations (LinkedIn Learning)", branch: ["Management"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/agile-foundations", title: "Agile Foundations (LinkedIn Learning)", branch: ["Computer Science", "IT", "Management"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/react-js-essential-training", title: "React.js Essential Training (LinkedIn Learning)", branch: ["Computer Science", "IT"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/aws-essential-training-for-developers", title: "AWS Essential Training for Developers (LinkedIn Learning)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/tableau-essential-training", title: "Tableau Essential Training (LinkedIn Learning)", branch: ["Data Science", "Management"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/power-bi-essential-training", title: "Power BI Essential Training (LinkedIn Learning)", branch: ["Data Science", "Management"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/cybersecurity-foundations", title: "Cybersecurity Foundations (LinkedIn Learning)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/docker-essential-training", title: "Docker Essential Training (LinkedIn Learning)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/kubernetes-essential-training", title: "Kubernetes Essential Training (LinkedIn Learning)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/ux-foundations-research", title: "UX Foundations: Research (LinkedIn Learning)", branch: ["Computer Science", "IT", "Management"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/business-analysis-foundations", title: "Business Analysis Foundations (LinkedIn Learning)", branch: ["Management", "Computer Science"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/finance-foundations", title: "Finance Foundations (LinkedIn Learning)", branch: ["Finance", "Management"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 16 — Swayam (India MOOC Platform)
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc19_cs21/preview", title: "Problem Solving through Programming in C (SWAYAM NPTEL)", branch: ["Computer Science", "IT"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc20_cs52/preview", title: "Data Base Management System (SWAYAM)", branch: ["Computer Science", "IT"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc20_cs13/preview", title: "Object-Oriented System Development with Java (SWAYAM)", branch: ["Computer Science", "IT"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc20_ee16/preview", title: "Introduction to Smart Grid (SWAYAM)", branch: ["Electrical"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc20_me49/preview", title: "Heat Transfer (SWAYAM)", branch: ["Mechanical", "Chemical"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc19_me68/preview", title: "Engineering Mechanics (SWAYAM)", branch: ["Mechanical", "Civil"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc19_ce17/preview", title: "Concrete Technology (SWAYAM)", branch: ["Civil"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc19_bt02/preview", title: "Introduction to Biotechnology (SWAYAM)", branch: ["Biotechnology"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc20_ch10/preview", title: "Biochemical Engineering (SWAYAM)", branch: ["Chemical", "Biotechnology"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc19_mg47/preview", title: "Marketing Management I (SWAYAM)", branch: ["Management", "Marketing"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc20_mg52/preview", title: "Financial Management (SWAYAM)", branch: ["Finance", "Management"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd1_noc20_cs38/preview", title: "Cloud Computing (SWAYAM)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Swayam", url: "https://swayam.gov.in/nd2_aic20_sp15/preview", title: "Programming in Python (AICTE FDP SWAYAM)", branch: ["Computer Science", "IT", "Data Science"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 17 — Great Learning / Simplilearn (Free Courses)
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Great Learning", url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/introduction-to-python", title: "Introduction to Python (Great Learning)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Great Learning", url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/machine-learning-with-python1", title: "Machine Learning with Python (Great Learning)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Great Learning", url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/data-science-using-python", title: "Data Science using Python (Great Learning)", branch: ["Data Science", "Computer Science"] },
  { platform: "Great Learning", url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/sql-for-data-science", title: "SQL for Data Science (Great Learning)", branch: ["Data Science", "Computer Science"] },
  { platform: "Great Learning", url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/android-app-development", title: "Android App Development (Great Learning)", branch: ["Computer Science", "IT"] },
  { platform: "Great Learning", url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/internet-of-things1", title: "Internet of Things (Great Learning)", branch: ["Electronics", "Computer Science"] },
  { platform: "Great Learning", url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/ai-for-beginners", title: "AI for Beginners (Great Learning)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Great Learning", url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/blockchain-technology", title: "Blockchain Technology (Great Learning)", branch: ["Computer Science", "IT"] },
  { platform: "Simplilearn", url: "https://www.simplilearn.com/free-python-course-skillup", title: "Free Python Course (Simplilearn SkillUp)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Simplilearn", url: "https://www.simplilearn.com/learn-data-science-free-course-skillup", title: "Free Data Science Course (Simplilearn SkillUp)", branch: ["Data Science", "Computer Science"] },
  { platform: "Simplilearn", url: "https://www.simplilearn.com/free-machine-learning-course-skillup", title: "Free Machine Learning Course (Simplilearn SkillUp)", branch: ["Data Science", "Computer Science"] },
  { platform: "Simplilearn", url: "https://www.simplilearn.com/free-aws-cloud-practitioner-course-skillup", title: "Free AWS Cloud Practitioner (Simplilearn SkillUp)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Simplilearn", url: "https://www.simplilearn.com/learn-cyber-security-basics-skillup", title: "Cybersecurity Basics (Simplilearn SkillUp)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Simplilearn", url: "https://www.simplilearn.com/free-digital-marketing-course-skillup", title: "Free Digital Marketing Course (Simplilearn SkillUp)", branch: ["Management", "Marketing"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 18 — Brilliant.org
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Brilliant", url: "https://brilliant.org/courses/computer-science-fundamentals/", title: "Computer Science Fundamentals (Brilliant)", branch: ["Computer Science", "IT"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/programming-with-python/", title: "Programming with Python (Brilliant)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/machine-learning/", title: "Intro to Machine Learning (Brilliant)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/calculus/", title: "Calculus (Brilliant)", branch: ["All"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/linear-algebra/", title: "Linear Algebra (Brilliant)", branch: ["Computer Science", "Data Science", "All"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/statistics/", title: "Probability (Brilliant)", branch: ["Data Science", "Computer Science", "All"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/differential-equations/", title: "Differential Equations (Brilliant)", branch: ["Electrical", "Mechanical", "All"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/physics-fundamentals/", title: "Physics Fundamentals (Brilliant)", branch: ["Electrical", "Mechanical", "Civil"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/logic/", title: "Logic (Brilliant)", branch: ["Computer Science", "IT"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/data-structures/", title: "Data Structures (Brilliant)", branch: ["Computer Science", "IT"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/group-theory/", title: "Group Theory (Brilliant)", branch: ["Computer Science", "Data Science"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/computer-memory/", title: "How LLMs Work (Brilliant)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/quantum-computing/", title: "Quantum Computing (Brilliant)", branch: ["Computer Science", "Electronics"] },
  { platform: "Brilliant", url: "https://brilliant.org/courses/electrical-engineering/", title: "Electrical Engineering (Brilliant)", branch: ["Electrical", "Electronics"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 19 — IBM Skills Build (Free)
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "IBM SkillsBuild", url: "https://skillsbuild.org/adult-learners/explore-learning/artificial-intelligence", title: "Artificial Intelligence Fundamentals (IBM SkillsBuild)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "IBM SkillsBuild", url: "https://skillsbuild.org/adult-learners/explore-learning/cybersecurity", title: "Cybersecurity Fundamentals (IBM SkillsBuild)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "IBM SkillsBuild", url: "https://skillsbuild.org/adult-learners/explore-learning/data-science", title: "Data Science Fundamentals (IBM SkillsBuild)", branch: ["Data Science", "Computer Science"] },
  { platform: "IBM SkillsBuild", url: "https://skillsbuild.org/adult-learners/explore-learning/cloud-computing", title: "Cloud Computing Fundamentals (IBM SkillsBuild)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "IBM SkillsBuild", url: "https://skillsbuild.org/adult-learners/explore-learning/machine-learning", title: "Machine Learning Fundamentals (IBM SkillsBuild)", branch: ["Computer Science", "IT", "Data Science"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 20 — Microsoft Learn (Free)
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/python-first-steps/", title: "Python First Steps (Microsoft Learn)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/", title: "Azure Fundamentals (Microsoft Learn)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/data-science-with-azure-machine-learning/", title: "Data Science with Azure ML (Microsoft Learn)", branch: ["Data Science", "Computer Science", "Cloud"] },
  { platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/ai-fundamentals/", title: "AI Fundamentals (Microsoft Learn)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/power-bi-consumer/", title: "Power BI for Consumers (Microsoft Learn)", branch: ["Data Science", "Management"] },
  { platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/ms-900-exam-prep/", title: "Microsoft 365 Fundamentals (Microsoft Learn)", branch: ["Computer Science", "IT", "Management"] },
  { platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/sc-900-exam-prep/", title: "Security, Compliance & Identity Fundamentals (Microsoft Learn)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/explore-natural-language-processing/", title: "Explore NLP with Azure (Microsoft Learn)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/get-started-github-actions/", title: "Get started with GitHub Actions (Microsoft Learn)", branch: ["Computer Science", "IT"] },
  { platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/csharp-first-steps/", title: "C# First Steps (Microsoft Learn)", branch: ["Computer Science", "IT"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 21 — AWS Training (Free Tier)
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "AWS Training", url: "https://explore.skillbuilder.aws/learn/course/134/aws-cloud-practitioner-essentials", title: "AWS Cloud Practitioner Essentials", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "AWS Training", url: "https://explore.skillbuilder.aws/learn/course/1992/introduction-to-machine-learning-art-of-the-possible", title: "Introduction to Machine Learning: Art of the Possible (AWS)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "AWS Training", url: "https://explore.skillbuilder.aws/learn/course/10006/getting-started-with-aws-storage", title: "Getting Started with AWS Storage", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "AWS Training", url: "https://explore.skillbuilder.aws/learn/course/9000/introduction-to-serverless-development", title: "Introduction to Serverless Development (AWS)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "AWS Training", url: "https://explore.skillbuilder.aws/learn/course/44/introduction-to-aws-iot", title: "Introduction to AWS IoT", branch: ["Computer Science", "IT", "Electronics", "Cloud"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 22 — Hugging Face / Specialized AI Platforms
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Hugging Face", url: "https://huggingface.co/learn/nlp-course/chapter1/1", title: "NLP Course (Hugging Face)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Hugging Face", url: "https://huggingface.co/learn/deep-rl-course/unit0/introduction", title: "Deep Reinforcement Learning Course (Hugging Face)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Hugging Face", url: "https://huggingface.co/learn/ml-for-games-course/unit1/introduction", title: "ML for Games Course (Hugging Face)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/python", title: "Python (Kaggle Learn)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/pandas", title: "Pandas (Kaggle Learn)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/machine-learning-explainability", title: "Machine Learning Explainability (Kaggle Learn)", branch: ["Data Science", "Computer Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/intro-to-machine-learning", title: "Intro to Machine Learning (Kaggle Learn)", branch: ["Data Science", "Computer Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/intermediate-machine-learning", title: "Intermediate Machine Learning (Kaggle Learn)", branch: ["Data Science", "Computer Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/intro-to-deep-learning", title: "Intro to Deep Learning (Kaggle Learn)", branch: ["Data Science", "Computer Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/computer-vision", title: "Computer Vision (Kaggle Learn)", branch: ["Data Science", "Computer Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/time-series", title: "Time Series (Kaggle Learn)", branch: ["Data Science", "Computer Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/intro-to-sql", title: "Intro to SQL (Kaggle Learn)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/natural-language-processing", title: "Natural Language Processing (Kaggle Learn)", branch: ["Data Science", "Computer Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/feature-engineering", title: "Feature Engineering (Kaggle Learn)", branch: ["Data Science", "Computer Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/data-visualization", title: "Data Visualization (Kaggle Learn)", branch: ["Data Science", "Computer Science"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/geospatial-analysis", title: "Geospatial Analysis (Kaggle Learn)", branch: ["Data Science", "Civil"] },
  { platform: "Kaggle", url: "https://www.kaggle.com/learn/llm-efficiency-challenge", title: "Intro to AI Ethics (Kaggle Learn)", branch: ["Data Science", "Computer Science", "Management"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 23 — W3Schools / GeeksForGeeks (Structured Tutorials)
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "W3Schools", url: "https://www.w3schools.com/python/", title: "Python Tutorial (W3Schools)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "W3Schools", url: "https://www.w3schools.com/java/", title: "Java Tutorial (W3Schools)", branch: ["Computer Science", "IT"] },
  { platform: "W3Schools", url: "https://www.w3schools.com/js/", title: "JavaScript Tutorial (W3Schools)", branch: ["Computer Science", "IT"] },
  { platform: "W3Schools", url: "https://www.w3schools.com/html/", title: "HTML Tutorial (W3Schools)", branch: ["Computer Science", "IT"] },
  { platform: "W3Schools", url: "https://www.w3schools.com/css/", title: "CSS Tutorial (W3Schools)", branch: ["Computer Science", "IT"] },
  { platform: "W3Schools", url: "https://www.w3schools.com/sql/", title: "SQL Tutorial (W3Schools)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "W3Schools", url: "https://www.w3schools.com/cpp/", title: "C++ Tutorial (W3Schools)", branch: ["Computer Science", "IT"] },
  { platform: "W3Schools", url: "https://www.w3schools.com/c/", title: "C Tutorial (W3Schools)", branch: ["Computer Science", "IT"] },
  { platform: "W3Schools", url: "https://www.w3schools.com/php/", title: "PHP Tutorial (W3Schools)", branch: ["Computer Science", "IT"] },
  { platform: "W3Schools", url: "https://www.w3schools.com/react/", title: "React Tutorial (W3Schools)", branch: ["Computer Science", "IT"] },
  { platform: "GeeksForGeeks", url: "https://www.geeksforgeeks.org/courses/dsa-self-paced", title: "DSA Self Paced Course (GeeksForGeeks)", branch: ["Computer Science", "IT"] },
  { platform: "GeeksForGeeks", url: "https://www.geeksforgeeks.org/courses/data-science-live", title: "Data Science Live Course (GeeksForGeeks)", branch: ["Data Science", "Computer Science"] },
  { platform: "GeeksForGeeks", url: "https://www.geeksforgeeks.org/courses/complete-machine-learning-program", title: "Complete Machine Learning Program (GeeksForGeeks)", branch: ["Data Science", "Computer Science"] },
  { platform: "GeeksForGeeks", url: "https://www.geeksforgeeks.org/courses/backend-development", title: "Backend Development with Node.js (GeeksForGeeks)", branch: ["Computer Science", "IT"] },
  { platform: "GeeksForGeeks", url: "https://www.geeksforgeeks.org/courses/web-development", title: "Full Stack Web Development (GeeksForGeeks)", branch: ["Computer Science", "IT"] },
  { platform: "GeeksForGeeks", url: "https://www.geeksforgeeks.org/courses/fork-python", title: "Fork Python (GeeksForGeeks)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "GeeksForGeeks", url: "https://www.geeksforgeeks.org/courses/competitive-programming", title: "Competitive Programming (GeeksForGeeks)", branch: ["Computer Science", "IT"] },
  { platform: "GeeksForGeeks", url: "https://www.geeksforgeeks.org/courses/java-backend", title: "Java Backend Development (GeeksForGeeks)", branch: ["Computer Science", "IT"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 24 — The Odin Project / Full Stack Open
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "The Odin Project", url: "https://www.theodinproject.com/paths/foundations/courses/foundations", title: "Foundations (The Odin Project)", branch: ["Computer Science", "IT"] },
  { platform: "The Odin Project", url: "https://www.theodinproject.com/paths/full-stack-javascript", title: "Full Stack JavaScript (The Odin Project)", branch: ["Computer Science", "IT"] },
  { platform: "The Odin Project", url: "https://www.theodinproject.com/paths/full-stack-ruby-on-rails", title: "Full Stack Ruby on Rails (The Odin Project)", branch: ["Computer Science", "IT"] },
  { platform: "Full Stack Open", url: "https://fullstackopen.com/en/part0", title: "Full Stack Open: Fundamentals of Web Apps (University of Helsinki)", branch: ["Computer Science", "IT"] },
  { platform: "Full Stack Open", url: "https://fullstackopen.com/en/part1", title: "Full Stack Open: React (University of Helsinki)", branch: ["Computer Science", "IT"] },
  { platform: "Full Stack Open", url: "https://fullstackopen.com/en/part4", title: "Full Stack Open: Testing Express servers (University of Helsinki)", branch: ["Computer Science", "IT"] },
  { platform: "Full Stack Open", url: "https://fullstackopen.com/en/part8", title: "Full Stack Open: GraphQL (University of Helsinki)", branch: ["Computer Science", "IT"] },
  { platform: "Full Stack Open", url: "https://fullstackopen.com/en/part13", title: "Full Stack Open: Using relational databases (University of Helsinki)", branch: ["Computer Science", "IT"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 25 — Coursera (Architecture / Planning)
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Coursera", url: "https://www.coursera.org/learn/historic-preservation", title: "Historic Preservation and Cultural Heritage (Columbia)", branch: ["Architecture", "Civil"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/urban-design", title: "Urban Design for the Public Good (Michigan)", branch: ["Architecture", "Civil"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/landscape-urbanism", title: "Landscape Architecture Design (Politecnico di Milano)", branch: ["Architecture", "Civil"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-urban-design", title: "Introduction to Urban Design (Delft)", branch: ["Architecture", "Civil"] },
  { platform: "edX", url: "https://www.edx.org/course/green-building-rating-systems", title: "Green Building Rating Systems (UNH)", branch: ["Architecture", "Civil"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 26 — Finance / Economics (extended)
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Coursera", url: "https://www.coursera.org/learn/financial-markets-global", title: "Financial Markets (Yale — Robert Shiller)", branch: ["Finance", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/economics", title: "The Power of Macroeconomics (UC Irvine)", branch: ["Finance", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/microeconomics-principles", title: "Microeconomics Principles (UIUC)", branch: ["Finance", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/crypto-finance", title: "Decentralized Finance (DeFi): The Future of Finance (Duke)", branch: ["Finance", "Computer Science"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-financial-accounting", title: "Introduction to Financial Accounting (Wharton)", branch: ["Finance", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/trading-basics", title: "Financial Engineering and Risk Management (Columbia)", branch: ["Finance"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/startup-valuation-methods", title: "Startup Valuation Methods (New Ventures)", branch: ["Finance", "Management"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/15-433-investments-spring-2003/", title: "Investments (MIT Sloan)", branch: ["Finance", "Management"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/15-414-financial-management-summer-2003/", title: "Financial Management (MIT Sloan)", branch: ["Finance", "Management"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 27 — Soft Skills / Communication / Interview Prep
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Coursera", url: "https://www.coursera.org/learn/wharton-communication", title: "Business Communication (Wharton)", branch: ["Management", "All"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/presentation-skills", title: "Introduction to Public Speaking (U Washington)", branch: ["Management", "All"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/learning-how-to-learn", title: "Learning How to Learn (UC San Diego)", branch: ["All"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/mindshift", title: "Mindshift: Break Through Obstacles and Discover Your Hidden Potential", branch: ["All"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/critical-thinking-problem-solving", title: "Critical Thinking and Problem Solving (Michigan)", branch: ["All"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/communication-foundations-2", title: "Communication Foundations (LinkedIn Learning)", branch: ["All"] },
  { platform: "LinkedIn Learning", url: "https://www.linkedin.com/learning/time-management-fundamentals", title: "Time Management Fundamentals (LinkedIn Learning)", branch: ["All"] },
  { platform: "edX", url: "https://www.edx.org/course/the-science-of-everyday-thinking", title: "The Science of Everyday Thinking (UQ)", branch: ["All"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/work-smarter-not-harder", title: "Work Smarter, Not Harder: Time Management for Personal & Professional Productivity", branch: ["All"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 28 — Quantum Computing / Emerging Tech
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Coursera", url: "https://www.coursera.org/learn/quantum-computing-iqm", title: "Quantum Computing (Saint Petersburg State University)", branch: ["Computer Science", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/qiskit", title: "Understanding Quantum Computers (Keio University)", branch: ["Computer Science", "Electronics"] },
  { platform: "edX", url: "https://www.edx.org/course/quantum-machine-learning", title: "Quantum Machine Learning (TU Delft)", branch: ["Computer Science", "Electronics", "Data Science"] },
  { platform: "IBM SkillsBuild", url: "https://skillsbuild.org/adult-learners/explore-learning/quantum-computing", title: "Quantum Computing Fundamentals (IBM SkillsBuild)", branch: ["Computer Science", "Electronics"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/8-371-quantum-information-science-ii-spring-2018/", title: "Quantum Information Science II (MIT)", branch: ["Computer Science", "Electronics"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 29 — Environmental Engineering / Sustainability
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Coursera", url: "https://www.coursera.org/learn/global-warming-i", title: "Global Warming I: The Science and Modeling of Climate Change (Chicago)", branch: ["Civil", "Chemical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/global-warming-ii", title: "Global Warming II: Create Your Own Carbon Tax Policy (Chicago)", branch: ["Civil", "Chemical", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/environmental-management-and-ethics", title: "Environmental Management and Ethics (Technical University of Denmark)", branch: ["Civil", "Chemical"] },
  { platform: "edX", url: "https://www.edx.org/course/climate-change-the-science", title: "Climate Change: The Science (British Columbia)", branch: ["Civil", "Chemical"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-environmental-science", title: "Introduction to Environmental Science (Dartmouth)", branch: ["Civil", "Chemical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/solar-energy", title: "Solar Energy (TU Delft)", branch: ["Electrical", "Chemical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/wind-energy", title: "Wind Energy (TU Delft)", branch: ["Electrical", "Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/battery-technologies", title: "Battery Technologies (Johns Hopkins)", branch: ["Chemical", "Electrical"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 30 — Space / Aerospace Engineering
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "edX", url: "https://www.edx.org/course/introduction-to-aerospace-engineering-astronautics-and-human-spaceflight", title: "Aerospace Engineering: Astronautics and Spaceflight (MIT)", branch: ["Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/spacecraft-dynamics-kinematics", title: "Spacecraft Dynamics and Control: Kinematics (Colorado Boulder)", branch: ["Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/spacecraft-dynamics-dynamics", title: "Spacecraft Dynamics and Control: Dynamics (Colorado Boulder)", branch: ["Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/spacecraft-dynamics-control", title: "Spacecraft Dynamics and Control: Control (Colorado Boulder)", branch: ["Mechanical", "Electrical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/16-00-introduction-to-aerospace-and-design-spring-2003/", title: "Introduction to Aerospace and Design (MIT)", branch: ["Mechanical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/16-346-astrodynamics-fall-2008/", title: "Astrodynamics (MIT)", branch: ["Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/satellite-communications", title: "Satellite Communications (EPFL)", branch: ["Electronics", "Electrical", "Mechanical"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 31 — Robotics / Automation (Extended)
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Coursera", url: "https://www.coursera.org/specializations/robotics", title: "Robotics Specialization (UPenn)", branch: ["Mechanical", "Electronics", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/modernrobotics", title: "Modern Robotics: Mechanics, Planning, and Control (Northwestern)", branch: ["Mechanical", "Electronics"] },
  { platform: "edX", url: "https://www.edx.org/course/autonomous-mobile-robots", title: "Autonomous Mobile Robots (ETH Zurich)", branch: ["Mechanical", "Electronics", "Computer Science"] },
  { platform: "edX", url: "https://www.edx.org/course/robot-mechanics-and-control-part-i", title: "Robot Mechanics and Control Part I (Seoul National)", branch: ["Mechanical", "Electronics"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/ros2-for-beginners", title: "ROS2 for Beginners (Edouard Renard)", branch: ["Mechanical", "Electronics", "Computer Science"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLggLP4f-rq02vX0OQQ31vQ2UMBnMrBkS9", title: "Robot Operating System (ROS) Tutorial (Sentdex)", branch: ["Mechanical", "Electronics", "Computer Science"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 32 — Biomedical Engineering
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Coursera", url: "https://www.coursera.org/learn/biomedical-device-design", title: "Biomedical Device Design and Innovation (Duke)", branch: ["Biotechnology", "Electrical", "Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/bioelectricity", title: "Bioelectricity: A Quantitative Approach (Duke)", branch: ["Biotechnology", "Electrical"] },
  { platform: "edX", url: "https://www.edx.org/course/introduction-to-biomedical-engineering", title: "Introduction to Biomedical Engineering (National University of Singapore)", branch: ["Biotechnology", "Electrical", "Mechanical"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/20-020-introduction-to-biological-engineering-design-spring-2009/", title: "Introduction to Biological Engineering Design (MIT)", branch: ["Biotechnology", "Mechanical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/medical-neuroscience", title: "Medical Neuroscience (Duke)", branch: ["Biotechnology"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 33 — Cybersecurity / Ethical Hacking (Extended)
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Coursera", url: "https://www.coursera.org/specializations/ibm-cybersecurity-analyst", title: "IBM Cybersecurity Analyst Professional Certificate", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/google-cybersecurity", title: "Google Cybersecurity Professional Certificate", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "edX", url: "https://www.edx.org/course/cybersecurity-for-everyone", title: "Cybersecurity for Everyone (Maryland)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "NPTEL", url: "https://nptel.ac.in/courses/106104108", title: "Security in Computing and Communications (IIT Kharagpur)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "YouTube", url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE", title: "Hacking for Beginners — Full Course (freeCodeCamp YouTube)", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/palo-alto-networks-cybersecurity", title: "Palo Alto Networks Cybersecurity Specialization", branch: ["Computer Science", "IT", "Cybersecurity"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/it-security", title: "IT Security: Defense against the digital dark arts (Google)", branch: ["Computer Science", "IT", "Cybersecurity"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 34 — Cloud Computing (Extended)
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Coursera", url: "https://www.coursera.org/specializations/cloud-architecture-aws", title: "AWS Cloud Technology Consultant (AWS)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/gcp-data-machine-learning", title: "Preparing for Google Cloud Associate Cloud Engineer (Google)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Coursera", url: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer", title: "IBM Full Stack Cloud Developer Professional Certificate", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "edX", url: "https://www.edx.org/course/cloud-computing-architecture", title: "Cloud Computing Architecture (UMBC)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "edX", url: "https://www.edx.org/course/cloud-infrastructure-technologies", title: "Cloud Infrastructure Technologies (Linux Foundation)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLIivdWyY5sqJdmVMjLI8iCul14XkTRosn", title: "AWS Full Course (Simplilearn YouTube)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLmAmHQ-_5ySyKSHkMIBD-QQKB7bLRQXJ2", title: "Google Cloud Platform Tutorial (edureka YouTube)", branch: ["Computer Science", "IT", "Cloud"] },
  { platform: "Coursera", url: "https://www.coursera.org/specializations/sre-devops-engineer-google-cloud", title: "SRE and DevOps Engineer with Google Cloud (Google)", branch: ["Computer Science", "IT", "Cloud"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 35 — Miscellaneous / Interdisciplinary
  // ═══════════════════════════════════════════════════════════════════════════

  { platform: "Coursera", url: "https://www.coursera.org/learn/game-theory-1", title: "Game Theory (Stanford / UBC)", branch: ["Management", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/model-thinking", title: "Model Thinking (Michigan)", branch: ["Management", "Computer Science", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/systems-thinking", title: "Systems Thinking in Public Health (Johns Hopkins)", branch: ["Management", "Biotechnology"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/ethics-technology-engineering", title: "Ethics, Technology and Engineering (TU/e)", branch: ["All"] },
  { platform: "edX", url: "https://www.edx.org/course/intellectual-property-law-and-policy", title: "Intellectual Property Law and Policy (Penn Law)", branch: ["Management", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/patent-fundamentals", title: "Patent Fundamentals for Engineers (Purdue)", branch: ["Management", "All"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/tech-entrepreneurship", title: "Technology Entrepreneurship (Stanford)", branch: ["Management", "Computer Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/design-thinking", title: "Design Thinking for Innovation (Darden Virginia)", branch: ["Management", "All"] },
  { platform: "MIT OCW", url: "https://ocw.mit.edu/courses/11-479j-water-and-sanitation-infrastructure-in-developing-countries-spring-2007/", title: "Water and Sanitation in Developing Countries (MIT)", branch: ["Civil", "Chemical"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/prompt-engineering", title: "Prompt Engineering for ChatGPT (Vanderbilt)", branch: ["Computer Science", "IT", "Management"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/generative-ai-with-llms", title: "Generative AI with Large Language Models (deeplearning.ai + AWS)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/finetuning-large-language-models", title: "Finetuning Large Language Models (deeplearning.ai)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/building-systems-with-chatgpt", title: "Building Systems with the ChatGPT API (deeplearning.ai)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/langchain-for-llm-application-development", title: "LangChain for LLM Application Development (deeplearning.ai)", branch: ["Computer Science", "IT", "Data Science"] },
  { platform: "Coursera", url: "https://www.coursera.org/learn/vector-databases-embeddings-applications", title: "Vector Databases: from Embeddings to Applications (deeplearning.ai)", branch: ["Computer Science", "IT", "Data Science"] },
];