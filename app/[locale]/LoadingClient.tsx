"use client";

import Lottie from "lottie-react";
import loadingAnim from "@/src/lottie/Futuristic Loading Animation.json";

export default function LoadingClient() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Lottie animationData={loadingAnim} loop className="w-40 h-40" />
    </div>
  );
}
