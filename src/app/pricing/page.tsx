import { Suspense } from "react";
import { PricingContent } from "./pricing-content";

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-gray-500">Memuat...</div>}>
      <PricingContent />
    </Suspense>
  );
}
