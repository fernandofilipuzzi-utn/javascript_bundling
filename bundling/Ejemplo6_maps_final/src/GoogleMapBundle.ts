import type { MapPosition, GoogleMapsConfig, MapOptions, MarkerOptions, InfoWindowOptions } from "./types";
import { GoogleMapManager } from "./GoogleMapManager";
import { MapConfigurations } from "./MapConfigurations";

export class GoogleMapBundle {
  private managers: Map<string, GoogleMapManager> = new Map();

  public async createMap(
    elementId: string,
    apiKey: string,
    options: Partial<MapOptions> = {}
  ): Promise<GoogleMapManager> 
  {

    const config: GoogleMapsConfig = {
      key: apiKey,
      version: "weekly",
      language: "es",
      region: "AR"
    };
    const mapOptions: MapOptions = {
      ...MapConfigurations.BUENOS_AIRES,
      ...options
    };
    const manager = new GoogleMapManager();
    await manager.initialize(elementId, config, mapOptions);

    console.log(elementId);


    this.managers.set(elementId, manager);
    return manager;
  }

  public getManager(elementId: string): GoogleMapManager | undefined {
    return this.managers.get(elementId);
  }

  public async createMapWithMarkers(
    elementId: string,
    apiKey: string,
    markers: Array<MarkerOptions & { infoWindow?: string }>,
    options: Partial<MapOptions> = {}
  ): Promise<GoogleMapManager> {
    const manager = await this.createMap(elementId, apiKey, options);
    markers.forEach(markerData => {
      const marker = manager.addMarker(markerData);
      if (marker && markerData.infoWindow) {
        manager.addInfoWindow({ content: markerData.infoWindow }, marker);
      }
    });
    if (markers.length > 1) {
      manager.fitBounds(markers.map(m => m.position));
    }
    return manager;
  }

  public static get Configurations() {
    return MapConfigurations;
  }

  public static async quickInit(
    elementId: string,
    apiKey: string,
    center?: MapPosition,
    zoom: number = 14
  ): Promise<GoogleMapManager> {
    const bundle = new GoogleMapBundle();
    return bundle.createMap(elementId, apiKey, 
    {
      center: center || MapConfigurations.BUENOS_AIRES.center,
      zoom
    });
  }
}
