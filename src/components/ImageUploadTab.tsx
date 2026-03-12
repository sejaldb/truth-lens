import { useState } from "react";
import { detectDeepfake } from "../lib/api";

export default function ImageUploadTab() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      const res = await detectDeepfake(base64, "image");
      setResult(res);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="px-4 py-2 rounded-lg bg-primary text-white">
        Detect Deepfake
      </button>
      {result && <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
} ImageUploadTab;
