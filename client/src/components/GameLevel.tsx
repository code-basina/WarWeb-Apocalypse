import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CodeEditor } from './CodeEditor';
import { GameLevel as GameLevelType } from '@/lib/gameData';
import { validateCode, generateHtmlPreview, ValidationResult } from '@/lib/codeValidator';

interface GameLevelProps {
  level: GameLevelType;
  gameState: any;
  onSuccess: (xp: number) => void;
  onPause: () => void;
}

export function GameLevel({ level, gameState, onSuccess, onPause }: GameLevelProps) {
  const [code, setCode] = useState(level.initialCode);
  const [htmlPreview, setHtmlPreview] = useState('');
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [hints, setHints] = useState(0);

  useEffect(() => {
    // Update preview when code changes
    const preview = generateHtmlPreview(code);
    setHtmlPreview(preview);
    
    // Validate code in real-time
    const validationResult = validateCode(code, level);
    setValidation(validationResult);
  }, [code, level]);

  const handleRunCode = () => {
    if (validation?.isValid) {
      onSuccess(level.xpReward);
    }
  };

  const handleGetHint = () => {
    setHints(prev => prev + 1);
    // Could show progressive hints based on hints count
  };

  const handleResetCode = () => {
    setCode(level.initialCode);
  };

  const renderRequirement = (req: any) => {
    const isPassed = validation?.requirements[req.id] || false;
    return (
      <div key={req.id} className="flex items-center space-x-2">
        <span className="w-4 h-4 border border-cyber-muted flex items-center justify-center">
          {isPassed && <span className="text-cyber-green text-xs">✓</span>}
        </span>
        <span className={`text-cyber-muted ${isPassed ? 'text-cyber-green' : ''}`}>
          {req.description}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Level Header */}
      <div className="bg-cyber-gray border-b border-cyber-cyan/30 p-4">
        <div className="container mx-auto max-w-7xl flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="font-orbitron font-bold text-xl text-cyber-cyan">
              LEVEL {level.id}: {level.title}
            </h2>
            <div className="font-code text-sm text-cyber-muted">
              Mission: <span className="text-cyber-green">{level.mission}</span>
            </div>
          </div>
          
          {/* Player Stats */}
          <div className="flex items-center space-x-6 mt-2 sm:mt-0">
            <div className="font-code text-sm">
              <span className="text-cyber-muted">XP:</span>
              <span className="text-cyber-orange font-bold" data-testid="text-current-xp">{gameState.xp}</span>
            </div>
            <div className="font-code text-sm">
              <span className="text-cyber-muted">Lives:</span>
              <span className="text-cyber-green font-bold" data-testid="text-player-lives">❤️❤️❤️</span>
            </div>
            <Button
              onClick={onPause}
              className="border border-cyber-muted/30 px-3 py-1 text-sm font-code hover:bg-cyber-muted/10 transition-colors"
              data-testid="button-pause-game"
            >
              PAUSE
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Game Area */}
      <div className="container mx-auto max-w-7xl p-4 grid lg:grid-cols-2 gap-6 min-h-[calc(100vh-80px)]">
        
        {/* Left Panel: Challenge Description */}
        <div className="space-y-6">
          {/* Mission Brief */}
          <div className="cyber-border bg-cyber-gray/30 p-6">
            <h3 className="font-orbitron font-bold text-cyber-orange mb-4 text-xl">MISSION BRIEF</h3>
            
            <div className="font-code text-sm leading-relaxed space-y-3">
              <p className="text-white">{level.description}</p>
              
              <p className="text-cyber-cyan">
                <span className="text-cyber-orange">OBJECTIVE:</span> {level.mission}
              </p>
              
              <div className="bg-cyber-dark/50 p-3 border border-cyber-green/30">
                <p className="text-cyber-green font-bold mb-2">💡 HINT:</p>
                <p className="text-cyber-muted">{level.hint}</p>
              </div>
            </div>
            
            {/* Requirements Checklist */}
            <div className="mt-4 space-y-2">
              <h4 className="font-orbitron text-cyber-cyan font-bold">REQUIREMENTS:</h4>
              <div className="font-code text-xs space-y-1">
                {level.requirements.map(renderRequirement)}
              </div>
            </div>
          </div>
          
          {/* Live Preview */}
          <div className="cyber-border bg-cyber-dark/50 p-6">
            <h3 className="font-orbitron font-bold text-cyber-green mb-4 text-xl">LIVE PREVIEW</h3>
            <div className="border border-cyber-muted/30 bg-white text-black p-4 min-h-32 font-sans">
              <div dangerouslySetInnerHTML={{ __html: htmlPreview || '<p class="text-gray-500 italic">Your HTML output will appear here...</p>' }} />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleRunCode}
              className="cyber-border bg-gradient-to-r from-cyber-green/20 to-cyber-cyan/20 hover:from-cyber-green/40 hover:to-cyber-cyan/40 px-6 py-3 font-orbitron font-bold transition-all duration-300 flex-1"
              data-testid="button-run-code"
            >
              RUN CODE
            </Button>
            
            <Button
              onClick={handleGetHint}
              className="border border-cyber-orange/30 bg-cyber-orange/10 hover:bg-cyber-orange/20 px-6 py-3 font-orbitron transition-all duration-300"
              data-testid="button-get-hint"
            >
              GET HINT
            </Button>
            
            <Button
              onClick={handleResetCode}
              className="border border-cyber-muted/30 bg-cyber-dark/50 hover:bg-cyber-muted/10 px-6 py-3 font-orbitron transition-all duration-300"
              data-testid="button-reset-code"
            >
              RESET
            </Button>
          </div>
        </div>
        
        {/* Right Panel: Code Editor */}
        <div className="space-y-6">
          {/* Code Editor Header */}
          <div className="cyber-border bg-cyber-gray/30 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-orbitron font-bold text-cyber-cyan text-xl">CODE TERMINAL</h3>
              <div className="flex items-center space-x-4">
                <span className="font-code text-xs text-cyber-muted">HTML</span>
                <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <CodeEditor
              value={code}
              onChange={setCode}
              language="html"
              height={400}
            />
          </div>
          
          {/* Code Analysis */}
          <div className="cyber-border bg-cyber-dark/30 p-4">
            <h4 className="font-orbitron font-bold text-cyber-purple mb-3">SYSTEM ANALYSIS</h4>
            <div className="font-code text-sm space-y-2">
              {validation ? (
                <>
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 ${validation.isValid ? 'bg-cyber-green' : 'bg-cyber-orange'} rounded-full`}></span>
                    <span className="text-cyber-muted">
                      {validation.isValid ? 'All requirements met!' : `Progress: ${validation.progress.toFixed(0)}%`}
                    </span>
                  </div>
                  {validation.errors.length > 0 && (
                    <div className="mt-2">
                      {validation.errors.map((error, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                          <span className="text-red-400 text-xs">{error}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyber-orange rounded-full"></span>
                  <span className="text-cyber-muted">Analyzing code...</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="cyber-border bg-cyber-gray/20 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-orbitron font-bold text-cyber-cyan">MISSION PROGRESS</span>
              <span className="font-code text-cyber-orange" data-testid="text-mission-progress">
                {validation?.progress.toFixed(0) || 0}%
              </span>
            </div>
            <div className="w-full bg-cyber-dark border border-cyber-muted/30 h-2">
              <div 
                className="bg-gradient-to-r from-cyber-green to-cyber-cyan h-full transition-all duration-500"
                style={{ width: `${validation?.progress || 0}%` }}
              ></div>
            </div>
            <div className="mt-2 font-code text-xs text-cyber-muted">
              Complete the HTML challenge to unlock the bunker door
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
