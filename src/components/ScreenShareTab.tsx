import { useState } from "react";
import { detectDeepfake } from "../lib/api";

export default function ScreenShareTab() {
  const [result, setResult] = useState<any>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startScreenShare = async () => {
    if (navigator.mediaDevices.getDisplayMedia) {
      const s = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setStream(s);
    }
  };

  const captureFrame = async () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    const bitmap = await imageCapture.grabFrame();
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(bitmap, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    const res = await detectDeepfake(dataUrl, "image");
    setResult(res);
  };

  return (
    <div className="space-y-4">
      <button onClick={startScreenShare} className="px-4 py-2 bg-primary text-white rounded">
        Start Screen Share
      </button>
      <button onClick={captureFrame} className="px-4 py-2 bg-primary text-white rounded">
        Detect Frame
      </button>
      {result && <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};
