import { useState, useEffect, useCallback } from 'react';
import { FileItem } from '@/lib/data';

const WISHLIST_KEY = 'lan-server-wishlist';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggle = useCallback((fileName: string) => {
    setWishlist(prev =>
      prev.includes(fileName)
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  }, []);

  const isWishlisted = useCallback((fileName: string) => {
    return wishlist.includes(fileName);
  }, [wishlist]);

  return { wishlist, toggle, isWishlisted };
}
