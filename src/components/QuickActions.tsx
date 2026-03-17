'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface QuickActionsProps {
  username: string;
}

export function QuickActions({ username }: QuickActionsProps) {
  const [copied, setCopied] = useState(false);

  const actions = [
    { 
      icon: '🔗', 
      label: 'Copy Link', 
      action: () => {
        navigator.clipboard.writeText(`https://gitwrapped.vercel.app/${username}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    { 
      icon: '🐦', 
      label: 'Share X', 
      action: () => {
        const text = encodeURIComponent(`Check out my GitHub stats! 🎮\n\n🔗 https://gitwrapped.vercel.app/${username}\n\n#GitWrapped #Developer`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
      }
    },
    { 
      icon: '📋', 
      label: 'Copy Markdown', 
      action: async () => {
        const markdown = `![GitWrapped](https://gitwrapped.vercel.app/api/card?username=${username})`;
        await navigator.clipboard.writeText(markdown);
      }
    },
    { 
      icon: '🔄', 
      label: 'Refresh', 
      action: () => window.location.reload()
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <div className="glass-panel p-3">
        <div className="flex gap-2">
          {actions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.action}
              className="w-12 h-12 rounded-xl flex flex-col items-center justify-center text-xs font-mono hover:bg-white/10 transition-colors"
              title={action.label}
            >
              <span className="text-lg">{action.icon}</span>
            </motion.button>
          ))}
        </div>
        
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-10 left-0 right-0 text-center bg-black/80 text-white text-xs py-1 rounded"
          >
            ✓ Copied!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
