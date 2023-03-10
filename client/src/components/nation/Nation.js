import React, { useContext, useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { NavLink, useLocation } from "react-router-dom";
import { NationContext } from "../../contexts/NationContext";
import { Carousel, Empty } from "antd";
import SingleNation from "./SingleNation";
import TopNation from "./TopNation";
import { AuthContext } from "../../contexts/AuthContext";

const Nation = () => {
  const {
    authState: {
      user: { isAdmin },
    },
  } = useContext(AuthContext);
  const { pathname } = useLocation();
  const {
    nationState: { nations, nationsLoading },
    getNations,
  } = useContext(NationContext);
  // Start: Get All nationss
  useEffect(() => {
    getNations();
  }, []);
  let body;

  if (nations.length === 0) {
    body = <Empty />;
  } else {
    body = nations.map((nation) => <SingleNation nation={nation} />);
  }

  return (
    <div>
      <div class="page-heading">
        {!isAdmin && (
          <div class="featured-explore">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">
                  <h2 className="mb-5">Top 5 Nations in world cup 2022</h2>
                  <Carousel autoplay autoplaySpeed={3000}>
                    {nations.length !== 0 ? (
                      nations
                        .sort((a, b) => a.rank - b.rank)
                        .reverse()
                        .slice(0, 5)
                        .map((nation) => <TopNation nation={nation} />)
                    ) : (
                      <Empty />
                    )}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div class="discover-items">
        <div class="container">
          <div class="row">
            <div class="col-lg-5">
              <div class="section-heading">
                <div class="line-dec"></div>
                {isAdmin ? (
                  <h2>
                    <em>Nations</em> Management
                  </h2>
                ) : (
                  <h2>
                    Discover World Cup 2022 <em>Nations</em>
                  </h2>
                )}
              </div>
            </div>
            <div class="col-lg-7">
              <div class="buttons" style={{ textAlign: "right" }}>
                <div class="main-button">
                  {isAdmin && (
                    <NavLink
                      to="/addNation"
                      class="explore"
                      isActive={() => ["/nations"].includes(pathname)}
                      style={{ marginTop: "15px" }}
                    >
                      Create new nation
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nation;
