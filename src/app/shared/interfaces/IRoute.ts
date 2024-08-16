
export interface RouteData {
    path: string;
    component: string; // Component class name
    loadChildren?: string; // Lazy-loaded module path
    title?: string;
}