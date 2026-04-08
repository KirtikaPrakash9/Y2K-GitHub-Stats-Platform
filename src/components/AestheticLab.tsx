'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

type Preset = {
  id: string;
  name: string;
  swatches: [string, string, string];
  vars: Record<string, string>;
};

const PRESETS: Preset[] = [
  {
    id: 'saturn-burn',
    name: 'Saturn Burn',
    swatches: ['#ff7a18', '#ff0f7b', '#ffd166'],
    vars: {
      '--neon-cyan': '#5ef2ff',
      '--neon-magenta': '#ff0f7b',
      '--neon-yellow': '#ffd166',
      '--neon-pink': '#ff5e84',
      '--neon-blue': '#4dc9ff',
      '--bg-dark': '#120912',
      '--bg-darker': '#09050f',
    },
  },
  {
    id: 'acid-grid',
    name: 'Acid Grid',
    swatches: ['#b8ff00', '#00f5d4', '#1bffb3'],
    vars: {
      '--neon-cyan': '#00f5d4',
      '--neon-magenta': '#b8ff00',
      '--neon-yellow': '#f9ff72',
      '--neon-pink': '#7dff8a',
      '--neon-blue': '#2ad0ff',
      '--bg-dark': '#071109',
      '--bg-darker': '#040a05',
    },
  },
  {
    id: 'ice-machine',
    name: 'Ice Machine',
    swatches: ['#6ee7ff', '#7f5af0', '#9ef01a'],
    vars: {
      '--neon-cyan': '#6ee7ff',
      '--neon-magenta': '#7f5af0',
      '--neon-yellow': '#c3f73a',
      '--neon-pink': '#89c2ff',
      '--neon-blue': '#5bc0ff',
      '--bg-dark': '#070b1d',
      '--bg-darker': '#040611',
    },
  },
];

const STORAGE_KEYS = {
  preset: 'gitwrapped_preset',
  crt: 'gitwrapped_crt',
  grain: 'gitwrapped_grain',
  minimalMotion: 'gitwrapped_minimal_motion',
};

export function AestheticLab() {
  const [presetId, setPresetId] = useState<string>(PRESETS[0].id);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [grainEnabled, setGrainEnabled] = useState(true);
  const [minimalMotion, setMinimalMotion] = useState(false);

  const currentPreset = useMemo(
    () => PRESETS.find((preset) => preset.id === presetId) || PRESETS[0],
    [presetId]
  );

  useEffect(() => {
    const savedPreset = localStorage.getItem(STORAGE_KEYS.preset);
    const savedCrt = localStorage.getItem(STORAGE_KEYS.crt);
    const savedGrain = localStorage.getItem(STORAGE_KEYS.grain);
    const savedMinimalMotion = localStorage.getItem(STORAGE_KEYS.minimalMotion);

    if (savedPreset && PRESETS.some((preset) => preset.id === savedPreset)) {
      setPresetId(savedPreset);
    }
    if (savedCrt) {
      setCrtEnabled(savedCrt === '1');
    }
    if (savedGrain) {
      setGrainEnabled(savedGrain === '1');
    }
    if (savedMinimalMotion) {
      setMinimalMotion(savedMinimalMotion === '1');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(currentPreset.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    localStorage.setItem(STORAGE_KEYS.preset, currentPreset.id);
  }, [currentPreset]);

  useEffect(() => {
    document.body.classList.toggle('crt-overlay', crtEnabled);
    localStorage.setItem(STORAGE_KEYS.crt, crtEnabled ? '1' : '0');
  }, [crtEnabled]);

  useEffect(() => {
    document.body.classList.toggle('grain-overlay', grainEnabled);
    localStorage.setItem(STORAGE_KEYS.grain, grainEnabled ? '1' : '0');
  }, [grainEnabled]);

  useEffect(() => {
    document.body.classList.toggle('motion-minimal', minimalMotion);
    localStorage.setItem(STORAGE_KEYS.minimalMotion, minimalMotion ? '1' : '0');
  }, [minimalMotion]);

  const surpriseMe = () => {
    const next = PRESETS[Math.floor(Math.random() * PRESETS.length)];
    setPresetId(next.id);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <GlassPanel glowColor="cyan" className="p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="font-orbitron text-lg font-bold text-white">Visual Lab</h3>
          <button
            onClick={surpriseMe}
            className="px-3 py-2 rounded-md font-mono text-xs border border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[rgba(0,255,255,0.15)] transition-colors"
          >
            Randomize Palette
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setPresetId(preset.id)}
              className={`p-3 rounded-xl border transition-all text-left ${
                presetId === preset.id
                  ? 'border-white shadow-[0_0_24px_rgba(255,255,255,0.2)]'
                  : 'border-white/15 hover:border-white/40'
              }`}
              style={{
                background: `linear-gradient(140deg, ${preset.swatches[0]}22 0%, ${preset.swatches[1]}20 45%, ${preset.swatches[2]}18 100%)`,
              }}
            >
              <div className="flex gap-2 mb-2">
                {preset.swatches.map((swatch) => (
                  <span key={`${preset.id}-${swatch}`} className="w-4 h-4 rounded-full" style={{ background: swatch }} />
                ))}
              </div>
              <div className="font-mono text-xs text-white">{preset.name}</div>
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono">
          <Toggle label="CRT Scanlines" enabled={crtEnabled} onToggle={setCrtEnabled} />
          <Toggle label="Film Grain" enabled={grainEnabled} onToggle={setGrainEnabled} />
          <Toggle label="Minimal Motion" enabled={minimalMotion} onToggle={setMinimalMotion} />
        </div>
      </GlassPanel>
    </motion.div>
  );
}

function Toggle({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: (value: boolean) => void }) {
  return (
    <button
      onClick={() => onToggle(!enabled)}
      className={`p-3 rounded-lg border transition-colors text-left ${
        enabled
          ? 'border-[var(--neon-magenta)] bg-[rgba(255,0,255,0.12)] text-white'
          : 'border-white/20 bg-[rgba(255,255,255,0.04)] text-gray-300'
      }`}
    >
      <div className="text-[11px] uppercase tracking-wider opacity-80">{label}</div>
      <div className="mt-1 font-orbitron text-sm">{enabled ? 'Enabled' : 'Disabled'}</div>
    </button>
  );
}
