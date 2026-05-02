import { useId } from "react";
import {
  Code2, Database, Cloud, Megaphone, Search, Palette,
  Cpu, Zap, Shield, Globe, LayoutGrid, Rocket, Layers,
  BarChart2, MonitorSmartphone, ShoppingCart,
  TrendingUp, Target, Award, Users, Star,
  Mail, Wifi, Activity, PenTool, MousePointer,
  Server, GitBranch, Terminal, Lock, Monitor,
} from "lucide-react";

/* ── Icon sets ── */
const ICON_SETS = {
  full: [
    { Icon: Code2,            pct: [6,  12], size: 52, dur: 4.2, delay: 0,   rev: false },
    { Icon: Database,         pct: [88, 18], size: 38, dur: 5.1, delay: 1.5, rev: true  },
    { Icon: Cloud,            pct: [78, 68], size: 56, dur: 6.0, delay: 2.5, rev: false },
    { Icon: Megaphone,        pct: [11, 74], size: 44, dur: 4.8, delay: 1.0, rev: true  },
    { Icon: Search,           pct: [48,  6], size: 34, dur: 5.4, delay: 3.0, rev: false },
    { Icon: Palette,          pct: [93, 44], size: 40, dur: 4.0, delay: 2.0, rev: true  },
    { Icon: Cpu,              pct: [3,  50], size: 50, dur: 6.2, delay: 0.5, rev: false },
    { Icon: Zap,              pct: [60, 84], size: 36, dur: 5.0, delay: 1.8, rev: true  },
    { Icon: Globe,            pct: [28, 92], size: 42, dur: 4.6, delay: 2.8, rev: false },
    { Icon: Rocket,           pct: [72,  4], size: 36, dur: 5.3, delay: 0.8, rev: true  },
    { Icon: BarChart2,        pct: [20, 35], size: 30, dur: 4.9, delay: 3.5, rev: false },
    { Icon: MonitorSmartphone,pct: [82, 30], size: 34, dur: 5.7, delay: 1.2, rev: true  },
    { Icon: ShoppingCart,     pct: [40, 78], size: 32, dur: 4.4, delay: 4.0, rev: false },
    { Icon: Layers,           pct: [55, 20], size: 28, dur: 6.1, delay: 0.3, rev: true  },
    { Icon: Shield,           pct: [15, 58], size: 30, dur: 5.5, delay: 2.2, rev: false },
  ],
  header: [
    { Icon: Code2,     pct: [2,  20], size: 32, dur: 5,   delay: 0,   rev: false },
    { Icon: Database,  pct: [92, 25], size: 26, dur: 6,   delay: 1.5, rev: true  },
    { Icon: Megaphone, pct: [50,  5], size: 22, dur: 4.5, delay: 2,   rev: false },
    { Icon: Cloud,     pct: [85, 60], size: 28, dur: 5.5, delay: 0.8, rev: true  },
    { Icon: Cpu,       pct: [4,  65], size: 24, dur: 4.8, delay: 3,   rev: false },
    { Icon: Zap,       pct: [70,  8], size: 20, dur: 6,   delay: 1.2, rev: true  },
  ],
  footer: [
    { Icon: Code2,            pct: [2,  10], size: 60, dur: 5,   delay: 0,   rev: false },
    { Icon: Database,         pct: [90,  8], size: 48, dur: 6,   delay: 1.5, rev: true  },
    { Icon: Cloud,            pct: [88, 70], size: 70, dur: 7,   delay: 2,   rev: false },
    { Icon: Megaphone,        pct: [6,  80], size: 56, dur: 5.5, delay: 1,   rev: true  },
    { Icon: Cpu,              pct: [45,  5], size: 44, dur: 6.5, delay: 3,   rev: false },
    { Icon: BarChart2,        pct: [50, 90], size: 52, dur: 5,   delay: 0.5, rev: true  },
    { Icon: MonitorSmartphone,pct: [20, 50], size: 40, dur: 7,   delay: 2.5, rev: false },
    { Icon: ShoppingCart,     pct: [75, 50], size: 44, dur: 6,   delay: 1.8, rev: true  },
  ],
  minimal: [
    { Icon: Code2,    pct: [4,  15], size: 38, dur: 5,   delay: 0,   rev: false },
    { Icon: Database, pct: [90, 20], size: 30, dur: 6,   delay: 1.5, rev: true  },
    { Icon: Cloud,    pct: [85, 75], size: 44, dur: 7,   delay: 2.5, rev: false },
    { Icon: Megaphone,pct: [8,  78], size: 34, dur: 5.5, delay: 1,   rev: true  },
  ],
  /* ── Marketing / growth themed ── */
  marketing: [
    { Icon: TrendingUp,   pct: [5,  14], size: 40, dur: 5.2, delay: 0,   rev: false },
    { Icon: Target,       pct: [88, 20], size: 34, dur: 6.1, delay: 1.8, rev: true  },
    { Icon: BarChart2,    pct: [80, 72], size: 48, dur: 5.8, delay: 2.2, rev: false },
    { Icon: Megaphone,    pct: [9,  76], size: 38, dur: 4.9, delay: 0.9, rev: true  },
    { Icon: Rocket,       pct: [46,  5], size: 30, dur: 5.5, delay: 3.1, rev: false },
    { Icon: Star,         pct: [92, 48], size: 28, dur: 6.3, delay: 1.4, rev: true  },
    { Icon: Award,        pct: [2,  52], size: 36, dur: 4.7, delay: 0.4, rev: false },
    { Icon: Users,        pct: [58, 88], size: 32, dur: 5.0, delay: 2.6, rev: true  },
    { Icon: MousePointer, pct: [70,  8], size: 26, dur: 6.4, delay: 0.7, rev: false },
    { Icon: Mail,         pct: [22, 90], size: 30, dur: 5.3, delay: 3.8, rev: true  },
    { Icon: Activity,     pct: [35, 30], size: 24, dur: 4.6, delay: 1.1, rev: false },
    { Icon: ShoppingCart, pct: [75, 40], size: 28, dur: 5.9, delay: 2.0, rev: true  },
  ],
  /* ── Dev / tech infrastructure themed ── */
  devtech: [
    { Icon: Terminal,   pct: [4,  12], size: 42, dur: 5.1, delay: 0,   rev: false },
    { Icon: Server,     pct: [89, 18], size: 36, dur: 6.2, delay: 1.6, rev: true  },
    { Icon: Database,   pct: [82, 70], size: 50, dur: 5.7, delay: 2.3, rev: false },
    { Icon: Cpu,        pct: [7,  74], size: 40, dur: 4.8, delay: 1.0, rev: true  },
    { Icon: GitBranch,  pct: [47,  4], size: 32, dur: 5.6, delay: 3.0, rev: false },
    { Icon: Lock,       pct: [93, 46], size: 28, dur: 6.0, delay: 2.1, rev: true  },
    { Icon: Code2,      pct: [2,  50], size: 44, dur: 4.5, delay: 0.6, rev: false },
    { Icon: Layers,     pct: [60, 86], size: 34, dur: 5.2, delay: 1.9, rev: true  },
    { Icon: Wifi,       pct: [74,  6], size: 28, dur: 6.5, delay: 0.8, rev: false },
    { Icon: Monitor,    pct: [25, 92], size: 32, dur: 5.4, delay: 2.9, rev: true  },
    { Icon: Shield,     pct: [38, 28], size: 24, dur: 4.9, delay: 3.6, rev: false },
    { Icon: Zap,        pct: [78, 34], size: 26, dur: 5.8, delay: 1.3, rev: true  },
  ],
};

