import { motion } from "framer-motion";
import { Shield, Image, Film, Link, Camera, Monitor } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedBackground from "@/components/AnimatedBackground";
import ImageUploadTab from "@/components/ImageUploadTab";
import VideoUploadTab from "@/components/VideoUploadTab";
import UrlDetectTab from "@/components/UrlDetectTab";
import WebcamTab from "@/components/WebcamTab";
import ScreenShareTab from "@/components/ScreenShareTab";

// src/pages/Index.tsx
import { motion } from "framer-motion";
import { Shield, Image, Film, Link, Camera, Monitor } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useState } from "react";
import { BASE_URL } from "@/lib/api";

const Index = () => {
  // Image tab state
  const [imageResult, setImageResult] = useState<any>(null);
  const handleImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${BASE_URL}/detect-image`, { method: "POST", body: formData });
    const data = await res.json();
    setImageResult(data);
  };

  // Video tab state
  const [videoResult, setVideoResult] = useState<any>(null);
  const handleVideo = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${BASE_URL}/detect-video`, { method: "POST", body: formData });
    const data = await res.json();
    setVideoResult(data);
  };

  // URL tab state
  const [url, setUrl] = useState("");
  const [urlResult, setUrlResult] = useState<any>(null);
  const handleUrl = async () => {
    const res = await fetch(`${BASE_URL}/detect-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setUrlResult(data);
  };

  // Webcam tab state
  const [webcamResult, setWebcamResult] = useState<any>(null);
  const handleWebcamFrame = async (base64Frame: string) => {
    const res = await fetch(`${BASE_URL}/detect-camera-json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frame: base64Frame }),
    });
    const data = await res.json();
    setWebcamResult(data);
  };

  // Screen share tab state
  const [screenResult, setScreenResult] = useState<any>(null);
  const handleScreenFrame = async (base64Frame: string) => {
    const res = await fetch(`${BASE_URL}/detect-screen-json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frame: base64Frame }),
    });
    const data = await res.json();
    setScreenResult(data);
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 container max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 glow-primary"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Shield className="w-8 h-8 text-primary" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gradient-primary">DeepGuard</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            AI-powered deepfake detection for images, videos, live camera & screen sharing
          </p>
        </motion.div>

        {/* Main Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="image" className="space-y-6">
            <TabsList className="grid grid-cols-5 bg-card border border-border h-auto p-1.5 rounded-xl">
              {[
                { value: "image", icon: Image, label: "Image" },
                { value: "video", icon: Film, label: "Video" },
                { value: "url", icon: Link, label: "URL" },
                { value: "camera", icon: Camera, label: "Camera" },
                { value: "screen", icon: Monitor, label: "Screen" },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex flex-col gap-1 py-2.5 px-1 text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
              {/* Image Tab */}
              <TabsContent value="image" className="mt-0">
                <input type="file" accept="image/png, image/jpeg" onChange={(e) => e.target.files && handleImage(e.target.files[0])} />
                {imageResult && <p>Result: {imageResult.result}, Confidence: {imageResult.confidence}</p>}
              </TabsContent>

              {/* Video Tab */}
              <TabsContent value="video" className="mt-0">
                <input type="file" accept="video/mp4" onChange={(e) => e.target.files && handleVideo(e.target.files[0])} />
                {videoResult && <p>Result: {videoResult.result}, Confidence: {videoResult.confidence}</p>}
              </TabsContent>

              {/* URL Tab */}
              <TabsContent value="url" className="mt-0">
                <input type="text" placeholder="Enter image/video URL" value={url} onChange={(e) => setUrl(e.target.value)} />
                <button onClick={handleUrl}>Detect</button>
                {urlResult && <p>Result: {urlResult.result}, Confidence: {urlResult.confidence}</p>}
              </TabsContent>

              {/* Camera Tab */}
              <TabsContent value="camera" className="mt-0">
                {/* Replace this with actual webcam capture code */}
                <button onClick={() => handleWebcamFrame("base64-frame-example")}>Detect Webcam Frame</button>
                {webcamResult && <p>Result: {webcamResult.result}, Confidence: {webcamResult.confidence}</p>}
              </TabsContent>

              {/* Screen Tab */}
              <TabsContent value="screen" className="mt-0">
                {/* Replace this with actual screen capture code */}
                <button onClick={() => handleScreenFrame("base64-frame-example")}>Detect Screen Frame</button>
                {screenResult && <p>Result: {screenResult.result}, Confidence: {screenResult.confidence}</p>}
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground/50 mt-12 font-mono"
        >
          DeepGuard v1.0 — Prototype with live backend integration
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
