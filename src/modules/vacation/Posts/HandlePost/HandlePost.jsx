import styles from "./HandlePost.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import vacationAPI from "~/api/vacationAPI";
import SelectLocation from "~/modules/components/SelectLocation/SelectLocation";
import Notification from "~/components/Notification/Notification";
import ImageField from "~/components/ImageField/ImageField";
import Modal from "~/components/Modal/Modal";
import { Avatar, List } from "antd";
import UpLoad from "~/components/UpLoad/UpLoad";
import {
  deleteImg,
  resetResources,
  setInitResources,
} from "~/store/slices/resourceSlice";
import Loading from "~/components/Loading/Loading";
import { isPostListChanged } from "~/store/slices/vacationSlice";
import Dropdown from "~/modules/album/CreateAlbum/Dropdown/Dropdown";

const cx = classNames.bind(styles);
const HandlePost = ({
  showModal,
  setShowModal,
  type,
  postId,
  setPostId,
  vacationId: id,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // get vacation detail
  const { info } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.vacation);
  // get resources when upload
  const { resources, isLoading: isLoadingImg } = useSelector(
    (state) => state.resource
  );
  // get vacation selected
  const [selectedVacation, setSelectedVacation] = useState({
    title: "Choose Your Vacation",
    _id: "",
  });
  // get location selected
  const [selectedLocation, setSelectedLocation] = useState({
    city: { title: "", id: "" },
    district: { title: "", id: "" },
    detail: { title: "", id: "" },
  });
  // set content of post
  const [content, setContent] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef();
  // This function gets the vacationId from the searchParams.
  const vacationId =
    type === "create" || type === "update"
      ? searchParams.get("vacationID")
        ? searchParams.get("vacationID")
        : id
      : selectedVacation._id;

  useEffect(() => {
    if (postId && type === "update") {
      console.log("set init", postId);
      const postUpdate = posts.list.find((item) => item._id === postId);

      setContent(postUpdate.content);
      setSelectedLocation({
        city: { title: postUpdate.location?.city, id: "" },
        district: { title: postUpdate.location?.district, id: "" },
        detail: {
          title: postUpdate.location?.detail,
          id: postUpdate.location?._id,
        },
      });
      dispatch(setInitResources(postUpdate.resource));
    }
  }, [postId, showModal]);

  // This function opens the modal.
  function openModal() {
    setIsOpen(true);
  }
  // This function handles the click event.
  const handleClick = async (e) => {
    e.preventDefault();
    const srcListId = resources?.map((item) => item._id);
    const params = {
      vacationId: vacationId,
      locationId: selectedLocation.detail?.id,
      content: content,
      resources: srcListId,
    };
    try {
      let res;
      setIsLoading(true);
      switch (type) {
        case "create":
        case "newfeed":
          res = await vacationAPI.createPost(params);
          break;
        case "update":
          res = await vacationAPI.updatePost({ id: postId, body: params });
          break;
        default:
          break;
      }
      setIsSuccess(true);
      setMsg(res.data?.message);
      dispatch(isPostListChanged(true));
    } catch (error) {
      setIsError(true);
      setMsg(error.message);
    }
    setIsLoading(false);
    dispatch(resetResources());
    setContent("");
    setSelectedLocation({
      city: { title: "", id: "" },
      district: { title: "", id: "" },
      detail: { title: "", id: "" },
    });
    setSelectedVacation({ title: "Choose Your Vacation", _id: "" });
    setShowModal(false);
    setOpenNoti(true);
    setPostId && setPostId("");
    navigate(`/vacation?vacationID=${selectedVacation._id}`);
  };

  // This function handles the click event.
  const handleDeleteImg = (id) => {
    dispatch(deleteImg(id));
  };

  // This function gets the title of the modal.
  const titleModal =
    type === "create" || type === "newfeed" ? "New Post" : "Update Post";
  // This function handles the close event of the modal.
  const handleAfterClose = () => {
    dispatch(resetResources());
    setContent("");
    setSelectedLocation({
      city: { title: "", id: "" },
      district: { title: "", id: "" },
      detail: { title: "", id: "" },
    });
    setSelectedVacation({ title: "Choose Your Vacation", _id: "" });
    setPostId && setPostId("");
  };
  // This function checks if the create button is disabled.
  const isDisabledCreate =
    !vacationId || !selectedLocation.detail?.id || !content;

  return (
    <>
      <Modal
        open={showModal}
        setOpen={setShowModal}
        title={titleModal}
        handleAfterClose={handleAfterClose}
      >
        <div className={cx("modal-container")}>
          <div className={cx("user-info")}>
            <div className={cx("info-name")}>
              <Avatar src={info?.avatar?.path} />
              <div className={cx("username")}>{info?.username}</div>
            </div>
            {type === "newfeed" && (
              <Dropdown
                className="post-modal"
                selected={selectedVacation}
                setSelected={setSelectedVacation}
              />
            )}
          </div>
          <TextArea
            placeholder="What is on your mind..."
            autoSize={{
              minRows: 6,
              maxRows: 12,
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!vacationId}
            spellCheck={false}
          />
          <div className={cx("img-uploader")}>
            <List
              grid={{
                gutter: 8,
                column: 4,
              }}
              dataSource={resources}
              loading={{
                spinning: isLoadingImg,
                indicator: <Loading />,
              }}
              renderItem={(item, index) => (
                <>
                  <List.Item>
                    <div className={cx("item")}>
                      <ImageField
                        rootClassName={cx("resource")}
                        src={item.path}
                      />
                      <CloseCircleOutlined
                        className={cx("img-btn")}
                        onClick={() => handleDeleteImg(item._id)}
                      />
                    </div>
                  </List.Item>
                </>
              )}
            />
          </div>
          <div className={cx("post-extension-container")}>
            <div className={cx("post-extension")}>
              <div> Add on: </div>
              <div className={cx("extensions")}>
                <div>
                  <FontAwesomeIcon
                    onClick={openModal}
                    icon={faLocationDot}
                    className={cx("icon", !vacationId && "disable")}
                  />
                  {!!vacationId && (
                    <SelectLocation
                      openLocation={modalIsOpen}
                      setOpenLocation={setIsOpen}
                      setLocation={setSelectedLocation}
                    />
                  )}
                </div>

                <div
                  className={cx("upload")}
                  onClick={() => imgRef.current.click()}
                >
                  <UpLoad
                    imgRef={imgRef}
                    body={{ field: "post", vacationId: vacationId }}
                    disabled={!vacationId}
                  />
                  <FontAwesomeIcon
                    icon={faImage}
                    className={cx("icon", !vacationId && "disable")}
                  />
                </div>
              </div>
            </div>
            {selectedLocation?.detail.title !== "" && (
              <div className={cx("result")}>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{` ${selectedLocation.detail?.title} - ${selectedLocation.district?.title} - ${selectedLocation.city?.title}`}</span>
              </div>
            )}
          </div>
          <button
            onClick={handleClick}
            disabled={isLoading || isDisabledCreate}
            className={cx("btn-submit")}
          >
            {type === "create" || type === "newfeed"
              ? " Create Post"
              : "Update"}
            {isLoading && <Loading />}
          </button>
        </div>
      </Modal>
      {(isSuccess || isError) && (
        <Notification
          isSuccess={isSuccess}
          isError={isError}
          msg={msg}
          openNoti={openNoti}
          setOpenNoti={setOpenNoti}
        />
      )}
    </>
  );
};

export default HandlePost;
