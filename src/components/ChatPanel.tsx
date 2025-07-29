import React, { useState, useRef, useEffect } from 'react';
import { Send, Settings, Menu, Calendar, Users, HelpCircle, Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatPanelProps {
  className?: string;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m CS-star, your university department assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message! I\'m here to help with information about courses, schedules, faculty, and department events. What would you like to know?',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const navItems = [
    { icon: Calendar, label: 'Timetable', id: 'timetable' },
    { icon: Users, label: 'Staff', id: 'staff' },
    { icon: Star, label: 'Events', id: 'events' },
    { icon: HelpCircle, label: 'FAQ', id: 'faq' },
  ];

  return (
    <div className={cn(
      'fixed right-0 top-0 h-screen w-1/2 bg-gradient-panel shadow-panel',
      'border-l border-border rounded-l-3xl overflow-hidden',
      'flex flex-col z-50',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="hover:bg-muted text-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">CS-star</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-muted text-foreground"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation Sidebar */}
      <div className={cn(
        'absolute left-0 top-0 h-full bg-card border-r border-border transition-transform duration-300 z-10',
        'w-64 transform',
        isNavOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="p-6 border-b border-border">
          <h2 className="font-semibold text-foreground">Quick Access</h2>
        </div>
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-muted text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.isUser ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[75%] p-4 rounded-2xl shadow-bubble transition-all duration-300 hover:shadow-glow',
                  message.isUser
                    ? 'bg-chat-bubble-user text-chat-bubble-user-foreground ml-4'
                    : 'bg-chat-bubble-bot text-chat-bubble-bot-foreground mr-4'
                )}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Section */}
      <div className="p-6 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about the department..."
              className="pr-12 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl resize-none min-h-[44px]"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-xl h-11 w-11 p-0 shadow-glow transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Overlay for navigation */}
      {isNavOpen && (
        <div
          className="absolute inset-0 bg-background/20 backdrop-blur-sm z-5"
          onClick={() => setIsNavOpen(false)}
        />
      )}
    </div>
  );
};