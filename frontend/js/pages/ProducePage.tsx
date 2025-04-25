import { useParams } from "react-router-dom";

const ProducePage = () => {
  const { produceName } = useParams();

  return (
    <div>
      <h1>{produceName?.toUpperCase()}</h1>
      <p>This is information about {produceName}</p>
    </div>
  );
};

export default ProducePage;
