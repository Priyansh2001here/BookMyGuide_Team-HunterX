import GuidesList from "./Pages/GuidesList/GuidesList";
import HomePage from "./Pages/HomePage/HomePage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import PlacePage from "./Pages/PlacePage/PlacePage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BookGuidePage from "./Pages/BookGuidePage/BookGuidePage";
import TourList from "./Pages/TourList/TourList";
import DesignTour from "./Pages/DesignTour/DesignTour";
import PartnerForm from "./Pages/PartnerForm/PartnerForm.js";
import TourGuideForm from "./Pages/TourGuideForm/TourGuideForm";
import GuideDashboard from "./Pages/GuideDashboard/GuideDashboard";
import Reviews from "./Pages/Reviews/Reviews";
import Layout from "./Pages/Layout";
import SearchScreen from "./Components/SearchScreen/SearchScreen";
import UserDashboard from "./Pages/UserProfile/UserDashboard";
import ReviewGuide from "./Pages/ReviewGuide/ReviewGuide";
import GuideView from "./Pages/GuideView/GuideView";
import PartnerDashboard from "./Pages/PartnerDashboard/PartnerDashboard";
import BookingSuccessful from "./Pages/BookingSuccessful/BookingSuccessful";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route
                    path="/app"
                    element={
                        <Layout>
                            <HomePage/>
                        </Layout>
                    }
                />
                <Route
                    path="/beapartner"
                    element={
                        <Layout>
                            <PartnerForm/>
                        </Layout>
                    }
                />
                <Route path="/tourlist" element={<TourList/>}/>
                <Route path="/place/:id" element={<PlacePage/>}/>
                <Route path="/place/:id/guides" element={<GuidesList/>}/>
                <Route
                    path="/place/:id/guides/:guideId/book"
                    element={<BookGuidePage/>}
                />
                <Route path="/designTour" element={<DesignTour/>}/>
                <Route path="/partnerForm" element={<PartnerForm/>}/>
                <Route path="/guide/dashboard" element={<GuideDashboard/>}/>
                <Route path="/designtour" element={<DesignTour/>}/>
                <Route path="/tourguideregister" element={<TourGuideForm/>}/>
                <Route path="/search" element={<SearchScreen/>}/>
                <Route path="/guide/dashboard/:guideId/reviews" element={<Reviews/>}/>
                <Route path={"/profile"} element={<UserDashboard/>}/>
                <Route path="/guide/:guideId/review" element={<ReviewGuide/>}/>
                <Route path="/guide/:guideId/reviews" element={<GuideView/>}/>
                <Route path="/guide/partnerDashboard" element={<Layout><PartnerDashboard/> </Layout>}/>
                <Route path="bookingSuccessful" element={<BookingSuccessful/>}/>
            </Routes>
        </Router>
    );
}

export default App;
