export interface GameLevel {
  id: number;
  title: string;
  mission: string;
  description: string;
  hint: string;
  requirements: {
    id: string;
    description: string;
    validator: (code: string) => boolean;
  }[];
  initialCode: string;
  successMessage: string;
  xpReward: number;
}

export const gameLevels: GameLevel[] = [
  {
    id: 1,
    title: "HTML FOUNDATION",
    mission: "Unlock the Bunker Door",
    description: "You've reached the entrance to an underground bunker. The door is controlled by an ancient HTML system that requires proper markup to unlock.",
    hint: "Use the <h1> tag to create a main heading. Remember to close your tag properly!",
    requirements: [
      {
        id: "h1-tag",
        description: "Create an <h1> element",
        validator: (code: string) => code.includes("<h1>") && code.includes("</h1>")
      },
      {
        id: "correct-text",
        description: 'Text: "BUNKER ACCESS GRANTED"',
        validator: (code: string) => code.includes("BUNKER ACCESS GRANTED")
      },
      {
        id: "valid-html",
        description: "Valid HTML syntax",
        validator: (code: string) => {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(code, 'text/html');
            return !doc.querySelector('parsererror');
          } catch {
            return false;
          }
        }
      }
    ],
    initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Bunker Access</title>
</head>
<body>
    <!-- Write your HTML here -->
    
</body>
</html>`,
    successMessage: "Excellent work, Code Warrior! You've successfully accessed the bunker. Your HTML skills are developing rapidly. The next challenge awaits...",
    xpReward: 500
  }
];

export const getLevel = (levelId: number): GameLevel | undefined => {
  return gameLevels.find(level => level.id === levelId);
};
