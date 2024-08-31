"use client";

import { motion } from "framer-motion";

const Steps = ({ steps, currentStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
      }}
      className="lg:sticky top-5 -z-50 w-60"
    >
      <ul className="steps steps-vertical space-y-3">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className={`step ${currentStep >= index + 1 ? "step-primary" : ""}`}
          >
            <span className="flex items-center gap-3">
              <step.icon size={20} />
              <span>{step.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Steps;
