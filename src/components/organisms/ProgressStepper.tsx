import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const steps = [
  { title: "部屋を選ぼう", description: "Contact Info" },
  { title: "引っ越したいものを写真でとろう", description: "Date & Time" },
  { title: "どうでしょう？？", description: "Select Rooms" },
];

function ProgressStepper() {
  const { activeStep } = useSteps({ index: 1, count: steps.length });
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const BASE_WIDTH = 250; // 基準幅（これ以下は縮小）

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const newScale = width < BASE_WIDTH ? width / BASE_WIDTH : 1;
        setScale(newScale);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box ref={containerRef} width="100%" maxW="300px" overflow="hidden">
      <Box transform={`scale(${scale})`} transformOrigin="top left">
        <Stepper
          index={activeStep}
          orientation="vertical"
          height="auto"
          gap="0"
        >
          {steps.map((step) => (
            <Step key={step.title}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box ml={2}>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}

export default ProgressStepper;
