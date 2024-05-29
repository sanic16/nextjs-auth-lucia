"use client";

import { FaPause, FaPlay } from "react-icons/fa";
import classes from "./slideshow.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const Slideshow = ({ images }: { images: string[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const interval = useRef<NodeJS.Timeout>();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlidte = () => {
    setCurrentSlide((prev) => (prev + images.length - 1) % images.length);
  };

  useEffect(() => {
    if (isPlaying) {
      interval.current = setInterval(() => {
        nextSlide();
      }, 5000);
    } else {
      clearInterval(interval.current);
    }

    return () => clearInterval(interval.current);
  }, [isPlaying, nextSlide]);

  return (
    <div className={classes.slideshow__container}>
      <div className={classes.slideshow__wrapper}>
        <div className={classes.slides}>
          {images.map((image, index) => {
            if (index === currentSlide) {
              return (
                <div key={index} className={`${classes.slide} $`}>
                  <Image src={image} fill alt="" />
                </div>
              );
            }
          })}
        </div>

        {!isPlaying && (
          <div
            className={`${isHovering ? classes.hover : ""} ${classes.control} ${
              classes.left__arrow
            }`}
            onClick={prevSlidte}
          >
            <div className={classes.arrow}>
              <div className={`${classes.line} ${classes.line__1}`}></div>
              <div className={`${classes.line} ${classes.line__2}`}></div>
            </div>
          </div>
        )}

        {!isPlaying && (
          <div
            className={`${isHovering ? classes.hover : ""}  ${
              classes.control
            } ${classes.right__arrow}`}
            onClick={nextSlide}
          >
            <div className={classes.arrow}>
              <div className={`${classes.line} ${classes.line__3}`}></div>
              <div className={`${classes.line} ${classes.line__4}`}></div>
            </div>
          </div>
        )}

        <div
          className={classes.play__pause}
          onClick={() => setIsPlaying((prev) => !prev)}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
