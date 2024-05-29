"use client";

import { FaPause, FaPlay } from "react-icons/fa";
import classes from "./slideshow.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const Slideshow = ({
  posts,
}: {
  posts: ({
    user: {
      username: string;
    };
  } & {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    userId: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
  })[];
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const interval = useRef<NodeJS.Timeout>();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const prevSlidte = () => {
    setCurrentSlide((prev) => (prev + posts.length - 1) % posts.length);
  };

  useEffect(() => {
    if (isPlaying) {
      interval.current = setInterval(() => {
        nextSlide();
      }, 10000);
      setCurrentSlide(0);
    } else {
      clearInterval(interval.current);
    }

    return () => clearInterval(interval.current);
  }, [isPlaying, nextSlide]);

  return (
    <div className={classes.slideshow__container}>
      <div className={classes.slideshow__wrapper}>
        <div className={classes.slides}>
          {posts.map((post, index) => {
            if (index === currentSlide) {
              return (
                <div key={index} className={`${classes.slide} $`}>
                  <div className={classes.slide__image}>
                    <Image src={post.thumbnail} fill alt="" />
                  </div>
                  <div className={classes.slide__content}>
                    <h2>{post.title}</h2>
                    <div className={classes.slide__info}>
                      <p>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>{post.user.username}</p>
                    </div>
                  </div>
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
