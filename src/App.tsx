import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { LayoutProvider } from "./context";
import ThemeManager from "./theme/ThemeManager";

import ResponsiveAppBar from "./components/ResponsiveAppBar";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import LandingPage from "./pages/Landing";
import PricingPage from "./pages/Pricing";
import Signup from "./pages/Signup";
import LogIn from "./pages/LogIn";
import NpcSystemPage from "./pages/NpcSystem";
import RequireAuth from "./components/RequireAuth";
import Error401 from "./pages/ErrorPages/Error401";
import Error403 from "./pages/ErrorPages/Error403";
import Error404 from "./pages/ErrorPages/Error404";
import Error500 from "./pages/ErrorPages/Error500";
import Error503 from "./pages/ErrorPages/Error503";
import TermsAndConditionsPage from "./Errata/TermsAndConditions/TermsAndConditionsPage";
import PrivacyPolicy from "./Errata/PrivacyPolicy";

import { ImageType } from "./pages/ImageLibraries/imageTypes";
import ImageLibrariesController from "./pages/ImageLibraries/ImageLibrariesController";
// import "./App.css";

// Wrapper component to pass `imageType` as a prop
const ImageLibraryWrapper = () => {
  const { imageType } = useParams<{ imageType: ImageType }>();
  // Provide a default value of "i" if imageType is undefined
  const validatedImageType = (imageType || "i") as ImageType;
  // Validate the `imageType` parameter
  if (
    !imageType ||
    !Object.values(ImageType).includes(validatedImageType as ImageType)
  ) {
    return <div>Invalid image type</div>;
  }
  return <ImageLibrariesController imageType={imageType as ImageType} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <ThemeManager>
          <ResponsiveAppBar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/LogIn" element={<LogIn />} />
              <Route path="/error-401" element={<Error401 />} />
              <Route path="/error-403" element={<Error403 />} />
              <Route path="/error-404" element={<Error404 />} />
              <Route path="/error-500" element={<Error500 />} />
              <Route path="/error-503" element={<Error503 />} />
              <Route
                path="/termsandconditions"
                element={<TermsAndConditionsPage />}
              />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />

              {/* Image Libraries */}

              {/* Protected Routes */}
              <Route element={<RequireAuth />}>
                <Route path="/npc-system" element={<NpcSystemPage />} />
                <Route path="/characters" element={<LandingPage />} />
                <Route path="/tables" element={<LandingPage />} />
                <Route
                  path="/images/:imageType"
                  element={<ImageLibraryWrapper />}
                />
                <Route path="/tutorials" element={<LandingPage />} />
              </Route>

              {/* Catch-all Route */}
              {/* //Todo: Change to Unauthorized or Not found */}
              <Route path="*" element={<LandingPage />} />
              {/* <Route path="*" element={<Missing />} /> */}
            </Routes>
          </main>
        </ThemeManager>
      </LayoutProvider>
    </BrowserRouter>
  );
};

export default App;
