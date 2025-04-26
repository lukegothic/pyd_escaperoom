NUESTROS ESCAPE ROOMS <3

App que muestra en un mapa todas las escape room disponibles en españa y permite crear datos basados en interés / estado en la cada una de las salas de escape.

TODO (priorizado)
- Fix build/deploy (https://github.com/lukegothic/pyd_escaperoom/actions/runs/7774869902/job/21200178095)
- GH action para actualizar datos
-- 1. Obtener y desencryptar datos
-- 2. Guardar datos en firebase
- Actualizar UI para que funcione chachi en mobile
- Revisitar como se pone el estado de las salas (mirar controles comunes para seleccionar un estado)... simplificar a un [+] o [-]? Luego en otra pantalla, que se pueda dar el check de "Hecho" y te salta un dialog para meter la review => (Ranking etc etc)
- Filtros inteligentes para players: parejas, grupos, solitario
- Reorganizar UI, pensar en mobile first (sorry pcs), tener en cuenta que los elementos tienen de mas > a menos importancia: "salas que queremos jugar", "porcentaje de salas", "top 3 + salas jugadas",
- Meter métricas (veces que se agrupa por cada grupo..., etc)
- Features que pueden ser interesantes:
-- Google Auth y usar usuario para guardar los datos de cada usuario en firebase
-- Estado [?] equivale a null en db => borrar filaç

-- Meter publi
-- Ranking candaditis // nuestro review por sala + fecha juego + nuestro review de master? => tener db de masters tb?
-- TOP 3
-- Reseñas google/tripadvisor
-- Buscador salas y juegos (incluir ciudad?)
-- El mejor de cada ciudad? Top 3?
-- Dificultad

