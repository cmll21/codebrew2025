import { useParams } from "react-router-dom";
import "../styles/ProducePage.css";

const ProducePage = () => {
  const { produceName } = useParams();

  const capitalizeEachWord = (str: string | undefined) => {
    if (!str) return ''; // Handle undefined/null
    return str
      .split(' ') // Split into words
      .map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' '); // Rejoin with spaces
  };

  return (
    <div className="section-header">
      <h1 className="section-title">{capitalizeEachWord(produceName)}</h1>
      <h1>{produceName?.toUpperCase()}</h1>
      <p>This is information about {produceName}</p>
    </div>
  );
};

export default ProducePage;
