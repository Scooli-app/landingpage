import { toolHref } from "@/i18n/navigation";
import type { MarketingContent } from "../data";

/**
 * English marketing copy — authored, not translated.
 *
 * Two conventions worth knowing before editing:
 *
 * 1. Scooli generates against the *Portuguese* national curriculum, and English
 *    pages say so plainly wherever curriculum alignment is claimed. It is
 *    framed as the specificity that makes the output usable ("grounded in the
 *    official Portuguese national curriculum"), not as a limitation. When other
 *    countries' curricula ship, this is the copy to revisit.
 * 2. Portuguese instrument names are kept and glossed once — "Aprendizagens
 *    Essenciais (Portugal's national curriculum standards)", "Decree-Law
 *    55/2018". Teachers searching in English still search for those names, and
 *    translating them away would make the claim unverifiable.
 */
export const marketingContentEn: MarketingContent = {
  teacherStats: [
    {
      value: "7.4 hrs/week",
      label: "spent planning lessons by full-time teachers in Portugal",
      source: "TALIS 2024 · Portugal",
    },
    {
      value: "6.9 hrs/week",
      label: "spent marking and assessing student work",
      source: "TALIS 2024 · Portugal",
    },
    {
      value: "77%",
      label: "name the marking load as a source of workplace stress",
      source: "TALIS 2024 · Portugal",
    },
  ],

  impactStatLabels: {
    generatedDocuments: "documents generated",
    weeklyHoursSaved: "saved every week",
    adaptedMaterials: "materials adapted",
    activeTeachers: "active teachers",
  },

  trustCards: [
    {
      title: "The teacher stays in charge",
      description: "Scooli gets you past the blank page faster. What actually reaches the classroom is still reviewed, edited and signed off by you.",
    },
    {
      title: "Built for GDPR",
      description: "Designed for school settings, with privacy, human review and safe-use guidance explained in plain language rather than buried in a policy.",
    },
    {
      title: "Your work never trains a model",
      description: "The materials you create and the prompts you write on Scooli are not used to train AI models.",
    },
  ],

  teacherPageCards: [
    {
      title: "Less friction between idea and lesson",
      description: "Start from a plain-language request and get an editable draft of the lesson, worksheet or test you need to finish tonight.",
    },
    {
      title: "Differentiate without rebuilding",
      description: "Change difficulty, reading level, length and format for a different class without starting the document again.",
    },
    {
      title: "Reuse what already works",
      description: "The community library is where you find a resource worth duplicating and adapting to your own class.",
    },
  ],

  schoolPageCards: [
    {
      title: "A first conversation with context",
      description: "We start by understanding your goals, year groups, subjects and which teachers will be trying Scooli first.",
    },
    {
      title: "Pilot with a small team",
      description: "The route we recommend is a small group of teachers using Scooli properly before anyone rolls it out school-wide.",
    },
    {
      title: "Responsible adoption from day one",
      description: "Privacy, human review and teacher control are part of the first conversation, not a compliance question saved for later.",
    },
  ],

  aboutPrinciples: [
    {
      title: "Give teachers their time back",
      description: "The priority is cutting the repetitive work, so more of the week goes to teaching, following students and adjusting what actually matters.",
    },
    {
      title: "Keep the teacher at the centre",
      description: "The tool drafts materials and alternative versions. The professional judgement about what gets used stays with the teacher.",
    },
    {
      title: "Built for Portugal, specifically",
      description: "The language, the examples and the curriculum references are built around how schools and teachers in Portugal actually work.",
    },
  ],

  libraryPageCards: [
    {
      title: "Worksheet on equivalent fractions",
      meta: "Maths · Year 5 · Editable",
      tags: ["Worksheet", "45 min", "Duplicate"],
    },
    {
      title: "Weekly Portuguese language plan",
      meta: "Portuguese · Lower secondary · With objectives",
      tags: ["Lesson plan", "Curriculum", "Adjustable"],
    },
    {
      title: "Science diagnostic test",
      meta: "Science · Year 6 · With mark scheme",
      tags: ["Test", "Marks", "Preview"],
    },
    {
      title: "Slides on the water cycle",
      meta: "Environmental studies · Primary · Presentation",
      tags: ["Slides", "Explainer", "Adapt"],
    },
    {
      title: "Quick revision quiz",
      meta: "History · Year 8 · Quiz",
      tags: ["Revision", "5 minutes", "Share"],
    },
    {
      title: "Guided reading companion",
      meta: "Portuguese · Year 7 · Study guide",
      tags: ["Reading", "Support", "Library"],
    },
  ],

  toolPages: [
    {
      slug: "planificacoes",
      title: "AI unit and year plans built on the Portuguese national curriculum",
      shortTitle: "Unit plans",
      description: "Plan a unit, a term or a full year with the Aprendizagens Essenciais — Portugal's national curriculum standards — and Decree-Law 55/2018 already built in.",
      hero: "The start of the school year used to cost whole days of planning. Now it takes minutes.",
      useCases: ["Year plan", "Unit plan", "Term plan"],
      outputs: ["Lesson sequence with curriculum descriptors", "Decree-Law 55/2018 and curriculum flexibility referenced", "Assessment points and instruments"],
      benefits: [
        "Curriculum standards and Student Profile descriptors cited for you, instead of looked up by hand",
        "A complete unit plan in minutes rather than an evening",
        "Objectives, sequence and assessment all editable before you hand anything in",
      ],
      contentSections: [
        {
          title: "What a Scooli unit plan contains",
          description: "The draft starts from the Aprendizagens Essenciais and Decree-Law 55/2018, so the curriculum work is already done when you open the document.",
          bullets: [
            "Curriculum standards and Student Profile descriptors, cited and put in context",
            "A lesson sequence where each objective builds on the last",
            "Formative and summative assessment spread across the unit",
          ],
        },
        {
          title: "How Scooli supports curriculum flexibility",
          description: "Decree-Law 55/2018 gave Portuguese schools room to adapt sequencing and resources. Scooli helps you document those choices clearly, in a file you can still edit.",
          bullets: [
            "Curriculum management decisions documented in line with Decree-Law 55/2018",
            "Sequencing adjusted to the class in front of you",
            "Alternatives generated when the plan changes mid-term",
          ],
        },
      ],
      faq: [
        {
          question: "Are the national curriculum standards actually cited in the plan?",
          answer: "Yes. Scooli works from the Aprendizagens Essenciais and the Student Profile descriptors so you are not cross-referencing two documents while you plan. Everything it produces stays editable.",
        },
        {
          question: "Does Scooli know Decree-Law 55/2018 and curriculum flexibility?",
          answer: "Yes. Decree-Law 55/2018 is one of the reference documents Scooli works from, which is what lets it document curriculum management choices in line with current Portuguese legislation.",
        },
        {
          question: "Can I generate a full year plan?",
          answer: "Yes. Ask for a year, a term or a single unit. Scooli drafts the structure and the objectives, and you refine them from there.",
        },
      ],
      relatedLinks: [
        { label: "See term-long teaching plans", href: toolHref("sequencias-de-aulas") },
        { label: "Build individual lesson plans", href: toolHref("plano-de-aula") },
        { label: "Generate worksheets", href: toolHref("fichas-de-trabalho") },
      ],
      howToSteps: [
        {
          name: "Set the scope",
          text: "Choose the subject, the year group and the term or unit you are planning.",
        },
        {
          name: "Describe the class",
          text: "Add what matters about the group — pace, specific needs or curriculum priorities.",
        },
        {
          name: "Generate the plan",
          text: "You get objectives, cited curriculum standards, a lesson sequence and assessment built in.",
        },
        {
          name: "Refine and hand in",
          text: "Edit anything, adjust what does not fit and export when the plan is ready to use.",
        },
      ],
      seoKeywords: [
        "AI unit planner for teachers",
        "AI year plan generator",
        "curriculum aligned lesson planning",
        "Portuguese national curriculum planning",
        "Aprendizagens Essenciais planning tool",
        "term plan generator",
        "unit plan generator for teachers",
      ],
    },
    {
      slug: "plano-de-aula",
      title: "AI lesson plan generator — a full lesson prepared in minutes",
      shortTitle: "Lesson plans",
      description: "Get a lesson plan with objectives, a timed activity sequence, materials and assessment — editable and ready to teach from.",
      hero: "Prepare a complete lesson in minutes, then fine-tune it before you walk into the room.",
      useCases: ["A brand new lesson", "Adapting for another class", "Last-minute cover"],
      outputs: ["Objectives and competences", "Timed activity sequence", "Materials and formative assessment"],
      benefits: [
        "A full lesson structure instead of an empty document",
        "The same plan reworked for classes that move at different speeds",
        "Objectives, activities and materials all editable before the lesson",
      ],
      contentSections: [
        {
          title: "What a Scooli lesson plan contains",
          description: "The draft covers everything a 45 to 90 minute lesson needs, so your time goes into the pedagogical decisions rather than into formatting a document.",
          bullets: [
            "A lesson objective tied to the national curriculum standards",
            "An activity sequence with an estimated duration for each phase",
            "Materials, resources needed and a formative assessment point",
          ],
        },
        {
          title: "When a lesson plan earns its keep",
          description: "It helps as much when you are building a lesson from scratch as when you need an existing plan reshaped for a different class or a shorter slot.",
          bullets: [
            "Building a lesson from nothing for a new class",
            "Reworking quickly for a class with different learning needs",
            "Finishing a last-minute preparation with a solid starting point",
          ],
        },
      ],
      faq: [
        {
          question: "Are the objectives tied to the national curriculum?",
          answer: "Yes. Scooli starts from the Aprendizagens Essenciais for the subject and year group you choose, so the objectives are grounded in what you are actually required to teach.",
        },
        {
          question: "Can I adapt the plan for a shorter or longer lesson?",
          answer: "Yes. Ask for a 45, 50 or 90 minute version and Scooli rebalances the activity sequence to fit the time you have.",
        },
        {
          question: "Is the plan editable before I use it?",
          answer: "Yes. You get an editable document, so objectives, activities, materials and timings can all change before the lesson.",
        },
      ],
      relatedLinks: [
        { label: "See unit plans", href: toolHref("planificacoes") },
        { label: "See term-long teaching plans", href: toolHref("sequencias-de-aulas") },
        { label: "Generate worksheets", href: toolHref("fichas-de-trabalho") },
      ],
      howToSteps: [
        {
          name: "Set the topic and year group",
          text: "Choose the content, the subject, the year group and how long the lesson runs.",
        },
        {
          name: "Choose the focus",
          text: "Say whether this is an introduction, a practice lesson, revision or assessment.",
        },
        {
          name: "Generate the lesson plan",
          text: "You get objectives, activities, materials and assessment in an editable draft.",
        },
        {
          name: "Refine and teach",
          text: "Edit what needs changing and take the plan into the classroom once it fits your lesson.",
        },
      ],
      seoKeywords: [
        "AI lesson plan generator",
        "create a lesson plan",
        "lesson planning tool for teachers",
        "editable lesson plan template",
        "AI lesson preparation",
        "curriculum aligned lesson objectives",
        "lesson plan generator Portugal",
      ],
    },
    {
      slug: "sequencias-de-aulas",
      title: "AI teaching plans — map the school year lesson by lesson",
      shortTitle: "Teaching plans",
      description: "Set the subject, the term and your timetable. Scooli lays the lessons out across the calendar with a suggested topic for each one, and generates the lesson plan whenever you need it.",
      hero: "Spread your topics across the term's lessons — then generate each lesson plan when the day comes.",
      useCases: ["Map a full term", "Spread the syllabus over the year", "Set the structure before term starts"],
      outputs: ["Lessons laid out on your timetable with a topic each", "The syllabus distributed over time", "A lesson plan generated from any session"],
      benefits: [
        "See how the syllabus falls across the term in one place",
        "Generate any session's lesson plan from a structure that already exists",
        "Reshuffle quickly when a lesson is lost or the class needs longer on a topic",
      ],
      contentSections: [
        {
          title: "How Scooli spreads lessons across the term",
          description: "Scooli uses your weekly timetable and the term's start and end dates to fill in the lessons automatically, then suggests a topic for each session based on the curriculum and the syllabus.",
          bullets: [
            "Lessons created automatically from your timetable and term dates",
            "A topic suggested for each session, based on the national curriculum standards",
            "The whole term visible on a single screen",
          ],
        },
        {
          title: "Generate any session's lesson plan",
          description: "When it is time to prepare a specific lesson, start from that session in the teaching plan. The topic and context carry over, so you never re-enter the same information.",
          bullets: [
            "Lesson plans generated from the session, with the context already filled in",
            "Worksheets, quizzes or slides for the same session too",
            "Generation is always something you trigger — Scooli never generates on its own",
          ],
        },
      ],
      faq: [
        {
          question: "Does the teaching plan create every lesson plan automatically?",
          answer: "No. The teaching plan organises the sessions and their topics. You generate an individual lesson plan from any session when you actually need it — that step is always the teacher's decision.",
        },
        {
          question: "Is there a limit on lessons or on the length of a term?",
          answer: "No. A teaching plan scales from a single week to a full school year. Scooli fills in lessons from your timetable and dates, with no cap on sessions.",
        },
        {
          question: "Can I reorganise topics mid-term?",
          answer: "Yes. Lessons and topics stay editable. If a session is lost, or the class needs more time on a topic, you can reshuffle without losing the rest of the structure.",
        },
      ],
      relatedLinks: [
        { label: "See unit plans", href: toolHref("planificacoes") },
        { label: "Build an individual lesson plan", href: toolHref("plano-de-aula") },
        { label: "See how teachers use Scooli", href: "/professores" },
      ],
      howToSteps: [
        {
          name: "Set the subject and the term",
          text: "Choose the subject, the year group, the start and end dates and your weekly timetable.",
        },
        {
          name: "Review the lessons",
          text: "Scooli lays the lessons out across the term with a suggested topic for each. Adjust them against your syllabus.",
        },
        {
          name: "Generate lesson plans as you go",
          text: "When you need one, start from any session and generate the lesson plan with the context already filled in.",
        },
        {
          name: "Adapt when the plan slips",
          text: "If a lesson is lost or the class slows down, reshuffle the sessions without starting over.",
        },
      ],
      seoKeywords: [
        "AI teaching plan generator",
        "map lessons across a term",
        "syllabus planning tool",
        "school year planning software",
        "timetable based lesson planning",
        "scheme of work generator",
        "long term planning for teachers",
      ],
    },
    {
      slug: "gerador-de-testes",
      title: "AI test generator for teachers",
      shortTitle: "Test generator",
      description: "Build tests with varied question types, marks and a mark scheme — from a short description or from a document you already have.",
      hero: "Build a structured test in minutes, then set the difficulty before you print or export.",
      useCases: ["Diagnostic test", "Mid-unit assessment", "A version for another class"],
      outputs: ["Multiple-choice questions", "Short-answer questions", "Mark scheme"],
      benefits: [
        "A complete test without starting from an empty document",
        "Mixed question types and a mark scheme in the same pass",
        "Difficulty, length and reading level adjusted before you use it",
      ],
      contentSections: [
        {
          title: "What a Scooli test can include",
          description:
            "The tool gets you to a balanced structure faster, ready to review and shape around what you are actually assessing.",
          bullets: [
            "Multiple-choice, short-answer and extended-response questions",
            "Marks per item and a visible mark scheme",
            "Alternative versions for other classes or other assessment points",
          ],
        },
        {
          title: "When the test generator matters most",
          description:
            "It helps most when there is very little time before an assessment and you still will not compromise on the quality of what students sit.",
          bullets: [
            "A diagnostic test at the start of a unit",
            "A mid-unit assessment that is not just last year's paper again",
            "An existing test reworked for a different level or class",
          ],
        },
      ],
      faq: [
        {
          question: "Can I mix question types in one test?",
          answer:
            "Yes. Ask for multiple-choice, short-answer, extended-response, or whatever combination suits the assessment you are preparing.",
        },
        {
          question: "Is the test editable before I print it?",
          answer:
            "Yes. Scooli produces an editable draft, so you can review it, reorder questions, change the marks and rewrite the wording before students see it.",
        },
        {
          question: "Can I adapt a test for another class?",
          answer:
            "Yes. Ask for a simpler, shorter or harder version without rebuilding the paper from scratch.",
        },
      ],
      relatedLinks: [
        { label: "See worksheets", href: toolHref("fichas-de-trabalho") },
        { label: "Start from your own document", href: toolHref("carregar-documentos") },
        { label: "See how teachers use Scooli", href: "/professores" },
      ],
      howToSteps: [
        {
          name: "Set the topic and year group",
          text: "Choose the content, the year group and the kind of assessment you are preparing.",
        },
        {
          name: "Describe the paper",
          text: "Pick the question formats, the difficulty and roughly how long it should be.",
        },
        {
          name: "Generate with AI",
          text: "You get a test with questions, marks and a mark scheme in an editable draft.",
        },
        {
          name: "Review and export",
          text: "Adjust anything that needs it and export the test when it is ready.",
        },
      ],
      seoKeywords: [
        "AI test generator",
        "create tests with AI",
        "exam paper generator for teachers",
        "printable tests for students",
        "multiple choice question generator",
        "mark scheme generator",
        "assessment tools for teachers",
      ],
    },
    {
      slug: "fichas-de-trabalho",
      title: "AI worksheet generator for teachers",
      shortTitle: "Worksheets",
      description: "Create worksheets with exercises, clear instructions and versions by level — ready to review, print and adapt to your class.",
      hero: "Create a worksheet in minutes and shape it around your class before you print.",
      useCases: ["Consolidation", "Homework", "Supporting different paces"],
      outputs: ["Differentiated exercises", "Clear instructions", "Versions by level"],
      benefits: [
        "Time saved on structure, exercises and layout",
        "Easier or harder versions without rebuilding the document",
        "An editable worksheet ready to print, export or adapt",
      ],
      contentSections: [
        {
          title: "What comes out of a Scooli worksheet",
          description:
            "Scooli builds worksheets with a clear structure, appropriate reading level and exercises designed to be usable after a quick read-through — not a rewrite.",
          bullets: [
            "Instructions a student can follow without asking",
            "Exercises that match the objective of the lesson",
            "Answer space and a clean, uncluttered layout",
          ],
        },
        {
          title: "Adapting a worksheet to different paces",
          description:
            "When a class needs differentiated work, start from one shared version and ask for others with a different difficulty, length or level of scaffolding.",
          bullets: [
            "A simpler version with more accessible language",
            "A shorter version for support or reinforcement",
            "A more demanding version for students who finish early",
          ],
        },
      ],
      faq: [
        {
          question: "Can I create print-ready worksheets?",
          answer:
            "Yes. Scooli produces an organised, editable worksheet that you can review, adjust and then print or export in the format you need.",
        },
        {
          question: "Can I create several versions of the same worksheet?",
          answer:
            "Yes. Work from the same base and ask for versions by level, simpler language, fewer items or more scaffolding for the class in front of you.",
        },
        {
          question: "Can I use my own text or document as the source?",
          answer:
            "Yes. If you already have a text, an old worksheet or any other material, use it as the starting point and turn it into a new worksheet.",
        },
      ],
      relatedLinks: [
        { label: "Adapt materials by level", href: toolHref("adaptacao-de-materiais") },
        { label: "Start from your own document", href: toolHref("carregar-documentos") },
        { label: "Browse the community library", href: "/biblioteca" },
      ],
      howToSteps: [
        {
          name: "Describe the worksheet",
          text: "Give the topic, the year group, the lesson objective and the kind of exercises you want.",
        },
        {
          name: "Generate the worksheet",
          text: "You get instructions, exercises and a structure that is ready to review.",
        },
        {
          name: "Adapt it to your class",
          text: "Ask for simpler, shorter or more scaffolded versions without redoing the work.",
        },
        {
          name: "Review, print or export",
          text: "Make the final adjustments and take the worksheet to class in whatever format you prefer.",
        },
      ],
      seoKeywords: [
        "AI worksheet generator",
        "create worksheets with AI",
        "printable worksheets for teachers",
        "differentiated worksheets",
        "worksheet maker for teachers",
        "printable exercises",
        "homework sheet generator",
      ],
    },
    {
      slug: "quizzes",
      title: "AI quizzes for revision and classroom participation",
      shortTitle: "Quizzes",
      description: "Build quick quizzes to revise content, check understanding and change the pace of a lesson.",
      hero: "Put together a quick revision quiz without losing the lesson time to building it.",
      useCases: ["End-of-lesson revision", "A warm-up", "A quick diagnostic"],
      outputs: ["Fast questions", "Multiple choice", "A short version"],
      benefits: [
        "Short revision moments prepared without writing every question yourself",
        "A quick, simple format that gets the class participating",
        "Difficulty and question count matched to the time you actually have",
      ],
      contentSections: [
        {
          title: "Where quizzes fit into a lesson",
          description:
            "Quizzes work best in short bursts — checking understanding, revising a topic, or starting a lesson with everyone focused on the same thing.",
          bullets: [
            "Quick revision at the end of a lesson",
            "A warm-up at the start of the next one",
            "A simple diagnostic before moving on to new content",
          ],
        },
        {
          title: "What you can adjust in a Scooli quiz",
          description:
            "The draft can be tuned to the time available, the pace of the class and the kind of answer you want from students.",
          bullets: [
            "Number of questions and total running time",
            "Easier or more demanding questions",
            "A short format you can use in the lesson immediately",
          ],
        },
      ],
      faq: [
        {
          question: "Are these quizzes suitable for quick in-class revision?",
          answer:
            "Yes. Scooli generates short quizzes that are easy to fit into the time you have and well suited to revision or a quick diagnostic.",
        },
        {
          question: "Can I change the number of questions?",
          answer:
            "Yes. Ask for a shorter quiz, add more items or change the format depending on how the lesson is going.",
        },
        {
          question: "Are the quizzes editable?",
          answer:
            "Yes. Everything can be reviewed and adjusted before you use it with a class.",
        },
      ],
      relatedLinks: [
        { label: "Build full tests", href: toolHref("gerador-de-testes") },
        { label: "See classroom slides", href: toolHref("apresentacoes") },
        { label: "Browse the community library", href: "/biblioteca" },
      ],
      howToSteps: [
        {
          name: "Choose the topic to revise",
          text: "Give the content, the year group and the point in the lesson where the quiz fits.",
        },
        {
          name: "Set the quiz format",
          text: "Ask for a short set of questions that fits the time available.",
        },
        {
          name: "Generate with AI",
          text: "You get a quiz with questions ready to review and adjust.",
        },
        {
          name: "Edit and use it in class",
          text: "Tune the difficulty, change the number of items and use the quiz once it fits the class.",
        },
      ],
      seoKeywords: [
        "AI quiz generator",
        "quiz maker for teachers",
        "classroom quiz generator",
        "educational quiz tool",
        "quick revision quiz",
        "revision questions generator",
        "formative assessment quizzes",
      ],
    },
    {
      slug: "apresentacoes",
      title: "AI slides for introducing and explaining new content",
      shortTitle: "Slides",
      description: "Structure a presentation with talking points, examples and classroom pacing, ready to refine and finish.",
      hero: "Get the structure of a presentation in minutes and spend your time only on what matters.",
      useCases: ["Introducing a topic", "A lecture-style lesson", "End-of-unit summary"],
      outputs: ["Slide structure", "Key talking points", "Worked examples"],
      benefits: [
        "Slides and talking points organised without losing time to the initial structure",
        "A presentation that follows the pace of the lesson, faster",
        "Examples, wording and slide order all editable before you present",
      ],
      contentSections: [
        {
          title: "What a Scooli presentation includes",
          description:
            "The tool structures the sequence of the explanation, so you have a clear base before you refine the content, the examples and the tone.",
          bullets: [
            "Key talking points per slide",
            "Examples that support the explanation",
            "Pacing built for a classroom rather than a conference",
          ],
        },
        {
          title: "When AI slides make sense",
          description:
            "They work well for introducing a topic, supporting a lecture-style lesson or closing a unit with a clear summary.",
          bullets: [
            "Introducing new content",
            "A lecture-style lesson with the sequence already organised",
            "A closing summary before revision or assessment",
          ],
        },
      ],
      faq: [
        {
          question: "Does Scooli build the slide structure?",
          answer:
            "Yes. You get a base with talking points, a logical sequence and examples, then shape the presentation to your own teaching style.",
        },
        {
          question: "Can I change the language of the presentation?",
          answer:
            "Yes. Simplify the text, shift the focus of individual slides or reorganise the explanation before you present.",
        },
        {
          question: "Are the slides ready to finish off?",
          answer:
            "Yes. You get an organised base to edit, add to and use as support in the lesson.",
        },
      ],
      relatedLinks: [
        { label: "Build lesson plans", href: toolHref("plano-de-aula") },
        { label: "Generate revision quizzes", href: toolHref("quizzes") },
        { label: "See how teachers use Scooli", href: "/professores" },
      ],
      howToSteps: [
        {
          name: "Set the topic and year group",
          text: "Give the content, the year group and what the presentation needs to achieve.",
        },
        {
          name: "Describe the slide structure",
          text: "Choose the focus of the lesson and the kind of explanation you need to build.",
        },
        {
          name: "Generate the presentation",
          text: "You get a slide sequence with talking points and starting examples.",
        },
        {
          name: "Refine before the lesson",
          text: "Edit wording, order and examples until the presentation is ready to use.",
        },
      ],
      seoKeywords: [
        "AI presentation generator for teachers",
        "classroom slides generator",
        "lesson slides with AI",
        "create slides for lessons",
        "educational presentation maker",
        "teaching slides generator",
        "AI slide deck for schools",
      ],
    },
    {
      slug: "adaptacao-de-materiais",
      title: "AI material adaptation for different levels",
      shortTitle: "Material adaptation",
      description: "Take one source material and produce simpler, shorter or more scaffolded versions without redoing the work.",
      hero: "Adapt a resource to the right class without starting it again.",
      useCases: ["Simplify the language", "Cut the length", "Add scaffolding"],
      outputs: ["Simplified version", "Condensed version", "Scaffolded version"],
      benefits: [
        "Differentiation that does not double your preparation time",
        "Simpler, shorter or more scaffolded versions on demand",
        "One shared base, adapted to classes moving at different speeds",
      ],
      contentSections: [
        {
          title: "How adaptation helps week to week",
          description:
            "When classes move at different paces, this is what lets you adjust the same material with less manual work and more consistency between versions.",
          bullets: [
            "Simplify the language without losing the point of the exercise",
            "Cut the length for support or reinforcement",
            "Add prompts and scaffolding when the class needs them",
          ],
        },
        {
          title: "The kinds of versions you can create",
          description:
            "Scooli starts from one source material and produces new versions for different contexts, with the final call always left to the teacher.",
          bullets: [
            "A simplified version",
            "A shorter or condensed version",
            "A version with extra scaffolding and more guided instructions",
          ],
        },
      ],
      faq: [
        {
          question: "Can I adapt a resource for students working at different paces?",
          answer:
            "Yes. Generate simpler, shorter or more scaffolded versions from the same source material.",
        },
        {
          question: "Does adaptation keep the core content?",
          answer:
            "That is the intent. Scooli preserves the purpose of the material while adjusting language, length or scaffolding as needed.",
        },
        {
          question: "Can I review everything before I use it?",
          answer:
            "Yes. The teacher reviews, edits and decides the final version before it reaches the classroom.",
        },
      ],
      relatedLinks: [
        { label: "Create worksheets", href: toolHref("fichas-de-trabalho") },
        { label: "Start from your own document", href: toolHref("carregar-documentos") },
        { label: "Read about trust and privacy", href: "/confianca" },
      ],
      howToSteps: [
        {
          name: "Choose the source material",
          text: "Start from an exercise, worksheet, text or document you already have.",
        },
        {
          name: "Say how it should change",
          text: "Ask for simplification, a shorter version, more scaffolding or whatever the class needs.",
        },
        {
          name: "Generate the new version",
          text: "You get an adapted version built on the same base but pitched at the level you asked for.",
        },
        {
          name: "Review before using it",
          text: "Check the language, the objectives and the final format before the material reaches the class.",
        },
      ],
      seoKeywords: [
        "AI material adaptation for teachers",
        "adapt teaching materials",
        "differentiated instruction tools",
        "simplify texts for students",
        "adapt worksheets by level",
        "scaffolded learning materials",
        "accessible classroom materials",
      ],
    },
    {
      slug: "carregar-documentos",
      title: "Upload documents and turn your own materials into new resources",
      shortTitle: "Upload documents",
      description: "Start from a document you already have and turn it into worksheets, tests or adapted versions with far less manual work.",
      hero: "Use the documents you already have and turn them into new resources, faster.",
      useCases: ["Reuse older materials", "Adapt an existing test", "Build a worksheet from a text"],
      outputs: ["A worksheet from a document", "A test from a text", "An adapted version"],
      benefits: [
        "Old materials reused without copying and pasting everything again",
        "One source document turned into a worksheet, a test or an adapted version",
        "Less manual work when the content already exists",
      ],
      contentSections: [
        {
          title: "When starting from your own document pays off",
          description:
            "If you already have texts, old worksheets, tests or your own materials, this is what lets you reuse that work instead of starting over.",
          bullets: [
            "An old worksheet used as the base for a new one",
            "A text turned into a fresh set of exercises",
            "A test you used with another year group, adapted",
          ],
        },
        {
          title: "What you can generate from a document",
          description:
            "Scooli reads the starting point and helps turn it into something new, with the process staying fast and under your control.",
          bullets: [
            "A worksheet from a text",
            "A test from existing material",
            "An adapted version for a different context",
          ],
        },
      ],
      faq: [
        {
          question: "Can I use materials I have already prepared?",
          answer:
            "Yes. That is what this tool is for — reusing your own documents and turning them into new resources with less manual work.",
        },
        {
          question: "What can I generate from a document?",
          answer:
            "You can turn a document into a worksheet, a test or an adapted version of the original material.",
        },
        {
          question: "Is the result still editable?",
          answer:
            "Yes. Even when you start from your own document, the new version stays editable so you can review everything before using it.",
        },
      ],
      relatedLinks: [
        { label: "Generate worksheets", href: toolHref("fichas-de-trabalho") },
        { label: "Adapt materials by level", href: toolHref("adaptacao-de-materiais") },
        { label: "See every tool", href: "/ferramentas" },
      ],
      howToSteps: [
        {
          name: "Choose the source document",
          text: "Start from a material of your own that you want to reuse or rework.",
        },
        {
          name: "Say what it should become",
          text: "Choose whether you want a worksheet, a test or an adapted version of the content.",
        },
        {
          name: "Generate with AI",
          text: "You get a new resource built from the document you uploaded.",
        },
        {
          name: "Edit and check",
          text: "Review the new version, make adjustments and use the material when it is ready.",
        },
      ],
      seoKeywords: [
        "upload documents to AI for teachers",
        "turn documents into worksheets",
        "use your own materials with AI",
        "adapt teacher documents",
        "generate a worksheet from a text",
        "generate a test from a document",
        "reuse teaching materials",
      ],
    },
  ],
};
