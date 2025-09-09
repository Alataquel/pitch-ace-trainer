import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, MessageSquare, Target, Award, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PitchState = 'idle' | 'recording' | 'processing' | 'results';

interface ScoreResult {
  clarity: number;
  structure: number;
  confidence: number;
}

interface RewriteVariant {
  type: 'professional' | 'friendly' | 'concise';
  title: string;
  content: string;
}

const ElevatorPitchTrainer = () => {
  const [state, setState] = useState<PitchState>('idle');
  const [transcript, setTranscript] = useState('');
  const [scores, setScores] = useState<ScoreResult | null>(null);
  const [rewrites, setRewrites] = useState<RewriteVariant[]>([]);
  const { toast } = useToast();

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
          confidence: 82
        });
        setRewrites([
          {
            type: 'professional',
            title: 'Professional Version',
            content: "I'm Sarah Johnson, a Senior Software Engineer with five years of demonstrated expertise in full-stack development, specializing in React and Node.js ecosystems. My focus centers on architecting scalable, user-centric applications that address complex business challenges. I'm actively seeking senior-level opportunities within innovative organizations where I can drive technical excellence while expanding my expertise in emerging technologies."
          },
          {
            type: 'friendly',
            title: 'Friendly & Approachable',
            content: "Hey there! I'm Sarah, and I absolutely love building things that make people's lives easier. I've been coding for about 5 years now, mainly working with React and Node.js to create apps that people actually enjoy using. What really gets me excited is tackling those tricky problems and turning them into something simple and beautiful. I'm on the hunt for my next adventure with a team that's as passionate about innovation as I am!"
          },
          {
            type: 'concise',
            title: 'Concise & Direct',
            content: "Sarah Johnson. Five years full-stack development. React, Node.js specialist. I build user-friendly applications that solve real problems. Seeking innovative opportunities to drive impact while advancing in emerging tech."
          }
        ]);
        setState('results');
      }, 2000);
    }, 3000);
  };

  const handleStopRecording = () => {
    if (state === 'recording') {
      setState('processing');
      toast({
        title: "Processing",
        description: "Analyzing your pitch with AI...",
      });
    }
  };

  const handleReset = () => {
    setState('idle');
    setTranscript('');
    setScores(null);
    setRewrites([]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-light-blue/20 to-accent-blue/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-blue to-accent-blue">
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
        {state === 'idle' && (
          <div className="max-w-4xl mx-auto">
            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Voice Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced AI extracts key insights from your voice recording using Whisper technology
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Smart Scoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get precise scores on clarity, structure, and confidence to identify improvement areas
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>AI Rewrites</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Receive three enhanced versions: professional, friendly, and concise styles
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Recording Section */}
            <Card className="max-w-2xl mx-auto">
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

            {/* Tips Section */}
            <Card className="max-w-4xl mx-auto mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Tips for Best Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Speak Clearly</p>
                      <p className="text-muted-foreground">Find a quiet space and speak at a normal pace</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Include Key Details</p>
                      <p className="text-muted-foreground">Mention your role, experience, skills, and goals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Stay Focused</p>
                      <p className="text-muted-foreground">Keep it concise and relevant to your audience</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {state === 'recording' && (
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="py-12">
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
                  onClick={handleStopRecording}
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
        )}

        {state === 'processing' && (
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="py-12">
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
        )}

        {state === 'results' && scores && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Results Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Your Pitch Analysis</h2>
              <Button 
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Record New Pitch
              </Button>
            </div>

            {/* Transcript */}
            <Card>
              <CardHeader>
                <CardTitle>Your Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{transcript}</p>
              </CardContent>
            </Card>

            {/* Scores */}
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Scores</CardTitle>
                <CardDescription>
                  Your pitch performance across key dimensions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold">Clarity</div>
                    <div className={`text-4xl font-bold ${getScoreColor(scores.clarity)}`}>
                      {scores.clarity}%
                    </div>
                    <Badge variant={getScoreBadgeVariant(scores.clarity)}>
                      {scores.clarity >= 80 ? 'Excellent' : scores.clarity >= 60 ? 'Good' : 'Needs Improvement'}
                    </Badge>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold">Structure</div>
                    <div className={`text-4xl font-bold ${getScoreColor(scores.structure)}`}>
                      {scores.structure}%
                    </div>
                    <Badge variant={getScoreBadgeVariant(scores.structure)}>
                      {scores.structure >= 80 ? 'Excellent' : scores.structure >= 60 ? 'Good' : 'Needs Improvement'}
                    </Badge>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold">Confidence</div>
                    <div className={`text-4xl font-bold ${getScoreColor(scores.confidence)}`}>
                      {scores.confidence}%
                    </div>
                    <Badge variant={getScoreBadgeVariant(scores.confidence)}>
                      {scores.confidence >= 80 ? 'Excellent' : scores.confidence >= 60 ? 'Good' : 'Needs Improvement'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rewrites */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">AI-Enhanced Versions</h3>
              <div className="grid lg:grid-cols-3 gap-6">
                {rewrites.map((rewrite, index) => (
                  <Card key={index} className="hover:shadow-card transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        {rewrite.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {rewrite.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElevatorPitchTrainer;