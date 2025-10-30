// VideoPlayer.tsx
import { Play, Pause, Volume2, VolumeX, Settings, Maximize, Minimize, SkipBack, SkipForward } from "lucide-react";
import { Button } from "../ui/button";
import type { VideoModule } from "../../pages/FormationPlayer";
import { useState, useRef, useEffect } from "react";

interface Props {
  video: VideoModule;
  onComplete: (id: number) => void;
}

export default function VideoPlayer({ video, onComplete }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Format time from seconds to MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setIsPlaying(false);
    onComplete(video.id);
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
      setCurrentTime(percent * duration);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
      if (newMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      {/* Video Player Container */}
      <div 
        ref={playerRef}
        className="relative bg-black aspect-video group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (isPlaying) {
            setTimeout(() => setShowControls(false), 1000);
          }
        }}
      >
        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
          onClick={togglePlay}
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Controls Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          
          {/* Bottom Controls Container */}
          <div className="absolute bottom-0 left-0 right-0">

            {/* Progress Bar - NOW AT THE BOTTOM */}
            <div 
              ref={progressRef}
              className="px-4 pt-2 pb-1 cursor-pointer group/progress"
              onClick={handleProgressClick}
            >
              <div className="w-full h-2 bg-gray-600/50 rounded-full group-hover/progress:h-3 transition-all">
                <div 
                  className="h-full bg-red-600 rounded-full relative group-hover/progress:bg-red-500 transition-colors"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg" />
                </div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="px-4 pb-4">
              {/* Main Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Play/Pause & Skip */}
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => skip(-10)}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <SkipBack size={20} />
                    </button>
                    <button 
                      onClick={togglePlay}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all"
                    >
                      {isPlaying ? <Pause size={24} color="white" /> : <Play size={24} color="white" />}
                    </button>
                    <button 
                      onClick={() => skip(10)}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <SkipForward size={20} />
                    </button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={toggleMute}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 accent-white cursor-pointer"
                    />
                  </div>

                  {/* Time Display */}
                  <span className="text-white text-sm font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Settings */}
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className={`text-white hover:text-gray-300 transition-colors ${
                      showSettings ? 'text-orange-400' : ''
                    }`}
                  >
                    <Settings size={20} />
                  </button>

                  {/* Fullscreen */}
                  <button 
                    onClick={toggleFullscreen}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="absolute bottom-20 right-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 min-w-48 border border-gray-600">
                <div className="text-white text-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Quality</span>
                    <select className="bg-gray-800 text-white rounded px-2 py-1 text-xs border border-gray-600">
                      <option>1080p</option>
                      <option>720p</option>
                      <option>480p</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Speed</span>
                    <select className="bg-gray-800 text-white rounded px-2 py-1 text-xs border border-gray-600">
                      <option>1.0x</option>
                      <option>1.25x</option>
                      <option>1.5x</option>
                      <option>2.0x</option>
                    </select>
                  </div>
                  <div className="border-t border-gray-600 pt-2">
                    <button className="text-orange-400 hover:text-orange-300 text-xs">
                      Keyboard shortcuts
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Big Play Button when paused */}
        {!isPlaying && (
          <button 
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all"
          >
            <div className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-8 rounded-full transition-all duration-300 transform hover:scale-110">
              <Play size={60} color="white" fill="white" />
            </div>
          </button>
        )}
      </div>

      {/* Video Info and Actions */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{video.title}</h2>
            <p className="text-gray-600 mt-1">Duration: {video.duration}</p>
          </div>
          
          <Button 
            onClick={() => onComplete(video.id)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Play size={18} />
            Mark as Completed
          </Button>
        </div>
      </div>
    </div>
  );
}