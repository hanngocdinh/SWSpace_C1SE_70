import * as LucideIcons from 'lucide-react';

export const getIcon = (iconName: string, className = "w-8 h-8") => {
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
  
  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in lucide-react`);
    return null;
  }
  
  return <Icon className={className} />;
};