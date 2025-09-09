

document.addEventListener('DOMContentLoaded', async () => 
{
    const element = document.getElementById('maps');

    const apiKey = 'API_KEY'; 

    try 
    {
        if(!element.googlemaps)
        {
          element.googlemaps = new GoogleMapBundle();
          
          await element.googlemaps.createMap('maps', apiKey, 
          {
            center: { lat: -32.4845, lng: -58.2307 },
            zoom: 13
          });
        }

         element.googlemaps.getManager('maps').addMarker({
           position: { lat: -32.4845, lng: -58.2307 },
           title: 'Posición Inicial'
         });
         
         console.log('Mapa inicializado correctamente');
       } catch (error) {
         console.error('Error al inicializar el mapa:', error);
       }  
});


