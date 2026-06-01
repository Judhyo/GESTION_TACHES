import React from "react";
import { LoaderCircle } from "lucide-react";

function Spinner({ size = 40, text = "Chargement..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <LoaderCircle
        size={size}
        className="
          animate-spin
          text-blue-600
        "
      />

      {/* Text */}
      <p className="text-sm font-medium text-gray-500">{text}</p>
    </div>
  );
}

export default Spinner;
