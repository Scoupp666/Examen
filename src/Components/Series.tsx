import "./Series.css";
import { useState } from "react";

type Amiibo = {
  amiiboSeries: string;
  character: string;
  gameSeries: string;
  image: string;
  name: string;
  release: {
    au: string;
    eu: string;
    jp: string;
    na: string;
  };
  type: string;
  head: string;
  tail: string;
  console?: string;
  plataform?: string;
  style?: string;
  switch?: string;
  wiiu?: string;
  wii?: string;
  nintendo3ds?: string;
  games?: {
    game: string;
    series: string;
  }[];
  games3DS?: {
    gameName: string;
  }[];
  gamesSwitch?: {
    gameName: string;
  }[];
  gamesWiiU?: {
    gameName: string;
  }[];
};

const Series = () => {
  const [amiiboList, setAmiiboList] = useState<Amiibo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [todoText, setTodoText] = useState("");

  const onClick = async (_: React.MouseEvent<HTMLButtonElement>) => {
    if (!todoText.trim()) {
      setError("El campo de búsqueda no puede estar vacío.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.amiiboapi.com/api/amiibo/?character=${todoText}&showgames`
      );
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      const data = await response.json();
      if (data.amiibo && data.amiibo.length > 0) {
        setAmiiboList(data.amiibo);
      } else {
        setError("No se encontraron resultados.");
      }
    } catch (error) {
      console.error("Error fetching Amiibo data:", error);
      setError("Hubo un error al cargar los datos.");
    } finally {
      setLoading(false);
    }
  };

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  return (
    <div className="SeriesComponent">
      <label className="label" htmlFor="searchSeries">Buscar personaje:</label>
      <input className="input" type="text" id="searchSeries" value={todoText} onChange={onInput} />
      <button className="Submit" onClick={onClick}>Submit</button>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <div className="series-card-container">
        {amiiboList.length > 0 ? (
          amiiboList.map((amiibo) => (
            <div key={amiibo.tail} className="series-card">
              <div className="img">
              <img src={amiibo.image} alt={amiibo.name} />
              </div>

              <div className="info">
                <h4>{amiibo.name}</h4>
                <p> <span>Personaje:</span> {amiibo.character}</p>
                <p> <span>Serie de Amiibo:</span> {amiibo.amiiboSeries}</p>
                <p> <span>Serie del juego:</span> {amiibo.gameSeries}</p>
                <p> <span>Tipo:</span> {amiibo.type}</p>
                {/* <p>Fecha de lanzamiento en JP: {amiibo.release.jp}</p>
                <p>Fecha de lanzamiento en NA: {amiibo.release.na}</p>
                <p>Fecha de lanzamiento en EU: {amiibo.release.eu}</p>
                <p>Fecha de lanzamiento en AU: {amiibo.release.au}</p> */}
              </div>
               
              <div className="3Ds">
                {/* Juegos de 3DS */}
                {amiibo.games3DS && (
                  <>
                    <h5>Juegos para 3DS:</h5>
                    <ul className="p">
                      {amiibo.games3DS.map((game) => (
                        <li key={game.gameName}>
                          <p>Juego: {game.gameName}</p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              <div className="switch">
                {/* Juegos de Switch */}
                {amiibo.gamesSwitch && (
                  <>
                    <h5>Juegos para Switch:</h5>
                    <ul className="p">
                      {amiibo.gamesSwitch.map((game) => (
                        <li key={game.gameName}>
                          <p>Juego: {game.gameName}</p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="WiiU">
                {/* Juegos de Wii U */}
                {amiibo.gamesWiiU && (
                  <>
                    <h5>Juegos para Wii U:</h5>
                    <ul className="p">
                      {amiibo.gamesWiiU.map((game) => (
                        <li key={game.gameName}>
                          <p>Juego: {game.gameName}</p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="JG">
                {/* Juegos generales */}
                {amiibo.games && (
                  <ul className="p">
                    {amiibo.games.map((game) => (
                      <li key={game.game}>
                        <p>Juego: {game.game}</p>
                        <p>Serie del juego: {game.series}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};

export default Series;




// @media screen and (min-width: 1280px) {
//   :root {
//       background-color: black; 
//   }
// }

// @media screen and (min-width: 640px) and (max-width: 1279px) {
//   :root {
//       background-color: purple; 
//   }
// }

// @media screen and (max-width: 639px) {
//   :root {
//       background-color: blue;
//   }

//   .contenedorP {
//       flex-direction: column;
//   }

//   .contenedor {
//       flex-direction: column;
//   }

//   .contenedor2 {
//       flex-direction: column;
//       align-items: center;
//   }

//   .contenido {
//       flex-direction: column;
//       align-items: center;
//   }

//   button {
//       width: 100%; 
//       margin: 10px 0;
//   }
// }