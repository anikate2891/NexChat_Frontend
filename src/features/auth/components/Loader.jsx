// import { useEffect, useRef } from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen bg-gray-950">
      <div
        style={{
          width: "200px",
          height: "200px",
          position: "relative",
        }}
      >
        <style>{`
          @keyframes moveGradient {
            to { background-position: 100% 50%; }
          }
          @keyframes oneMove {
            0%         { visibility:visible; clip-path:inset(0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            14.2857%   { clip-path:inset(0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            28.5714%   { clip-path:inset(35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            42.8571%   { clip-path:inset(35% 70% 35% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            57.1428%   { clip-path:inset(35% 70% 35% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            71.4285%   { clip-path:inset(0% 70% 70% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            85.7142%   { clip-path:inset(0% 70% 70% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            100%       { clip-path:inset(0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
          }
          @keyframes twoMove {
            0%         { visibility:visible; clip-path:inset(0% 70% 70% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            14.2857%   { clip-path:inset(0% 70% 70% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            28.5714%   { clip-path:inset(0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            42.8571%   { clip-path:inset(0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            57.1428%   { clip-path:inset(35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            71.4285%   { clip-path:inset(35% 70% 35% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            85.7142%   { clip-path:inset(35% 70% 35% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            100%       { clip-path:inset(0% 70% 70% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
          }
          @keyframes threeMove {
            0%         { visibility:visible; clip-path:inset(35% 70% 35% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            14.2857%   { clip-path:inset(35% 70% 35% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            28.5714%   { clip-path:inset(0% 70% 70% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            42.8571%   { clip-path:inset(0% 70% 70% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            57.1428%   { clip-path:inset(0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            71.4285%   { clip-path:inset(0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            85.7142%   { clip-path:inset(35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            100%       { clip-path:inset(35% 70% 35% 0 round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
          }
          @keyframes fourMove {
            0%         { visibility:visible; clip-path:inset(35% 0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            14.2857%   { clip-path:inset(35% 0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            28.5714%   { clip-path:inset(35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            42.8571%   { clip-path:inset(70% 35% 0% 35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            57.1428%   { clip-path:inset(70% 35% 0% 35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            71.4285%   { clip-path:inset(70% 0 0 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            85.7142%   { clip-path:inset(70% 0 0 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            100%       { clip-path:inset(35% 0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
          }
          @keyframes fiveMove {
            0%         { visibility:visible; clip-path:inset(70% 0 0 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            14.2857%   { clip-path:inset(70% 0 0 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            28.5714%   { clip-path:inset(35% 0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            42.8571%   { clip-path:inset(35% 0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            57.1428%   { clip-path:inset(35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            71.4285%   { clip-path:inset(70% 35% 0% 35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            85.7142%   { clip-path:inset(70% 35% 0% 35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            100%       { clip-path:inset(70% 0 0 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
          }
          @keyframes sixMove {
            0%         { visibility:visible; clip-path:inset(70% 35% 0% 35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            14.2857%   { clip-path:inset(70% 35% 0% 35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            28.5714%   { clip-path:inset(70% 0 0 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            42.8571%   { clip-path:inset(70% 0 0 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            57.1428%   { clip-path:inset(35% 0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            71.4285%   { clip-path:inset(35% 0% 35% 70% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            85.7142%   { clip-path:inset(35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
            100%       { clip-path:inset(70% 35% 0% 35% round 5%); animation-timing-function:cubic-bezier(0.86,0,0.07,1); }
          }
          .loader-box {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: linear-gradient(to right, #141562, #486FBC, #EAB5A1, #8DD6FF, #4973C9, #D07CA7, #F4915E, #F5919E, #B46F89, #141562, #486FBC);
            background-position: 0% 50%;
            background-size: 1000% 1000%;
            visibility: hidden;
          }
          .loader-box.one   { animation: moveGradient 15s infinite, oneMove 3.5s infinite; }
          .loader-box.two   { animation: moveGradient 15s infinite, twoMove 3.5s 0.15s infinite; }
          .loader-box.three { animation: moveGradient 15s infinite, threeMove 3.5s 0.3s infinite; }
          .loader-box.four  { animation: moveGradient 15s infinite, fourMove 3.5s 0.575s infinite; }
          .loader-box.five  { animation: moveGradient 15s infinite, fiveMove 3.5s 0.725s infinite; }
          .loader-box.six   { animation: moveGradient 15s infinite, sixMove 3.5s 0.875s infinite; }
        `}</style>

        {/* box-wrap: 70% of 200px = 140px, centered, rotated -45deg */}
        <div
          style={{
            width: "70%",
            height: "70%",
            margin: "calc((100% - 70%) / 2) calc((100% - 70%) / 2)",
            position: "relative",
            transform: "rotate(-45deg)",
          }}
        >
          {["one", "two", "three", "four", "five", "six"].map((cls) => (
            <div key={cls} className={`loader-box ${cls}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;