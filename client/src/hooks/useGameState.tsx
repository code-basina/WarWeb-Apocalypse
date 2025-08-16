import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface GameState {
  currentLevel: number;
  xp: number;
  completedLevels: number[];
  achievements: string[];
  currentScreen: 'landing' | 'story' | 'game' | 'success';
  lives: number;
  progress: number;
}

const initialGameState: GameState = {
  currentLevel: 1,
  xp: 0,
  completedLevels: [],
  achievements: [],
  currentScreen: 'landing',
  lives: 3,
  progress: 0,
};

export function useGameState() {
  const [gameState, setGameState] = useLocalStorage<GameState>('webwar_gamestate', initialGameState);
  
  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const addXP = (amount: number) => {
    setGameState(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const completeLevel = (level: number, xpReward: number) => {
    setGameState(prev => ({
      ...prev,
      xp: prev.xp + xpReward,
      completedLevels: [...prev.completedLevels, level],
      progress: 100,
    }));
  };

  const addAchievement = (achievement: string) => {
    setGameState(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievement],
    }));
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  return {
    gameState,
    updateGameState,
    addXP,
    completeLevel,
    addAchievement,
    resetGame,
  };
}
