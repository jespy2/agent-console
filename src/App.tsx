import { AppRoutes } from "@/app/routes/AppRoutes";
import { AppLayout } from "@/shared/components/layout/AppLayout";

function App() {
	return (
		<AppLayout>
			<AppRoutes />
		</AppLayout>
	);
}

export default App;
