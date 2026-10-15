import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, RefreshCw, CheckCircle, AlertTriangle, 
  Sparkles, Check, Info, Trash2, ArrowRight, ShieldCheck, 
  Layers, Volume2, CornerDownRight, Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SAMPLE_ITEMS } from '../data/sampleItems';
import { classifyWaste } from '../services/wasteClassifier';
import { sound } from '../utils/audio';

export default function WasteScanner({ onSortComplete }) {
  const [activeItem, setActiveItem] = useState(SAMPLE_ITEMS[0]);
  const [previewImage, setPreviewImage] = useState(SAMPLE_ITEMS[0].imageUrl);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState({ percent: 0, message: '' });
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('environment'); // 'environment' or 'user'
  const [hasLoggedCurrent, setHasLoggedCurrent] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  const fileInputRef = useRef(null);
  const cameraCaptureInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const requestCameraStream = async (facing) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Camera API not supported in this browser. Please use photo upload or native device camera.');
    }

    // Attempt 1: Ideal facingMode and resolution
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
    } catch (err1) {
      console.warn('Ideal facingMode constraint failed, attempting general video fallback:', err1);
    }

    // Attempt 2: Fallback to basic video (works seamlessly on desktop Mac FaceTime cameras & webcams)
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
  };

  const startCamera = async (overrideFacing) => {
    const targetFacing = overrideFacing || cameraFacing;
    try {
      setCameraError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      const stream = await requestCameraStream(targetFacing);
      streamRef.current = stream;
      setIsCameraActive(true);

      // If video ref is already mounted
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.setAttribute('autoplay', 'true');
        videoRef.current.setAttribute('muted', 'true');
        videoRef.current.play().catch(e => console.warn('Play error:', e));
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      let errorMsg = 'Could not open camera. ';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMsg += 'Camera permission was denied. Please allow camera permissions in your browser address bar.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMsg += 'No camera device found on this machine.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMsg += 'Camera is currently in use by another application (e.g. Zoom or FaceTime).';
      } else {
        errorMsg += (err.message || 'Please use Photo Upload or Take Photo.');
      }
      setCameraError(errorMsg);
      setIsCameraActive(false);
    }
  };

  const setVideoRef = (node) => {
    videoRef.current = node;
    if (node && streamRef.current) {
      if (node.srcObject !== streamRef.current) {
        node.srcObject = streamRef.current;
      }
      node.playsInline = true;
      node.muted = true;
      node.autoplay = true;

      // Wait for metadata to load before playing
      node.onloadedmetadata = () => {
        const playPromise = node.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            if (err.name !== 'AbortError') {
              console.warn('Video play error:', err);
            }
          });
        }
      };

      // Also trigger play if already ready
      if (node.readyState >= 2) {
        node.play().catch(err => {
          if (err.name !== 'AbortError') console.warn(err);
        });
      }
    }
  };

  const captureCameraSnapshot = () => {
    if (!videoRef.current) return;
    try {
      const video = videoRef.current;
      const w = (video.videoWidth && video.videoWidth > 0) ? video.videoWidth : 1280;
      const h = (video.videoHeight && video.videoHeight > 0) ? video.videoHeight : 720;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      
      stopCameraStream();
      setPreviewImage(dataUrl);
      runAnalysis(dataUrl, { customImage: true });
    } catch (err) {
      console.error('Error capturing camera snapshot:', err);
      stopCameraStream();
    }
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setPreviewImage(dataUrl);
      runAnalysis(dataUrl, { customImage: true });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const selectPreset = (sample) => {
    if (isAnalyzing) return;
    stopCameraStream();
    setPreviewImage(sample.imageUrl);
    runAnalysis(sample.imageUrl, { presetId: sample.id });
  };

  const runAnalysis = async (imageSource, options = {}) => {
    setIsAnalyzing(true);
    setHasLoggedCurrent(false);
    sound.playScanStart();

    try {
      const result = await classifyWaste(imageSource, {
        presetId: options.presetId,
        onProgress: (p) => setAnalysisProgress(p)
      });
      
      setActiveItem(result);
      sound.playScanSuccess();
    } catch (err) {
      console.error('Classification error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCommitSort = () => {
    if (hasLoggedCurrent || !activeItem) return;
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#10b981', '#10e283', '#a3e635', '#38bdf8']
    });

    setHasLoggedCurrent(true);
    if (onSortComplete) {
      onSortComplete(activeItem);
    }
  };

  // Bin style helper
  const getBinMeta = (binType) => {
    switch (binType) {
      case 'blue':
        return {
          bg: 'bg-blue-600/15 border-blue-500/40 text-blue-400',
          badge: 'bg-blue-600 text-white',
          glow: 'shadow-[0_0_20px_rgba(37,99,235,0.25)]',
          icon: '♻️',
          label: 'Curbside Blue Bin (Recycling)'
        };
      case 'green':
        return {
          bg: 'bg-emerald-600/15 border-emerald-500/40 text-emerald-400',
          badge: 'bg-emerald-600 text-white',
          glow: 'shadow-[0_0_20px_rgba(16,185,129,0.25)]',
          icon: '🌱',
          label: 'Green Compost Bin (Organics)'
        };
      case 'red':
        return {
          bg: 'bg-red-600/15 border-red-500/40 text-red-400',
          badge: 'bg-red-600 text-white',
          glow: 'shadow-[0_0_20px_rgba(220,38,38,0.25)]',
          icon: '⚠️',
          label: 'Hazardous / E-Waste Drop-off'
        };
      case 'black':
      default:
        return {
          bg: 'bg-neutral-800/60 border-neutral-600/40 text-neutral-300',
          badge: 'bg-neutral-700 text-white',
          glow: 'shadow-[0_0_20px_rgba(100,116,139,0.25)]',
          icon: '🗑️',
          label: 'Black Landfill Bin (General Waste)'
        };
    }
  };

  const binMeta = getBinMeta(activeItem?.bin?.type);

  return (
    <section id="demo" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span>AI Optical Classifier Studio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Live AI Waste Identification
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Upload any packaging item, activate your device camera, or click a verified sample item below to see instant polymer classification, step-by-step prep tips, and verified LCA impact.
          </p>
        </div>

        {/* Preset Sample Items Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <span>One-Click Verification Samples:</span>
            </span>
            <span className="text-xs text-emerald-400 font-mono">5 Curated Materials</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {SAMPLE_ITEMS.map((sample) => {
              const isSelected = activeItem?.name === sample.name;
              return (
                <button
                  key={sample.id}
                  onClick={() => selectPreset(sample)}
                  className={`group text-left p-2.5 rounded-2xl border transition-all duration-200 flex items-center space-x-3 ${
                    isSelected 
                      ? 'border-emerald-400 bg-emerald-950/60 shadow-glow-sm' 
                      : 'border-emerald-500/20 bg-eco-surface/70 hover:border-emerald-500/40 hover:bg-eco-surface'
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/50 flex-shrink-0 relative">
                    <img 
                      src={sample.imageUrl} 
                      alt={sample.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    <span className={`absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full ${
                      sample.bin.type === 'blue' ? 'bg-blue-400' :
                      sample.bin.type === 'green' ? 'bg-emerald-400' :
                      sample.bin.type === 'red' ? 'bg-red-400' : 'bg-slate-400'
                    }`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-white truncate group-hover:text-emerald-300">
                      {sample.category}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {sample.name.split(' ')[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Centerpiece Grid: Scanner Viewport (Left) & Result Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Scanner Viewport / Upload Box (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 min-h-[420px] sm:min-h-[480px] flex flex-col justify-between p-6 ${
                isDragging 
                  ? 'border-emerald-400 bg-emerald-950/50 scale-[1.01]' 
                  : 'border-emerald-500/25 bg-eco-surface/90 glass-panel shadow-2xl'
              }`}
            >
              
              {/* Camera Active Viewport */}
              {isCameraActive ? (
                <div className="absolute inset-0 z-30 bg-black flex flex-col justify-between p-4 sm:p-6">
                  {/* Top Bar inside Camera */}
                  <div className="flex items-center justify-between z-20">
                    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-lime-500/40 text-xs font-mono text-lime-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                      <span className="font-bold">LIVE CAMERA VIEW</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
                          setCameraFacing(nextFacing);
                          startCamera(nextFacing);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-black/80 hover:bg-black border border-white/20 text-white text-xs font-mono flex items-center space-x-1.5 transition-colors"
                        title="Flip Camera"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Flip</span>
                      </button>
                      <button
                        onClick={stopCameraStream}
                        className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  {/* Video Stream Element */}
                  <video
                    ref={setVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />

                  {/* Center Target Box / Reticle */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
                    <div className="w-56 h-64 border-2 border-dashed border-lime-400/80 rounded-2xl relative shadow-[0_0_30px_rgba(163,230,53,0.3)]">
                      <span className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 border-lime-400" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 border-lime-400" />
                      <span className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-lime-400" />
                      <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-lime-400" />
                      <div className="absolute -bottom-8 inset-x-0 text-center text-[11px] font-mono text-lime-300 bg-black/80 py-1 rounded px-2">
                        Position waste item in center
                      </div>
                    </div>
                  </div>

                  {/* Large Unmissable Shutter Button at Bottom */}
                  <div className="z-20 flex flex-col items-center justify-center space-y-2 pb-2">
                    <button
                      type="button"
                      onClick={captureCameraSnapshot}
                      className="group relative flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400 hover:from-emerald-300 hover:to-lime-300 text-slate-950 font-black text-sm sm:text-base tracking-wide shadow-glow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-4 h-4 rounded-full border-2 border-slate-950 bg-white group-hover:scale-110 transition-transform" />
                      <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950" />
                      <span className="uppercase font-extrabold">CAPTURE PHOTO NOW</span>
                    </button>
                    <span className="text-[11px] font-mono text-slate-200 bg-black/75 px-3 py-1 rounded-full">
                      Click to freeze frame & run AI classification
                    </span>
                  </div>
                </div>
              ) : (
                /* Static Image View / Backdrop */
                <>
                  <div className="absolute inset-0 z-0">
                    <img
                      src={previewImage}
                      alt="Active waste item"
                      className="w-full h-full object-cover filter brightness-[0.88] transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-eco-darkest via-eco-darkest/40 to-eco-darkest/60" />
                  </div>

                  {/* Scanning Laser Beam (While Analyzing) */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 pointer-events-none z-20">
                      <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-lime-400 to-transparent shadow-[0_0_20px_#a3e635] animate-scan" />
                      <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[1px] animate-pulse" />
                    </div>
                  )}

                  {/* Dynamic Bounding Box Overlay */}
                  <div 
                    className={`absolute z-10 border-2 rounded-xl pointer-events-none transition-all duration-500 ${
                      isAnalyzing 
                        ? 'border-lime-400/80 shadow-[0_0_20px_rgba(163,230,53,0.3)]' 
                        : 'border-emerald-400/60 shadow-glow-sm'
                    }`}
                    style={{
                      left: `${activeItem?.boundingBox?.x || 25}%`,
                      top: `${activeItem?.boundingBox?.y || 15}%`,
                      width: `${activeItem?.boundingBox?.width || 50}%`,
                      height: `${activeItem?.boundingBox?.height || 70}%`,
                    }}
                  >
                    {/* Reticle Corner Brackets */}
                    <span className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-lime-400" />
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-lime-400" />
                    <span className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-lime-400" />
                    <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-lime-400" />
                    
                    {/* Bounding box label tag */}
                    <div className="absolute -top-7 left-0 px-2 py-0.5 rounded bg-black/80 border border-emerald-400/40 text-[10px] font-mono text-emerald-300 flex items-center space-x-1 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{activeItem?.name || 'Classifying item'}</span>
                      <span className="text-lime-300">({activeItem?.confidence || 98}%)</span>
                    </div>
                  </div>

                  {/* Viewport Header Controls */}
                  <div className="relative z-20 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/30 text-xs font-mono text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Optical Sensor: Ready</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 border border-emerald-500/30 text-xs font-medium text-slate-200 hover:text-white transition-all flex items-center space-x-1.5 shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Upload</span>
                      </button>

                      <button
                        onClick={() => cameraCaptureInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 border border-emerald-500/30 text-xs font-medium text-slate-200 hover:text-white transition-all flex items-center space-x-1.5 shadow-sm"
                        title="Take a photo with your device camera"
                      >
                        <Camera className="w-3.5 h-3.5 text-lime-400" />
                        <span>Take Photo</span>
                      </button>

                      <button
                        onClick={() => startCamera()}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center space-x-1.5 shadow-glow-sm"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Live Camera</span>
                      </button>
                    </div>
                  </div>

                  {/* Hidden file input for file selection */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                    }}
                  />

                  {/* Hidden file input for native device camera capture (especially on mobile) */}
                  <input
                    ref={cameraCaptureInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                    }}
                  />

                  {/* Viewport Footer / Analysis Progress Overlay */}
                  <div className="relative z-20">
                    {isAnalyzing ? (
                      <div className="p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-lime-500/40 space-y-2.5 shadow-2xl">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center space-x-2 text-lime-400">
                            <RefreshCw className="w-4 h-4 animate-spin text-lime-400" />
                            <span className="font-semibold">{analysisProgress.message || 'Analyzing item structure...'}</span>
                          </div>
                          <span className="text-white font-bold">{analysisProgress.percent}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-2 bg-gradient-to-r from-emerald-500 via-lime-400 to-sky-400 transition-all duration-300"
                            style={{ width: `${analysisProgress.percent}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-xs text-slate-300">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-emerald-400">DRAG & DROP</span>
                          <span>any image, snap a photo, or start live camera</span>
                        </div>
                        <span className="text-[11px] text-slate-400 hidden sm:inline">PNG, JPG, WebP supported</span>
                      </div>
                    )}

                    {cameraError && (
                      <div className="mt-3 p-3.5 rounded-2xl bg-red-950/90 border border-red-500/50 text-red-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span>{cameraError}</span>
                        </div>
                        <button
                          onClick={() => cameraCaptureInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] whitespace-nowrap transition-colors flex items-center space-x-1"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Use Device Camera</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

            </div>
          </div>

          {/* Result Card: Verification & Bin Routing (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-emerald-500/30 shadow-xl relative overflow-hidden space-y-6">
              
              {/* Header: Item Name, Category, Confidence */}
              <div className="space-y-3 pb-5 border-b border-emerald-500/15">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{activeItem?.category || 'Material'}</span>
                  </span>

                  {activeItem?.materialCode && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {activeItem.materialCode}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {activeItem?.name || 'Classified Waste'}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="text-xs text-slate-400">AI Confidence:</div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-emerald-400 to-lime-400 h-2 rounded-full"
                          style={{ width: `${activeItem?.confidence || 98}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-bold text-lime-400">
                        {activeItem?.confidence || 98.7}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Disposal Bin Callout */}
              <div className={`rounded-2xl p-4 sm:p-5 border ${binMeta.bg} ${binMeta.glow} transition-all space-y-2`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">{binMeta.icon}</span>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Disposal Destination
                      </div>
                      <div className="text-lg font-bold text-white">
                        {activeItem?.bin?.name || binMeta.label}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${binMeta.badge}`}>
                    {activeItem?.bin?.type || 'Recycle'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-normal pt-1">
                  {activeItem?.bin?.description || 'Place in appropriate container according to municipal waste guidelines.'}
                </p>
              </div>

              {/* Step-by-Step Disposal Instructions */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Step-by-Step Sorting Guide:</span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  {(activeItem?.instructions || [
                    'Empty residual liquids completely.',
                    'Check for localized sorting guidelines.',
                    'Place in designated recycling container.'
                  ]).map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 bg-eco-surface/50 p-2.5 rounded-xl border border-emerald-500/10">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crucial Prep Tip */}
              {activeItem?.prepTip && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start space-x-3">
                  <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-amber-300">Pro-Prep Tip: </span>
                    <span className="text-slate-300">{activeItem.prepTip}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons: Log to My Impact & Rescan */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCommitSort}
                  disabled={hasLoggedCurrent || isAnalyzing}
                  className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2 ${
                    hasLoggedCurrent 
                      ? 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 cursor-default' 
                      : 'bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-slate-950 shadow-glow hover:shadow-glow-lg active:scale-98'
                  }`}
                >
                  {hasLoggedCurrent ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Logged to Impact Tracker</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Log to My Impact (+{((activeItem?.impact?.co2SavedKg || 0.05) * 1000).toFixed(0)}g CO₂)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => selectPreset(SAMPLE_ITEMS[(SAMPLE_ITEMS.findIndex(s => s.id === activeItem?.id) + 1) % SAMPLE_ITEMS.length])}
                  className="py-3 px-4 rounded-xl border border-emerald-500/20 bg-eco-surface/70 hover:bg-emerald-950/40 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center justify-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Next Sample</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
