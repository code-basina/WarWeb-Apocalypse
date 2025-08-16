import React from 'react';
import { Button } from '@/components/ui/button';

interface SuccessModalProps {
  isVisible: boolean;
  points: number;
  onNextLevel: () => void;
  onReviewCode: () => void;
}

export function SuccessModal({ isVisible, points, onNextLevel, onReviewCode }: SuccessModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="cyber-border bg-gradient-to-br from-cyber-dark to-cyber-gray p-8 max-w-md mx-4 animate-slide-up">
        <div className="text-center">
          {/* Success Animation */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto border-4 border-cyber-green rounded-full flex items-center justify-center animate-glow">
              <span className="text-3xl text-cyber-green">✓</span>
            </div>
          </div>
          
          <h3 className="font-orbitron font-bold text-2xl text-cyber-green mb-4">MISSION COMPLETED!</h3>
          
          <div className="font-code space-y-2 mb-6">
            <p className="text-cyber-cyan">
              🚪 BUNKER DOOR: <span className="text-cyber-green">UNLOCKED</span>
            </p>
            <p className="text-cyber-orange" data-testid="text-xp-earned">
              +{points} XP EARNED
            </p>
            <p className="text-cyber-purple">
              HTML MASTERY: +25%
            </p>
          </div>
          
          <div className="border border-cyber-muted/30 bg-cyber-dark/50 p-4 mb-6">
            <p className="font-code text-sm text-cyber-muted">
              "Excellent work, Code Warrior! You've successfully accessed the bunker. 
              Your HTML skills are developing rapidly. The next challenge awaits..."
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onNextLevel}
              className="cyber-border bg-gradient-to-r from-cyber-green/20 to-cyber-cyan/20 hover:from-cyber-green/40 hover:to-cyber-cyan/40 px-6 py-3 font-orbitron font-bold transition-all duration-300 flex-1"
              data-testid="button-next-mission"
            >
              NEXT MISSION
            </Button>
            
            <Button
              onClick={onReviewCode}
              className="border border-cyber-muted/30 bg-cyber-dark/50 hover:bg-cyber-muted/10 px-6 py-3 font-orbitron transition-all duration-300"
              data-testid="button-review-code"
            >
              REVIEW
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
