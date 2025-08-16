import { GameLevel } from "./gameData";

export interface ValidationResult {
  isValid: boolean;
  requirements: Record<string, boolean>;
  errors: string[];
  progress: number;
}

export function validateCode(code: string, level: GameLevel): ValidationResult {
  const requirements: Record<string, boolean> = {};
  const errors: string[] = [];
  
  let passedCount = 0;
  
  for (const requirement of level.requirements) {
    try {
      const passed = requirement.validator(code);
      requirements[requirement.id] = passed;
      
      if (passed) {
        passedCount++;
      } else {
        errors.push(`Missing: ${requirement.description}`);
      }
    } catch (error) {
      requirements[requirement.id] = false;
      errors.push(`Error validating ${requirement.description}: ${error}`);
    }
  }
  
  const progress = (passedCount / level.requirements.length) * 100;
  const isValid = passedCount === level.requirements.length;
  
  return {
    isValid,
    requirements,
    errors,
    progress,
  };
}

export function generateHtmlPreview(code: string): string {
  try {
    // Extract the body content for preview
    const bodyMatch = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      return bodyMatch[1];
    }
    
    // If no body tags, return the code as-is (for simple HTML snippets)
    return code;
  } catch (error) {
    return `<p style="color: red;">Error: ${error}</p>`;
  }
}