export default function TechMeshBg({
  variant    = "full",
  opacity    = 1,
  iconColor  = "#5025d1",
  iconOpacityBase = 0.055,
}) {
  const uid = useId().replace(/:/g, "");
  const patternId = `mesh-${uid}`;
  const icons = ICON_SETS[variant] || ICON_SETS.full;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
      style={{ opacity }}
    >
      {/* ── Circuit / mesh SVG tiled pattern ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.65 }}
      >
        <defs>
          <pattern
            id={patternId}
            x="0" y="0"
            width="80" height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Corner nodes */}
            <circle cx="0"  cy="0"  r="1.8" fill={iconColor} fillOpacity="0.22"/>
            <circle cx="80" cy="0"  r="1.8" fill={iconColor} fillOpacity="0.22"/>
            <circle cx="0"  cy="80" r="1.8" fill={iconColor} fillOpacity="0.22"/>
            <circle cx="80" cy="80" r="1.8" fill={iconColor} fillOpacity="0.22"/>
            {/* Mid-edge nodes */}
            <circle cx="40" cy="0"  r="1"   fill={iconColor} fillOpacity="0.12"/>
            <circle cx="0"  cy="40" r="1"   fill={iconColor} fillOpacity="0.12"/>
            <circle cx="80" cy="40" r="1"   fill={iconColor} fillOpacity="0.12"/>
            <circle cx="40" cy="80" r="1"   fill={iconColor} fillOpacity="0.12"/>
            {/* Center node with pad square */}
            <circle cx="40" cy="40" r="2.2" fill={iconColor} fillOpacity="0.28"/>
            <rect   x="37.5" y="37.5" width="5" height="5"
              fill="none" stroke={iconColor} strokeWidth="0.7" strokeOpacity="0.2"/>
            {/* Circuit traces */}
            <path d="M0 0 L40 0"         stroke={iconColor} strokeWidth="0.6" strokeOpacity="0.12"/>
            <path d="M40 0 L40 40"       stroke={iconColor} strokeWidth="0.6" strokeOpacity="0.12"/>
            <path d="M40 40 L80 40"      stroke={iconColor} strokeWidth="0.6" strokeOpacity="0.12"/>
            <path d="M80 0 L80 40"       stroke={iconColor} strokeWidth="0.6" strokeOpacity="0.08"/>
            <path d="M0 40 L0 80"        stroke={iconColor} strokeWidth="0.6" strokeOpacity="0.08"/>
            <path d="M0 80 L40 80"       stroke={iconColor} strokeWidth="0.6" strokeOpacity="0.1"/>
            <path d="M40 80 L40 40"      stroke={iconColor} strokeWidth="0.6" strokeOpacity="0.1"/>
            <path d="M40 40 L0 40"       stroke={iconColor} strokeWidth="0.6" strokeOpacity="0.08"/>
            {/* L-bend accent traces */}
            <path d="M10 0 L10 10 L0 10"   stroke={iconColor} strokeWidth="0.5" strokeOpacity="0.09" fill="none"/>
            <path d="M70 80 L70 70 L80 70" stroke={iconColor} strokeWidth="0.5" strokeOpacity="0.09" fill="none"/>
            {/* Cross markers at quarter points */}
            <line x1="20" y1="18" x2="20" y2="22" stroke={iconColor} strokeWidth="0.5" strokeOpacity="0.1"/>
            <line x1="18" y1="20" x2="22" y2="20" stroke={iconColor} strokeWidth="0.5" strokeOpacity="0.1"/>
            <line x1="60" y1="58" x2="60" y2="62" stroke={iconColor} strokeWidth="0.5" strokeOpacity="0.1"/>
            <line x1="58" y1="60" x2="62" y2="60" stroke={iconColor} strokeWidth="0.5" strokeOpacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`}/>
      </svg>

      {/* ── Floating tech icons ── */}
      {icons.map((item, i) => {
        const Icon = item.Icon;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left:      `${item.pct[0]}%`,
              top:       `${item.pct[1]}%`,
              opacity:   iconOpacityBase,
              animation: `${item.rev ? "floatYReverse" : "floatY"} ${item.dur}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`,
            }}
          >
            <Icon
              style={{ width: item.size, height: item.size, color: iconColor }}
              strokeWidth={1}
            />
          </div>
        );
      })}
    </div>
  );
}
