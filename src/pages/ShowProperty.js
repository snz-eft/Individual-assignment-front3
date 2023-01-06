import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function ShowProperty() {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await (
        await fetch(`http://localhost:3001/properties/${id}`)
      ).json();
      setPropertyData(data);
    };

    fetchData();
  }, [id]);
  // Delete function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3001/properties/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      navigate(-1);
    }
  };

  return propertyData ? (
    <div className="property-details">
      <div className="container">
        <h1 className="name-event">{propertyData.address}</h1>
        <div className="flex-row">
          <div className="date-event">{propertyData.date}</div>
          <div className="category-event">{propertyData.category}</div>
        </div>
        <div className="description-event">{propertyData.description}</div>
        <div className="images-event">
          {propertyData.images.map((image, index) => (
            <img
              key={index}
              className="image"
              src={image.url}
              alt={image.alt}
            />
          ))}
        </div>
        <Button
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleSubmit}
        >
          Delete
        </Button>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
