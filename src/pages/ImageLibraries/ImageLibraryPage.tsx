/* eslint-disable @typescript-eslint/no-explicit-any */
/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-11 11:01:55
 * @modify date 2023-04-05 20:08:19
 * @desc [description]
 */
// #region //* Imports
import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import {
  ImageListType as UploadingImageListType,
  ImageType as UploadingImageType,
} from "react-images-uploading";
// * Mui
import {
  Button,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
// * Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

import ImageTwoToneIcon from "@mui/icons-material/ImageTwoTone";
import { IoImage, IoImages } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { GiToken } from "react-icons/gi";
import { RiSideBarFill } from "react-icons/ri";
// * Local Components
import AppGridContainer from "../../components/AppGridContainer";
import AppConfirmDialog from "../../components/AppConfirmDialog";
import AppScrollbar from "../../components/AppScrollbar";
import BaseComponents from "../../components/BaseComponents";
import ImageLibraryAddEditDialog from "./ImageLibraryAddEditDialog";
import ImageLibraryDspDialog from "./ImageLibraryDspDialog";
import Notification, {
  NotifyState,
} from "../../components/BaseComponents/Notification/Notification";
import PageDialog from "../../components/BaseComponents/PageDialog";
import TitleBar from "../../components/TitleBar";
import { ImageType, imageTypeDescriptions } from "./imageTypes";
import NoImage from "../../assets/images/no_image.png";

// * Services
import { ImageRecord } from "../../dataModels/images";
import {
  useImagesContext,
  useImagesActionsContext,
} from "./ImageLibraryContextProvider";

// import ?? API connections
//#endregion

type ImageLibraryPageProps = {
  imageType: ImageType; // Adjust this type based on your actual image type
};

const ImageLibraryPage: React.FC<ImageLibraryPageProps> = ({ imageType }) => {
  // #region // * State Variables
  const { recordsList, showView } = useImagesContext();
  const { setShowView } = useImagesActionsContext();
  const [images, setImages] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [imageTypeState, setImageTypeState] = useState<ImageType>(imageType);
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  // const [openDspDialog, setOpenDspDialog] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState<ImageRecord | null>(null);
  const [currentItem, setCurrentItem] = useState<ImageRecord | null>(null);

  const maxNumber = 69;
  // const { loading, recordsList } = useImagesContext();
  const loading = false;
  // const recordsList = React.useMemo(() => [] as ImageRecord[], []);

  const open = Boolean(anchorEl);
  const [data, setData] = useState<any[]>([]);
  const [notify, setNotify] = useState<NotifyState>({
    isOpen: false,
    message: "",
    type: "info",
  });
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    subTitle: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  // #endregion

  // #region //* Hooks
  useEffect(() => {
    console.log("ImageLibraryPage: recordsList", recordsList);
    if (recordsList instanceof Array) {
      setData(recordsList);
    }
  }, [recordsList]);
  // #endregion

  // #region //* Event Handlers

  const handleImageAddAll = (
    imageList: UploadingImageListType,
    onImageRemoveAll: () => void
  ) => {
    imageList.forEach((image: UploadingImageType) => {
      const formData = new FormData();
      console.log("ImageLibraryPage: image", image.file);
      if (image.file) {
        formData.append("file_name", image.file);
        formData.append("alt_text", image.file);
      }
      // formData.append("user", 2);
      formData.append("user_id", "1");
      formData.append("file_size", String(image.file?.size || ""));
      formData.append("mime_type", String(image.file?.type || ""));

      alert(`Adding image ${image.file?.name} to database file`);
      // Todo: Add endpoint to update database
    });
    onImageRemoveAll();
  };
  const addOrEdit = (record: ImageRecord | null, resetForm: () => void) => {
    let close = false;
    // TODO: Add endpoint to update database
    // updateImage(convertToFormData(record, "edit"));
    console.log("Image record updated in database", record);
    close = true;

    if (close) {
      resetForm();
      setRecordForEdit(null);
      setOpenAddEditDialog(false); // Close Popup modal
      handleMenuClose(); // Close Menu modal
    }

    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };
  const onChange = (imageList: UploadingImageListType) => {
    setImages(imageList);
  };
  const handleDelete = (id: ImageRecord["id"]) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to delete this Image?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(id);
      },
    });
    handleMenuClose();
  };
  const onDelete = (id: ImageRecord["id"]) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    // TODO: Add endpoint to delete record & image from database
    // deleteImage(id);
    setNotify({
      isOpen: true,
      message: `Record ${id} deleted successfully`,
      type: "error",
    });
  };
  const handleEdit = (record: ImageRecord) => {
    setRecordForEdit(record);
    setOpenAddEditDialog(true);
  };
  const handleClickEvent = (
    event: React.MouseEvent,
    index: number,
    onImageUpdate: { (index: number): void; (arg0: number): void },
    onImageRemove: { (index: number): void; (arg0: number): void }
  ) => {
    if (event.shiftKey) onImageRemove(index);
    else onImageUpdate(index);
  };
  const handleMenuClick = (event: React.MouseEvent, item: ImageRecord) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setCurrentItem(item);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };
  const handleSelection = (item: ImageRecord) => {
    // selectImage(item);
    setRecordForEdit(item);
    setShowView(true);
    // setOpenDspDialog(true);
  };
  const handleDialogClose = () => {
    setOpenAddEditDialog(false);
    handleMenuClose();
  };
  const selectAvatarImage = (imageType: ImageType) => {
    switch (imageType) {
      case "i":
        return <IoImage />;
      case "a":
        return <RxAvatar />;
      case "t":
        return <GiToken />;
      case "s":
        return <RiSideBarFill />;
      default:
        return <IoImages />;
    }
  };
  const selectTitleText = (imageType: ImageType) => {
    switch (imageType) {
      case "i":
        return "Images Library";
      case "a":
        return "Avatars Library";
      case "t":
        return "Tokens Library";
      case "s":
        return "SideBar Library";
      default:
        return "All Images";
    }
  };
  const selectDialogTitle = (imageType: ImageType) => {
    return imageTypeDescriptions[imageType] || "All Images";
  };
  const selectImageSize = (imageType: ImageType) => {
    switch (imageType) {
      case "i":
        return {
          ml: "auto",
          aspectRatio: "4/3",
          width: "140px",
          cursor: "pointer",
          borderRadius: "10px",
        };
      case "a":
        return {
          mt: 2,
          ml: "auto",
          mr: "auto",
          aspectRatio: "1/1",
          width: "100px",
          cursor: "pointer",
          borderRadius: "50px",
        };
      case "t":
        return {
          mt: 2,
          ml: "auto",
          mr: "auto",
          aspectRatio: "1/1",
          width: "100px",
          cursor: "pointer",
          borderRadius: "10px",
        };
      case "s":
        return {
          aspectRatio: "1/2.5",
          mt: 1,
          ml: "auto",
          mr: "auto",
          width: "40px",
          cursor: "pointer",
          border: "1px solid grey",
        };
      default:
        return {
          ml: "auto",
          aspectRatio: "4/3",
          width: "140px",
          cursor: "pointer",
          borderRadius: "10px",
        };
    }
  };
  const selectImageStyle = (imageType: ImageType) => {
    if (imageType == "s") return "flex";
    else return null;
  };
  // #endregion

  return (
    <AppGridContainer>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240, 1fr))",
          gap: 2,
        }}
      >
        {/* //* Page: Component Header */}
        <Box
          sx={{
            ml: 3,
            width: "calc(100vw - 400px)",
            height: 75,
          }}
        >
          <TitleBar
            componentTitle={selectTitleText(imageType)}
            avatarIcon="icon"
            avatarImage={selectAvatarImage(imageType)}
          />
        </Box>
        {/* //* Component Panel */}
        <Box
          id="componentPannel"
          sx={{
            width: "calc(100vw - 375px)",
            height: "calc(100vh - 200px)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "6fr 3fr",
            }}
          >
            {/* //* Display Pane of existing Images */}
            <Box
              sx={{
                height: "calc(100vh - 220px)",
                m: 3,
                borderRadius: "10px",
              }}
            >
              <Paper
                elevation={10}
                sx={{
                  width: "100%",
                  height: "100%",
                  // overflowY: "auto",
                  borderRadius: "10px",
                }}
              >
                <AppScrollbar>
                  <Box sx={{ m: 3 }} display="flex">
                    {loading ? (
                      <Typography>Loading...</Typography>
                    ) : (
                      data.map((item, index) => (
                        <Card
                          key={index}
                          sx={{
                            m: 2,
                            p: 1,
                            width: "150px",
                            height: "175px",
                            borderRadius: "10px",
                            boxShadow: "3px 3px 3px 3px rgba(0,0,0,0.2)",
                            display: selectImageStyle(item.imageType),
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={selectImageSize(item.imageType)}
                            src={
                              item.image_url != "" ? item.image_url : NoImage
                            }
                            alt={
                              item.altText != "" && item.altText != null
                                ? item.alt_text
                                : item.file_name
                            }
                            onClick={() => handleSelection(item)}
                          />
                          <CardContent sx={{ mt: "auto" }}>
                            <Box
                              sx={{
                                pt: 2,
                                display: "flex",
                                flex: "flex-row",
                                alignItems: "center",
                              }}
                            >
                              <Grid size={{ xs: 10 }}>
                                <Typography variant="body2" sx={{}}>
                                  {item.alt_text.length > 15
                                    ? item.alt_text.substring(0, 14) + "..."
                                    : item.alt_text}
                                </Typography>
                              </Grid>
                              <Grid size={{ xs: 2 }}>
                                {item.owner !== null && (
                                  <BaseComponents.ActionButton
                                    size="small"
                                    tooltipText="More options"
                                    aria-controls={
                                      open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    aria-label={`more options for ${item.name}`}
                                    onClick={(e) => {
                                      handleMenuClick(e, item);
                                    }}
                                  >
                                    <MoreVertIcon
                                      sx={{ color: "grey", fontSize: 20 }}
                                    />
                                  </BaseComponents.ActionButton>
                                )}
                                {item.owner === null && (
                                  <DoNotDisturbAltIcon
                                    sx={{ color: "red", fontSize: 20 }}
                                  />
                                )}
                                {/* {
                                  <MoreVertIcon
                                    sx={{ color: "grey", fontSize: 20 }}
                                  />
                                } */}
                              </Grid>
                            </Box>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </Box>
                </AppScrollbar>
              </Paper>
            </Box>

            {/* //* Right Hand Column */}
            <Box
              sx={{
                m: 2,
                borderRadius: "10px",
                display: "grid",
                gridTemplateRows: "2fr 6fr",
              }}
            >
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png", "jpeg"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <>
                    {/* //& Click - Drag/Drop Button */}
                    <Box
                      sx={{
                        mb: 2,
                        borderRadius: "10px",
                        display: "flex-column",
                      }}
                    >
                      <Button
                        onClick={onImageUpload}
                        variant="contained"
                        size="large"
                        startIcon={<ImageTwoToneIcon />}
                        sx={{
                          mt: 2,
                          width: "100%",
                          height: "100%",
                          color: "white",
                        }}
                        style={
                          isDragging ? { backgroundColor: "blue" } : undefined
                        }
                        {...dragProps}
                      >
                        Click or Drag/Drop here
                      </Button>
                    </Box>
                    {/* //& Image List to Add to database */}
                    <Box
                      sx={{
                        borderRadius: "10px",
                        display: "flex-column",
                        bgcolor: "background.componentBg",
                        maxHeight: "calc(100vh - 410px)",
                      }}
                    >
                      {/* //^ Buttons Box */}
                      <Box
                        sx={{ m: 2 }}
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-around"
                      >
                        <Button
                          variant="contained"
                          startIcon={<KeyboardDoubleArrowLeftIcon />}
                          onClick={() =>
                            handleImageAddAll(imageList, onImageRemoveAll)
                          }
                          disabled={imageList.length <= 0}
                          color="secondary"
                        >
                          Add All{" "}
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          onClick={onImageRemoveAll}
                          disabled={imageList.length <= 0}
                          color="secondary"
                        >
                          Remove All{" "}
                        </Button>
                      </Box>
                      <Paper
                        elevation={10}
                        sx={{
                          width: "100%",
                          height: "90%",
                          maxHeight: "100%",
                          bgcolor: "background.componentBg",
                          overflowY: "auto",
                          borderRadius: "10px",
                        }}
                      >
                        {/* //^ Image List */}
                        <AppScrollbar>
                          <Box
                            sx={{ m: 2, ml: 8 }}
                            display="grid"
                            gridTemplateColumns="1fr 1fr"
                          >
                            {imageList.map((image, index) => (
                              <Card
                                key={index}
                                sx={{
                                  m: 2,
                                  flexGrow: 1,
                                  minWidth: "100px",
                                  minHeight: "100px",
                                  maxWidth: "200px",
                                  maxHeight: "200px",
                                  backgroundColor: "grey.300",
                                }}
                              >
                                <CardActionArea
                                  onClick={(e) =>
                                    handleClickEvent(
                                      e,
                                      index,
                                      onImageUpdate,
                                      onImageRemove
                                    )
                                  }
                                  sx={{ cursor: "pointer" }}
                                >
                                  <CardMedia
                                    component="img"
                                    src={image.data_url}
                                    alt=""
                                    sx={{
                                      aspectRatio: "4/3",
                                      borderRadius: "10px",
                                    }}
                                  />
                                </CardActionArea>
                              </Card>
                            ))}
                          </Box>
                        </AppScrollbar>
                      </Paper>
                    </Box>
                  </>
                )}
              </ImageUploading>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* //* Dialogs, Modals, Menus & Popups */}
      <Notification notify={notify} setNotify={setNotify} />
      {/* //& Add/EditImage */}
      <PageDialog
        openPopup={openAddEditDialog}
        setOpenPopup={handleDialogClose}
        title={
          selectDialogTitle(
            (recordForEdit?.image_type as ImageType) || "default"
          ) + " Details"
        }
        titleColor="#393bee"
        size={"sm"}
      >
        <ImageLibraryAddEditDialog
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
      </PageDialog>
      {/* //& View Image */}
      <PageDialog
        openPopup={showView}
        setOpenPopup={setShowView}
        title={
          selectDialogTitle(
            (recordForEdit?.image_type as ImageType) || "default"
          ) + " Details"
        }
        titleColor="#393bee"
        size={"sm"}
      >
        <ImageLibraryDspDialog imageRecord={recordForEdit as ImageRecord} />
      </PageDialog>
      <AppConfirmDialog
        open={confirmDialog.isOpen}
        title="Are you sure you want to delete this Image?"
        dialogTitle="Image Delete Confirmation"
        onDeny={() => {
          setConfirmDialog({ ...confirmDialog, isOpen: false });
        }}
        onConfirm={() => {
          if (currentItem) onDelete(currentItem.id);
        }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        aria-labelledby="basic-menu-button"
        // placement="bottom-end"
      >
        {/* //& Edit Item */}
        <MenuItem onClick={() => handleEdit(currentItem as ImageRecord)}>
          <ListItemIcon>
            <EditOutlinedIcon style={{ color: "green" }} />
          </ListItemIcon>
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        {/* //& Delete Item */}
        <MenuItem
          onClick={() => currentItem && handleDelete(currentItem.id)}
          // variant="plain"
          // color="neutral"
          // aria-label="delete image"
          // size="small"
        >
          <ListItemIcon>
            <DeleteIcon style={{ color: "red" }} />
          </ListItemIcon>
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </Menu>
    </AppGridContainer>
  );
};

export default ImageLibraryPage;
