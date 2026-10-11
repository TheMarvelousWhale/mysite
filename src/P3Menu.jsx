import { useState, useEffect } from "react";

const ITEMS = [
  { id: "about", label: "ABOUT ME", page: "about" },
  { id: "timeline", label: "TIMELINE", page: "timeline" },
  { id: "contact", label: "CONTACT", page: "contact" },
];

export default function P3Menu({ onNavigate }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  const activate = (idx) => {
    setActive(idx);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter")     onNavigate?.(ITEMS[active].page);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <style>{`
        .p3-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .p3-stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#c4001a; z-index:10; pointer-events:none; }
        .p3-stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(245,122,139,0.22); z-index:10; pointer-events:none; }

        .p3-menu {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-46%);
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        }

        .p3-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 124px;
          width: 100%;
          margin-left: 0;
          padding: 0;
          text-decoration: none;
          pointer-events: all;
          opacity: 0;
          transform: translateX(80px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .p3-row.mounted {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        .p3-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 120%; height: 200%;
          background: radial-gradient(ellipse at center, rgba(196,0,26,0.35) 0%, transparent 70%);
          filter: blur(18px);
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .p3-row.active .p3-glow { opacity: 1; }

        .p3-skew-wrap {
          position: relative;
          display: flex;
          align-items: center;
          isolation: isolate;
        }

        @keyframes p3-shadow-pop {
          0%   { transform: translateY(-40%) translateX(-12px) scaleX(0) scaleY(1); }
          55%  { transform: translateY(-46%) translateX(-15px) scaleX(1.22) scaleY(1.18); }
          75%  { transform: translateY(-39%) translateX(-11px) scaleX(0.96) scaleY(0.97); }
          100% { transform: translateY(-40%) translateX(-12px) scaleX(1) scaleY(1); }
        }

        .p3-shadow-tri {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: rgba(196, 0, 26, 0.85);
          z-index: 1;
          pointer-events: none;
          transform: translateY(-40%) translateX(-12px) scaleX(0);
          transition: transform 0.18s ease;
        }
        .p3-shadow-tri.pop {
          animation: p3-shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .p3-highlight {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: #ffffff;
          z-index: 2;
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }

        .p3-label-wrap {
          position: relative;
          z-index: 3;
        }

        .p3-label-base {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          letter-spacing: 2px;
          line-height: 0.85;
          display: block;
          white-space: nowrap;
          user-select: none;
        }

        .p3-label-dark {
          color: #f4efe6;
          transition: color 0.12s ease;
        }
        .p3-row.active .p3-label-dark { color: #6b0010; }
        .p3-row:hover:not(.active) .p3-label-dark { color: #e7d3b0; }

        .p3-label-bright {
          color: #ff2a2a;
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.12s ease;
        }
        .p3-row.active .p3-label-bright { opacity: 1; }

        .p3-hint {
          position: absolute;
          bottom: 24px; right: 28px;
          z-index: 20;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Anton', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease 0.9s;
        }
        .p3-hint.mounted { opacity: 1; }
        .p3-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.28);
        }
        .p3-hint-key {
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        .p3-slash {
          position: absolute;
          inset: 0;
          left: -6vw;
          right: -6vw;
          background: rgba(8, 8, 10, 0.42);
          clip-path: polygon(0 24%, 84% 0, 100% 50%, 84% 100%, 0 76%);
          transition: background 0.22s ease;
          pointer-events: none;
        }
        .p3-row.active .p3-slash {
          background: #c4001a;
        }
        .p3-label {
          position: relative;
          z-index: 2;
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: 78px;
          letter-spacing: 2px;
          line-height: 0.9;
          text-align: center;
          transform: translateX(-6%);
          color: rgba(244, 239, 230, 0.72);
          user-select: none;
          transition: color 0.12s ease;
        }
        .p3-row.active .p3-label { color: #fff; }
        .p3-row:hover:not(.active) .p3-label { color: #f4efe6; }

        .p3-name-tag {
          position: absolute;
          top: 22px;
          left: 28px;
          z-index: 20;
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: 42px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: rgba(10, 10, 14, 0.88);
          transform: rotate(8deg);
          transform-origin: left top;
          user-select: none;
          pointer-events: none;
        }

        @media (max-width: 800px) {
          .p3-name-tag {
            top: 12px;
            left: 14px;
            font-size: 26px;
          }
          .p3-menu {
            gap: 6px;
            transform: translateY(-40%);
          }
          .p3-row { height: 76px; }
          .p3-slash { left: 0; right: 0; }
          .p3-label {
            font-size: 34px;
            letter-spacing: 1px;
            transform: none;
          }
          .p3-hint { display: none; }
        }
      `}</style>

      <div className="p3-overlay">
        <div className="p3-name-tag">MY PORTFOLIO</div>
        <div className="p3-stripe" />
        <div className="p3-stripe2" />

        <nav className="p3-menu">
          {ITEMS.map((item, i) => {
            const isActive = active === i;

            return (
              <a
                key={item.id}
                href="#"
                className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{ transitionDelay: mounted ? `${i * 80}ms` : "0ms" }}
                onClick={(e) => { e.preventDefault(); onNavigate?.(item.page); }}
                onMouseEnter={() => activate(i)}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="p3-slash" />
                <span className="p3-label">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className={`p3-hint ${mounted ? "mounted" : ""}`}>
          <div className="p3-hint-row"><span className="p3-hint-key">↑↓</span><span>NAVIGATE</span></div>
          <div className="p3-hint-row"><span className="p3-hint-key">↵</span><span>CONFIRM</span></div>
        </div>
      </div>
    </>
  );
}
