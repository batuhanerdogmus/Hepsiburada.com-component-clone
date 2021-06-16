import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { projectSeed } from "../seed";
import styles from "../styles/slider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import fullscreen from "../img/fullscreen.svg";

export default function SimpleSlider({
  setProjectId,
  sectionId,
  setSectionId,
  projectId,
  setIsFullViewActive,
  isFullViewActive,
}) {
  const [swiped, setswiped] = useState(true);
  const sliderRef = useRef(null);
  const [slideLength, setSlideLength] = useState(Number);

  useEffect(() => {
    switch (sectionId) {
      case "A":
        GoToSlide(0);
        break;
      case "B":
        GoToSlide(16);
        break;
      case "C":
        GoToSlide(28);
        break;
      default:
        break;
    }
    function GoToSlide(index: Number) {
      sliderRef.current.slickGoTo(index);
    }
  }, [sectionId]);

  useEffect(() => {
    const active = document.getElementsByClassName("slick-active")[0];
    const image = active.getElementsByTagName("img")[0];
    const postID = image.getAttribute("alt");

    setProjectId(postID);
    setSectionId(postID);
  }, [swiped]);

  useEffect(() => {
    switch (projectId[0]) {
      case "a":
        setSlideLength(projectSeed[0].posts.length);
        break;
      case "b":
        setSlideLength(projectSeed[1].posts.length);
        break;
      case "c":
        setSlideLength(projectSeed[2].posts.length);
        break;
      default:
        break;
    }
  }, [projectId]);

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: "10px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className={styles.counter}>
        <span>
          {projectId.substr(1, 3)}/{slideLength}
        </span>

        <div
          className={styles.icon}
          onClick={() => {
            setIsFullViewActive(!isFullViewActive);
          }}
        >
          <Image
            src={fullscreen}
            alt="fullscreen"
            width={14}
            height={14}
            layout="fixed"
          />
        </div>
      </div>
      <Slider
        {...settings}
        afterChange={() => setswiped(!swiped)}
        ref={sliderRef}
      >
        {projectSeed.map((project) =>
          project.posts.map((post) => (
            <div key={post.id}>
              <img className={styles.img} src={post.img} alt={post.id} />
              <div
                className={styles.textContainer}
                style={{ backgroundColor: `${post.color}` }}
              >
                <div className={styles.text}>{post.text}</div>
                <div className={styles.text}>{post.text1}</div>
              </div>
            </div>
          ))
        )}
      </Slider>
    </>
  );
}
