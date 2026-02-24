import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { HardDrive, FolderOpen } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import FileCard from '@/components/FileCard';
import TopDownloads from '@/components/TopDownloads';
import { useWishlist } from '@/hooks/use-wishlist';

const fetchFiles = async () => {
  const res = await fetch('/api/files');
  return res.json();
};

const Home = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const { isWishlisted, toggle } = useWishlist();

  const { data: files = [] } = useQuery({
    queryKey: ['files'],
    queryFn: fetchFiles,
  });

  const categories = useMemo(
    () => ['All', ...new Set(files.map((f: any) => f.category))],
    [files]
  );

  const filtered = useMemo(() => {
    return files
      .filter((f: any) => {
        const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === 'All' || f.category === category;
        return matchSearch && matchCategory;
      })
      .sort((a: any, b: any) => b.downloads - a.downloads);
  }, [files, search, category]);

  const totalFiles = files.length;
  const totalDownloads = files.reduce(
    (acc: number, f: any) => acc + f.downloads,
    0
  );

  return (
    <div className="min-h-screen gradient-bg grid-pattern">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <h1 className="text-3xl sm:text-4xl font-bold">
            <span className="neon-text">LAN</span>{' '}
            <span className="text-foreground">Download Server</span>
          </h1>

          <div className="flex items-center justify-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <FolderOpen className="w-4 h-4 text-primary" />
              <span>{totalFiles} files</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <HardDrive className="w-4 h-4 text-neon-green" />
              <span>{totalDownloads.toLocaleString()} downloads</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter categories={categories} selected={category} onChange={setCategory} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24">
              <TopDownloads files={files} />
            </div>
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2">
            {filtered.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <p className="font-mono text-muted-foreground">No files found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((file: any, i: number) => (
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
      </div>
    </div>
  );
};

export default Home;
