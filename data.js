/*
  row, col      chip position on the wafer grid, 0 to 16 (centre is 8,8). Add ?grid to the URL to see coordinates.
  image         photo path, e.g. "images/cadence-layout.jpg". Empty shows a placeholder.
  logo          company logo path, e.g. "images/logos/tsmc.svg". Empty shows nothing. Visible on the chip at every zoom level.
  description   paragraph for Experience and Skills chips. Defaults to what + how + why.
  heading       popup title when it should differ from the short chip title.
  role          popup line under the title. Defaults to subtitle.
  icon          (Skills chips only, optional) force an icon, e.g. icon: "Materials". Defaults to matching the title.
  Bullets       in any text field, start a line with "- ". Use `backticks` for multi-line text, or \n inside "quotes".
*/

const SITE = {
  name: "Cameron Loi",
  brand: "Cam L",
  photo: "images/CPhoto.JPG",
  role: "Nanotechnology Engineer",
  headline: "Nanotechnology Engineering @ University of Waterloo",
  summary: "I’m interested in semiconductor processes and enjoy building things from hardware to software and UI. I also enjoy the business side of technology and turning technical ideas into useful products.",
  email: "camerondotel@gmail.com",
  linkedin: "https://linkedin.com/in/cameron-loi"
};

const WAFERS = {
  projects: {
    label: "Projects",
    dies: [
      {
        row: 7,
        col: 7,
        code: "Apr 2026 - Present",
        title: "Cadence",
        subtitle: "IoT Device",
        period: "Apr 2026 - Present",
        image: "images/Cadence.png",
        what: "Full-stack medication and habit tracker combining C++ embedded firmware on an ESP32 with a React web dashboard, synchronized in real time via Google Firebase Firestore.",
        how: `- Developed an animated GUI from scratch on a 1.69" TFT display with animated icons
- iPhone push notifications via Apple Shortcuts, WiFi data sync, offline flash memory persistence, and OTA firmware updates
- Deployed a web dashboard on Vercel with real-time device sync, habit history, streak heatmaps, and analytics charts
- Designing a custom PCB in KiCad and a 3D printed enclosure to house the prototype in a compact consumer product`,
        why: "",
        tags: ["ESP32", "React", "Firebase", "Hardware Design"]
      },
      {
        row: 7,
        col: 8,
        code: "Aug 2026 - Sep 2026",
        title: "Badminton Splicer",
        subtitle: "Computer Vision",
        period: "Aug 2026 - Sep 2026",
        image: "images/BadmintonEditor.png",
        what: "Computer-vision pipeline that detects individual badminton rallies from match footage and automatically splices them into separate clips. Includes an interactive interface to review and correct rallies with a synchronized scoreboard.",
        how: "",
        why: "",
        tags: []
      },
      {
        row: 7,
        col: 9,
        code: "Sep 2025",
        title: "Action-2-Action",
        subtitle: "1st Place Hackathon",
        period: "Sep 2025",
        image: "images/A2A.png",
        what: `Placed 1st at the TechTO x Penseum Hackathon and won a $1000 award.
Hands-free gesture, voice, and eye tracking control system for healthcare, productivity, and presentations.`,
        how: "",
        why: "",
        tags: ["AI / ML", "Control Systems"]
      },
      {
        row: 8,
        col: 7,
        code: "Sep 2025",
        title: "Carter AI",
        subtitle: "1st Place Hackathon",
        period: "Sep 2025",
        image: "images/CarterAI.png",
        what: `Placed 1st at the SaaStock & SEC Future Legends Hackathon and won a $1000 award.
Voice-activated study assistant that acts as your personal TA while you watch lecture videos. Makes lecture videos interactive using voice commands, with real-time Q&A, tailored quizzes, and summaries.`,
        how: "",
        why: "",
        tags: ["AI / ML", "Control Systems"]
      },
      {
        row: 8,
        col: 8,
        code: "Mar 2025",
        title: "SnapStyle",
        subtitle: "1st Place Case Comp",
        period: "Mar 2025",
        image: "images/SnapStyle.png",
        what: `Placed 1st out of 80+ teams at the UWMCC Consulting Case Competition.
Pitched SnapStyle, an e-commerce marketplace for Snapchat letting users virtually try on clothing via AR and buy directly in-app, with market and financial analysis. Pitched to a panel of judges from KPMG, Monitor Deloitte, EY, Bain & Company, and BCG.`,
        how: "",
        why: "",
        tags: ["Consulting", "SWOT Analysis", "Financial Projections", "Pitch"]
      },
      {
        row: 8,
        col: 9,
        code: "Mar 2025",
        title: "Sponge Spot",
        subtitle: "2nd Place Hackathon",
        period: "Mar 2025",
        image: "images/SpongeSpot.JPG",
        what: `Won a $1000 award at the SDG Impact Challenge Hackathon.
Web app mapping optimal sponge park locations for the City of Toronto to address urban flooding, backed by feasibility and cost-benefit analysis.`,
        how: "",
        why: "",
        tags: ["Data Aggregation", "Data Visualization"]
      },
      {
        row: 9,
        col: 8,
        code: "Nov 2024",
        title: "TENG",
        subtitle: "2nd Place Competition",
        period: "Nov 2024",
        image: "images/TENG.png",
        what: `Placed 2nd out of 23 teams at the UW Design Clinic.
Designed and constructed a Triboelectric Nanogenerator (TENG) that generated electrical output from mechanical motion using contact electrification. The final prototype produced 3.4 V at 45 Hz.`,
        how: "",
        why: "",
        tags: []
      }
    ]
  },
  experience: {
    label: "Experience",
    dies: [
      {
        row: 7,
        col: 8,
        code: "Sep 2026 - Present",
        title: "C2MI",
        subtitle: "Internship",
        role: "MEMS Process Engineering Intern",
        period: "Sep 2026 - Present",
        image: "images/C2MILab.png",
        logo: "images/logos/C2MI.png",
        what: "",
        how: "",
        why: "",
        description: `- Developing and qualifying a heat release tape process for temporary wafer bonding, running trials through lamination, SEM inspection, wafer grinding, and debonding
- Optimizing a vapour deposition recipe for a PFAS-free anti-stiction coating, running trials in a Class 10 cleanroom
- Researching and developing a vapour phase metal-assisted chemical etch process, documenting results and findings`,
        tags: []
      },
      {
        row: 8,
        col: 7,
        code: "Jan 2026 - Apr 2026",
        title: "Voestalpine",
        heading: "Voestalpine Additive Manufacturing Center",
        subtitle: "Co-op",
        role: "Research Assistant & Materials Characterization Co-op",
        period: "Jan 2026 - Apr 2026",
        image: "images/vAMCPrints.png",
        logo: "images/logos/voestalpine.jpg",
        what: "",
        how: "",
        why: "",
        description: `- Materials characterization of Laser Powder Bed Fusion (LPBF) printed metal parts including tensile testing, Rockwell hardness (HRC), optical microscopy, etching, and porosity analysis to classify defects and assess mechanical performance
- Produced 205 customer-facing reports and recalculated yield strength data across 110 tensile samples to ensure accuracy of mechanical properties
- Led 5 R&D projects validating new materials and machine upgrades via materials characterization, build quality mapping, and data analysis. Presented findings to senior leadership with one recommendation approved for adoption
- Developed and deployed 4 Excel automations used in production data processing workflows, reducing manual analysis errors and saving 8 hours/week
- Wrote a comprehensive LPBF crash course for future interns spanning machine operation, process parameters, materials/alloys, powder production, defect types, post processing, and an industry SWOT analysis`,
        tags: ["Materials Characterization", "Reports", "Excel Automations", "R&D"]
      },
      {
        row: 8,
        col: 8,
        code: "Jun 2025 - Jul 2025",
        title: "MD Pharma",
        heading: "MD Pharma Consulting Group",
        subtitle: "Co-op",
        role: "Data Analytics & Market Research Student Consultant",
        period: "Jun 2025 - Jul 2025",
        image: "images/logos/mdpharma.png",
        logo: "images/logos/mdpharma.png",
        what: "",
        how: "",
        why: "",
        description: "- Conducted competitor analysis of leading wellness platforms and designed a Gen Z survey, using Power BI to analyze results and develop dashboards to identify branding strategies, trends, and market insights",
        tags: []
      },
      {
        row: 8,
        col: 9,
        code: "Sep 2024 - Dec 2025",
        title: "Formula Nano",
        heading: "Formula Nano Design Team",
        subtitle: "Design Team",
        role: "Researcher",
        period: "Sep 2024 - Dec 2025",
        image: "images/Nanocar.png",
        logo: "images/logos/formulanano.jpg",
        what: "",
        how: "",
        why: "",
        description: `- Researched vacuum and cryogenic systems for a home-built Scanning Tunneling Microscope (STM)
- Modelled molecules and applied computational methods to predict their NMR spectra data
- Fabricated parts using machine shop tools`,
        tags: []
      }
    ]
  },
  skills: {
    label: "Skills",
    dies: [
      {
        row: 7,
        col: 7,
        code: "",
        title: "Languages",
        subtitle: "",
        period: "",
        what: "",
        how: "",
        why: "",
        tags: ["Python", "MATLAB", "French (Proficient)"]
      },
      {
        row: 7,
        col: 8,
        code: "",
        title: "Software & Tools",
        subtitle: "",
        what: "",
        how: "",
        why: "",
        tags: ["CAD (SolidWorks)", "Microsoft Office (Excel, Word, PowerPoint)", "Power BI", "Firebase", "Vercel", "Git", "KiCad"]
      },
      {
        row: 7,
        col: 9,
        code: "",
        title: "Circuits",
        subtitle: "",
        period: "",
        what: "",
        how: "",
        why: "",
        tags: ["Oscilloscopes", "Function generators", "Multimeters"]
      },
      {
        row: 8,
        col: 7,
        code: "",
        title: "Semiconductor",
        subtitle: "",
        period: "",
        what: "",
        how: "",
        why: "",
        tags: ["Diodes", "MOSFETs", "FEDs"]
      },
      {
        row: 8,
        col: 8,
        code: "",
        title: "Microfabrication",
        subtitle: "",
        period: "",
        what: "",
        how: "",
        why: "",
        tags: ["Cleanroom", "Lithography", "DRIE", "Wet etching", "Wafer bonding"]
      },
      {
        row: 8,
        col: 9,
        code: "",
        title: "Characterization",
        subtitle: "",
        period: "",
        what: "",
        how: "",
        why: "",
        tags: ["UV-Vis", "FTIR", "SEM", "Raman", "XRD", "Ellipsometry"]
      },
      {
        row: 9,
        col: 7,
        code: "",
        title: "Materials",
        subtitle: "",
        period: "",
        what: "",
        how: "",
        why: "",
        tags: ["Tensile/impact testing", "TGA", "DSC", "3D printing"]
      },
      {
        row: 9,
        col: 8,
        code: "",
        title: "Machining",
        subtitle: "",
        period: "",
        what: "",
        how: "",
        why: "",
        tags: ["Milling machine", "Lathe"]
      }
    ]
  }
};