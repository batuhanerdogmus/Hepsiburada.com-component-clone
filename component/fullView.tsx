import styles from "../styles/fullView.module.css";
import { projectSeed } from "../seed";
import Image from "next/image";
import x from "../img/x.svg";
import fullscreen from "../img/fullscreen.svg";
import { useEffect, useState } from "react";

export default function FullView({
  isFullViewActive,
  setIsFullViewActive,
  projectId,
}) {
  const [activeTitle, setActiveTitle] = useState(String);
  useEffect(() => {
    const active = document.getElementsByClassName(`${projectId}`)[0];
    active?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [isFullViewActive]);
  let options = {
    root: null,
    rootMargin: "-50%",
    threshold: 0,
  };

  useEffect(() => {
    const section = document.getElementsByClassName(`section`)[0];
    const section1 = document.getElementsByClassName(`section`)[1];
    const section2 = document.getElementsByClassName(`section`)[2];

    let observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting === true) {
        const Title = entries[0].target.firstChild.firstChild.textContent;
        setActiveTitle(Title);
      }
    }, options);
    observer.observe(section);
    observer.observe(section1);
    observer.observe(section2);
  }, []);

  return (
    <div
      className={isFullViewActive ? styles.overlay : styles.hide}
      onClick={() => {
        setIsFullViewActive(!isFullViewActive);
      }}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div
            className={styles.icon}
            onClick={() => {
              setIsFullViewActive(!isFullViewActive);
            }}
          >
            <Image
              src={x}
              alt="fullscreen"
              width={16}
              height={16}
              layout="fixed"
            />
          </div>
          <div className={styles.title}>{activeTitle}</div>
        </div>
        <div className={styles.imgContainer}>
          {projectSeed.map((project) => (
            <div className="section" key={project.id}>
              <div className={`${styles.title} ${styles.subtitle}`}>
                <span>{project.title}</span>
                <span>{" (" + project.posts.length + ")"}</span>
              </div>
              {project.posts.map((post) => (
                <div key={post.id} className={styles.listItem}>
                  <div
                    className={styles.fullScreenIcon}
                    onClick={() => {
                      setIsFullViewActive(!isFullViewActive);
                    }}
                  >
                    <div>
                      <Image
                        src={fullscreen}
                        alt="fullscreen"
                        width={14}
                        height={14}
                        layout="fixed"
                      />
                    </div>
                  </div>
                  <img className={post.id} src={post.img} alt={post.id} />
                  <div
                    className={styles.textContainer}
                    style={{ backgroundColor: `${post.color}` }}
                  >
                    <div className={styles.text}>{post.text}</div>
                    <div className={styles.text}>{post.text1}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
