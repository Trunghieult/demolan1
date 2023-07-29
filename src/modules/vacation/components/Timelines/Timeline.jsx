import { useSelector } from "react-redux";
import styles from "./Timeline.module.scss";
import classNames from "classnames/bind";
import { Link, useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles);

const Timeline = () => {
  const { posts, activeTimeline } = useSelector((state) => state.vacation);
  const { timeline } = posts;
  const [searchParams] = useSearchParams();
  const vacationId = searchParams.get("vacationID");

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <header># Timeline</header>
          <main>
            {timeline?.map((item, index) => {
              return (
                <Link
                  to={`/post/timeline?tl=${item}&id=${vacationId}`}
                  className={cx(
                    "timeline-item",
                    activeTimeline === item && "item-active"
                  )}
                  key={index}
                >
                  <span className={cx("index")}>{index + 1}.</span>
                  <span className={cx("value")}>{item}</span>
                </Link>
              );
            })}
          </main>
        </div>

        <div className={cx("active")}>
          <span>Date</span>
          <span className={cx("date")}>{activeTimeline}</span>
        </div>
      </div>
    </>
  );
};

export default Timeline;
