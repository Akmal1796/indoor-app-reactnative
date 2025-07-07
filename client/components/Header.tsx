import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ArrowRight } from 'lucide-react-native';
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-xl">Fusion</span>
            <Badge variant="secondary" className="ml-2 text-xs">
              Beta
            </Badge>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button
              size="sm"
              className="bg-gradient-primary hover:opacity-90 transition-opacity group"
            >
              Get started
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 px-3">
                <Button variant="ghost" className="justify-start">
                  Sign in
                </Button>
                <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
