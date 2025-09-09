// Interfaces para tipado
export interface MapPosition {
  lat: number;
  lng: number;
}

export interface GoogleMapsConfig {
  key: string;
  version?: string;
  libraries?: string[];
  language?: string;
  region?: string;
}

export interface MapOptions {
  center: MapPosition;
  zoom: number;
  mapId?: string;
  mapTypeId?: string;
  disableDefaultUI?: boolean;
  zoomControl?: boolean;
  mapTypeControl?: boolean;
  streetViewControl?: boolean;
  fullscreenControl?: boolean;
  styles?: any[];
}

export interface MarkerOptions {
  position: MapPosition;
  title?: string;
  icon?: string;
  draggable?: boolean;
  animation?: string;
}

export interface InfoWindowOptions {
  content: string;
  position?: MapPosition;
  maxWidth?: number;
}
