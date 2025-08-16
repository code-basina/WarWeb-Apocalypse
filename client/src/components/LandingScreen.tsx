import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingScreenProps {
  onStartGame: () => void;
}

export function LandingScreen({ onStartGame }: LandingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-black via-cyber-dark to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyber-green to-transparent opacity-50"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-cyber-cyan to-transparent opacity-30"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-cyber-purple to-transparent opacity-40"></div>
      </div>
      
      <div className="text-center z-10 animate-fade-in">
        {/* Game Title */}
        <h1 className="font-orbitron font-black text-6xl md:text-8xl mb-4 animate-glow">
          <span className="text-cyber-cyan">WEB</span>
          <span className="text-cyber-orange"> WAR:</span>
          <br />
          <span className="text-cyber-green">APOCALYPSE</span>
        </h1>
        
        {/* Subtitle */}
        <p className="font-code text-cyber-muted text-lg md:text-xl mb-8 animate-flicker">
          Learn Programming. Save Humanity. <span className="terminal-cursor text-cyber-cyan">|</span>
        </p>
        
        {/* Start Game Button */}
        <Button
          onClick={onStartGame}
          className="cyber-border bg-gradient-to-r from-cyber-purple/20 to-cyber-cyan/20 hover:from-cyber-purple/40 hover:to-cyber-cyan/40 px-12 py-4 font-orbitron font-bold text-xl transition-all duration-300 hover:scale-105 animate-glow"
          data-testid="button-start-game"
        >
          INITIALIZE MISSION
        </Button>
        
        {/* Progress Indicator */}
        <div className="mt-12 text-center">
          <p className="font-code text-cyber-muted text-sm mb-2">SYSTEM STATUS</p>
          <div className="w-64 mx-auto bg-cyber-gray border border-cyber-cyan/30 p-2">
            <div className="text-xs font-code">
              <div className="flex justify-between mb-1">
                <span className="text-cyber-green">READY TO DEPLOY</span>
                <span className="text-cyber-cyan">100%</span>
              </div>
              <div className="w-full bg-cyber-dark h-1">
                <div className="bg-gradient-to-r from-cyber-green to-cyber-cyan h-1 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
