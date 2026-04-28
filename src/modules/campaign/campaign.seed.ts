export type UnlockRule = { type: "always" };

export type CampaignLevel = {
  id: string;
  order: number;
  title: string;
  storyIntro: string;
  storyOutro?: string;
  lessonId: string;
  challengeId: string;
  unlockRule: UnlockRule;
  badgeOnComplete: string;
};

export type CampaignWorld = {
  id: string;
  title: string;
  subtitle: string;
  order: number;
  levels: CampaignLevel[];
};

export type Campaign = {
  version: string;
  worlds: CampaignWorld[];
};

export const CAMPAIGN_VERSION = "1.0.0";

export const SEEDED_CAMPAIGN: Campaign = {
  version: CAMPAIGN_VERSION,
  worlds: [
    {
      id: "world-launchpad",
      title: "Launchpad",
      subtitle: "Become a Rookie Coder",
      order: 1,
      levels: [
        {
          id: "lvl-1",
          order: 1,
          title: "First Steps",
          storyIntro: "Bolt wants to launch, but the checklist is mixed up!",
          lessonId: "lesson-sequencing",
          challengeId: "seq-1",
          unlockRule: { type: "always" },
          badgeOnComplete: "Launch Rookie",
        },
        {
          id: "lvl-2",
          order: 2,
          title: "Tidy Bot",
          storyIntro: "Bolt needs a tidy workspace. Give the robot a clear plan.",
          lessonId: "lesson-sequencing",
          challengeId: "seq-2",
          unlockRule: { type: "always" },
          badgeOnComplete: "Plan Maker",
        },
        {
          id: "lvl-3",
          order: 3,
          title: "Launch the Rocket (Boss)",
          storyIntro: "Boss time! Bolt can launch only if every step is correct.",
          lessonId: "lesson-sequencing",
          challengeId: "seq-boss",
          unlockRule: { type: "always" },
          badgeOnComplete: "Launch Captain",
        },
      ],
    },
    {
      id: "world-moonbase",
      title: "Moonbase",
      subtitle: "Power Up With Loops",
      order: 2,
      levels: [
        {
          id: "lvl-4",
          order: 1,
          title: "Repeat It",
          storyIntro: "Bolt is tired. Let’s use loops to save effort.",
          lessonId: "lesson-loops",
          challengeId: "loop-1",
          unlockRule: { type: "always" },
          badgeOnComplete: "Loop Learner",
        },
        {
          id: "lvl-5",
          order: 2,
          title: "March to the Treasure",
          storyIntro: "The path is long. A loop can handle the steps.",
          lessonId: "lesson-loops",
          challengeId: "loop-2",
          unlockRule: { type: "always" },
          badgeOnComplete: "Stepper",
        },
        {
          id: "lvl-6",
          order: 3,
          title: "Power the Moonbase (Boss)",
          storyIntro: "Boss time! Repeat the right moves to power the base.",
          lessonId: "lesson-loops",
          challengeId: "loop-boss",
          unlockRule: { type: "always" },
          badgeOnComplete: "Moon Engineer",
        },
      ],
    },
    {
      id: "world-asteroid-belt",
      title: "Asteroid Belt",
      subtitle: "Make Smart Decisions",
      order: 3,
      levels: [
        {
          id: "lvl-7",
          order: 1,
          title: "If It Rains",
          storyIntro: "Asteroids ahead! Decide what to do based on the situation.",
          lessonId: "lesson-conditions",
          challengeId: "if-1",
          unlockRule: { type: "always" },
          badgeOnComplete: "Decision Maker",
        },
        {
          id: "lvl-8",
          order: 2,
          title: "Locked Door",
          storyIntro: "Only the right condition opens the door.",
          lessonId: "lesson-conditions",
          challengeId: "if-2",
          unlockRule: { type: "always" },
          badgeOnComplete: "Key Keeper",
        },
        {
          id: "lvl-9",
          order: 3,
          title: "Asteroid Shield (Boss)",
          storyIntro: "Boss time! Choose correctly or the shield fails.",
          lessonId: "lesson-conditions",
          challengeId: "if-boss",
          unlockRule: { type: "always" },
          badgeOnComplete: "Shield Master",
        },
      ],
    },
    {
      id: "world-space-station",
      title: "Space Station",
      subtitle: "Store Values With Variables",
      order: 4,
      levels: [
        {
          id: "lvl-10",
          order: 1,
          title: "Score Boost",
          storyIntro: "Bolt earns points. Track them in a variable!",
          lessonId: "lesson-variables",
          challengeId: "var-1",
          unlockRule: { type: "always" },
          badgeOnComplete: "Score Keeper",
        },
        {
          id: "lvl-11",
          order: 2,
          title: "The Swap Trick",
          storyIntro: "To swap values, you’ll need a temporary helper.",
          lessonId: "lesson-variables",
          challengeId: "var-2",
          unlockRule: { type: "always" },
          badgeOnComplete: "Swap Wizard",
        },
        {
          id: "lvl-12",
          order: 3,
          title: "Station Systems (Boss)",
          storyIntro: "Boss time! Keep track of values correctly to save the station.",
          lessonId: "lesson-variables",
          challengeId: "var-boss",
          unlockRule: { type: "always" },
          badgeOnComplete: "Station Operator",
        },
      ],
    },
    {
      id: "world-galaxy-lab",
      title: "Galaxy Lab",
      subtitle: "Build With Functions",
      order: 5,
      levels: [
        {
          id: "lvl-13",
          order: 1,
          title: "What’s a Function?",
          storyIntro: "Bolt wants a shortcut. Functions are reusable shortcuts!",
          lessonId: "lesson-functions",
          challengeId: "fn-1",
          unlockRule: { type: "always" },
          badgeOnComplete: "Function Finder",
        },
        {
          id: "lvl-14",
          order: 2,
          title: "Function Mission",
          storyIntro: "Use your function to beat the lab maze.",
          lessonId: "lesson-functions",
          challengeId: "fn-2",
          unlockRule: { type: "always" },
          badgeOnComplete: "Lab Coder",
        },
        {
          id: "lvl-15",
          order: 3,
          title: "Final Boss",
          storyIntro: "Final boss! Combine everything you learned to win.",
          lessonId: "lesson-functions",
          challengeId: "final-boss",
          unlockRule: { type: "always" },
          badgeOnComplete: "Galaxy Hero",
        },
      ],
    },
  ],
};

