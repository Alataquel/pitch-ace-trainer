import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, Mic, Zap, MessageSquare, FileText, Cog, Pause, Settings } from "lucide-react";

interface ScoreResult {
  clarity: number;
  structure: number;
  confidence: number;
  vocalFeatures: number;
  appropriatePauses: number;
  speechFluency: number;
  speechModulation: number;
  wordUsage: number;
  sentenceAnalysis: number;
  skills: number;
}

interface DetailedFeedback {
  category: string;
  subcategory: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-work';
  feedback: string;
  improvement: string;
}

interface PerformanceSidebarProps {
  scores: ScoreResult | null;
  detailedFeedback: DetailedFeedback[];
}

export function PerformanceSidebar({ scores, detailedFeedback }: PerformanceSidebarProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent': return { label: 'Good Job', color: 'bg-green-100 text-green-700' };
      case 'good': return { label: 'On Track', color: 'bg-orange-100 text-orange-600' };
      case 'needs-work': return { label: 'Needs Work', color: 'bg-red-100 text-red-600' };
      default: return { label: '', color: '' };
    }
  };

  const getIcon = (subcategory: string) => {
    switch (subcategory.toLowerCase()) {
      case 'vocal features': return <Volume2 className="w-5 h-5" />;
      case 'appropriate pauses': return <Pause className="w-5 h-5" />;
      case 'speech fluency': return <Mic className="w-5 h-5" />;
      case 'speech modulation': return <Settings className="w-5 h-5" />;
      case 'word usage': return <MessageSquare className="w-5 h-5" />;
      case 'sentence analysis': return <FileText className="w-5 h-5" />;
      case 'skills': return <Zap className="w-5 h-5" />;
      default: return <Cog className="w-5 h-5" />;
    }
  };

  const categoryItems = [
    {
      category: 'Delivery of Speech',
      color: 'bg-orange-100 text-orange-600',
      status: 'On Track',
      items: detailedFeedback.filter(item => item.category === 'Delivery of Speech')
    },
    {
      category: 'Content Strength',
      color: 'bg-red-100 text-red-600',
      status: 'Needs Work',
      items: detailedFeedback.filter(item => item.category === 'Content Strength')
    }
  ];

  return (
    <div className="w-80 border-r bg-card p-6 overflow-y-auto">
      <div className="space-y-6">
        {categoryItems.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">{category.category}</h3>
              <Badge className={category.color}>
                {category.status}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {category.items.map((item, index) => {
                const statusBadge = getStatusBadge(item.status);
                return (
                  <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.status === 'excellent' ? 'bg-green-100 text-green-600' :
                          item.status === 'good' ? 'bg-orange-100 text-orange-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {getIcon(item.subcategory)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.subcategory}</div>
                          <Badge className={`text-xs ${statusBadge.color}`}>
                            {statusBadge.label}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}