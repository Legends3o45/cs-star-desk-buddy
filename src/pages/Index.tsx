import React from 'react';
import { ChatPanel } from '@/components/ChatPanel';
import { DesktopBackground } from '@/components/DesktopBackground';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Desktop Background */}
      <DesktopBackground />
      
      {/* CS-star Chatbot Panel */}
      <ChatPanel />
    </div>
  );
};

export default Index;
