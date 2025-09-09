
import { GoogleMapBundle } from "./GoogleMapBundle";
export default GoogleMapBundle;
export * from "./GoogleMapBundle";
export * from "./GoogleMapManager";
export * from "./GoogleMapsLoader";
export * from "./MapConfigurations";
export * from "./types";

if (typeof window !== 'undefined') 
{
  (window as any).GoogleMapBundle = GoogleMapBundle;
}

document.addEventListener('DOMContentLoaded', async () => 
{
  //InitCutstom();
  await InitQuick();
  
});

async function InitQuick()
{
  const element = document.getElementById('maps');
  const htmlElement = element as HTMLElement;
  const apiKey = "API_KEY";
  const lat = parseFloat(htmlElement.dataset.lat || '-34.6037');
  const lng = parseFloat(htmlElement.dataset.lng || '-58.3816');
  const zoom = parseInt(htmlElement.dataset.zoom || '14');
  if (apiKey && element && element.id) 
  {
    try 
    {
      await GoogleMapBundle.quickInit(element.id, apiKey, { lat, lng }, zoom);
    } 
    catch (error) 
    {
      console.error('Auto-init failed for', element.id, error);
    }
  } 
}

async function InitCutstom()
{
   console.log('Inicializando mapa...');
   
   const mapBundle = new GoogleMapBundle();
   const apiKey = 'API_KEY'; 
   
   try {
     const mapManager = await mapBundle.createMap('maps', apiKey, 
      {
       center: { lat: -32.4845, lng: -58.2307 }, // Coordenadas de ejemplo
       zoom: 13
     });
     
     console.log('Mapa inicializado correctamente');
   } catch (error) {
     console.error('Error al inicializar el mapa:', error);
   }
}