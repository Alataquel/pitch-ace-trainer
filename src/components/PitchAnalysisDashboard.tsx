import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, RotateCcw, Play, Pause, Volume2, ArrowRight, MessageSquare, Users, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PerformanceSidebar } from "./PerformanceSidebar";
import { AudioPlayer } from "./AudioPlayer";

type PitchState = 'idle' | 'recording' | 'processing' | 'results';

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

const PitchAnalysisDashboard = () => {
  const [state, setState] = useState<PitchState>('idle');
  const [transcript, setTranscript] = useState('');
  const [scores, setScores] = useState<ScoreResult | null>(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [currentPerformanceLevel, setCurrentPerformanceLevel] = useState(1);
  const { toast } = useToast();

  const detailedFeedback: DetailedFeedback[] = [
    {
      category: 'Delivery of Speech',
      subcategory: 'Vocal Features',
      score: 82,
      status: 'good',
      feedback: 'Good vocal delivery with appropriate tone and pitch variation.',
      improvement: 'Continue maintaining your natural pitch and tone'
    },
    {
      category: 'Delivery of Speech',
      subcategory: 'Appropriate Pauses',
      score: 88,
      status: 'excellent',
      feedback: 'Excellent use of pauses to emphasize key points and allow for comprehension.',
      improvement: 'Maintain this natural rhythm in your speech'
    },
    {
      category: 'Delivery of Speech',
      subcategory: 'Speech Fluency',
      score: 85,
      status: 'excellent',
      feedback: 'Smooth and fluent delivery with minimal hesitations.',
      improvement: 'Continue practicing to maintain this fluency level'
    },
    {
      category: 'Delivery of Speech',
      subcategory: 'Speech Modulation',
      score: 79,
      status: 'good',
      feedback: 'Good modulation with some variation in pace and emphasis.',
      improvement: 'Add more dynamic range to keep the audience engaged'
    },
    {
      category: 'Content Strength',
      subcategory: 'Word Usage',
      score: 71,
      status: 'good',
      feedback: 'Good vocabulary usage with professional terminology.',
      improvement: 'Incorporate more specific industry keywords'
    },
    {
      category: 'Content Strength',
      subcategory: 'Sentence Analysis',
      score: 68,
      status: 'needs-work',
      feedback: 'Sentence structure could be improved for better clarity and impact.',
      improvement: 'Use more varied sentence structures and stronger action words'
    },
    {
      category: 'Content Strength',
      subcategory: 'Skills',
      score: 65,
      status: 'needs-work',
      feedback: 'Skills and achievements could be presented more effectively.',
      improvement: 'Quantify your achievements and be more specific about your skills'
    }
  ];

  const handleStartRecording = () => {
    setState('recording');
    toast({
      title: "Recording Started",
      description: "Start delivering your elevator pitch now!",
    });
    
    // Simulate recording for demo
    setTimeout(() => {
      setState('processing');
      toast({
        title: "Processing",
        description: "Analyzing your pitch with AI...",
      });
      
      setTimeout(() => {
        // Demo data
        setTranscript("Hi, I'm Sarah, a software engineer with 5 years of experience in full-stack development. I specialize in React and Node.js, and I'm passionate about creating user-friendly applications that solve real-world problems. I'm currently looking for opportunities where I can contribute to innovative projects while growing my skills in emerging technologies.");
        setScores({
          clarity: 85,
          structure: 78,
          confidence: 82,
          vocalFeatures: 82,
          appropriatePauses: 88,
          speechFluency: 85,
          speechModulation: 79,
          wordUsage: 71,
          sentenceAnalysis: 68,
          skills: 65
        });
        setState('results');
      }, 2000);
    }, 3000);
  };

  const handleReset = () => {
    setState('idle');
    setTranscript('');
    setScores(null);
    setActiveTab('summary');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-orange-500';
      case 'needs-work': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent': return 'Good Job';
      case 'good': return 'On Track';
      case 'needs-work': return 'Needs Work';
      default: return '';
    }
  };

  if (state === 'idle') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-light-blue/20 to-accent-blue/10">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-hero">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative container mx-auto px-4 py-16 text-center text-white">
            <div className="mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                🚀 AI-Powered Pitch Analysis
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Elevator Pitch Trainer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              "Sell yourself in 60 seconds."
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              Perfect your elevator pitch with AI-powered feedback. Record your pitch, 
              get instant scoring on clarity, structure, and confidence, plus three 
              professionally crafted rewrites.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Recording Section */}
            <Card className="max-w-2xl mx-auto mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Ready to Record Your Pitch?</CardTitle>
                <CardDescription>
                  Click the microphone and deliver your elevator pitch. Aim for 30-60 seconds.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-8">
                  <Button 
                    onClick={handleStartRecording}
                    size="lg"
                    className="w-24 h-24 rounded-full bg-gradient-primary hover:scale-105 transition-transform duration-200"
                  >
                    <Mic className="w-8 h-8" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="flex items-center justify-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Ensure your microphone is working and you're in a quiet space
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Volume2 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Speech Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Detailed feedback on speech delivery, vocal features, and content strength
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Performance Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Professional interface with detailed scores and improvement suggestions
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Instant Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get immediate results with actionable insights to improve your pitch
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'recording') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-light-blue/20 to-accent-blue/10 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-primary flex items-center justify-center animate-pulse">
                <Mic className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Recording...</h2>
            <p className="text-muted-foreground mb-8">
              Speak clearly and deliver your elevator pitch now
            </p>
            <Button 
              onClick={() => setState('processing')}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <MicOff className="w-4 h-4" />
              Stop Recording
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (state === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-light-blue/20 to-accent-blue/10 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-12 text-center">
            <div className="mb-8">
              <div className="w-16 h-16 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Analyzing Your Pitch...</h2>
            <p className="text-muted-foreground">
              Our AI is transcribing your recording and analyzing clarity, structure, and confidence
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results view
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Elevator Pitch Trainer</h1>
              <p className="text-muted-foreground">Performance Analysis Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Current Performance</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">Level</span>
                  <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                    {currentPerformanceLevel}
                  </div>
                  <span className="text-muted-foreground">/5</span>
                </div>
              </div>
              <Button 
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Re-attempt
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Performance Sidebar */}
        <PerformanceSidebar scores={scores} detailedFeedback={detailedFeedback} />

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="detailed-feedback">Detailed Feedback</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Performance Cards */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Performance Level</CardTitle>
                      <CardDescription>
                        VMock considers a lot of parameters inside 3 core modules. Check how you performed on these parameters.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Delivery of Speech</h3>
                    <Badge className="mb-2 bg-orange-100 text-orange-600">On Track</Badge>
                    <p className="text-sm text-muted-foreground">
                      Analyzes speech on certain audio parameters & provides feedback symbolizing confidence in interview speech.
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Content Strength</h3>
                    <Badge className="mb-2 bg-red-100 text-red-600">Needs Work</Badge>
                    <p className="text-sm text-muted-foreground">
                      Evaluates the content to check the structure and presence of necessary elements in the interview response.
                    </p>
                  </div>
                </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Audio Player */}
                <div>
                  <AudioPlayer duration="00:45" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="detailed-feedback" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Volume2 className="w-5 h-5" />
                        Vocal Features
                        <Badge className="bg-orange-100 text-orange-600">On Track</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Good vocal delivery with appropriate tone and pitch variation.
                      </p>
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Vocal Quality Score</span>
                          <span className="text-2xl font-bold text-orange-500">82%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>Target Score</span>
                          <span>85%</span>
                        </div>
                        <Progress value={82} max={100} className="h-2" />
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Was it helpful?</span>
                        <Button variant="ghost" size="sm">👍</Button>
                        <Button variant="ghost" size="sm">👎</Button>
                      </div>

                      <div className="mt-6">
                        <Button variant="outline" className="w-full gap-2">
                          <ArrowRight className="w-4 h-4" />
                          Next steps for improving Vocal Features
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <AudioPlayer duration="00:45" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transcript" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Transcript</CardTitle>
                  <CardDescription>
                    AI-generated transcript from your pitch recording
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{transcript}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="improvements" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How to improve ?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get personalized feedback and recommendations on your pitch performance.
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Detailed Feedback
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Overall Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Give adequate amount of time to answer the question
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Incorporate key elements in your response
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Showcase your skills relevant to the question
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Volume2 className="w-4 h-4" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Speak slowly and clearly, maintaining your natural pitch, and make sure you are easily audible
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Volume2 className="w-4 h-4" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Modulate your speech for effective communication
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Good Job</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-sm font-medium">On Track</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm font-medium">Needs Work</span>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      High Impact steps to improve your level score
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PitchAnalysisDashboard;