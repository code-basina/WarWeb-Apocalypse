import React, { useState } from 'react';
import { LandingScreen } from '@/components/LandingScreen';
import { StoryScreen } from '@/components/StoryScreen';
import { GameLevel } from '@/components/GameLevel';
import { SuccessModal } from '@/components/SuccessModal';
import { useGameState } from '@/hooks/useGameState';
import { getLevel } from '@/lib/gameData';

export default function Home() {
  const { gameState, updateGameState, completeLevel, addXP } = useGameState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const currentLevel = getLevel(gameState.currentLevel);

  const handleStartGame = () => {
    updateGameState({ currentScreen: 'story' });
  };

  const handleStartLevel = () => {
    updateGameState({ currentScreen: 'game' });
  };

  const handleBackToMenu = () => {
    updateGameState({ currentScreen: 'landing' });
  };

  const handleLevelSuccess = (xp: number) => {
    setEarnedXP(xp);
    completeLevel(gameState.currentLevel, xp);
    setShowSuccessModal(true);
  };

  const handleNextLevel = () => {
    setShowSuccessModal(false);
    // For now, just go back to landing since we only have Level 1
    updateGameState({ 
      currentScreen: 'landing',
      currentLevel: gameState.currentLevel + 1 
    });
  };

  const handleReviewCode = () => {
    setShowSuccessModal(false);
    // Could show code review or stay on current level
  };

  const handlePauseGame = () => {
    // Could show pause menu or go back to story
    updateGameState({ currentScreen: 'story' });
  };

  const renderCurrentScreen = () => {
    switch (gameState.currentScreen) {
      case 'landing':
        return <LandingScreen onStartGame={handleStartGame} />;
      
      case 'story':
        return (
          <StoryScreen
            gameState={gameState}
            onStartLevel={handleStartLevel}
            onBackToMenu={handleBackToMenu}
          />
        );
      
      case 'game':
        if (!currentLevel) {
          return (
            <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
              <div className="text-center">
                <h2 className="font-orbitron text-cyber-orange text-2xl mb-4">Level Not Found</h2>
                <button 
                  onClick={handleBackToMenu}
                  className="cyber-border bg-cyber-gray/30 px-6 py-3 font-orbitron"
                >
                  Return to Menu
                </button>
              </div>
            </div>
          );
        }
        
        return (
          <GameLevel
            level={currentLevel}
            gameState={gameState}
            onSuccess={handleLevelSuccess}
            onPause={handlePauseGame}
          />
        );
      
      default:
        return <LandingScreen onStartGame={handleStartGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      {renderCurrentScreen()}
      
      <SuccessModal
        isVisible={showSuccessModal}
        points={earnedXP}
        onNextLevel={handleNextLevel}
        onReviewCode={handleReviewCode}
      />
    </div>
  );
}
