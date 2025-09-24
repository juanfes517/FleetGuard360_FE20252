import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CreateRouteModal } from "@/components/modals/CreateRouteModal";
import { EditRouteModal } from "@/components/modals/EditRouteModal";
import { Search, Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const routes = [
  { id: "R001", name: "Ruta Norte", description: "Servicios al sector norte de la ciudad" },
  { id: "R002", name: "Ruta Sur", description: "Conexión con municipios del sur" },
  { id: "R003", name: "Ruta Centro", description: "Transporte urbano zona centro" },
  { id: "R004", name: "Ruta Este", description: "Servicios zona industrial este" },
  { id: "R005", name: "Ruta Oeste", description: "Conexión occidental metropolitana" },
];

export default function Routes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<typeof routes[0] | undefined>();
  const { toast } = useToast();

  const filteredRoutes = routes.filter(route =>
    route.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (route: typeof routes[0]) => {
    setSelectedRoute(route);
    setEditModalOpen(true);
  };

  const handleDelete = (routeId: string, routeName: string) => {
    toast({
      title: "Ruta eliminada",
      description: `La ruta ${routeId} - ${routeName} ha sido eliminada del sistema.`,
      variant: "destructive",
    });
  };

  return (
    <Layout showLogin={false}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gestión de Rutas
          </h1>
          <p className="text-muted-foreground">
            Administra y gestiona las rutas disponibles en el sistema.
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder="Buscar ruta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input"
              aria-label="Buscar rutas por código o nombre"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="bg-primary hover:bg-primary-hover"
              aria-label="Buscar rutas"
            >
              Buscar
            </Button>
            <Button 
              className="bg-primary hover:bg-primary-hover"
              onClick={() => setCreateModalOpen(true)}
              aria-label="Registrar nueva ruta"
            >
              <Plus className="h-4 w-4 mr-2" />
              Registrar Ruta
            </Button>
          </div>
        </div>

        {/* Routes Table */}
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold text-foreground">CÓDIGO</TableHead>
                <TableHead className="font-semibold text-foreground">NOMBRE DE LA RUTA</TableHead>
                <TableHead className="font-semibold text-foreground text-right">ACCIONES</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoutes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? "No se encontraron rutas que coincidan con tu búsqueda." : "No hay rutas registradas."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRoutes.map((route) => (
                  <TableRow key={route.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium text-foreground">{route.id}</TableCell>
                    <TableCell className="text-foreground">{route.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border text-foreground hover:bg-muted"
                          onClick={() => handleEdit(route)}
                          aria-label={`Editar ruta ${route.id} - ${route.name}`}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              aria-label={`Eliminar ruta ${route.id} - ${route.name}`}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Eliminar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-card border-border">
                            <AlertDialogHeader>
                              <div className="flex items-center gap-3 mb-2">
                                <div className="bg-red-100 p-2 rounded-full">
                                  <AlertTriangle className="h-5 w-5 text-destructive" />
                                </div>
                                <AlertDialogTitle className="text-lg font-semibold text-foreground">
                                  Eliminar Ruta
                                </AlertDialogTitle>
                              </div>
                              <AlertDialogDescription className="text-muted-foreground">
                                ¿Desea eliminar la ruta {route.id} - {route.name}?
                                <br />
                                <span className="text-destructive font-medium">
                                  Esta acción no se puede deshacer.
                                </span>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-muted text-muted-foreground hover:bg-muted/80">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(route.id, route.name)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {filteredRoutes.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredRoutes.length} de {routes.length} rutas
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateRouteModal 
        open={createModalOpen} 
        onOpenChange={setCreateModalOpen}
        onRouteCreated={() => {
          // Refresh routes list here if needed
        }}
      />
      
      <EditRouteModal 
        open={editModalOpen} 
        onOpenChange={setEditModalOpen}
        route={selectedRoute}
        onRouteUpdated={() => {
          // Refresh routes list here if needed
        }}
      />
    </Layout>
  );
}