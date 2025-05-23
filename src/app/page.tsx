import Header from "@/app/header";
import HealthCheckCard from "@/components/organisms/HealthCheckCard";

export default function Home() {
	return (
		<div className="flex justify-center">
			<Header />
			<HealthCheckCard />
		</div>
	);
}
