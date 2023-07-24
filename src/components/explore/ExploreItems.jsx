import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ExploreNewItem from "../UI/exploreNewItem";
import SkeletonLoading from "../UI/SkeletonLoading";
import Aos from "aos";
import "aos/dist/aos.css";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [slice, setSlice] = useState(8);
  const [filterValue, setFilterValue] = useState("");

  const getExploreItems = async () => {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
    );
    setExploreItems(response.data);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    setExploreItems([]);
    getExploreItems();
  }, [filterValue]);

  return (
    <>
      <div>
        <select
          onChange={(event) => setFilterValue(event.target.value)}
          id="filter-items"
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems?.length ? (
        <>
          {exploreItems?.slice(0, slice).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ExploreNewItem item={item} />
            </div>
          ))}
        </>
      ) : (
        <SkeletonLoading />
      )}

      {slice !== 16 && (
        <div
          onClick={() => setSlice(slice + 4)}
          className="col-md-12 text-center"
        >
          <Link data-aos="fade-in" to="" id="loadmore" className="btn-main lead">
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
