import { useEffect, useState, useRef } from "react";

let convertedImages = [];

export default function AddProperty() {
  const fileInput = useRef(null);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    convertedImages = [];
    if (images.length > 0) {
      let index = 0;
      const reader = new FileReader();
      reader.onload = (e) => {
        convertedImages = [
          ...convertedImages,
          { url: e.target.result, alt: "Image" },
        ];
        if (index < images.length - 1) {
          index++;
          reader.readAsDataURL(images[index]);
        }
      };
      reader.readAsDataURL(images[index]);
    }
  }, [images]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProperty = {
      address,
      date,
      price,
      category,
      images: convertedImages,
      description,
      unit: "USD",
    };

    const res = await fetch("http://localhost:3001/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    });
    if (res.ok) {
      setAddress("");
      setDate("");
      setPrice(0);
      setCategory("");
      setDescription("");
      setImages([]);
      convertedImages = [];
      fileInput.current.value = "";
    }
  };

  return (
    <main className="container-narrow">
      <h1 className="addTitle">Add Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-form">
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            className="resize"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            className="resize"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <label htmlFor="description">Short description:</label>
          <textarea
            id="description"
            rows="4"
            cols="20"
            className="resize"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="text"
            className="resize"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="file">image :</label>
          <div>
            <input
              ref={fileInput}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                setImages([...e.target.files]);
              }}
            />
          </div>
          <label htmlFor="category">Category :</label>
          <select
            id="category"
            className="resize"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="value1">Select Category</option>
            <option value="Rent">Rent</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
          <label></label>
          <div className="button-style">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </main>
  );
}
