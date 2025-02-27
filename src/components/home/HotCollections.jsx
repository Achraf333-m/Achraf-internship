import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Aos from "aos";
import 'aos/dist/aos.css';

const HotCollections = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);

  async function getUsers() {
    setLoading(true);
    await axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((userData) => setUserData(userData.data));
    setLoading(false);
  }

  useEffect(() => {
    Aos.init({duration:2000})
    getUsers();
  }, []);

  const responsive = {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  };

  return (
    <>
      <section data-aos="fade-in" id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>

            {userData?.length ? (
              <OwlCarousel
                data-aos-delay="500"
                className="owl-theme"
                items={4}
                loop
                margin={10}
                responsive={responsive}
                nav
              >
                {userData?.map((item) => (
                  <div className="" key={item.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}{" "}
              </OwlCarousel>
            ) : (
              <OwlCarousel
                className="owl-theme"
                items={4}
                loop
                margin={10}
                responsive={responsive}
                nav
              >
                {new Array(6).fill(0).map((_, index) => (
                  <div key={index} className="">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton
                          width="100%"
                          height="200px"
                          borderRadius="8px"
                        />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton
                          width="70%"
                          height="16px"
                          borderRadius="4px"
                        />

                        <Skeleton
                          width="50%"
                          height="16px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HotCollections;
