import { useState } from "react";
import { detectDeepfake } from "../lib/api";

export default function UrlDetectTab() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleDetect = async () => {
    if (!url) return;
    const res = await detectDeepfake(url, "url");
    setResult(res);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter image/video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <button onClick={handleDetect} className="px-4 py-2 rounded-lg bg-primary text-white">
        Detect Deepfake
      </button>
      {result && <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}Tab;
