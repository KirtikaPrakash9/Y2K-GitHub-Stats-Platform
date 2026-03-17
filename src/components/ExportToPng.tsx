'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';
import { ChromeButton } from './ChromeButton';

interface ExportToPngProps {
  username: string;
}

export function ExportToPng({ username }: ExportToPngProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const exportToPng = async () => {
    setIsExporting(true);
    
    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html-to-image')).default;
      
      const element = contentRef.current;
      if (!element) return;

      // Create a clone for export (to not mess with the view)
      const dataUrl = await html2canvas.toPng(element, {
        backgroundColor: '#0a0a1a',
        pixelRatio: 2,
      });

      // Download
      const link = document.createElement('a');
      link.download = `gitwrapped-${username}.png`;
      link.href = dataUrl;
      link.click();
      
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJpg = async () => {
    setIsExporting(true);
    
    try {
      const html2canvas = (await import('html-to-image')).default;
      
      const element = contentRef.current;
      if (!element) return;

      const dataUrl = await html2canvas.toJpeg(element, {
        backgroundColor: '#0a0a1a',
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `gitwrapped-${username}.jpg`;
      link.href = dataUrl;
      link.click();
      
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassPanel glowColor="yellow" className="p-6">
        <h3 className="font-orbitron text-xl font-bold text-white mb-4">
          📸 Export as Image
        </h3>
        
        <p className="font-mono text-sm text-gray-400 mb-4">
          Export your stats as a high-quality image to share on social media.
        </p>

        {/* Preview area (would contain the actual content to export) */}
        <div 
          ref={contentRef}
          className="bg-[var(--bg-dark)] p-4 rounded-lg mb-4 min-h-[200px] flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">📸</div>
            <p className="font-mono text-sm text-gray-400">
              Click export to capture your stats
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <ChromeButton 
            onClick={exportToPng} 
            glowColor="cyan"
            disabled={isExporting}
          >
            {isExporting ? '⏳ Exporting...' : exported ? '✓ Exported!' : '📷 Export PNG'}
          </ChromeButton>
          
          <ChromeButton 
            onClick={exportToJpg} 
            glowColor="magenta"
            disabled={isExporting}
          >
            🖼️ Export JPG
          </ChromeButton>
        </div>

        <p className="font-mono text-xs text-gray-500 mt-4">
          💡 Tip: Use the PNG format for transparent backgrounds on websites.
        </p>
      </GlassPanel>
    </motion.div>
  );
}
