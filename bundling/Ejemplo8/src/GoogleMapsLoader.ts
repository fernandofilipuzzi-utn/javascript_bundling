import type { GoogleMapsConfig } from "./types.js";

export class GoogleMapsLoader {
  private static instance: GoogleMapsLoader;
  private loadPromise: Promise<void> | null = null;
  private isLoaded: boolean = false;

  private constructor() {}

  public static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader();
    }
    return GoogleMapsLoader.instance;
  }

  public async load(config: GoogleMapsConfig): Promise<void> {
    if (this.isLoaded) return;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = this.initializeGoogleMaps(config);
    await this.loadPromise;
    this.isLoaded = true;
  }

  private initializeGoogleMaps(config: GoogleMapsConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google && (window as any).google.maps) {
        this.isLoaded = true;
        resolve();
        return;
      }

      const { key, version = "weekly", language = "es", region = "AR" } = config;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&v=${version}&language=${language}&region=${region}&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;

      (window as any).initGoogleMaps = () => {
        delete (window as any).initGoogleMaps;
        this.isLoaded = true;
        resolve();
      };

      script.onerror = () => {
        delete (window as any).initGoogleMaps;
        reject(new Error('Failed to load Google Maps'));
      };

      document.head.appendChild(script);
    });
  }
}
