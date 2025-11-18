import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/ui/UserMenu";
import { Accessibility, Truck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAccessibilityMode } from "@/context/AccessibilityContext";

interface HeaderProps {
  showLogin?: boolean;
}

export const Header = ({ showLogin = true }: HeaderProps) => {
  const location = useLocation();
  const { enabled: accessibilityEnabled, toggle: toggleAccessibility } = useAccessibilityMode();
  const isLoggedIn = !showLogin || !["/", "/login"].includes(location.pathname);
  
  // Simular rol basado en la ruta actual
  const isDriverRoute = location.pathname.includes('/driver');
  const userRole = isDriverRoute ? 'Conductor' : 'Administrador';
  const userName = isDriverRoute ? 'Juan Pérez' : 'Admin Principal';
  
  return (
    <header className="bg-card border-b border-border px-6 py-4" role="banner">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
          aria-label="Momentum Fleet - Ir al inicio"
        >
          <div className="bg-primary p-2 rounded-lg flex items-center justify-center">
            <Truck className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Momentum Fleet</h1>
            <p className="text-sm text-muted-foreground">Professional Transportation Management</p>
          </div>
        </Link>
        
        {showLogin && !isLoggedIn ? (
          <Button 
            asChild
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
          >
            <Link to="/login">Login</Link>
          </Button>
        ) : isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Button
              variant={accessibilityEnabled ? "default" : "outline"}
              onClick={toggleAccessibility}
              aria-pressed={accessibilityEnabled}
              aria-label={accessibilityEnabled ? "Desactivar modo accesible" : "Activar modo accesible"}
              title={accessibilityEnabled ? "Desactivar modo accesible" : "Activar modo accesible"}
              className="h-10 w-10 p-0 flex items-center justify-center"
            >
              <span className="sr-only">
                {accessibilityEnabled ? "Desactivar modo accesible" : "Activar modo accesible"}
              </span>
              <Accessibility className="h-5 w-5" aria-hidden="true" />
            </Button>
            <UserMenu userName={userName} userRole={userRole} />
          </div>
        ) : null}
      </div>
    </header>
  );
};