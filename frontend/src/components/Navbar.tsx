import { Link, useLocation } from 'react-router-dom';
import { Server, Home, Heart, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/wishlist', label: 'Wishlist', icon: Heart },
  ];

  return (
    <nav className="glass-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Server className="w-6 h-6 text-primary" />
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-glow-pulse" />
          </div>
          <span className="font-mono text-lg font-bold text-foreground tracking-tight">
            LAN<span className="neon-text">Server</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-colors duration-200 ${
                  active
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          <div className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-green/5 border border-neon-green/20">
            <div className="relative w-2 h-2">
              <div className="w-2 h-2 rounded-full bg-neon-green" />
              <div className="status-pulse absolute inset-0 w-2 h-2 rounded-full bg-neon-green" />
            </div>
            <span className="text-xs font-mono text-neon-green hidden sm:inline">Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
