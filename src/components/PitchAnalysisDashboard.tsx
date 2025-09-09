import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, RotateCcw, Play, Pause, Volume2, ArrowRight, Eye, MessageSquare, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PerformanceSidebar } from "./PerformanceSidebar";
import { AudioPlayer } from "./AudioPlayer";
import { ImprovementSuggestions } from "./ImprovementSuggestions";

type PitchState = 'idle' | 'recording' | 'processing' | 'results';

interface ScoreResult {
  clarity: number;
  structure: number;
  confidence: number;
  eyeContact: number;
  facialExpression: number;
  handGestures: number;
  bodyPosture: number;
  vocalFeatures: number;
  speechFluency: number;
  wordUsage: number;
  sentenceAnalysis: number;
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
      category: 'Non Verbal',
      subcategory: 'Eye Contact',
      score: 66,
      status: 'needs-work',
      feedback: 'You could do a better job of maintaining eye contact with the interviewer.',
      improvement: 'Maintain eye contact for at least 75% of the duration'
    },
    {
      category: 'Non Verbal',
      subcategory: 'Facial Expressions',
      score: 75,
      status: 'good',
      feedback: 'Your facial expressions are generally appropriate and engaging.',
      improvement: 'Keep up your smile while speaking, to appear more confident'
    },
    {
      category: 'Delivery of Speech',
      subcategory: 'Vocal Features',
      score: 82,
      status: 'excellent',
      feedback: 'Excellent vocal delivery with good modulation and clarity.',
      improvement: 'Continue maintaining your natural pitch and tone'
    },
    {
      category: 'Content Strength',
      subcategory: 'Word Usage',
      score: 71,
      status: 'good',
      feedback: 'Good vocabulary usage with professional terminology.',
      improvement: 'Incorporate more specific industry keywords'
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
          eyeContact: 66,
          facialExpression: 75,
          handGestures: 80,
          bodyPosture: 88,
          vocalFeatures: 82,
          speechFluency: 85,
          wordUsage: 71,
          sentenceAnalysis: 73
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
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Comprehensive Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Detailed feedback on non-verbal communication, speech delivery, and content strength
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="detailed-feedback">Detailed Feedback</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
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
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4 border rounded-lg">
                          <h3 className="font-semibold mb-2">Non Verbal</h3>
                          <Badge className="mb-2 bg-orange-100 text-orange-600">On Track</Badge>
                          <p className="text-sm text-muted-foreground">
                            Focuses on your body language and provides insights to create a better visual impact on the recruiters.
                          </p>
                        </div>
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
                        <Eye className="w-5 h-5" />
                        Eye Contact
                        <Badge className="bg-orange-100 text-orange-600">On Track</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        You could do a better job of maintaining eye contact with the interviewer.
                      </p>
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Eye Contact Duration</span>
                          <span className="text-2xl font-bold text-orange-500">66%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>Min. Required</span>
                          <span>75%</span>
                        </div>
                        <Progress value={66} max={100} className="h-2" />
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Was it helpful?</span>
                        <Button variant="ghost" size="sm">👍</Button>
                        <Button variant="ghost" size="sm">👎</Button>
                      </div>

                      <div className="mt-6">
                        <Button variant="outline" className="w-full gap-2">
                          <ArrowRight className="w-4 h-4" />
                          Next steps for improving Eye Contact
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
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <ImprovementSuggestions />
      </div>
    </div>
  );
};

export default PitchAnalysisDashboard;