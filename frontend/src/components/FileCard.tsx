import React from 'react';
import { Terminal, Database, Cpu, Wrench, Film, FileText, Download, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

type FileItem = {
  name: string;
  category: string;
  size: number;        // backend gives size in bytes
  downloads: number;
  likes?: number;
};

interface FileCardProps {
  file: FileItem;
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
  index?: number;
}

const iconMap: Record<string, React.ElementType> = {
  software: Terminal,
  dataset: Database,
  os: Cpu,
  tools: Wrench,
  media: Film,
};

const formatSize = (bytes: number) => {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  return `${(bytes / 1024).toFixed(2)} KB`;
};

const FileCard = ({
  file,
  isWishlisted = false,
  onToggleWishlist,
  index = 0,
}: FileCardProps) => {
  const categoryKey = file.category.toLowerCase();
  const Icon = iconMap[categoryKey] || FileText;
  const isPopular = file.downloads > 5; // adjust threshold if needed

  const handleDownload = () => {
    window.open(
      `/download/${encodeURIComponent(file.category)}/${encodeURIComponent(file.name)}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="glass-card-hover p-4 flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-primary" />
          </div>

          <div className="min-w-0">
            <p className="font-mono text-sm font-semibold text-foreground truncate">
              {file.name}
            </p>
            <span className="category-badge">{file.category}</span>
          </div>
        </div>

        {onToggleWishlist && (
          <button
            onClick={onToggleWishlist}
            className="flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 hover:bg-destructive/10"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${isWishlisted
                ? 'fill-destructive text-destructive'
                : 'text-muted-foreground'
                }`}
            />
          </button>
        )}
      </div>

      {/* Details */}
      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
        <span>{formatSize(file.size)}</span>

        <span className="flex items-center gap-1">
          <Download className="w-3 h-3" />
          {file.downloads}
        </span>

        {isPopular && <span className="popular-badge">🔥 Popular</span>}
      </div>

      {/* Action */}
      <button
        onClick={handleDownload}
        className="download-btn flex items-center justify-center gap-2 mt-auto"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </motion.div>
  );
};

export default FileCard;
