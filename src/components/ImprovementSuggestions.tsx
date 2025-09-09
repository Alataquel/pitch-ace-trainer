import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Eye, MessageSquare, Volume2, CheckCircle } from "lucide-react";

export function ImprovementSuggestions() {
  const improvements = [
    {
      icon: <Clock className="w-4 h-4" />,
      text: "Give adequate amount of time to answer the question"
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      text: "Incorporate key elements in your response"
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Showcase your skills relevant to the question"
    },
    {
      icon: <Eye className="w-4 h-4" />,
      text: "Keep up your smile while speaking, to appear more confident"
    },
    {
      icon: <Eye className="w-4 h-4" />,
      text: "Maintain eye contact for at least 75% of the duration"
    },
    {
      icon: <Volume2 className="w-4 h-4" />,
      text: "Speak slowly and clearly, maintaining your natural pitch, and make sure you are easily audible"
    },
    {
      icon: <Volume2 className="w-4 h-4" />,
      text: "Modulate your speech for effective communication"
    }
  ];

  return (
    <div className="w-96 border-l bg-card p-6 overflow-y-auto">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How to improve ?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get personalized feedback and recommendations on your interviews.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              View Detailed Feedback
            </Button>
          </CardContent>
        </Card>

        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Overall Improvements
          </h3>
          <div className="space-y-3">
            {improvements.map((improvement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                  {improvement.icon}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {improvement.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">Good Job</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span className="text-sm font-medium">On Track</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium">Needs Work</span>
            </div>
            <div className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              High Impact steps to improve your level score
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}