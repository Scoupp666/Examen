import "./Amiibos.css";
import { useEffect, useState } from "react";

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
};

const url = "https://www.amiiboapi.com/api/amiibo/";

const Amiibos = () => {
  const [loading, setLoading] = useState(true);
  const [amiiboArr, setAmiiboArr] = useState<Amiibo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  async function fetchAmiibos() {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAmiiboArr(data.amiibo);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAmiibos();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedAmiibos = amiiboArr.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div className="Amiibos">
      <div className="title">
        <h1>Lista de Amiibos</h1>
      </div>
      {selectedAmiibos.map((amiibo) => (
        <div key={amiibo.name} className="carta">
          <h4>{amiibo.amiiboSeries}</h4>
          <h4>{amiibo.character}</h4>
          <h4>{amiibo.gameSeries}</h4>
          <h4>{amiibo.name}</h4>
          <ul>
            <li>Australia: {amiibo.release.au}</li>
            <li>Europa: {amiibo.release.eu}</li>
            <li>Japón: {amiibo.release.jp}</li>
            <li>Norteamérica: {amiibo.release.na}</li>
          </ul>
          <img src={amiibo.image} alt={amiibo.name} />
        </div>
      ))}
      <div className="pagination">
        <button className="btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button className="btn" onClick={handleNextPage} disabled={startIndex + itemsPerPage >= amiiboArr.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Amiibos;




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