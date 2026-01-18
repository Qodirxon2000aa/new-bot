// Dashboard.jsx – FINAL OPTIMIZED VERSION (NO LAG 🚀)
import React, {
  useEffect,
  useState,
  useRef,
  lazy,
  Suspense,
} from "react";
import Lottie from "lottie-react";
import "./Dashboard.css";

import Header from "../pages/Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import ReferralModal from "./Footer/ReferralModal.jsx";
import Money from "../../components/pages/Money/Money.jsx";
import Profile from "./Footer/Profile.jsx";

/* ===============================
   🔥 LAZY COMPONENTS
================================ */
const Premium = lazy(() =>
  import("../pages/premuium/Premium.jsx")
);
const Stars = lazy(() =>
  import("../pages/starts/Stars.jsx")
);
const Market = lazy(() =>
  import("../pages/Market/Market.jsx")
);

const Dashboard = () => {
  const dashboardRef = useRef(null);

  const [isPremium, setIsPremium] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [openModal, setOpenModal] = useState(null);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  /* ===============================
     🔥 WELCOME STATE
  ================================ */
  const [showWelcome, setShowWelcome] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const finishedRef = useRef(false);

  const isMarketOpen = activeSection === "market";

  /* ===============================
     🔐 MODAL SCROLL LOCK (OPTIMIZED)
  ================================ */
  useEffect(() => {
    if (!dashboardRef.current) return;

    const locked =
      openModal === "money" || showReferralModal || showProfile;

    dashboardRef.current.classList.toggle("modal-lock", locked);
  }, [openModal, showReferralModal, showProfile]);

  /* ===============================
     🚀 WELCOME — FAQAT 1 MARTA
  ================================ */
  useEffect(() => {
    const shown = sessionStorage.getItem("welcome_shown");
    if (shown) return;

    setShowWelcome(true);

    // 🔥 async yuklash (UI bloklanmaydi)
    import("../../assets/animation.json").then((res) => {
      setAnimationData(res.default);
    });
  }, []);

  const handleAnimationComplete = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    sessionStorage.setItem("welcome_shown", "1");
    setShowWelcome(false);
  };

  return (
    <>
      {/* ================= WELCOME SCREEN ================= */}
      {showWelcome && (
        <div className="welcome-screen">
          <div className="video-box">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={false}
                autoplay
                onComplete={handleAnimationComplete}
                rendererSettings={{
                  progressiveLoad: true,
                  preserveAspectRatio: "xMidYMid slice",
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* ================= DASHBOARD ================= */}
      {!showWelcome && (
        <div className="dashboard" ref={dashboardRef}>
          {/* HEADER */}
          {!isMarketOpen && (
            <Header
              isPremium={isPremium}
              setIsPremium={setIsPremium}
              onOpenMoney={() => setOpenModal("money")}
            />
          )}

          {/* MAIN */}
          <div
            className={`dashboard-main ${
              isMarketOpen ? "market-full" : ""
            }`}
          >
            <Suspense fallback={<div className="loader" />}>
              {activeSection === "home" && (
                <div className="dashboard-content">
                  {isPremium ? <Premium /> : <Stars />}
                </div>
              )}

              {isMarketOpen && (
                <div className="dashboard-content market-page">
                  <Market />
                </div>
              )}
            </Suspense>
          </div>

          {/* MONEY MODAL */}
          {openModal === "money" && (
            <div
              className="modal-overlay"
              onClick={() => setOpenModal(null)}
            >
              <div
                className="modal-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Money onClose={() => setOpenModal(null)} />
              </div>
            </div>
          )}

          {/* REFERRAL */}
          <ReferralModal
            isOpen={showReferralModal}
            onClose={() => setShowReferralModal(false)}
          />

          {/* PROFILE */}
          {showProfile && (
            <Profile onClose={() => setShowProfile(false)} />
          )}

          {/* FOOTER */}
          <Footer
            activeSection={activeSection}
            onHomeClick={() => setActiveSection("home")}
            onMarketClick={() => setActiveSection("market")}
            onInviteClick={() => {
              setActiveSection("home");
              setShowReferralModal(true);
            }}
            onProfileClick={() => setShowProfile(true)}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
