import { Flame, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { FileItem, API_BASE } from '@/lib/data';

interface TopDownloadsProps {
  files: FileItem[];
}

const TopDownloads = ({ files }: TopDownloadsProps) => {
  const top = [...files].sort((a, b) => b.downloads - a.downloads).slice(0, 10);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-neon-orange" />
        <h2 className="font-mono text-lg font-bold text-foreground">Top Downloads</h2>
      </div>
      <div className="space-y-1">
        {top.map((file, i) => (
          <motion.a
            key={file.name}
            href={`${API_BASE}/download/${encodeURIComponent(file.category)}/${encodeURIComponent(file.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/60 transition-colors duration-200 group"
          >
            <span className="font-mono text-xs text-muted-foreground w-5">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-mono text-sm text-foreground truncate flex-1 group-hover:text-primary transition-colors">{file.name}</span>
            <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
              <Download className="w-3 h-3" /> {file.downloads}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default TopDownloads;
