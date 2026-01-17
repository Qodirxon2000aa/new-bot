// src/components/ReferralModal.jsx
import React, { useEffect, useState } from "react";
import "./ReferralModal.css";
import Lottie from "lottie-react";
import shareAnimation from "../../../assets/share.json";

const ReferralModal = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [invitedFriends, setInvitedFriends] = useState(3);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleCopy = () => {
    // Hozircha copy qilish funksiyasi bo'sh
    console.log("Copy button bosildi");
  };

  const handleInvite = () => {
    console.log("Invite button bosildi");
  };

  if (!isOpen && !visible) return null;

  return (
    <div className={`referral-overlay ${visible ? "show" : "hide"}`}>
      <div className={`referral-fullscreen ${visible ? "slide-in" : "slide-out"}`}>
        {/* ❌ CLOSE */}
        <button className="close-btn" onClick={handleClose}>×</button>

        {/* 📦 CONTENT */}
        <div className="referral-content">
          {/* 🎬 LOTTIE */}
          <div className="animation">
            <Lottie animationData={shareAnimation} loop autoplay />
          </div>

          <h2>Referral dasturi</h2>
          <p>
            Do'stlaringizni taklif qiling va ularning xaridlaridan
            Stars ishlang!
          </p>

          {/* 👥 INVITED FRIENDS COUNTER */}
          <div className="invited-counter">
            <div className="invited-counter-label">
              Taklif qilgan do'stlaringiz miqdori
            </div>
            <div className="invited-counter-value">
              {invitedFriends} <span className="icon">👥</span>
            </div>
          </div>

          {/* 🔘 BUTTONS */}
          <div className="action-buttons">
            <button className="btn-invite" onClick={handleInvite}>
              Taklif qilish
            </button>
            <button className="btn-copy" onClick={handleCopy}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5H6C5.46957 5 4.96086 5.21071 4.58579 5.58579C4.21071 5.96086 4 6.46957 4 7V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V18M8 5C8 5.53043 8.21071 6.03914 8.58579 6.41421C8.96086 6.78929 9.46957 7 10 7H14C14.5304 7 15.0391 6.78929 15.4142 6.41421C15.7893 6.03914 16 5.53043 16 5M8 5C8 4.46957 8.21071 3.96086 8.58579 3.58579C8.96086 3.21071 9.46957 3 10 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5M16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
           <div className="worddd">
             <p>Taklif qilgan do'stingiz hisob to'ldirishidan 2% ulush olasiz.</p>

           </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;