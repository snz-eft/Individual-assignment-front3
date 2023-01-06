import { useState, useEffect } from "react";
import PropertyItem from "./PropertyItem";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { FormLabel, FormControlLabel, Checkbox, Grid } from "@mui/material";

let properties = [];

export default function Listing(props) {
  const { maxItem } = props;
  const [isLoading, setLoading] = useState(true);
  const [sort, setSort] = useState("1");
  const [filters, setFilters] = useState({
    rent: false,
    sell: false,
    buy: false,
  });

  const sortData = (data) => {
    switch (sort) {
      case "1":
        return [...data].sort(
          (p1, p2) => new Date(p2.date) - new Date(p1.date)
        );
      case "2":
        return [...data].sort((p1, p2) => p1.price - p2.price);
      case "3":
        return [...data].sort(
          (p1, p2) => new Date(p1.date) - new Date(p2.date)
        );
      case "4":
        return [...data].sort((p1, p2) => p2.price - p1.price);
      default:
        return data;
    }
  };

  const filterData = (data) => {
    if (data.length > 0) {
      const activeFilters = Object.keys(filters).filter(
        (key) => filters[key] === true
      );

      if (activeFilters.length > 0) {
        return data.filter((p) => activeFilters.includes(p.category));
      }
    }
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      properties = await (
        await fetch("http://localhost:3001/properties")
      ).json();
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const handleFilter = (event) => {
    const newFilters = {
      ...filters,
      [event.target.name]: event.target.checked,
    };

    setFilters(newFilters);
  };
  let filteredProperties = filterData(sortData(properties));
  if (maxItem && filteredProperties.length > maxItem) {
    filteredProperties = filteredProperties.slice(0, maxItem);
  }

  return isLoading ? (
    <h2>Loading</h2>
  ) : (
    <section className="products">
      <div className="container">
        <Grid container justifyContent="space-between">
          {props.showFilter && (
            <Grid xs={4} padding="0 0 0 1rem">
              <Grid container>
                <FormLabel>Filter on Category</FormLabel>
              </Grid>
              <Grid container>
                <Grid xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rent"
                        checked={filters.rent}
                        onChange={handleFilter}
                      />
                    }
                    label="Rent"
                  />
                </Grid>
                <Grid xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="sell"
                        checked={filters.sell}
                        onChange={handleFilter}
                      />
                    }
                    label="Sell"
                  />
                </Grid>
                <Grid xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="buy"
                        checked={filters.buy}
                        onChange={handleFilter}
                      />
                    }
                    label="Buy"
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {props.showSort && (
            <Grid xs={2}>
              <Grid xs={7}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Sort On
                </InputLabel>
              </Grid>
              <NativeSelect defaultValue={sort} onChange={handleSort}>
                <option value={1}>Newest</option>
                <option value={2}>Cheapest</option>
                <option value={3}>Oldest</option>
                <option value={4}>Most Expensive</option>
              </NativeSelect>
            </Grid>
          )}
        </Grid>
        {filteredProperties.map((property) => (
          <PropertyItem key={property.id} {...property} />
        ))}
      </div>
    </section>
  );
}
