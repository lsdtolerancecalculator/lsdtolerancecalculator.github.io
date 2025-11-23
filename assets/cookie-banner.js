// Cookie Banner Logic
document.addEventListener("DOMContentLoaded", function () {
  const COOKIE_CONSENT_KEY = "lsd_calculator_cookie_consent";

  // Check if user has already made a choice
  if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
    showCookieBanner();
  }

  function showCookieBanner() {
    // Create banner element
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <p><strong>🍪 We use cookies</strong> to improve your experience and analyze traffic using Google Analytics and Microsoft Clarity. By continuing to use our site, you accept our use of cookies.</p>
                </div>
                <div class="cookie-buttons">
                    <button id="cookie-decline" class="cookie-btn decline">Decline</button>
                    <button id="cookie-accept" class="cookie-btn accept">Got it!</button>
                </div>
            </div>
        `;

    // Add styles dynamically
    const style = document.createElement("style");
    style.textContent = `
            #cookie-banner {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 90%;
                max-width: 600px;
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.9);
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                z-index: 9999;
                padding: 20px;
                animation: slideUp 0.5s ease-out;
                font-family: 'Space Mono', monospace;
            }
            
            @keyframes slideUp {
                from { transform: translate(-50%, 100px); opacity: 0; }
                to { transform: translate(-50%, 0); opacity: 1; }
            }

            .cookie-content {
                display: flex;
                flex-direction: column;
                gap: 15px;
                align-items: center;
                text-align: center;
            }

            @media (min-width: 640px) {
                .cookie-content {
                    flex-direction: row;
                    text-align: left;
                    justify-content: space-between;
                }
            }

            .cookie-text p {
                margin: 0;
                font-size: 0.9rem;
                color: #4a4a4a;
                line-height: 1.4;
            }

            .cookie-buttons {
                display: flex;
                gap: 10px;
                flex-shrink: 0;
            }

            .cookie-btn {
                padding: 8px 16px;
                border-radius: 12px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s ease;
                border: none;
                font-size: 0.85rem;
            }

            .cookie-btn.accept {
                background: linear-gradient(45deg, #FFDAB9, #E6E6FA);
                color: #555;
                box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            }

            .cookie-btn.accept:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(0,0,0,0.1);
            }

            .cookie-btn.decline {
                background: transparent;
                border: 1px solid #ccc;
                color: #777;
            }

            .cookie-btn.decline:hover {
                background: #f5f5f5;
                color: #555;
            }
        `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Event Listeners
    document.getElementById("cookie-accept").addEventListener("click", () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
      removeBanner();
    });

    document.getElementById("cookie-decline").addEventListener("click", () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
      // Optional: Logic to disable tracking could go here
      // For "Accept by default", we mainly just hide the banner
      removeBanner();
    });
  }

  function removeBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner) {
      banner.style.opacity = "0";
      banner.style.transform = "translate(-50%, 20px)";
      setTimeout(() => banner.remove(), 300);
    }
  }
});
