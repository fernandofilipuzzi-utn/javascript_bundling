const progreso = document.getElementById("progreso") as HTMLElement;
const rango = document.getElementById("rango") as HTMLInputElement;

rango.addEventListener("input", () => 
{
  progreso.style.width = `${rango.value}%`;
});
