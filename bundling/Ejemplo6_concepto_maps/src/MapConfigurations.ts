import type { MapPosition, MapOptions } from "./types";

export class MapConfigurations {
  public static readonly BUENOS_AIRES: MapOptions = {
    center: { lat: -34.6037, lng: -58.3816 },
    zoom: 14,
    mapId: "BUENOS_AIRES_MAP"
  };

  public static readonly DARK_THEME: any[] = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }
  ];

  public static readonly MINIMAL_UI: Partial<MapOptions> = {
    disableDefaultUI: true,
    zoomControl: true
  };
}
