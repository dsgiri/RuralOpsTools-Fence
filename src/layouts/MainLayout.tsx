import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calculator, FileText, Info, HelpCircle, HardHat } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function MainLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: HardHat },
    { name: 'Acreage', path: '/acreage', icon: Calculator },
    { name: 'Perimeter', path: '/perimeter', icon: Calculator },
    { name: 'Cost', path: '/cost', icon: Calculator },
    { name: 'Guide', path: '/guide', icon: FileText },
    { name: 'Assumptions', path: '/assumptions', icon: Info },
    { name: 'FAQ', path: '/faq', icon: HelpCircle },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="h-screen bg-pasture-cream text-fence-iron font-sans flex flex-col overflow-hidden">
      <header className="h-16 bg-white border-b border-fence-iron/20 flex items-center justify-between px-8 shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-fence-iron rounded flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <span className="text-2xl font-display font-bold tracking-tight uppercase">
            Field<span className="text-fence-iron/60 font-normal">Fence</span>
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-fence-iron/80 h-full">
          {navItems.slice(1, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "h-full flex items-center px-1 border-b-2 transition-colors",
                location.pathname === item.path ? "text-fence-iron border-fence-iron" : "border-transparent hover:text-fence-iron"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <aside className="w-80 bg-white border-r border-fence-iron/20 p-6 flex flex-col gap-6 overflow-y-auto shrink-0 hidden md:flex">
          <nav className="space-y-6">
            <div>
              <div className="block text-xs font-bold text-fence-iron/60 uppercase tracking-wider mb-2">Calculators</div>
              <div className="space-y-1">
                {navItems.slice(1, 4).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded text-sm font-medium transition-colors",
                      location.pathname === item.path ? "text-fence-iron bg-white/50 border border-fence-iron/20" : "text-fence-iron/80 hover:bg-white/50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <div className="block text-xs font-bold text-fence-iron/60 uppercase tracking-wider mb-2">Resources</div>
              <div className="space-y-1">
                {navItems.slice(4).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded text-sm font-medium transition-colors",
                      location.pathname === item.path ? "text-fence-iron bg-white/50 border border-fence-iron/20" : "text-fence-iron/80 hover:bg-white/50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          
          <div className="mt-auto p-4 bg-white/50 border border-fence-iron/20 rounded-lg">
            <h4 className="text-xs font-bold text-fence-iron mb-1">Trust Note</h4>
            <p className="text-[10px] text-fence-iron/60 leading-relaxed">Calculations use conservative rounding (up to nearest unit). Estimated for field boundaries.</p>
          </div>
        </aside>
        
        <section className="flex-1 p-8 overflow-y-auto w-full">
          <div className="max-w-5xl mx-auto h-full">
            <Outlet />
          </div>
        </section>
      </main>

      <footer className="h-8 bg-fence-iron flex items-center justify-between px-8 text-[10px] text-white/60 uppercase tracking-wider shrink-0">
        <div className="flex gap-4">
          <span>Version 1.0.0</span>
          <span>Updated {new Date().toISOString().split('T')[0]}</span>
        </div>
        <div>&copy; {new Date().getFullYear()} Field Fence Estimator — Professional Agricultural Estimate</div>
      </footer>
    </div>
  );
}
