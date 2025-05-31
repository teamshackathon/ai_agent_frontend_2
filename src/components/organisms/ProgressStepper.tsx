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

const steps = [
	{ title: "部屋を選ぼう", description: "Contact Info" },
	{ title: "引っ越したいものを写真でとろう", description: "Date & Time" },
	{ title: "どうでしょう？？", description: "Select Rooms" },
];

function ProgressStepper() {
	const { activeStep } = useSteps({
		index: 1,
		count: steps.length,
	});

	return (
		<Stepper index={activeStep} orientation="vertical" height="400px" gap="0">
			{steps.map((step) => (
				<Step key={step.title}>
					<StepIndicator>
						<StepStatus
							complete={<StepIcon />}
							incomplete={<StepNumber />}
							active={<StepNumber />}
						/>
					</StepIndicator>

					<Box flexShrink="0">
						<StepTitle>{step.title}</StepTitle>
						<StepDescription>{step.description}</StepDescription>
					</Box>

					<StepSeparator />
				</Step>
			))}
		</Stepper>
	);
}

export default ProgressStepper;
