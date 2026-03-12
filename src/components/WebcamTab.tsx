import { useState, useRef } from "react";
import { detectDeepfake } from "../lib/api";

export default function WebcamTab() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<any>(null);

  const startWebcam = async () => {
    if (navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }
  };

  const captureFrame = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    const res = await detectDeepfake(dataUrl, "image");
    setResult(res);
  };

  return (
    <div className="space-y-4">
      <video ref={videoRef} autoPlay className="border rounded w-full max-w-md" />
      <button onClick={startWebcam} className="px-4 py-2 bg-primary text-white rounded">
        Start Webcam
      </button>
      <button onClick={captureFrame} className="px-4 py-2 bg-primary text-white rounded">
        Detect Frame
      </button>
      {result && <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}ab;
