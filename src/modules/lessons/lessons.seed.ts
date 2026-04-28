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

export const LESSONS_VERSION = "1.3.0";

// Seeded lesson content. Keep lesson/challenge IDs stable (attempts depend on challengeId).
export const SEEDED_LESSONS: Lesson[] = [
  {
    id: "lesson-sequencing",
    title: "Sequencing: Do steps in order",
    summary: "Learn that computers follow instructions in the exact order you give them.",
    ageGroup: "kid",
    challenges: [
      {
        id: "seq-1",
        type: "quiz",
        title: "Make a sandwich (in order)",
        concept: "sequencing",
        prompt:
          "Put these steps in the right order: (1) Eat it (2) Get bread (3) Put filling (4) Close sandwich.",
        goal: "Understand that order matters.",
        hints: ["Think: you can’t eat it before you make it."],
        hint: "Start with what must happen first, then what must happen last.",
        quiz: {
          kind: "multipleChoice",
          question: "Which step must come first?",
          choices: [
            { id: "a", label: "Eat it" },
            { id: "b", label: "Get bread" },
            { id: "c", label: "Put filling" },
            { id: "d", label: "Close sandwich" },
          ],
          correctChoiceId: "b",
          explanation: "You can’t eat before you make the sandwich.",
        },
        scenes: [
          {
            id: "s1",
            speaker: "Coach",
            text: "Computers follow steps in order. Let’s practice with a sandwich!",
          },
          { id: "s2", speaker: "Coach", text: "Put the steps in the best order." },
        ],
      },
      {
        id: "seq-2",
        type: "grid",
        title: "Robot tidy-up",
        concept: "sequencing",
        prompt:
          "A robot must tidy a room. Choose the best order: pick up toys, put books on shelf, make the bed, then celebrate.",
        goal: "Practice planning steps from start to finish.",
        examples: ["Pick up toys → Put books away → Make bed → Celebrate"],
        hint: "Do the biggest mess first, then finish with the fun reward.",
        grid: { width: 5, height: 5 },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 4, y: 0 },
        scenes: [
          { id: "s1", speaker: "Robot", text: "Beep! I will tidy the room step by step." },
          { id: "s2", speaker: "Coach", text: "Plan your steps before you move." },
        ],
      },
      {
        id: "seq-boss",
        type: "grid",
        title: "Launch the Rocket (Boss)",
        concept: "sequencing",
        prompt: "Boss mission: launch Bolt’s rocket by doing the right steps in order.",
        goal: "Show you can plan a longer sequence.",
        hint: "Break the mission into smaller steps and run them in order.",
        grid: { width: 7, height: 5, blocked: [{ x: 2, y: 2 }, { x: 4, y: 1 }, { x: 4, y: 2 }] },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 6, y: 0 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Countdown started! I need the steps in the right order!" },
          { id: "s2", speaker: "Coach", text: "Boss time. Plan first, then execute." },
        ],
      },
    ],
  },
  {
    id: "lesson-variables",
    title: "Variables: Remembering values",
    summary: "Use named boxes to store information like score, lives, or a secret word.",
    ageGroup: "kid",
    challenges: [
      {
        id: "var-1",
        type: "quiz",
        title: "Score keeper",
        concept: "variables",
        prompt:
          "You start with score = 0. You earn 10 points, then 5 points. What is score now?",
        goal: "See how a variable changes over time.",
        examples: ["score = 0 → score = 10 → score = 15"],
        hint: "A variable is like a label on a box. The number in the box can change.",
        quiz: {
          kind: "number",
          question:
            "You start with score = 0. You earn 10 points, then 5 points. What is score now?",
          answer: 15,
          explanation: "10 + 5 = 15. Variables can change as you add points.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Variables store values, like your score." },
          { id: "s2", speaker: "Coach", text: "Update the score as points are earned." },
        ],
      },
      {
        id: "var-2",
        type: "quiz",
        title: "Swap the cups",
        concept: "variables",
        prompt:
          "Cup A has 'juice' and Cup B has 'water'. How can you swap them using an empty Cup C?",
        goal: "Learn the idea of using a temporary variable.",
        hints: ["Use Cup C as a helper."],
        hint: "Use a temporary cup to hold one drink while you move the other.",
        quiz: {
          kind: "text",
          question: "How can you swap Cup A and Cup B using Cup C?",
          acceptableAnswers: [
            "A->C, B->A, C->B",
            "Pour A into C, pour B into A, pour C into B",
            "Put A into C, put B into A, put C into B",
          ],
          explanation: "Cup C works like a temporary variable.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Sometimes you need a temporary variable to swap values." },
          { id: "s2", speaker: "Coach", text: "Cup C is your temporary helper!" },
        ],
      },
      {
        id: "var-boss",
        type: "quiz",
        title: "Station Systems (Boss)",
        concept: "variables",
        prompt: "Boss mission: track energy carefully using variables.",
        goal: "Combine storing values and updating them correctly.",
        hint: "Update the value step by step and don’t lose track.",
        quiz: {
          kind: "number",
          question:
            "Energy starts at 20. Bolt uses 7 energy, then gains 4, then uses 10. What is the final energy?",
          answer: 7,
          explanation: "20 - 7 + 4 - 10 = 7. Variables change as you update them.",
        },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "The station’s energy is dropping!" },
          { id: "s2", speaker: "Coach", text: "Track it carefully in a variable and update it step by step." },
        ],
      },
    ],
  },
  {
    id: "lesson-conditions",
    title: "Conditions: If this, then that",
    summary: "Make decisions using rules like 'if it’s raining, take an umbrella'.",
    ageGroup: "kid",
    challenges: [
      {
        id: "if-1",
        type: "quiz",
        title: "Umbrella decision",
        concept: "conditionals",
        prompt:
          "Write the rule: If it’s raining, take an umbrella. Otherwise, wear sunglasses.",
        goal: "Understand if/else logic as a decision tree.",
        examples: ["If raining → umbrella", "Else → sunglasses"],
        hint: "Conditionals choose between two paths based on a rule.",
        quiz: {
          kind: "multipleChoice",
          question: "If it’s raining, what should you do?",
          choices: [
            { id: "a", label: "Wear sunglasses" },
            { id: "b", label: "Take an umbrella" },
          ],
          correctChoiceId: "b",
          explanation: "The 'if' rule says: if raining → umbrella.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "If/else helps programs make choices." },
          { id: "s2", speaker: "Coach", text: "What should we do when it rains? And when it doesn’t?" },
        ],
      },
      {
        id: "if-2",
        type: "grid",
        title: "Treasure door",
        concept: "conditionals",
        prompt:
          "A door opens only if you have a key. What should the program do when you don’t have a key?",
        goal: "Practice handling both outcomes (success and failure).",
        hints: ["Tell the player what to do next (find a key)."],
        hint: "Always handle the 'else' case so the player isn’t stuck.",
        grid: { width: 6, height: 4, blocked: [{ x: 2, y: 1 }, { x: 3, y: 1 }] },
        start: { x: 0, y: 3, dir: "E" },
        goalPos: { x: 5, y: 0 },
        scenes: [
          { id: "s1", speaker: "Narrator", text: "A locked door blocks the treasure." },
          { id: "s2", speaker: "Coach", text: "If you have a key, open it. Else, find the key!" },
        ],
      },
      {
        id: "if-boss",
        type: "grid",
        title: "Asteroid Shield (Boss)",
        concept: "conditionals",
        prompt: "Asteroids incoming! Use if/else logic to keep Bolt safe.",
        goal: "Practice conditionals in a harder grid mission.",
        hint: "Plan for both outcomes: safe path vs blocked path.",
        grid: { width: 7, height: 5, blocked: [{ x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }] },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 6, y: 0 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Coach! The asteroids are everywhere!" },
          { id: "s2", speaker: "Coach", text: "Use a condition: if the path is blocked, choose another route." },
        ],
      },
    ],
  },
  {
    id: "lesson-loops",
    title: "Loops: Repeat without rewriting",
    summary: "Repeat steps to save time, like doing 10 jumping jacks.",
    ageGroup: "kid",
    challenges: [
      {
        id: "loop-1",
        type: "quiz",
        title: "10 jumping jacks",
        concept: "loops",
        prompt:
          "Instead of writing 'jump' 10 times, use a loop to repeat it 10 times.",
        goal: "Understand repetition as a loop.",
        examples: ["Repeat 10 times: jump"],
        hint: "A loop repeats the same steps a certain number of times.",
        quiz: {
          kind: "multipleChoice",
          question: "What does a loop help you do?",
          choices: [
            { id: "a", label: "Repeat steps" },
            { id: "b", label: "Delete steps" },
          ],
          correctChoiceId: "a",
          explanation: "Loops are for repeating steps without rewriting them.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Loops help you repeat without copy-paste." },
          { id: "s2", speaker: "Coach", text: "Can you repeat 'jump' 10 times using one loop?" },
        ],
      },
      {
        id: "loop-2",
        type: "grid",
        title: "Walk to the treasure",
        concept: "loops",
        prompt:
          "You need to move forward 5 steps to reach treasure. How can a loop help?",
        goal: "Connect loops to movement and counting.",
        hints: ["Repeat: moveForward"],
        hint: "Use a repeat-5 loop instead of 5 separate moves.",
        grid: { width: 6, height: 2 },
        start: { x: 0, y: 1, dir: "E" },
        goalPos: { x: 5, y: 1 },
        scenes: [
          { id: "s1", speaker: "Explorer", text: "The treasure is far away!" },
          { id: "s2", speaker: "Coach", text: "A loop can help you walk the same step again and again." },
        ],
      },
      {
        id: "loop-boss",
        type: "grid",
        title: "Power the Moonbase (Boss)",
        concept: "loops",
        prompt: "Boss mission: repeat the right moves to power up the Moonbase.",
        goal: "Use repetition to solve a bigger path efficiently.",
        hint: "Find a repeating pattern and loop it.",
        grid: { width: 8, height: 3, blocked: [{ x: 3, y: 1 }, { x: 5, y: 1 }] },
        start: { x: 0, y: 1, dir: "E" },
        goalPos: { x: 7, y: 1 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "The Moonbase needs power fast!" },
          { id: "s2", speaker: "Coach", text: "A loop can do repeated steps for you." },
        ],
      },
    ],
  },
  {
    id: "lesson-functions",
    title: "Functions: Reusable commands",
    summary: "Create a named mini-program you can use again and again.",
    ageGroup: "teen",
    challenges: [
      {
        id: "fn-1",
        type: "quiz",
        title: "What’s a function?",
        concept: "functions",
        prompt:
          "Bolt keeps repeating the same steps. Which idea helps you reuse steps without rewriting them?",
        goal: "Understand that functions are reusable commands.",
        hint: "A function is a named set of steps you can call again.",
        quiz: {
          kind: "multipleChoice",
          question: "What is a function?",
          choices: [
            { id: "a", label: "A reusable set of steps you can call" },
            { id: "b", label: "A random mistake in code" },
            { id: "c", label: "Only a number" },
          ],
          correctChoiceId: "a",
          explanation: "Functions let you reuse steps by giving them a name.",
        },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Coach, I’m doing the same moves again and again!" },
          { id: "s2", speaker: "Coach", text: "Great time to learn functions: reusable shortcuts." },
        ],
      },
      {
        id: "fn-2",
        type: "grid",
        title: "Function Mission",
        concept: "functions",
        prompt:
          "Use a function to repeat a move pattern and reach the goal.",
        goal: "Apply reusable commands to solve a grid mission.",
        hint: "Put the repeating pattern into a function and call it.",
        grid: { width: 7, height: 5, blocked: [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }] },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 6, y: 0 },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Now use your function to solve the mission faster." },
          { id: "s2", speaker: "Bolt", text: "One function… many moves! Let’s go!" },
        ],
      },
      {
        id: "final-boss",
        type: "grid",
        title: "Final Boss",
        concept: "functions",
        prompt: "Final boss mission: combine planning, repetition, and smart choices to win.",
        goal: "Complete a longer mission using functions (and good structure).",
        hint: "Use small functions for repeated patterns and keep your plan clear.",
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
          { id: "s1", speaker: "Bolt", text: "This is it… the final mission!" },
          { id: "s2", speaker: "Coach", text: "Stay calm. Use your tools: functions and good plans." },
        ],
      },
    ],
  },
  {
    id: "lesson-debugging",
    title: "Debugging: Fixing mistakes",
    summary: "Learn to spot bugs by checking steps, inputs, and expected results.",
    ageGroup: "teen",
    challenges: [
      {
        id: "dbg-1",
        type: "quiz",
        title: "Off-by-one loop bug",
        concept: "debugging",
        prompt:
          "A loop is supposed to run 5 times but runs 6 times. What should you check first?",
        goal: "Recognize common loop boundary mistakes.",
        hints: ["Look at the start, end, and condition."],
        hint: "Off-by-one bugs usually come from the loop condition (<= vs <).",
        quiz: {
          kind: "multipleChoice",
          question: "A loop runs 6 times instead of 5. What should you check first?",
          choices: [
            { id: "a", label: "The loop condition (<= vs <)" },
            { id: "b", label: "The computer battery" },
          ],
          correctChoiceId: "a",
          explanation: "Off-by-one bugs often come from the condition boundary.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Debugging starts with checking your assumptions." },
          { id: "s2", speaker: "Coach", text: "Loop boundaries are a common source of bugs." },
        ],
      },
      {
        id: "dbg-2",
        type: "quiz",
        title: "Wrong variable updated",
        concept: "debugging",
        prompt:
          "Your score never changes even after collecting coins. What are 2 things you would inspect?",
        goal: "Practice debugging by inspection: variable updates + where code runs.",
        examples: ["Is score incrementing?", "Is the coin-collect code called?"],
        hint: "Check whether the update code runs, and whether it updates the right variable.",
        quiz: {
          kind: "multipleChoice",
          question: "Your score never changes. What should you check?",
          choices: [
            { id: "a", label: "Is the score update code running?" },
            { id: "b", label: "Is the right variable being updated?" },
          ],
          // allow either choice; frontend can treat this as reflective question
          correctChoiceId: "a",
          explanation: "Start by checking if update code runs, then confirm it updates the correct variable.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "When something doesn’t change, check the update." },
          { id: "s2", speaker: "Coach", text: "Is the code running? Is it changing the right thing?" },
        ],
      },
    ],
  },
];

