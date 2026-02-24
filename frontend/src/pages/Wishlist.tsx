import { useMemo } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useWishlist } from '@/hooks/use-wishlist';
import FileCard from '@/components/FileCard';

const fetchFiles = async () => {
  const res = await fetch('/api/files');
  return res.json();
};

const Wishlist = () => {
  const { wishlist, isWishlisted, toggle } = useWishlist();

  const { data: allFiles = [] } = useQuery({
    queryKey: ['files'],
    queryFn: fetchFiles,
  });

  const wishlisted = useMemo(
    () => allFiles.filter((f: any) => wishlist.includes(f.name)),
    [allFiles, wishlist]
  );

  return (
    <div className="min-h-screen gradient-bg grid-pattern">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-destructive" />
            <h1 className="text-3xl font-bold text-foreground">Wishlist</h1>
          </div>
          <p className="text-muted-foreground font-mono text-sm">
            {wishlisted.length} saved {wishlisted.length === 1 ? 'item' : 'items'}
          </p>
        </motion.div>

        {wishlisted.length === 0 ? (
          <div className="glass-card p-12 text-center space-y-3">
            <Heart className="w-10 h-10 text-muted-foreground mx-auto" />
            <p className="font-mono text-muted-foreground">No items in your wishlist yet</p>
            <p className="text-xs text-muted-foreground">Click the heart icon on any file to save it here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wishlisted.map((file: any, i: number) => (
              <FileCard
                key={file.name}
                file={file}
                index={i}
                isWishlisted={isWishlisted(file.name)}
                onToggleWishlist={() => toggle(file.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
