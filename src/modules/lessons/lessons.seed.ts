export type LessonChallenge = {
  id: string;
  type: "grid" | "quiz";
  title: string;
  concept: "sequencing" | "loops" | "conditionals" | "functions" | "debugging" | "variables";
  prompt: string;
  goal: string;
  examples?: string[];
  hints?: string[];

  hint?: string;
  scenes?: Array<{
    id: string;
    speaker?: string;
    text: string;
  }>;

  // Grid challenge payload
  grid?: {
    width: number;
    height: number;
    blocked?: Array<{ x: number; y: number }>;
  };
  start?: { x: number; y: number; dir?: "N" | "E" | "S" | "W" };
  goalPos?: { x: number; y: number };

  // Quiz challenge payload
  quiz?: {
    kind: "number" | "text" | "multipleChoice";
    question: string;
    answer?: number | string;
    acceptableAnswers?: string[];
    choices?: Array<{ id: string; label: string }>;
    correctChoiceId?: string;
    explanation?: string;
  };
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  ageGroup: "kid" | "teen";
  challenges: LessonChallenge[];
};

export const LESSONS_VERSION = "1.4.0";

// Seeded lesson content. Keep lesson/challenge IDs stable (attempts depend on challengeId).
export const SEEDED_LESSONS: Lesson[] = [
  {
    id: "lesson-sequencing",
    title: "Do It Step by Step",
    summary: "Computers do exactly what you say, in order. First step first, last step last.",
    ageGroup: "kid",
    challenges: [
      {
        id: "seq-1",
        type: "quiz",
        title: "Get Ready for School",
        concept: "sequencing",
        prompt:
          "Bolt is getting ready for school. Which step should be first?",
        goal: "Learn that order matters (do the first thing first).",
        hints: ["You cannot wear shoes before you put on your socks."],
        hint: "Start with the first small step.",
        quiz: {
          kind: "multipleChoice",
          question: "What should Bolt do first?",
          choices: [
            { id: "a", label: "Wear shoes" },
            { id: "b", label: "Put on socks" },
            { id: "c", label: "Carry the school bag" },
            { id: "d", label: "Wave goodbye" },
          ],
          correctChoiceId: "b",
          explanation: "Socks first, then shoes. The order matters.",
        },
        scenes: [
          {
            id: "s1",
            speaker: "Teacher",
            text: "Bolt, do it step by step. Computers like clear steps too.",
          },
          { id: "s2", speaker: "Coach", text: "Good. First step first. Then the next step." },
        ],
      },
      {
        id: "seq-2",
        type: "grid",
        title: "Sweep the Classroom",
        concept: "sequencing",
        prompt:
          "The classroom is messy. Help Bolt go step by step to clean and reach the teacher's desk.",
        goal: "Practice planning steps from start to finish.",
        examples: ["Plan -> Move -> Move -> Reach goal"],
        hint: "Think first, then move one step at a time.",
        grid: { width: 5, height: 5 },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 4, y: 0 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "We must clean well. No rushing!" },
          { id: "s2", speaker: "Coach", text: "Plan your steps. Then move step by step." },
        ],
      },
      {
        id: "seq-boss",
        type: "grid",
        title: "Market Errand Boss",
        concept: "sequencing",
        prompt:
          "Boss mission: Bolt is sent to the market. He must do the steps in the right order to finish the errand.",
        goal: "Practice a longer plan: first, next, last.",
        hint: "Say it in your head: first... next... last...",
        grid: { width: 7, height: 5, blocked: [{ x: 2, y: 2 }, { x: 4, y: 1 }, { x: 4, y: 2 }] },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 6, y: 0 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Boss time! I must not forget any step!" },
          { id: "s2", speaker: "Coach", text: "Slow down. First step, then next step, then last step." },
        ],
      },
    ],
  },
  {
    id: "lesson-variables",
    title: "Variables: A Named Box",
    summary: "A variable is a named box that holds a number. The number can change.",
    ageGroup: "kid",
    challenges: [
      {
        id: "var-1",
        type: "quiz",
        title: "Mango Count",
        concept: "variables",
        prompt:
          "Bolt starts with 0 mangoes. He gets 10 mangoes, then gets 5 more. How many mangoes now?",
        goal: "See how a value changes when you add more.",
        examples: ["0 -> 10 -> 15"],
        hint: "When you add, the number goes up.",
        quiz: {
          kind: "number",
          question:
            "Bolt starts with 0 mangoes. He gets 10 mangoes, then gets 5 more. How many mangoes now?",
          answer: 15,
          explanation: "10 + 5 = 15. The number in the box changes when you add.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Think of a box called mangoes." },
          { id: "s2", speaker: "Coach", text: "Add 10, then add 5. What is in the box now?" },
        ],
      },
      {
        id: "var-2",
        type: "quiz",
        title: "Market Change",
        concept: "variables",
        prompt:
          "Bolt goes to the market with some money. When he buys something, the money number goes down.",
        goal: "See that a variable (box) can go down when you spend and up when you add.",
        hints: ["Start with the money you have.", "Remove what you spent."],
        hint: "New money = old money - spent",
        quiz: {
          kind: "number",
          question:
            "Money = 50. Bolt buys fruit for 15. What is money now?",
          answer: 35,
          explanation:
            "Start with 50. Spend 15. 50 - 15 = 35. The money box now holds 35.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "A variable is like a box with a name: money." },
          { id: "s2", speaker: "Coach", text: "When you buy something, the number goes down." },
        ],
      },
      {
        id: "var-boss",
        type: "quiz",
        title: "Airtime Tracker Boss",
        concept: "variables",
        prompt:
          "Boss mission: Bolt's airtime is changing. Airtime starts at 20. Use 7, then add 4, then use 10. What is airtime now?",
        goal: "Store the value, then update it step by step.",
        hint: "Do it in parts: minus 7, plus 4, minus 10.",
        quiz: {
          kind: "number",
          question:
            "Airtime starts at 20. Bolt uses 7, then adds 4, then uses 10. What is airtime now?",
          answer: 7,
          explanation: "20 - 7 + 4 - 10 = 7. The number changes each time you use or add.",
        },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Ah! My airtime is reducing!" },
          { id: "s2", speaker: "Coach", text: "Keep track carefully. Update the number step by step." },
        ],
      },
    ],
  },
  {
    id: "lesson-conditions",
    title: "If / Else Choices",
    summary: "Programs make choices. If something happens, do this. If not, do that.",
    ageGroup: "kid",
    challenges: [
      {
        id: "if-1",
        type: "quiz",
        title: "Rain or Shine",
        concept: "conditionals",
        prompt:
          "Bolt looks at the sky. If it is raining, he should use an umbrella. If not, he can go.",
        goal: "Understand if/else as two paths: one for 'yes', one for 'no'.",
        examples: ["If raining -> umbrella", "Else -> go"],
        hint: "Two paths: IF and ELSE.",
        quiz: {
          kind: "multipleChoice",
          question: "If it is raining, what should Bolt do?",
          choices: [
            { id: "a", label: "Wear sunglasses" },
            { id: "b", label: "Open an umbrella" },
          ],
          correctChoiceId: "b",
          explanation: "If it rains, the rule says: use an umbrella.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Sometimes your program must choose." },
          { id: "s2", speaker: "Coach", text: "If it rains -> umbrella. Else -> go." },
        ],
      },
      {
        id: "if-2",
        type: "grid",
        title: "Bus Fare Choice",
        concept: "conditionals",
        prompt:
          "Bolt wants to enter the bus. If he has fare, he enters. If he has no fare, he must find another plan.",
        goal: "Practice both outcomes: you have it, or you don't.",
        hints: ["If you have it, go in.", "If you don't have it, do something else."],
        hint: "Always write the ELSE plan too.",
        grid: { width: 6, height: 4, blocked: [{ x: 2, y: 1 }, { x: 3, y: 1 }] },
        start: { x: 0, y: 3, dir: "E" },
        goalPos: { x: 5, y: 0 },
        scenes: [
          { id: "s1", speaker: "Narrator", text: "Bolt wants to board the bus." },
          { id: "s2", speaker: "Coach", text: "Fare? Enter. No fare? Choose another plan." },
        ],
      },
      {
        id: "if-boss",
        type: "grid",
        title: "Rocky Path Shield (Boss)",
        concept: "conditionals",
        prompt:
          "Boss mission: The road has puddles and stones. Use if/else to choose a safe route.",
        goal: "Practice if/else in a harder mission.",
        hint: "If the path is blocked, choose another route.",
        grid: { width: 7, height: 5, blocked: [{ x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }] },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 6, y: 0 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Coach! The road is blocked!" },
          { id: "s2", speaker: "Coach", text: "If blocked -> turn. Else -> go forward." },
        ],
      },
    ],
  },
  {
    id: "lesson-loops",
    title: "Repeat Plans (Loops)",
    summary: "A loop repeats a plan many times, so you don’t write the same thing again and again.",
    ageGroup: "kid",
    challenges: [
      {
        id: "loop-1",
        type: "quiz",
        title: "Repeat a Clap",
        concept: "loops",
        prompt:
          "Bolt wants to clap 10 times. A loop helps him repeat without counting wrong.",
        goal: "Understand repetition as a loop.",
        examples: ["Repeat 10 times: clap"],
        hint: "A loop repeats the same steps a number of times.",
        quiz: {
          kind: "multipleChoice",
          question: "What does a loop help you do?",
          choices: [
            { id: "a", label: "Repeat steps" },
            { id: "b", label: "Delete steps" },
          ],
          correctChoiceId: "a",
          explanation: "A loop repeats steps so you don’t rewrite them again and again.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Repeating is easy with a loop." },
          { id: "s2", speaker: "Coach", text: "One plan, repeated many times." },
        ],
      },
      {
        id: "loop-2",
        type: "grid",
        title: "Walk to the Water Tap",
        concept: "loops",
        prompt:
          "Bolt needs to move forward 5 steps to reach the water tap. Use a loop to repeat the move.",
        goal: "Connect loops to movement and counting.",
        hints: ["Repeat: moveForward 5 times"],
        hint: "Use a repeat-5 plan instead of 5 separate moves.",
        grid: { width: 6, height: 2 },
        start: { x: 0, y: 1, dir: "E" },
        goalPos: { x: 5, y: 1 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "The tap is far. I don’t want to type move 5 times!" },
          { id: "s2", speaker: "Coach", text: "Use a loop to repeat the move." },
        ],
      },
      {
        id: "loop-boss",
        type: "grid",
        title: "Charge the Lantern (Boss)",
        concept: "loops",
        prompt: "Boss mission: repeat the right moves to charge the lantern.",
        goal: "Use repetition to solve a bigger path fast.",
        hint: "Look for a repeating pattern and loop it.",
        grid: { width: 8, height: 3, blocked: [{ x: 3, y: 1 }, { x: 5, y: 1 }] },
        start: { x: 0, y: 1, dir: "E" },
        goalPos: { x: 7, y: 1 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Boss time! The lantern must be charged!" },
          { id: "s2", speaker: "Coach", text: "Find the repeating steps and loop them." },
        ],
      },
    ],
  },
  {
    id: "lesson-functions",
    title: "Reusable Functions",
    summary: "A function is a named shortcut. Use it again and again without rewriting the steps.",
    ageGroup: "teen",
    challenges: [
      {
        id: "fn-1",
        type: "quiz",
        title: "What is a Function?",
        concept: "functions",
        prompt:
          "Bolt keeps doing the same steps for a dance practice. What helps him reuse the steps without rewriting?",
        goal: "Understand that functions are reusable commands.",
        hint: "A function is a named set of steps you can call again.",
        quiz: {
          kind: "multipleChoice",
          question: "What is a function?",
          choices: [
            { id: "a", label: "A named shortcut you can call again" },
            { id: "b", label: "A random mistake in code" },
            { id: "c", label: "Only a number" },
          ],
          correctChoiceId: "a",
          explanation: "Functions let you reuse steps by giving them a name (a shortcut).",
        },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Coach, I keep repeating the same dance steps!" },
          { id: "s2", speaker: "Coach", text: "Name the steps as a function. Then call it anytime." },
        ],
      },
      {
        id: "fn-2",
        type: "grid",
        title: "Shortcut to the Gate",
        concept: "functions",
        prompt:
          "Use a function to repeat a move pattern and reach the school gate.",
        goal: "Apply reusable commands to solve a grid mission.",
        hint: "Put the repeating part in the function, then call it.",
        grid: { width: 7, height: 5, blocked: [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }] },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 6, y: 0 },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Use your named shortcut to reach the gate faster." },
          { id: "s2", speaker: "Bolt", text: "One shortcut, many steps!" },
        ],
      },
      {
        id: "final-boss",
        type: "grid",
        title: "Final Boss",
        concept: "functions",
        prompt:
          "Final boss mission: combine good planning, repeating, and functions to win!",
        goal: "Complete the mission using good structure (small repeated parts in functions).",
        hint: "Make a clear plan, then use functions for repeated parts.",
        grid: {
          width: 9,
          height: 6,
          blocked: [
            { x: 3, y: 1 },
            { x: 3, y: 2 },
            { x: 3, y: 3 },
            { x: 5, y: 2 },
            { x: 6, y: 2 },
          ],
        },
        start: { x: 0, y: 5, dir: "E" },
        goalPos: { x: 8, y: 0 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "This is it! Final mission!" },
          { id: "s2", speaker: "Coach", text: "Stay calm. Plan first, then use your shortcuts (functions)." },
        ],
      },
    ],
  },
  {
    id: "lesson-debugging",
    title: "Debugging: Find the Mistake",
    summary: "When something is wrong, check your steps and your numbers.",
    ageGroup: "teen",
    challenges: [
      {
        id: "dbg-1",
        type: "quiz",
        title: "Counting Too Much",
        concept: "debugging",
        prompt:
          "Bolt wants to clap 5 times, but he claps 6 times. What should you check first?",
        goal: "Recognize common loop boundary mistakes.",
        hints: ["Look at the start, end, and condition."],
        hint: "Off-by-one bugs usually come from the loop condition (<= vs <).",
        quiz: {
          kind: "multipleChoice",
          question: "It repeats 6 times instead of 5. What should you check first?",
          choices: [
            { id: "a", label: "The loop condition (<= vs <)" },
            { id: "b", label: "The computer battery" },
          ],
          correctChoiceId: "a",
          explanation: "This kind of mistake usually comes from the repeat condition.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Debugging means finding what is wrong." },
          { id: "s2", speaker: "Coach", text: "Check the repeat condition first." },
        ],
      },
      {
        id: "dbg-2",
        type: "quiz",
        title: "Score Not Changing",
        concept: "debugging",
        prompt:
          "Bolt scores a goal, but the scoreboard number stays the same. What should you check?",
        goal: "Practice debugging by inspection: variable updates + where code runs.",
        examples: ["Is the score updating?", "Did the update code run?"],
        hint: "Check whether the update code runs, and whether it updates the right variable.",
        quiz: {
          kind: "multipleChoice",
          question: "The score stays the same. What should you check first?",
          choices: [
            { id: "a", label: "Is the score update code running?" },
            { id: "b", label: "Is the right variable being updated?" },
          ],
          // allow either choice; frontend can treat this as reflective question
          correctChoiceId: "a",
          explanation: "Start by checking if update code runs, then confirm it updates the correct variable.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "If the number does not change, check the update." },
          { id: "s2", speaker: "Coach", text: "Did the update run? Did it change the right number?" },
        ],
      },
    ],
  },
];

