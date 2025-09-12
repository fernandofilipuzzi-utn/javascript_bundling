
import { GoogleMapBundle } from "./GoogleMapBundle.js";
export default GoogleMapBundle;
export * from "./GoogleMapBundle.js";
export * from "./GoogleMapManager.js";
export * from "./GoogleMapsLoader.js";
export * from "./MapConfigurations.js";
export * from "./types.js";

if (typeof window !== 'undefined') {
  (window as any).GoogleMapBundle = GoogleMapBundle;
}

document.addEventListener('DOMContentLoaded', () => {
  const autoMaps = document.querySelectorAll('[data-google-maps]');
  autoMaps.forEach(async (element) => {
    const htmlElement = element as HTMLElement;
    const apiKey = htmlElement.dataset.apiKey;
    const lat = parseFloat(htmlElement.dataset.lat || '-34.6037');
    const lng = parseFloat(htmlElement.dataset.lng || '-58.3816');
    const zoom = parseInt(htmlElement.dataset.zoom || '14');
    if (apiKey && element.id) {
      try {
        await GoogleMapBundle.quickInit(element.id, apiKey, { lat, lng }, zoom);
      } catch (error) {
        console.error('Auto-init failed for', element.id, error);
      }
    }
  });
});