import { Navigate } from "react-router-dom";
import { Head } from "vite-react-ssg";

/**
 * /program was a standalone landing-page variant of the course pitch from
 * the old high-touch model. The self-serve program has one canonical sales
 * page — /course — so old campaign links land there instead of 404ing.
 */
const ProgramPage = () => (
  <>
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <Navigate to="/course" replace />
  </>
);

export default ProgramPage;
