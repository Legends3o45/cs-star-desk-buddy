import React from 'react';
import { cn } from '@/lib/utils';

interface DesktopBackgroundProps {
  className?: string;
}

export const DesktopBackground: React.FC<DesktopBackgroundProps> = ({ className }) => {
  return (
    <div className={cn(
      'fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
      'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900',
      className
    )}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Floating orbs for ambient effect */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      
      {/* Content overlay to demonstrate desktop environment */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-slate-400">
          <h1 className="text-4xl font-light mb-4">University Desktop</h1>
          <p className="text-lg opacity-70">CS-star Assistant is ready to help</p>
        </div>
      </div>
    </div>
  );
};