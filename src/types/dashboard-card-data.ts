import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface DashboardCardData {
    title: string;
    content?: string;  
    total?: number;  
    active?: number; 
    image?: string | IconDefinition;
    link1?: string;  
    link2?: string; 
    colorClass?: string; 
    textColor?: string;  
    tableColor?: string;
    iconColor?: string; 
  }
  