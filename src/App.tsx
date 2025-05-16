import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { LayoutProvider } from "./context";
import ThemeManager from "./theme/ThemeManager";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import LandingPage from "./pages/Landing";
import PricingPage from "./pages/Pricing";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
// import LogIn from "./components/Login/LoginModal";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import NpcSystemPage from "./pages/NpcSystem";
import ImageLibrariesController from "./pages/ImageLibraries/ImageLibrariesController";
// import ImageLibraryPage from "./pages/ImageLibraries/ImageLibraryPage";
import { ImageType } from "./pages/ImageLibraries/imageTypes";
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
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/npc-system" element={<NpcSystemPage />} />
              <Route path="/characters" element={<LandingPage />} />
              <Route path="/tables" element={<LandingPage />} />
              <Route
                path="/images/:imageType"
                element={<ImageLibraryWrapper />}
              />
              <Route path="/tutorials" element={<LandingPage />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/SignIn" element={<SignIn />} />
              {/* <Route path="/LogIn" element={<LogIn />} /> */}
            </Routes>
          </main>
        </ThemeManager>
      </LayoutProvider>
    </BrowserRouter>
  );
};

export default App;
