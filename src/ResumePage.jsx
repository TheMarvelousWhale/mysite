import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import aki from "./assets/aki.png";
import { YEARS, shorten } from "./timeline";

const ITEMS = YEARS;

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [focus, setFocus] = useState("years");
  const [open, setOpen] = useState(null);
  const [mounted, setMounted] = useState(false);

  const year = ITEMS[active];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (open) {
        if (e.key === "Escape" || e.key === "Backspace") setOpen(null);
        return;
      }
      if (focus === "items" && year) {
        if (e.key === "ArrowUp") setItemIndex((i) => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setItemIndex((i) => Math.min(year.entries.length - 1, i + 1));
        if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") setFocus("years");
        if (e.key === "Enter") setOpen(year.entries[itemIndex] ?? null);
        return;
      } else {
        if (e.key === "ArrowUp") {
          setActive((i) => Math.max(0, i - 1));
          setItemIndex(0);
        }
        if (e.key === "ArrowDown") {
          setActive((i) => Math.min(ITEMS.length - 1, i + 1));
          setItemIndex(0);
        }
        if (e.key === "ArrowRight" || e.key === "Enter") setFocus("items");
      }
      if ((e.key === "ArrowLeft" && focus === "years") || (e.key === "Escape" && focus === "years") || (e.key === "Backspace" && focus === "years")) {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, focus, year, itemIndex, open]);

  return (
    <div id="menu-screen">
      <img className="bg-media" src={src} alt="" />
      <img className="resume-portrait" src={aki} alt="" />
      <div className="resume-entry-mask" aria-hidden="true">
        <img className="resume-entry-video bg-media" src={src} alt="" />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #1c2833;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 2.5vh;
          left: 2.2vw;
          width: min(38vw, 520px);
          height: 95vh;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        }

        .resume-year-scroll {
          flex: 1;
          min-height: 0;
          overflow-x: hidden;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-right: 8px;
          pointer-events: auto;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 64px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          flex: none;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-detail-row.selected {
          background: rgba(28, 40, 52, 1);
          box-shadow: inset 4px 0 0 #c4001a;
        }

        .tl-modal-back {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(6, 8, 12, 0.72);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }
        .tl-modal {
          width: min(640px, 86vw);
          padding: 28px 32px 24px;
          background: #121820;
          color: #f4efe6;
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 14px 14px 0 rgba(196, 0, 26, 0.9);
        }
        .tl-modal-kicker {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
          color: #8aa4b5;
          font-size: 18px;
        }
        .tl-modal-title {
          margin-top: 8px;
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1.25;
        }
        .tl-modal-body {
          margin-top: 14px;
          font-family: 'Anton', sans-serif;
          font-size: 18px;
          line-height: 1.45;
          white-space: pre-wrap;
          color: rgba(244, 239, 230, 0.86);
        }
        .tl-modal-close {
          margin-top: 22px;
          border: 0;
          background: #c4001a;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
          font-size: 18px;
          padding: 8px 16px;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 118px;
          background: #1a2836;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(0, 0, 0, 0.55);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 12px 16px 34px 52px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 14px;
          left: -8px;
          width: 48px;
          height: 58px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 32px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #d5e4ee;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 6px;
          height: 22px;
          background: #8aa4b5;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 1px;
          color: #101820;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-portrait {
          position: absolute;
          left: 30vw;
          bottom: 0;
          height: 100vh;
          width: auto;
          z-index: 8;
          pointer-events: none;
          filter: drop-shadow(0 18px 24px rgba(0,0,0,0.45));
        }

        .resume-detail-panel {
          position: absolute;
          top: 2.5vh;
          right: 2.2vw;
          width: min(46vw, 720px);
          height: 92vh;
          min-height: 0;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(22, 32, 42, 0.96) 0%, rgba(10, 14, 18, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(138, 164, 181, 0.2),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          pointer-events: auto;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(138, 164, 181, 0.12) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8aa4b5 0%, #e7eef2 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(196, 0, 26, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 18px;
          flex: 1;
          min-height: 0;
          overflow-x: hidden;
          overflow-y: auto;
          padding-right: 4px;
          pointer-events: auto;
        }
        .tl-section {
          margin: 10px 0 6px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 1.4px;
          color: #8aa4b5;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 36px minmax(0, 1fr);
          align-items: center;
          gap: 12px;
          min-height: 64px;
          padding: 10px 14px;
          background: rgba(16, 24, 32, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
          cursor: pointer;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 18px;
          line-height: 1.3;
          color: #f2fcff;
          white-space: normal;
          overflow-wrap: break-word;
        }
        .resume-detail-row.has-detail .resume-detail-row-title::after {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-left: 10px;
          background: #c4001a;
          transform: translateY(-1px);
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          line-height: 1;
          letter-spacing: 0.6px;
          color: #06133b;
          background: #8aa4b5;
          padding: 6px 8px;
          white-space: nowrap;
          justify-self: end;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #edfaff;
        }

      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>TIMELINE</div>
          <div className="resume-year-scroll">
            {ITEMS.map((item, index) => (
              <div
                key={item.id}
                className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
                style={{ transitionDelay: `${index * 55}ms` }}
                onMouseEnter={() => {
                  setFocus("years");
                  setActive(index);
                  setItemIndex(0);
                }}
                onClick={() => {
                  setFocus("years");
                  setActive(index);
                  setItemIndex(0);
                }}
              >
                <div className="resume-card">
                  <div className="resume-badge">
                    <div className="resume-badge-text">{item.badge}</div>
                  </div>
                  <div className="resume-card-inner">
                    <div className="resume-title">{item.title}</div>
                  </div>
                  <div className="resume-subtitle-bar">
                    <div className="resume-subtitle">{item.subtitle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {year && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">{year.badge}</div>
              <div className="resume-detail-top-title">{year.title}</div>
              <div className="resume-detail-top-progress">{String(year.entries.length).padStart(2, "0")}</div>
            </div>

            <div className="resume-detail-list" key={year.id}>
              {year.sections.map((section, sectionIndex) => (
                <div key={`${year.id}-${sectionIndex}`}>
                  <div className="tl-section">{section.tag}</div>
                  {section.items.map((row) => (
                    <div
                      className={`resume-detail-row${row.detail ? " has-detail" : ""}${focus === "items" && itemIndex === row.index ? " selected" : ""}`}
                      key={`${year.id}-${sectionIndex}-${row.index}`}
                      onMouseEnter={() => {
                        setFocus("items");
                        setItemIndex(row.index);
                      }}
                      onClick={() => {
                        setFocus("items");
                        setItemIndex(row.index);
                        setOpen(row);
                      }}
                    >
                      <div className="resume-detail-row-index">{String(row.index + 1).padStart(2, "0")}</div>
                      <div className="resume-detail-row-title">{shorten(row)}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {open && (
          <div className="tl-modal-back" onClick={() => setOpen(null)}>
            <div className="tl-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <div className="tl-modal-kicker">{year?.title} · {open.tag}</div>
              <div className="tl-modal-title">{open.text}</div>
              {open.detail ? <div className="tl-modal-body">{open.detail}</div> : null}
              <button className="tl-modal-close" type="button" onClick={() => setOpen(null)}>CLOSE</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
