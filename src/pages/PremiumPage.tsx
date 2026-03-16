import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PremiumPage = () => (
  <>
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <Navigate to="/course" replace />
  </>
);

export default PremiumPage;
