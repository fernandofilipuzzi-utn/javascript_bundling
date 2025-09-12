import type { MapPosition, GoogleMapsConfig, MapOptions, MarkerOptions, InfoWindowOptions } from "./types.js";
import { GoogleMapsLoader } from "./GoogleMapsLoader.js";

export class GoogleMapManager {
  private map: any = null;
  private markers: any[] = [];
  private infoWindows: any[] = [];
  private loader: GoogleMapsLoader;

  constructor() {
    this.loader = GoogleMapsLoader.getInstance();
  }

  public async initialize(
    elementId: string,
    config: GoogleMapsConfig,
    mapOptions: MapOptions
  ): Promise<void> {
    await this.loader.load(config);
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Element with ID "${elementId}" not found`);
    this.map = new (window as any).google.maps.Map(element, {
      center: mapOptions.center,
      zoom: mapOptions.zoom,
      mapId: mapOptions.mapId,
      mapTypeId: mapOptions.mapTypeId || 'roadmap',
      disableDefaultUI: mapOptions.disableDefaultUI || false,
      zoomControl: mapOptions.zoomControl ?? true,
      mapTypeControl: mapOptions.mapTypeControl ?? true,
      streetViewControl: mapOptions.streetViewControl ?? true,
      fullscreenControl: mapOptions.fullscreenControl ?? true,
      styles: mapOptions.styles
    });
  }

  public getMap(): any {
    return this.map;
  }

  public setCenter(position: MapPosition): void {
    if (this.map) {
      this.map.setCenter(position);
    }
  }

  public setZoom(zoom: number): void {
    if (this.map) {
      this.map.setZoom(zoom);
    }
  }

  public addMarker(options: MarkerOptions): any | null {
    if (!this.map) return null;
    const marker = new (window as any).google.maps.Marker({
      position: options.position,
      map: this.map,
      title: options.title,
      icon: options.icon,
      draggable: options.draggable || false,
      animation: options.animation ? (window as any).google.maps.Animation[options.animation.toUpperCase()] : undefined
    });
    this.markers.push(marker);
    return marker;
  }

  public addInfoWindow(options: InfoWindowOptions, marker?: any): any {
    const infoWindow = new (window as any).google.maps.InfoWindow({
      content: options.content,
      position: options.position,
      maxWidth: options.maxWidth || 300
    });
    if (marker) {
      marker.addListener('click', () => {
        this.infoWindows.forEach(iw => iw.close());
        infoWindow.open(this.map, marker);
      });
    }
    this.infoWindows.push(infoWindow);
    return infoWindow;
  }

  public clearMarkers(): void {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  public clearInfoWindows(): void {
    this.infoWindows.forEach(infoWindow => infoWindow.close());
    this.infoWindows = [];
  }

  public fitBounds(positions: MapPosition[]): void {
    if (!this.map || positions.length === 0) return;
    const bounds = new (window as any).google.maps.LatLngBounds();
    positions.forEach(pos => bounds.extend(pos));
    this.map.fitBounds(bounds);
  }

  public addClickListener(callback: (event: any) => void): void {
    if (this.map) {
      this.map.addListener('click', callback);
    }
  }

  public geocodeAddress(address: string): Promise<MapPosition | null> {
    return new Promise((resolve, reject) => {
      if (!(window as any).google) {
        reject(new Error('Google Maps not loaded'));
        return;
      }
      const geocoder = new (window as any).google.maps.Geocoder();
      geocoder.geocode({ address }, (results: any, status: string) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng()
          });
        } else {
          resolve(null);
        }
      });
    });
  }
}
