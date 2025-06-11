import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Box() {
	return (
		<mesh>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="orange" />
		</mesh>
	);
}

export default function Scene() {
	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Box />
			<OrbitControls />
		</Canvas>
	);
}
