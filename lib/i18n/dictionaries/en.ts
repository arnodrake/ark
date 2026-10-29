import type { Dictionary } from "../types";

const en: Dictionary = {
  meta: {
    title: "Ark Automation Inc. — Built for the Future",
    description: "Industrial electrical, network, and automation integration across the U.S.",
  },
  nav: {
    about: "About",
    businesses: "Businesses",
    contact: "Contact",
    language: "Language",
    representativeProjects: "Representative Projects",
    ourMission: "Our Mission",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    back: "Back",
    selectLanguage: "Select language",
    backToTop: "Back to top",
    skipToContent: "Skip to content",
  },
  capabilityNames: {
    "electrical-systems": "Electrical Systems",
    "pneumatic-controls": "Pneumatic Controls",
    "network-infrastructure": "Network Infrastructure",
    "automation-integration": "Automation Integration",
  },
  home: {
    heroLines: ["DATA", "POWER", "AUTOMATION"],
    heroSubtitle:
      "Our integrated electrical, network, and automation systems power the world’s most advanced industrial facilities.",
    recentProjects: "Recent Projects",
    viewProject: "View project",
    recent: {
      "tesla-giga-texas": {
        tag: "Tesla",
        title: "Building the Core of Tomorrow’s Gigafactory",
        summary: "Powering large-scale automation and production infrastructure at Tesla Giga Texas.",
      },
      "lucid-motors": {
        tag: "Lucid",
        title: "Precision in Motion",
        summary: "High-performance electrical and control installations across Lucid’s advanced manufacturing environment.",
      },
      "mercedes-benz": {
        tag: "Mercedes",
        title: "Innovation in Every Connection",
        summary: "Modernizing critical power and automation systems in active vehicle production facilities.",
      },
    },
    futureTitle: "Built for the Future",
    futureParagraphs: [
      [
        "Ark Automation delivers integrated electrical, network, and automation solutions",
        "for advanced manufacturing and industrial facilities.",
      ],
      [
        "From semiconductor fabs and automotive lines to mission-critical infrastructure,",
        "we execute with precision, safety, and speed.",
      ],
      [
        "Through disciplined fieldwork and deep technical expertise, we build",
        "the systems that power tomorrow’s industry.",
      ],
    ],
    representativeProjects: "Representative Projects",
    projects: [
      {
        name: "Tesla",
        location: "Texas",
        description:
          "Comprehensive electrical and mechanical installation for Tesla’s new Robotaxi production line, covering structural framing, power and control wiring, cabinets, safety enclosures, and production tooling.",
      },
      {
        name: "TSMC · ASML · TEL",
        location: "Arizona",
        description:
          "High-precision electrical and network installation for semiconductor lithography and process equipment, including ASML photolithography systems and TEL CLEAN TRACK Coater/Developer units.",
      },
      {
        name: "Lucid Motors",
        location: "Arizona",
        description:
          "Electrical, network, and steel-structure installation for the all-new Gravity SUV production line, including power and control wiring, cable trays, fencing, transformers, power distribution panels, and control cabinets.",
      },
      {
        name: "Rivian",
        location: "Illinois",
        description:
          "Full removal of legacy production lines and installation of new automation systems — including robots, cable trays, transformers, control cabinets, power and control wiring, and safety fencing.",
      },
      {
        name: "Mercedes-Benz",
        location: "South Carolina",
        description:
          "Upgrades to existing production lines, integrating new robots, transformers, power distribution panels, and control wiring to modernize assembly operations.",
      },
      {
        name: "Amazon Distribution Centers",
        location: "Nationwide",
        description:
          "Installation of conveyor and automation systems, including power and control wiring, networking, and mobilization to sites nationwide.",
      },
    ],
    contactLines: ["CONNECT WITH US", "LET’S BRING YOUR PROJECT TO LIFE"],
    emailUs: "Email Us",
    getQuote: "Get a Quote",
  },
  footer: {
    tagline: "Ark Automation Inc. — Built for the Future",
    privacy: "Privacy",
    terms: "Terms",
    rights: "All rights reserved.",
  },
  cta: {
    planning: "Planning a project like this?",
    getInTouch: "Get in touch",
  },
  capabilities: {
    eyebrow: "Businesses",
    navLabel: "Capabilities",
    pages: {
      "electrical-systems": {
        intro:
          "We engineer, install, and commission plant-scale electrical systems that power production at automotive, logistics, and semiconductor facilities. Our teams pair high-capacity distribution with precise control wiring, so equipment comes online quickly, runs safely, and scales with future demand.",
        paragraphs: [
          "Scope typically includes medium- and low-voltage distribution, MCCs and panelboards, transformer placement and terminations, and clean, labeled control wiring to drives, robots, tooling, and safety circuits. We coordinate with structural and mechanical trades to stage power early and sequence work to construction milestones, so lines are energized on schedule.",
          "On recent programs, our crews delivered end-to-end work packages: setting and aligning transformers; installing bus, tray, and conduit; pulling power and control cable; landing to VFDs and PLC cabinets; performing torque, insulation resistance, and continuity tests; and supporting energization with documented checks for every feeder and circuit.",
          "Our experience on high-visibility projects—Tesla’s new Robotaxi production line, Mercedes‑Benz line modernizations, and large-scale distribution centers—has taught us how to keep sites moving: clear drawings, daily field coordination, safe lift plans, and disciplined QA that prevents rework.",
          "Whether you need a greenfield backbone or a brownfield changeover within a tight window, we hold every job to the same standard: power that is dependable, maintainable, and production-ready.",
        ],
      },
      "pneumatic-controls": {
        intro:
          "We build reliable pneumatic control systems for high-throughput manufacturing—robot end‑effectors, fixturing, clamp stations, and material handling, wherever clean, repeatable actuation matters. Our teams deliver both the hardware and the logic, so motion interacts safely with robots, tooling, and people.",
        paragraphs: [
          "Services include manifold and FRL installation, valve banks, vacuum generation, cylinder integration, and sensor wiring back to the PLC. We route stainless or aluminum tubing with clear identification and plan drains and pressure relief, so systems stay stable through continuous cycling and changing environmental conditions.",
          "On Mercedes‑Benz and Lucid programs, we executed live retrofits with limited downtime—prefabricating assemblies, landing I/O, and validating interlocks cell by cell. Every circuit is leak‑checked and cycle‑tested with the controls team before handoff.",
          "The result: actuation that is quiet, predictable, and serviceable—documented for maintenance and ready for continuous production.",
        ],
      },
      "network-infrastructure": {
        intro:
          "We deploy industrial Ethernet and fiber networks that connect PLCs, drives, vision systems, and MES with resilient performance on the plant floor. Our approach pairs clean installation with disciplined testing, so controls teams can count on bandwidth, latency, and segmentation from day one.",
        paragraphs: [
          "Deliverables include cabinet switches and patching, trunk and drop routing in tray and conduit, fiber pulls and terminations, OT patch panels, and labeling that mirrors the logical topology. We splice and certify fiber, document every test result, and turn over as‑built routes for maintenance.",
          "On semiconductor and EV programs, we coordinated networks across large footprints—interfacing with tool OEMs, segregating safety and motion traffic, and staging cutovers without interrupting commissioning. Where the environment demands it, we specify hardened components and protective routing.",
          "The outcome: a plant network that is predictable, observable, and ready to scale.",
        ],
      },
      "automation-integration": {
        intro:
          "We integrate robotics, PLCs, motion, and safety systems into production cells and lines—taking equipment from mechanical installation to a verified, documented state. Our teams align fixtures, land I/O, bring up programs, and run staged tests with the OEM and end user until every interlock and sequence is proven.",
        paragraphs: [
          "Typical scope covers robot placement and cable management, PLC and HMI panel wiring, device commissioning over EtherNet/IP or PROFINET, safety relays and scanners, and recipe and mode handling. We work alongside mechanical and process trades so upstream and downstream equipment handshake cleanly.",
          "On Tesla and Rivian programs, we executed changeovers within tight windows—pre‑wiring cabinets, validating offline where possible, and cutting over zone by zone to protect the schedule. On semiconductor projects, we interfaced ASML and TEL tools with plant systems, managing grounding, shielding, and EMI.",
          "Documentation is part of the work: I/O maps, network plans, safety validation results, and as‑built drawings are delivered at turnover, so operations teams can maintain and improve their systems with confidence.",
        ],
      },
    },
  },
  caseStudy: {
    back: "Return",
    label: "Case Study",
    readTime: "{n} min read",
    projects: {
      "tesla-giga-texas": {
        title: "Building the Core of Tomorrow’s Gigafactory",
        subtitle: "Electrical and automation infrastructure for Tesla’s Robotaxi production expansion in Texas.",
        location: "Austin, Texas",
        heroAlt: "Tesla Giga Texas — aerial view",
        sections: [
          {
            title: "A Factory Built for Scale",
            paragraphs: [
              "Tesla Giga Texas is one of the most ambitious manufacturing facilities in North America, bringing robotics, automation, and high-volume production together under one roof.",
              "Before Ark Automation Inc. was formed, our team took part in electrical and automation installation work for production expansion within the facility. Working in an active construction environment, we helped deliver the infrastructure needed for next-generation manufacturing systems.",
            ],
          },
          {
            title: "Cable Tray & Structural Installation",
            imageAlt: "Cable tray and structural support frameworks at Tesla Giga Texas",
            paragraphs: [
              "Reliable manufacturing begins with reliable infrastructure.",
              "Our work included installing cable tray systems and structural support frameworks throughout the production areas. These systems provided organized pathways for power, control, and communication cabling while keeping it accessible for future maintenance and expansion.",
              "Working alongside multiple trades, we coordinated installations around ongoing construction activities to keep the project moving across production zones.",
            ],
          },
          {
            title: "Electrical & Automation Infrastructure",
            imageAlt: "Electrical and automation infrastructure at Tesla Giga Texas",
            paragraphs: [
              "Our team performed electrical and automation installations for production equipment, power distribution systems, grounding networks, and control systems.",
              "More than 60,000 feet of cable were routed, secured, labeled, and verified over the course of the project. Every installation was completed to project requirements for consistency, reliability, and long-term maintainability.",
              "From cable routing and equipment connections to grounding and support systems, attention to detail was critical in every phase of execution.",
            ],
          },
          {
            title: "Coordinated Field Execution",
            paragraphs: [
              "Large-scale manufacturing projects depend on precise coordination among multiple disciplines.",
              "Our team worked alongside structural, mechanical, automation, and logistics trades to keep installation schedules on track across active work areas. Daily coordination kept electrical infrastructure, equipment support systems, and production installations progressing efficiently without disrupting parallel construction activities.",
              "This collaborative approach allowed work to advance safely without losing momentum.",
            ],
          },
          {
            title: "Safety & Quality",
            paragraphs: [
              "Safety and quality were fundamental at every stage of installation.",
              "All work was performed in accordance with site safety requirements and backed by documented inspections, equipment checks, and established work procedures. Consistent attention to workmanship helped deliver reliable installations that met the standards required in a high-profile manufacturing environment.",
            ],
          },
          {
            title: "Project Impact",
            paragraphs: [
              "The infrastructure installed during this project supports manufacturing operations at Tesla’s Giga Texas facility and contributes to the ongoing expansion of its advanced vehicle production capabilities.",
              "This experience reflects the industrial installation expertise, field coordination, and execution standards that later helped form the foundation of Ark Automation Inc.",
            ],
          },
        ],
      },
      "lucid-motors": {
        title: "Precision in Motion",
        subtitle: "High-performance electrical and control installations across Lucid’s advanced manufacturing environment.",
        location: "Casa Grande, Arizona",
        heroAlt: "Lucid Motors — Casa Grande, Arizona facility",
        sections: [
          {
            title: "Manufacturing Built Around Precision",
            paragraphs: [
              "Lucid Motors has established itself as one of the most innovative electric vehicle manufacturers, combining advanced engineering, automation, and production quality in a tightly controlled manufacturing environment.",
              "Before Ark Automation Inc. was formed, our team took part in electrical and automation installation work for manufacturing operations at Lucid’s Arizona facility.",
              "Working in active production areas, we helped deliver the infrastructure needed for reliable, high-precision vehicle manufacturing.",
            ],
          },
          {
            title: "Electrical & Control Installations",
            imageAlt: "Electrical and control installations at Lucid Motors",
            paragraphs: [
              "Modern manufacturing relies on seamless integration of power, controls, communication networks, and production equipment.",
              "Our work included electrical installations, control wiring, network infrastructure, equipment connections, and cable management systems for manufacturing operations throughout the facility.",
              "Power, control, and communication cabling was routed, terminated, labeled, and verified to project requirements for consistent installation quality and long-term maintainability.",
            ],
          },
          {
            title: "Supporting Advanced Automation",
            imageAlt: "Advanced automation systems at Lucid Motors",
            paragraphs: [
              "Across production areas, our team performed installation work on automated manufacturing equipment, conveyor systems, material handling operations, and industrial control systems.",
              "Careful cable routing, grounding, labeling, and equipment connectivity helped maintain reliability under the demanding requirements of a modern EV production environment.",
              "Every installation was completed with a focus on accuracy, consistency, and workmanship.",
            ],
          },
          {
            title: "Working Within an Active Production Facility",
            paragraphs: [
              "Working inside a live manufacturing environment demands careful planning and coordination.",
              "Our team worked alongside production personnel, contractors, and multiple trades to complete installation activities while minimizing disruption to ongoing operations.",
              "Daily communication and field coordination helped keep the project on schedule while enabling safe, efficient execution across active work areas.",
            ],
          },
          {
            title: "Safety & Quality",
            paragraphs: [
              "Safety and quality remained central in every phase of the project.",
              "All installation activities were performed in accordance with site requirements and backed by inspections, testing, verification procedures, and established work practices.",
              "Consistent attention to detail helped deliver reliable installations that met the standards expected in a high-performance manufacturing facility.",
            ],
          },
          {
            title: "Project Impact",
            paragraphs: [
              "The infrastructure installed by our team contributes to manufacturing operations at Lucid’s Arizona facility and supports the continued growth of advanced electric vehicle production.",
              "This project reflects the field installation expertise, industrial execution capabilities, and commitment to quality that later helped form the foundation of Ark Automation Inc.",
            ],
          },
        ],
      },
      "mercedes-benz": {
        title: "Innovation in Every Connection",
        subtitle: "Delivering electrical and automation upgrades during critical production line modernization projects.",
        location: "South Carolina",
        heroAlt: "Mercedes-Benz manufacturing facility — South Carolina",
        sections: [
          {
            title: "Modernizing Manufacturing at Speed",
            paragraphs: [
              "In modern automotive manufacturing, production upgrades often must be completed within extremely limited shutdown windows. Every hour matters, and every delay pushes back the production restart.",
              "Before Ark Automation Inc. was formed, our team took part in electrical and automation installation work for production line modernization at Mercedes-Benz manufacturing facilities.",
              "Working under compressed schedules and strict deadlines, our team helped execute critical infrastructure upgrades during planned production shutdowns.",
            ],
          },
          {
            title: "Electrical & Automation Upgrades",
            imageAlt: "Electrical and automation upgrades at Mercedes-Benz",
            paragraphs: [
              "Modernizing the production lines meant integrating new electrical infrastructure, equipment connections, automation installations, and supporting control systems into existing manufacturing operations.",
              "Our work included cable routing, power distribution modifications, equipment connections, control wiring, support installations, and related electrical upgrades throughout the project area.",
              "Installations were completed to project requirements while maintaining compatibility with existing production systems.",
            ],
          },
          {
            title: "Executing Within Tight Shutdown Windows",
            imageAlt: "Production line work during a planned shutdown window",
            paragraphs: [
              "One of the project’s defining challenges was time.",
              "With production temporarily halted, installation work had to be completed within a limited shutdown period before manufacturing resumed.",
              "Our team worked alongside multiple trades in a fast-paced environment where careful planning, coordination, and execution were essential. Daily progress was closely tracked to keep work on schedule and meet critical milestones ahead of startup deadlines.",
              "Executing efficiently under time pressure was key to the project’s success.",
            ],
          },
          {
            title: "Coordination Across Multiple Trades",
            paragraphs: [
              "Large-scale production upgrades require seamless coordination among electrical, mechanical, automation, and construction teams.",
              "Our team worked closely with other trades to sequence installations, resolve field challenges, and maintain progress throughout the shutdown period.",
              "Clear communication and disciplined execution helped keep work areas organized and the project moving quickly.",
            ],
          },
          {
            title: "Safety & Quality",
            paragraphs: [
              "Despite aggressive schedules, safety and quality were never compromised.",
              "All installation activities were performed in accordance with site requirements and backed by inspections, testing, verification procedures, and established work practices.",
              "Maintaining high standards of workmanship under compressed timelines was essential to delivering reliable results and a successful production startup.",
            ],
          },
          {
            title: "Project Impact",
            paragraphs: [
              "The infrastructure upgrades completed during this project supported ongoing modernization across Mercedes-Benz manufacturing operations.",
              "This project reflects the field installation expertise, industrial execution capabilities, and schedule-driven project experience that later helped form the foundation of Ark Automation Inc.",
              "By completing electrical and automation upgrades within a limited shutdown window, our team contributed to the continued evolution of advanced automotive manufacturing.",
            ],
          },
        ],
      },
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "Connect With Us",
    lead: "Tell us about your project or your next career move. Prefer email? Reach us at {email}.",
    businesses: "Businesses",
    careers: "Careers",
    name: "Name",
    company: "Company",
    occupation: "Occupation",
    email: "Email",
    state: "State",
    selectState: "Select a state",
    resume: "Resume",
    uploadResume: "Upload Resume",
    changeFile: "Change file",
    scope: "Project Scope",
    selectScope: "Select a scope",
    details: "Additional details",
    submit: "Submit",
    submitting: "Submitting…",
    success: "Thank you — we’ll be in touch shortly.",
    error: "Submission failed. Please email us directly at {email}.",
    resumeTooLarge: "Your resume must be under 4 MB. Please compress it or email it to {email}.",
  },
  legal: {
    translationNotice: "",
    privacy: {
      title: "Privacy Policy",
      description: "How Ark Automation Inc. collects, uses, and protects information submitted through arkautomationgroup.com.",
      intro:
        "Ark Automation Inc. (“Ark Automation”) welcomes you to our website. We take the protection of the personal information you share with us seriously. This notice explains what information we collect when you visit the site or contact us, how we use it, and the choices you have.",
      sections: [
        {
          id: "controller",
          title: "Who We Are",
          blocks: [
            "The company responsible for processing personal information on arkautomationgroup.com (the “Site”) is:",
            "Ark Automation Inc.\n{email}",
            "We are an industrial electrical, network, and automation contractor. We collect only the information needed to respond to project inquiries and job applications, and we do not sell personal information.",
          ],
        },
        {
          id: "information-we-collect",
          title: "Information We Collect",
          blocks: [
            "**Information you provide.** When you submit a business inquiry through our contact form, we collect your name, company, email address, state, project scope, and any additional details you choose to share. When you apply through the Careers form, we collect your name, occupation, email address, state, and the resume you upload.",
            "**Information you send directly.** If you email or call us, we receive the information contained in that communication.",
            "**Technical information.** As with most websites, our hosting provider automatically processes basic technical data such as IP address, browser type, device information, and pages requested. This data is used to deliver the Site securely and reliably.",
            "**Preferences stored on your device.** If you select a language, that choice is saved in a small cookie in your browser so the Site can show pages in that language on your next visit. It is used for no other purpose.",
          ],
        },
        {
          id: "how-we-use",
          title: "How We Use Information",
          blocks: [
            "We use the information we collect to:",
            {
              list: [
                "Respond to inquiries, prepare quotes, and discuss potential projects.",
                "Review applications and contact candidates about employment opportunities.",
                "Operate, maintain, and secure the Site.",
                "Comply with legal obligations and protect our rights.",
              ],
            },
            "We do not use your information for automated decision-making, and we do not send marketing emails unless you ask us to.",
          ],
        },
        {
          id: "cookies",
          title: "Cookies and Analytics",
          blocks: [
            "The Site does not use advertising cookies or third-party tracking for marketing purposes. Essential technical storage may be used to make the Site function, such as remembering your language preference. If we introduce analytics in the future, we will update this policy before doing so.",
          ],
        },
        {
          id: "sharing",
          title: "How We Share Information",
          blocks: [
            "We do not sell or rent personal information. We share it only in these limited circumstances:",
            {
              list: [
                "**Service providers** that help us run the Site and deliver form submissions, such as our website hosting and email delivery providers. They process information on our behalf and only as needed to provide their services.",
                "**Legal requirements**, when disclosure is required by law, regulation, or legal process, or is necessary to protect the rights, property, or safety of Ark Automation, our clients, or others.",
                "**Business transfers**, in connection with a merger, acquisition, or sale of assets, subject to the commitments in this policy.",
              ],
            },
          ],
        },
        {
          id: "retention",
          title: "Data Retention",
          blocks: [
            "We keep inquiry and application information only as long as needed for the purposes described above, including any resulting project or employment relationship, and as required for legal, accounting, or recordkeeping obligations. When information is no longer needed, we delete it or keep it in a form that no longer identifies you.",
          ],
        },
        {
          id: "security",
          title: "Security",
          blocks: [
            "We use reasonable administrative, technical, and physical safeguards to protect personal information, including encrypted (HTTPS) connections to the Site. No method of transmission or storage is completely secure, so please avoid sending sensitive information, such as financial account or government ID numbers, through the contact form.",
          ],
        },
        {
          id: "your-choices",
          title: "Your Rights and Choices",
          blocks: [
            "Depending on where you live, you may have the right to request access to, correction of, or deletion of the personal information we hold about you, or to object to certain processing. To make a request, email us at {email}. We will verify your request and respond within the time required by applicable law.",
            "You can clear your saved language preference at any time by clearing your browser’s cookies for this site.",
          ],
        },
        {
          id: "children",
          title: "Children’s Privacy",
          blocks: [
            "The Site is intended for businesses and job seekers and is not directed to children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us with information, please contact us and we will delete it.",
          ],
        },
        {
          id: "changes",
          title: "Changes to This Policy",
          blocks: [
            "We may update this Privacy Policy from time to time. When we do, the updated version will be posted on this page, and material changes will be highlighted on the Site.",
          ],
        },
        {
          id: "contact",
          title: "Contact Us",
          blocks: [
            "If you have questions about this Privacy Policy or how we handle your information, contact Ark Automation Inc. at {email}.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Use",
      description: "The terms that govern your use of arkautomationgroup.com.",
      intro:
        "Welcome to the website of Ark Automation Inc. (“Ark Automation”). The following terms apply whenever you browse this site or contact us through it. Please read them carefully, as using the site means you accept them.",
      sections: [
        {
          id: "acceptance",
          title: "Acceptance of Terms",
          blocks: [
            "These Terms of Use (“Terms”) govern your access to and use of arkautomationgroup.com (the “Site”), operated by Ark Automation Inc. (“Ark Automation,” “we,” “us,” or “our”). By using the Site, you agree to these Terms. If you do not agree, please do not use the Site.",
            "These Terms apply to the Site only. Any electrical, network, pneumatic, or automation work we perform is governed by a separate written agreement between Ark Automation and the client.",
          ],
        },
        {
          id: "use-of-site",
          title: "Use of the Site",
          blocks: [
            "You may use the Site for lawful purposes, such as learning about our services or contacting us about a project or job opportunity. You agree not to:",
            {
              list: [
                "Use the Site in any way that violates applicable laws or regulations.",
                "Attempt to gain unauthorized access to the Site, its servers, or related systems.",
                "Interfere with or disrupt the Site, including by introducing malware or sending automated, excessive requests.",
                "Submit false, misleading, or unlawful information through our forms.",
                "Copy, scrape, or reproduce Site content for commercial purposes without our written permission.",
              ],
            },
          ],
        },
        {
          id: "information",
          title: "Informational Content Only",
          blocks: [
            "Content on the Site, including service descriptions and project case studies, is provided for general information about our capabilities. It is not an offer, a quote, or engineering advice, and it should not be relied on as a substitute for a project-specific assessment.",
            "Scope, pricing, schedules, warranties, and responsibilities for any project are defined only in a signed agreement. A quote request submitted through the Site does not create a contract.",
          ],
        },
        {
          id: "projects-and-trademarks",
          title: "Project References and Trademarks",
          blocks: [
            "Our case studies describe field work our team members performed on the projects referenced. Project descriptions reflect our team’s role and do not represent the full scope of any facility or program.",
            "Company names, logos, and trademarks of clients and facility owners, including Tesla, Lucid, Mercedes-Benz, Rivian, TSMC, ASML, and TEL, belong to their respective owners. Their appearance on the Site is for identification purposes only and does not imply endorsement, sponsorship, or partnership unless expressly stated.",
          ],
        },
        {
          id: "intellectual-property",
          title: "Intellectual Property",
          blocks: [
            "Except for third-party marks and materials, the Site and its content, including text, photographs, graphics, and the Ark Automation name and logo, are owned by or licensed to Ark Automation Inc. and are protected by intellectual property laws. You may view and print pages for your personal, non-commercial reference. Any other use requires our prior written consent.",
          ],
        },
        {
          id: "submissions",
          title: "Your Submissions",
          blocks: [
            "When you submit information through the Site, you confirm that it is accurate and that you have the right to share it. We handle personal information as described in our [Privacy Policy](/privacy). Please do not submit confidential drawings, specifications, or other proprietary materials through the Site unless we have agreed in writing on how they will be handled.",
          ],
        },
        {
          id: "third-party-links",
          title: "Third-Party Links",
          blocks: [
            "The Site may link to websites or services operated by others. We do not control and are not responsible for their content, policies, or practices. Accessing them is at your own risk and subject to their terms.",
          ],
        },
        {
          id: "disclaimers",
          title: "Disclaimers",
          blocks: [
            "The Site is provided “as is” and “as available.” To the fullest extent permitted by law, Ark Automation disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement. We do not guarantee that the Site will be uninterrupted, error-free, or free of harmful components.",
          ],
        },
        {
          id: "liability",
          title: "Limitation of Liability",
          blocks: [
            "To the fullest extent permitted by law, Ark Automation and its officers, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, revenue, or profits, arising from or related to your use of, or inability to use, the Site. This limitation does not affect any rights or obligations under a separate signed agreement for services.",
          ],
        },
        {
          id: "indemnification",
          title: "Indemnification",
          blocks: [
            "You agree to indemnify and hold harmless Ark Automation and its officers, employees, and agents from any claims, losses, or expenses, including reasonable attorneys’ fees, arising from your misuse of the Site or your violation of these Terms.",
          ],
        },
        {
          id: "governing-law",
          title: "Governing Law",
          blocks: [
            "These Terms are governed by the laws of the United States and of the state in which Ark Automation Inc. is incorporated, without regard to conflict-of-law principles. Any dispute arising from these Terms or the Site will be resolved in the state or federal courts located in that state, unless applicable law requires otherwise.",
          ],
        },
        {
          id: "changes",
          title: "Changes to These Terms",
          blocks: [
            "We may revise these Terms from time to time. Updated Terms take effect when posted on this page. Continued use of the Site after changes are posted means you accept the revised Terms.",
          ],
        },
        {
          id: "contact",
          title: "Contact Us",
          blocks: ["Questions about these Terms can be sent to Ark Automation Inc. at {email}."],
        },
      ],
    },
  },
};

export default en;
