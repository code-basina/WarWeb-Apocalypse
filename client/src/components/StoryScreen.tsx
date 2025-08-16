import React from 'react';
import { Button } from '@/components/ui/button';

interface StoryScreenProps {
  gameState: any;
  onStartLevel: () => void;
  onBackToMenu: () => void;
}

export function StoryScreen({ gameState, onStartLevel, onBackToMenu }: StoryScreenProps) {
  return (
    <div className="min-h-screen bg-black">
      <div 
        className="relative min-h-screen bg-gradient-to-b from-cyber-dark to-black"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=60')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
          <div className="cyber-border bg-cyber-gray/30 backdrop-blur-sm p-8 animate-slide-up">
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-cyber-cyan mb-6 animate-glow">
              MISSION BRIEFING
            </h2>
            
            <div className="font-code text-base md:text-lg leading-relaxed space-y-4">
              <p className="text-cyber-muted">
                <span className="text-cyber-orange">[YEAR 2087]</span> The digital apocalypse has begun. 
                Rogue AI systems have corrupted the global network infrastructure.
              </p>
              
              <p className="text-white">
                You are humanity's last hope — a <span className="text-cyber-green">Code Warrior</span> 
                with the power to rebuild the web from the ground up.
              </p>
              
              <p className="text-cyber-cyan">
                Master the ancient languages of <span className="font-bold">HTML</span>, 
                <span className="font-bold"> CSS</span>, and <span className="font-bold"> JavaScript</span> 
                to restore order to the digital realm.
              </p>
              
              <div className="border-l-4 border-cyber-orange pl-4 my-6">
                <p className="text-cyber-orange font-semibold">
                  WARNING: Each coding challenge you complete brings you closer to the truth 
                  behind the apocalypse. Are you ready to save the world through code?
                </p>
              </div>
            </div>
            
            {/* Mission Objectives */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="border border-cyber-green/30 bg-cyber-dark/50 p-4">
                <h3 className="font-orbitron text-cyber-green font-bold mb-2">PRIMARY OBJECTIVES</h3>
                <ul className="font-code text-sm space-y-1 text-cyber-muted">
                  <li>• Master HTML structure</li>
                  <li>• Learn CSS styling</li>
                  <li>• Understand JavaScript</li>
                  <li>• Restore the network</li>
                </ul>
              </div>
              
              <div className="border border-cyber-cyan/30 bg-cyber-dark/50 p-4">
                <h3 className="font-orbitron text-cyber-cyan font-bold mb-2">CURRENT STATUS</h3>
                <div className="font-code text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-cyber-muted">Experience:</span>
                    <span className="text-white" data-testid="text-player-xp">{gameState.xp} XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyber-muted">Level:</span>
                    <span className="text-cyber-green" data-testid="text-player-level">RECRUIT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyber-muted">Progress:</span>
                    <span className="text-cyber-orange" data-testid="text-player-progress">{gameState.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                onClick={onStartLevel}
                className="cyber-border bg-gradient-to-r from-cyber-green/20 to-cyber-cyan/20 hover:from-cyber-green/40 hover:to-cyber-cyan/40 px-8 py-3 font-orbitron font-bold transition-all duration-300 hover:scale-105"
                data-testid="button-begin-mission"
              >
                BEGIN MISSION
              </Button>
              
              <Button
                onClick={onBackToMenu}
                className="border border-cyber-muted/30 bg-cyber-dark/50 hover:bg-cyber-muted/10 px-8 py-3 font-orbitron transition-all duration-300"
                data-testid="button-abort-mission"
              >
                ABORT MISSION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
