import { useState, useEffect, useCallback } from 'react';

const API = '/api';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Load wishlist from backend on mount
  useEffect(() => {
    fetch(`${API}/wishlist`)
      .then((r) => r.json())
      .then((data: string[]) => setWishlist(Array.isArray(data) ? data : []))
      .catch(() => {
        // Fallback to localStorage if backend is unreachable
        try {
          const stored = localStorage.getItem('lan-server-wishlist');
          if (stored) setWishlist(JSON.parse(stored));
        } catch {
          // ignore
        }
      });
  }, []);

  const toggle = useCallback(async (fileName: string) => {
    const isInList = wishlist.includes(fileName);

    if (isInList) {
      // Remove via backend DELETE endpoint
      try {
        await fetch(`${API}/wishlist/${encodeURIComponent(fileName)}`, {
          method: 'DELETE',
        });
      } catch {
        // ignore network errors — still update UI
      }
      setWishlist((prev) => prev.filter((f) => f !== fileName));
    } else {
      // Add via backend POST endpoint
      try {
        await fetch(`${API}/wishlist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ item: fileName }),
        });
      } catch {
        // ignore network errors — still update UI
      }
      setWishlist((prev) => [...prev, fileName]);
    }
  }, [wishlist]);

  const isWishlisted = useCallback(
    (fileName: string) => wishlist.includes(fileName),
    [wishlist]
  );

  return { wishlist, toggle, isWishlisted };
}
