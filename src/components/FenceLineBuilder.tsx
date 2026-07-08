import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface FenceLineBuilderProps {
  length: number; // linear feet
  posts: number;
  gates: number;
  fenceType?: 'barbed' | 'woven' | 'high_tensile' | 'electric';
  cost?: number | null;
}

export function FenceLineBuilder({ length, posts, gates, fenceType = 'barbed', cost }: FenceLineBuilderProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const totalVisualElements = 8;
  const elements = [];
  
  for (let i = 0; i < totalVisualElements; i++) {
    elements.push('post');
  }
  
  if (gates > 0) {
    elements[Math.floor(totalVisualElements / 2)] = 'gate';
  }

  // Generate wires
  const renderWires = () => {
    switch (fenceType) {
      case 'barbed':
        return (
          <div className="absolute left-2 right-2 bottom-6 top-8 flex flex-col justify-between z-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full border-t-2 border-rust-wire opacity-80 origin-left"
                style={{ borderTopStyle: 'dashed' }}
              />
            ))}
          </div>
        );
      case 'woven':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute left-2 right-2 bottom-6 top-10 border-t-2 border-b-2 border-fence-iron/40 opacity-70 z-0 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(58, 62, 54, 0.4) 95%)', backgroundSize: '16px 100%' }}
          />
        );
      case 'high_tensile':
        return (
          <div className="absolute left-2 right-2 bottom-6 top-8 flex flex-col justify-between z-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full border-t border-fence-iron opacity-60 origin-left"
              />
            ))}
          </div>
        );
      case 'electric':
        return (
          <div className="absolute left-2 right-2 bottom-6 top-10 flex flex-col justify-between z-0 pointer-events-none">
            {[...Array(2)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full border-t-2 border-barbed-amber opacity-90 origin-left"
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-pasture-cream/50 p-6 rounded-xl border border-fence-iron/20 overflow-hidden relative min-h-[160px] flex items-end justify-between mt-6">
      
      {mounted && renderWires()}
      
      {/* Ground line */}
      <div className="absolute bottom-4 left-0 right-0 border-t-2 border-graze-green opacity-40 z-0" />

      {/* Elements */}
      {elements.map((el, i) => (
         <motion.div
           key={`${el}-${i}`}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: i * 0.1 }}
           className={cn("z-10 relative flex flex-col items-center", el === 'post' ? "h-24 justify-end" : "h-28 justify-end")}
         >
           {el === 'post' && (
             <div className="w-3 h-24 bg-fence-iron rounded-t-sm shadow-sm" />
           )}
           {el === 'gate' && (
             <div className="w-16 h-24 border-4 border-fence-iron bg-pasture-cream/80 relative flex items-center justify-center shadow-sm">
                <div className="absolute w-full h-[4px] bg-fence-iron rotate-45" />
                <div className="absolute w-full h-[4px] bg-fence-iron -rotate-45" />
             </div>
           )}
         </motion.div>
      ))}
      
      {/* Details Box */}
      {mounted && (length > 0 || cost != null) && (
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: totalVisualElements * 0.1 + 0.3 }}
           className="absolute left-1/2 -translate-x-1/2 top-4 bg-white/90 border border-fence-iron/20 text-fence-iron font-mono px-4 py-2 rounded shadow-sm z-20 flex flex-col items-center"
         >
           {length > 0 && <div className="text-xs text-fence-iron/60 font-sans uppercase tracking-wider mb-1">{length.toLocaleString()} Linear Ft</div>}
           {cost != null && <div className="font-display text-xl font-bold text-danger-rust">${cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>}
         </motion.div>
      )}
    </div>
  );
}
