const FLOATS = [
  // Coins & bords
  { emoji: '👶', x: '2%',   y: '7%',   size: '2.2rem', delay: '0s',    dur: '4.2s', anim: 'float'  },
  { emoji: '💖', x: '91%',  y: '5%',   size: '1.9rem', delay: '0.6s',  dur: '5.1s', anim: 'sway'   },
  { emoji: '🎀', x: '47%',  y: '2%',   size: '2.0rem', delay: '1.2s',  dur: '4.8s', anim: 'float'  },
  { emoji: '🧸', x: '1%',   y: '40%',  size: '2.2rem', delay: '0.4s',  dur: '5.5s', anim: 'float'  },
  { emoji: '🌈', x: '93%',  y: '38%',  size: '1.8rem', delay: '1.8s',  dur: '4.0s', anim: 'sway'   },
  { emoji: '🍼', x: '0%',   y: '72%',  size: '2.0rem', delay: '0.9s',  dur: '4.6s', anim: 'float'  },
  { emoji: '💜', x: '90%',  y: '70%',  size: '1.7rem', delay: '1.5s',  dur: '3.9s', anim: 'pulse'  },
  { emoji: '🌸', x: '45%',  y: '91%',  size: '1.8rem', delay: '0.3s',  dur: '5.3s', anim: 'sway'   },
  // Milieu gauche / droite
  { emoji: '⭐', x: '12%',  y: '17%',  size: '1.5rem', delay: '2.0s',  dur: '3.6s', anim: 'pulse'  },
  { emoji: '🌺', x: '83%',  y: '15%',  size: '1.7rem', delay: '0.7s',  dur: '4.3s', anim: 'float'  },
  { emoji: '💛', x: '22%',  y: '52%',  size: '1.6rem', delay: '1.1s',  dur: '6.1s', anim: 'sway'   },
  { emoji: '🦋', x: '77%',  y: '54%',  size: '1.8rem', delay: '2.3s',  dur: '4.9s', anim: 'float'  },
  { emoji: '🌼', x: '14%',  y: '82%',  size: '1.7rem', delay: '0.5s',  dur: '4.4s', anim: 'sway'   },
  { emoji: '🎊', x: '80%',  y: '84%',  size: '1.9rem', delay: '1.7s',  dur: '3.7s', anim: 'pulse'  },
  // Zone centrale (dispersés)
  { emoji: '✨', x: '32%',  y: '11%',  size: '1.4rem', delay: '0.2s',  dur: '3.3s', anim: 'pulse'  },
  { emoji: '💕', x: '63%',  y: '9%',   size: '1.5rem', delay: '1.4s',  dur: '5.7s', anim: 'float'  },
  { emoji: '🍀', x: '37%',  y: '35%',  size: '1.6rem', delay: '2.6s',  dur: '4.1s', anim: 'sway'   },
  { emoji: '💫', x: '58%',  y: '44%',  size: '1.4rem', delay: '0.8s',  dur: '3.5s', anim: 'pulse'  },
  { emoji: '🌟', x: '27%',  y: '68%',  size: '1.5rem', delay: '1.9s',  dur: '5.0s', anim: 'float'  },
  { emoji: '🎈', x: '67%',  y: '72%',  size: '1.8rem', delay: '0.1s',  dur: '4.7s', anim: 'sway'   },
  { emoji: '🩷', x: '53%',  y: '60%',  size: '1.4rem', delay: '2.1s',  dur: '3.8s', anim: 'pulse'  },
  { emoji: '🍭', x: '40%',  y: '79%',  size: '1.6rem', delay: '1.3s',  dur: '5.4s', anim: 'float'  },
  { emoji: '💙', x: '7%',   y: '29%',  size: '1.5rem', delay: '2.4s',  dur: '4.5s', anim: 'sway'   },
  { emoji: '🌷', x: '87%',  y: '28%',  size: '1.6rem', delay: '0.6s',  dur: '5.8s', anim: 'float'  },
];

const BLOBS = [
  { color: 'rgba(236,72,153,0.22)',  x: '-8%',  y: '-5%',  w: '420px', h: '380px', blur: '90px'  },
  { color: 'rgba(168,85,247,0.20)',  x: '65%',  y: '-10%', w: '380px', h: '360px', blur: '80px'  },
  { color: 'rgba(59,130,246,0.18)',  x: '30%',  y: '30%',  w: '500px', h: '440px', blur: '110px' },
  { color: 'rgba(236,72,153,0.15)',  x: '-5%',  y: '60%',  w: '360px', h: '340px', blur: '85px'  },
  { color: 'rgba(167,139,250,0.20)', x: '70%',  y: '60%',  w: '400px', h: '380px', blur: '90px'  },
  { color: 'rgba(251,191,36,0.12)',  x: '40%',  y: '75%',  w: '300px', h: '280px', blur: '70px'  },
];

export default function FloatingDecor() {
  return (
    <>
      <style>{`
        @keyframes float  { from { transform: translateY(0px)   rotate(-3deg); } to { transform: translateY(-16px) rotate(3deg);  } }
        @keyframes sway   { from { transform: translateX(0px)   rotate(-2deg); } to { transform: translateX(12px)  rotate(2deg);  } }
        @keyframes pulse  { from { transform: scale(1)    rotate(0deg);   opacity: 0.5; } to { transform: scale(1.25) rotate(8deg);  opacity: 0.9; } }
      `}</style>

      {/* Blobs de fond */}
      {BLOBS.map((b, i) => (
        <div
          key={`blob-${i}`}
          className="fixed pointer-events-none"
          style={{
            left: b.x,
            top: b.y,
            width: b.w,
            height: b.h,
            background: b.color,
            borderRadius: '50%',
            filter: `blur(${b.blur})`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Emojis flottants */}
      {FLOATS.map((f, i) => (
        <div
          key={`emoji-${i}`}
          className="fixed select-none pointer-events-none"
          style={{
            left: f.x,
            top: f.y,
            fontSize: f.size,
            opacity: 0.65,
            animation: `${f.anim} ${f.dur} ${f.delay} ease-in-out infinite alternate`,
            zIndex: 1,
          }}
        >
          {f.emoji}
        </div>
      ))}
    </>
  );
}
