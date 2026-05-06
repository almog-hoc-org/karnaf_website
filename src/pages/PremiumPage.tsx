import { Navigate } from "react-router-dom";
import { Head } from "vite-react-ssg";

const PremiumPage = () => (
  <>
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <Navigate to="/course" replace />
  </>
);

export default PremiumPage;
