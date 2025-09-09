import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  duration: string;
}

export function AudioPlayer({ duration }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState([0]);
  const [volume, setVolume] = useState([80]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Recording</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Waveform placeholder */}
        <div className="h-20 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 rounded-lg flex items-center justify-center">
          <div className="flex items-center gap-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full animate-pulse"
                style={{ 
                  height: `${Math.random() * 40 + 10}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Time indicators */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>00:00</span>
          <span>00:02</span>
          <span>00:04</span>
          <span>00:06</span>
          <span>00:08</span>
          <span>00:10</span>
          <span>00:12</span>
        </div>

        {/* Playback controls */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="sm">
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            onClick={togglePlayPause}
            size="sm"
            className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm">
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Time progress */}
        <div className="space-y-2">
          <Slider
            value={currentTime}
            onValueChange={setCurrentTime}
            max={45}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime[0])}</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Time segments */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">
            00:04 - 00:07
          </Button>
          <Button variant="outline" size="sm">
            00:09 - 00:12
          </Button>
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </CardContent>
    </Card>
  );
}