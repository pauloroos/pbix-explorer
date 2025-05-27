
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="group p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40 hover:border-neon-blue/50 transition-all duration-500 hover:shadow-lg hover:shadow-neon-blue/20 animate-float"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 group-hover:from-neon-blue/30 group-hover:to-neon-purple/30 transition-all duration-300">
          <Icon className="w-8 h-8 text-neon-blue group-hover:text-white transition-colors duration-300" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold group-hover:text-neon-blue transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
