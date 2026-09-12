import React, { useState } from "react";

// 1. Razorpay TypeScript Interfaces
interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

// 2. Component Types
interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceColor: string;
  popular?: boolean;
  features: { text: string; included: boolean }[];
  buttonStyle: string;
}

interface OrderApiResponse {
  id: string;
  amount: number;
  currency: string;
}

interface VerificationApiResponse {
  success: boolean;
  message: string;
}

const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

// 3. Dynamic Script Loader Helper
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-checkout-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PLANS: Plan[] = [
  {
    id: "test_series",
    name: "Test Series",
    description: "Access full mock tests and practice exams.",
    price: 249,
    priceColor: "text-purple-400",
    features: [
      { text: "Full Test Series Access", included: true },
      { text: "Mock Exams", included: true },
      { text: "Performance Analysis", included: true },
      { text: "Chapter-wise Questions", included: false },
      { text: "Mentorship", included: false },
    ],
    buttonStyle: "bg-purple-500 hover:bg-purple-600 text-white",
  },
  {
    id: "test_series_practice",
    name: "Test Series + Practice",
    description: "Best for serious preparation with solutions.",
    price: 499,
    priceColor: "text-white",
    popular: true,
    features: [
      { text: "Full Test Series Access", included: true },
      { text: "Chapter-wise Questions", included: true },
      { text: "Detailed Solutions", included: true },
      { text: "Mock Exams", included: true },
      { text: "Mentorship", included: false },
    ],
    buttonStyle: "bg-white text-black hover:bg-slate-200",
  },
  {
    id: "ultimate_mentorship",
    name: "Ultimate Mentorship",
    description: "Complete preparation with personal mentorship.",
    price: 1199,
    priceColor: "text-green-400",
    features: [
      { text: "Full Test Series Access", included: true },
      { text: "Chapter-wise Questions", included: true },
      { text: "Detailed Solutions", included: true },
      { text: "1-to-1 Mentorship", included: true },
      { text: "Study Guidance", included: true },
    ],
    buttonStyle: "bg-green-500 hover:bg-green-600 text-white",
  },
];

export const Payments: React.FC = () => {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const handleBuyNow = async (plan: Plan): Promise<void> => {
    try {
      setLoadingPlanId(plan.id);

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Please check your network connection.");
        return;
      }

      // 1. Call Spring Boot to generate order
      const res = await fetch(
        `http://localhost:8080/api/payments/create-order?amount=${plan.price}&currency=INR`,
        { method: "POST" }
      );

      if (!res.ok) {
        throw new Error("Failed to create order on server");
      }

      const orderData: OrderApiResponse = await res.json();

      // 2. Configure modal options
      const options: RazorpayOptions = {
        key: razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "EdTech Platform",
        description: `Enrollment for ${plan.name}`,
        order_id: orderData.id,
        handler: async (response: RazorpaySuccessResponse) => {
          try {
            // 3. Verify signature on backend
            const verifyRes = await fetch("http://localhost:8080/api/payments/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyResult: VerificationApiResponse = await verifyRes.json();
            if (verifyResult.success) {
              alert(`Payment successful for ${plan.name}! Course unlocked.`);
              // e.g., window.location.href = "/dashboard";
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (verifyErr) {
            console.error(verifyErr);
            alert("Error validating payment signature.");
          }
        },
        prefill: {
          name: "Student Name",
          email: "student@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#8B5CF6",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Error initiating payment. Please try again.");
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-8 shadow-xl flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? "bg-gradient-to-br from-purple-600 to-indigo-700 border border-purple-500 shadow-2xl scale-105 relative"
                : "bg-slate-800 border border-slate-700 hover:scale-105"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-2 right-3 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}

            <div>
              <h2 className={`text-2xl font-bold mb-2 ${plan.popular ? "mt-3" : ""}`}>
                {plan.name}
              </h2>

              <p className={`mb-6 ${plan.popular ? "text-slate-200" : "text-slate-400"}`}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className={`text-5xl font-bold ${plan.priceColor}`}>
                  ₹{plan.price}
                </span>
              </div>

              <ul className={`space-y-4 mb-8 ${plan.popular ? "text-slate-100" : "text-slate-300"}`}>
                {plan.features.map((feat, idx) => (
                  <li key={idx}>
                    {feat.included ? "✅" : "❌"} {feat.text}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleBuyNow(plan)}
              disabled={loadingPlanId === plan.id}
              className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 ${plan.buttonStyle}`}
            >
              {loadingPlanId === plan.id ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};