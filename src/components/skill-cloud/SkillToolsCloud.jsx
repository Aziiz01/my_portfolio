import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './skill-cloud.css';

const TILE_BG = '#FDF9F0';

/** Balanced column count so the last row is not a single tiny row (works well for ~15–40 items). */
function pickCols(count) {
  if (count <= 0) return 1;
  if (count <= 3) return count;
  const ideal = Math.ceil(Math.sqrt(count));
  return Math.max(3, Math.min(6, ideal));
}

function buildStaggeredLayout(count, opts = {}) {
  const colStep = opts.colStep ?? 210;
  const rowStep = opts.rowStep ?? 118;
  const offset = opts.offset ?? 105;
  const colsPerRow = opts.colsPerRow ?? pickCols(count);
  const pad = opts.pad ?? 48;
  const maxTile = opts.maxTile ?? 132;

  const positions = [];
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / colsPerRow);
    const col = i % colsPerRow;
    const left = pad + col * colStep + (row % 2) * offset;
    const top = pad + row * rowStep;
    positions.push({ left, top });
  }

  const rows = Math.ceil(count / colsPerRow) || 1;
  const canvasW = pad * 2 + (colsPerRow - 1) * colStep + offset + maxTile;
  const canvasH = pad * 2 + Math.max(0, rows - 1) * rowStep + maxTile;

  return { positions, canvasW, canvasH, colsPerRow, maxTile };
}

function tileDiameter(left, top, canvasW, canvasH, maxTile) {
  const half = maxTile / 2;
  const cx = canvasW / 2;
  const cy = canvasH / 2;
  const px = left + half;
  const py = top + half;
  const d = Math.hypot(px - cx, py - cy);
  if (d < 300) return maxTile;
  if (d < 460) return Math.round(maxTile * 0.82);
  return Math.round(maxTile * 0.68);
}

function clampPan(x, y, frameW, frameH, canvasW, canvasH) {
  const margin = 32;
  if (canvasW <= frameW) {
    x = (frameW - canvasW) / 2;
  } else {
    const minX = frameW - canvasW - margin;
    const maxX = margin;
    x = Math.min(maxX, Math.max(minX, x));
  }
  if (canvasH <= frameH) {
    y = (frameH - canvasH) / 2;
  } else {
    const minY = frameH - canvasH - margin;
    const maxY = margin;
    y = Math.min(maxY, Math.max(minY, y));
  }
  return { x, y };
}

export default function SkillToolsCloud({ items }) {
  const reduced = useReducedMotion();
  const frameRef = useRef(null);
  const [frameSize, setFrameSize] = useState({ w: 0, h: 0 });
  const dragRef = useRef(null);

  const displayItems = useMemo(() => {
    const seen = new Set();
    return items.filter((item) => {
      const key = item.label?.trim() || item.imgSrc;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [items]);
  const { positions, canvasW, canvasH, maxTile } = useMemo(
    () => buildStaggeredLayout(displayItems.length),
    [displayItems.length]
  );

  const [pan, setPan] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setFrameSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!frameSize.w || !canvasW) return;
    const { x, y } = clampPan(
      (frameSize.w - canvasW) / 2,
      (frameSize.h - canvasH) / 2,
      frameSize.w,
      frameSize.h,
      canvasW,
      canvasH
    );
    setPan({ x, y });
  }, [frameSize.w, frameSize.h, canvasW, canvasH]);

  const onPointerDown = useCallback(
    (e) => {
      e.preventDefault();
      if (e.currentTarget.setPointerCapture) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      dragRef.current = {
        active: true,
        sx: e.clientX,
        sy: e.clientY,
        ox: pan.x,
        oy: pan.y,
      };
    },
    [pan.x, pan.y]
  );

  const onPointerMove = useCallback(
    (e) => {
      const d = dragRef.current;
      if (!d?.active || !frameSize.w) return;
      const nx = d.ox + (e.clientX - d.sx);
      const ny = d.oy + (e.clientY - d.sy);
      setPan(clampPan(nx, ny, frameSize.w, frameSize.h, canvasW, canvasH));
    },
    [canvasW, canvasH, frameSize.w, frameSize.h]
  );

  const onPointerUp = useCallback((e) => {
    if (e.currentTarget.releasePointerCapture) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragRef.current = null;
  }, []);

  return (
    <div className="skill-tools-cloud w-full">
      <div
        ref={frameRef}
        className="skill-tools-cloud__viewport relative"
        style={{
          height: 'min(640px, 78vh)',
          minHeight: 420,
          touchAction: 'none',
          userSelect: 'none',
          cursor: 'grab',
        }}
        role="region"
        aria-label="Skills and tools — drag to pan"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="skill-tools-cloud__canvas absolute left-0 top-0 will-change-transform"
          style={{
            width: canvasW,
            height: canvasH,
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`,
          }}
        >
          {displayItems.map((item, i) => {
            const { left, top } = positions[i] ?? positions[positions.length - 1];
            const diameter = tileDiameter(left, top, canvasW, canvasH, maxTile);
            const iconSize = Math.round(diameter * 0.5);

            return (
              <motion.div
                key={`${item.label}-${i}`}
                className="skill-tools-cloud__tile absolute flex items-center justify-center rounded-full"
                style={{
                  left,
                  top,
                  width: diameter,
                  height: diameter,
                  background: TILE_BG,
                }}
                initial={reduced ? false : { scale: 0, opacity: 0 }}
                whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '80px' }}
                transition={
                  reduced
                    ? undefined
                    : {
                        type: 'spring',
                        stiffness: 420,
                        damping: 28,
                        delay: Math.min(i * 0.012, 0.45),
                      }
                }
              >
                <img
                  src={item.imgSrc}
                  alt=""
                  width={iconSize}
                  height={iconSize}
                  className="pointer-events-none object-contain"
                  style={{ width: iconSize, height: iconSize }}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
                <span className="sr-only">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
