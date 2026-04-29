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
    title: "Steps in Order",
    summary: "Computers follow instructions in the exact order you give them. First thing first!",
    ageGroup: "kid",
    challenges: [
      {
        id: "seq-1",
        type: "quiz",
        title: "First Step Snack",
        concept: "sequencing",
        prompt:
          "Bolt wants to make a simple snack for class. Which step comes first?",
        goal: "Learn that order matters (what you do first comes first).",
        hints: ["You cannot eat it before you prepare it."],
        hint: "First thing first. Save the eating for the last step.",
        quiz: {
          kind: "multipleChoice",
          question: "Which step must come first?",
          choices: [
            { id: "a", label: "Put filling inside" },
            { id: "b", label: "Get the bread" },
            { id: "c", label: "Close the snack" },
            { id: "d", label: "Take the bite" },
          ],
          correctChoiceId: "b",
          explanation: "You must get the bread first. Then you add filling, close, and only then you take the bite.",
        },
        scenes: [
          {
            id: "s1",
            speaker: "Teacher",
            text: "Bolt, in life and in code, order matters. First: get the bread!",
          },
          { id: "s2", speaker: "Coach", text: "Great! Now plan the next steps." },
        ],
      },
      {
        id: "seq-2",
        type: "grid",
        title: "Tidy Desk Path",
        concept: "sequencing",
        prompt:
          "Bolt wants a clean desk before school work. Move step-by-step in the right order: clear the paper, put books away, then sit to write.",
        goal: "Practice planning steps from start to finish (in order).",
        examples: ["Clear paper -> Put books away -> Sit and write"],
        hint: "Clear the paper first. Then organize. Last: start writing.",
        grid: { width: 5, height: 5 },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 4, y: 0 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Teacher says: clear first, then tidy, then write!" },
          { id: "s2", speaker: "Coach", text: "Plan your order in your head before you move." },
        ],
      },
      {
        id: "seq-boss",
        type: "grid",
        title: "Launch Day Boss",
        concept: "sequencing",
        prompt:
          "Boss mission: Launch Bolt's small rocket model. You must do every step in the right order.",
        goal: "Practice a longer plan: first, middle, last.",
        hint: "Make a short plan: First step, Next step, Final step.",
        grid: { width: 7, height: 5, blocked: [{ x: 2, y: 2 }, { x: 4, y: 1 }, { x: 4, y: 2 }] },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 6, y: 0 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Boss time! One wrong order and the rocket fails!" },
          { id: "s2", speaker: "Coach", text: "Plan first. Then do each step exactly one after the other." },
        ],
      },
    ],
  },
  {
    id: "lesson-variables",
    title: "Variables: Value in a Box",
    summary: "A variable is a named box that holds a value. The value can change as you play.",
    ageGroup: "kid",
    challenges: [
      {
        id: "var-1",
        type: "quiz",
        title: "Marble Count",
        concept: "variables",
        prompt:
          "Bolt starts with 0 marbles. He gets 10 more marbles, then gets 5 more. How many marbles now?",
        goal: "See how a value changes when you add more.",
        examples: ["0 -> 10 -> 15"],
        hint: "The box value goes up when you add marbles.",
        quiz: {
          kind: "number",
          question:
            "Bolt starts with 0 marbles. He gets 10 more marbles, then gets 5 more. How many marbles now?",
          answer: 15,
          explanation: "10 + 5 = 15. The value in the variable changes when you add.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "This box is your marble count." },
          { id: "s2", speaker: "Coach", text: "Now add 10, then add 5. What is the new number?" },
        ],
      },
      {
        id: "var-2",
        type: "quiz",
        title: "Swap with Cup C",
        concept: "variables",
        prompt:
          "Cup A has juice, Cup B has water, and Cup C is empty. How do you swap A and B using Cup C?",
        goal: "Learn the idea of a temporary helper (temporary variable).",
        hints: ["Use Cup C as your helper cup."],
        hint: "Hold one drink in Cup C while you move the other.",
        quiz: {
          kind: "text",
          question:
            "How can you swap Cup A and Cup B using Cup C? (Use A, B, C steps.)",
          acceptableAnswers: [
            "A->C, B->A, C->B",
            "Pour A into C, pour B into A, pour C into B",
            "Put A into C, put B into A, put C into B",
            "A to C, B to A, C to B",
          ],
          explanation: "Cup C is the temporary helper. It keeps one value safe while you swap.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "To swap, you sometimes need a temporary helper." },
          { id: "s2", speaker: "Coach", text: "Cup C is that helper. Use it!" },
        ],
      },
      {
        id: "var-boss",
        type: "quiz",
        title: "Battery Tracker Boss",
        concept: "variables",
        prompt:
          "Boss mission: Bolt's station energy is changing. Energy starts at 20. Use 7, then gain 4, then use 10 again. What is the final energy?",
        goal: "Store the value, then update it step by step.",
        hint: "Do it in parts: minus 7, plus 4, minus 10.",
        quiz: {
          kind: "number",
          question:
            "Energy starts at 20. Bolt uses 7 energy, then gains 4, then uses 10. What is the final energy?",
          answer: 7,
          explanation: "20 - 7 + 4 - 10 = 7. The variable changes every time energy changes.",
        },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Oh no, my energy is going down!" },
          { id: "s2", speaker: "Coach", text: "Use the box for energy. Update carefully, one step at a time." },
        ],
      },
    ],
  },
  {
    id: "lesson-conditions",
    title: "If / Else Choices",
    summary: "Programs make choices. If this happens, do that. Otherwise, do something else.",
    ageGroup: "kid",
    challenges: [
      {
        id: "if-1",
        type: "quiz",
        title: "Raining Choice",
        concept: "conditionals",
        prompt:
          "If it is raining, Bolt should bring an umbrella. If it is NOT raining, Bolt should not.",
        goal: "Understand if/else as two paths: one for 'yes', one for 'no'.",
        examples: ["If raining -> umbrella", "Else -> no umbrella"],
        hint: "If/else helps the computer choose the right path.",
        quiz: {
          kind: "multipleChoice",
          question: "If it is raining, what should you do?",
          choices: [
            { id: "a", label: "Wear sunglasses" },
            { id: "b", label: "Open an umbrella" },
          ],
          correctChoiceId: "b",
          explanation: "If it rains, the rule says: umbrella first.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "If/else helps you choose the right action." },
          { id: "s2", speaker: "Coach", text: "When it rains, what do we choose? When it does not rain, what do we choose?" },
        ],
      },
      {
        id: "if-2",
        type: "grid",
        title: "Computer Lab Door",
        concept: "conditionals",
        prompt:
          "This door opens only if you have the key. What should Bolt do when you do NOT have the key?",
        goal: "Practice both outcomes: you have it, or you don't.",
        hints: ["No key? Then find a key next."],
        hint: "Don't forget the 'else' path, so Bolt never gets stuck.",
        grid: { width: 6, height: 4, blocked: [{ x: 2, y: 1 }, { x: 3, y: 1 }] },
        start: { x: 0, y: 3, dir: "E" },
        goalPos: { x: 5, y: 0 },
        scenes: [
          { id: "s1", speaker: "Narrator", text: "The lab door is locked." },
          { id: "s2", speaker: "Coach", text: "Key in your hand? Open it. No key? Then search for the key!" },
        ],
      },
      {
        id: "if-boss",
        type: "grid",
        title: "Rocky Path Shield (Boss)",
        concept: "conditionals",
        prompt:
          "Boss mission: Rocks keep blocking the way. Use if/else to choose the safe route.",
        goal: "Practice if/else in a harder mission.",
        hint: "If the path is blocked, choose another route.",
        grid: { width: 7, height: 5, blocked: [{ x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }] },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 6, y: 0 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Coach! The rocks are blocking the path!" },
          { id: "s2", speaker: "Coach", text: "If it is blocked -> change route. If not blocked -> go!" },
        ],
      },
    ],
  },
  {
    id: "lesson-loops",
    title: "Repeat Plans (Loops)",
    summary: "Loops help you repeat a plan again and again, without rewriting it each time.",
    ageGroup: "kid",
    challenges: [
      {
        id: "loop-1",
        type: "quiz",
        title: "Repeat Helper",
        concept: "loops",
        prompt:
          "Bolt repeats the same move many times. How do loops help?",
        goal: "Understand repetition as a loop.",
        examples: ["Repeat 10 times: move"],
        hint: "A loop repeats the same steps for a number of times.",
        quiz: {
          kind: "multipleChoice",
          question: "What does a loop help you do?",
          choices: [
            { id: "a", label: "Repeat steps" },
            { id: "b", label: "Delete steps" },
          ],
          correctChoiceId: "a",
          explanation: "Loops repeat steps so you dont have to write them again.",
        },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Loops are for repeating, not copy-paste!" },
          { id: "s2", speaker: "Coach", text: "Can you repeat the move 10 times with one loop?" },
        ],
      },
      {
        id: "loop-2",
        type: "grid",
        title: "Walk to the Prize",
        concept: "loops",
        prompt:
          "Bolt needs to move forward 5 steps to reach the prize. How can a loop help?",
        goal: "Connect loops to movement and counting.",
        hints: ["Repeat: moveForward 5 times"],
        hint: "Use a repeat-5 plan instead of 5 separate moves.",
        grid: { width: 6, height: 2 },
        start: { x: 0, y: 1, dir: "E" },
        goalPos: { x: 5, y: 1 },
        scenes: [
          { id: "s1", speaker: "Explorer", text: "The prize is far! We must move carefully." },
          { id: "s2", speaker: "Coach", text: "A loop repeats the same step again and again." },
        ],
      },
      {
        id: "loop-boss",
        type: "grid",
        title: "Power the Lights (Boss)",
        concept: "loops",
        prompt: "Boss mission: repeat the right moves to power the school lights.",
        goal: "Use repetition to solve a bigger path fast.",
        hint: "Look for a repeating pattern and loop it.",
        grid: { width: 8, height: 3, blocked: [{ x: 3, y: 1 }, { x: 5, y: 1 }] },
        start: { x: 0, y: 1, dir: "E" },
        goalPos: { x: 7, y: 1 },
        scenes: [
          { id: "s1", speaker: "Bolt", text: "Boss time! The lights will not turn on!" },
          { id: "s2", speaker: "Coach", text: "Use a loop: repeated steps, done correctly, will power it!" },
        ],
      },
    ],
  },
  {
    id: "lesson-functions",
    title: "Reusable Functions",
    summary: "A function is a named shortcut. You call it again and again without rewriting the steps.",
    ageGroup: "teen",
    challenges: [
      {
        id: "fn-1",
        type: "quiz",
        title: "What is a Function?",
        concept: "functions",
        prompt:
          "Bolt repeats the same steps again and again. What helps you reuse steps without rewriting?",
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
          { id: "s1", speaker: "Bolt", text: "Coach, I am doing the same moves again and again!" },
          { id: "s2", speaker: "Coach", text: "Yes! That is exactly what functions help with." },
        ],
      },
      {
        id: "fn-2",
        type: "grid",
        title: "Shortcut Mission",
        concept: "functions",
        prompt:
          "Use a function to repeat a move pattern and reach the goal.",
        goal: "Apply reusable commands to solve a grid mission.",
        hint: "Put the repeating part in the function, then call it.",
        grid: { width: 7, height: 5, blocked: [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }] },
        start: { x: 0, y: 4, dir: "E" },
        goalPos: { x: 6, y: 0 },
        scenes: [
          { id: "s1", speaker: "Coach", text: "Use your function to reach the goal faster." },
          { id: "s2", speaker: "Bolt", text: "One shortcut, many moves. Let's go!" },
        ],
      },
      {
        id: "final-boss",
        type: "grid",
        title: "Final Boss",
        concept: "functions",
        prompt:
          "Final boss mission: combine planning, repeating, and reusable functions to win!",
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
          { id: "s2", speaker: "Coach", text: "Stay calm. Plan first, then use your functions." },
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

