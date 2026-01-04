import { motion } from "framer-motion";
import { Wallet, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "市场", path: "/" },
  { label: "我的任务", path: "/tasks" },
  { label: "仲裁", path: "/arbitration" },
  { label: "钱包", path: "/wallet" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl font-bold text-primary-foreground">A</span>
            </motion.div>
            <span className="text-xl font-bold gradient-text hidden sm:block">AgentMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Wallet Button */}
          <div className="flex items-center gap-3">
            <Button
              variant={isConnected ? "glass" : "gradient"}
              size="sm"
              onClick={() => setIsConnected(!isConnected)}
              className="hidden sm:flex"
            >
              <Wallet className="w-4 h-4" />
              {isConnected ? (
                <span className="font-mono text-xs">0x1234...5678</span>
              ) : (
                "连接钱包"
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border/50"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
              >
                <div
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
            <div className="px-4 pt-4">
              <Button
                variant={isConnected ? "glass" : "gradient"}
                className="w-full"
                onClick={() => setIsConnected(!isConnected)}
              >
                <Wallet className="w-4 h-4" />
                {isConnected ? "0x1234...5678" : "连接钱包"}
              </Button>
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}
