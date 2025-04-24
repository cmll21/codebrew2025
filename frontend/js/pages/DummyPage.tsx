import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function DummyPage() {
    return (
        <button >
        <Link to="/">
          Go back
        </Link>
      </button>
    )
}

export default DummyPage;