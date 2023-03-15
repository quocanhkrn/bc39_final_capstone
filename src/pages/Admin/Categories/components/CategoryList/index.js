import { AddRounded, DeleteRounded, EditRounded, ExpandLessRounded, ExpandMoreRounded, ExplicitRounded } from "@mui/icons-material";
import { Button, Collapse, IconButton, List, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actAddCategorySuccess, deleteCategorySendRequest } from "../../_duck/actions";
import FormDialog from "../FormDialog";

const CategoryList = (props) => {
  const dispatch = useDispatch();
  const { data } = props;
  const [listCollapsed, setListCollapsed] = useState([]);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(null);

  const handleFormDialogClose = (setCategory) => {
    dispatch(actAddCategorySuccess(null));
    setFormDialogOpen(false);
    setCategory(null);
  };

  const handleListOnClick = (index) => {
    let newListCollapsed = new Array();

    if (listCollapsed.indexOf(index.at(-1)) !== -1) {
      newListCollapsed = [...listCollapsed];
      newListCollapsed.splice(newListCollapsed.indexOf(index.at(-1)), 1);
    } else {
      newListCollapsed = newListCollapsed.concat([...index]);
    }

    setListCollapsed([...newListCollapsed]);
  };

  return (
    <>
      <List sx={{ width: "100%" }}>
        {data?.map((level01Category, l1Index) => {
          const { id: l1Id, tenLoaiCongViec: name, dsNhomChiTietLoai: level02List } = level01Category;

          return (
            <>
              <ListItemButton key={l1Id} onClick={() => handleListOnClick([`${l1Index}`])}>
                <ListItemText primary={name} />
                <IconButton
                  color="info"
                  onClick={() => {
                    setFormDialogOpen(true);
                    setUpdatedCategory({ level: "01", data: { l1Id, tenLoaiCongViec: name } });
                  }}>
                  <EditRounded />
                </IconButton>
                <IconButton color="error" onClick={() => dispatch(deleteCategorySendRequest("level01", l1Id))}>
                  <DeleteRounded />
                </IconButton>
                {listCollapsed.indexOf(`${l1Index}`) !== -1 ? <ExpandLessRounded /> : <ExpandMoreRounded />}
              </ListItemButton>
              <Collapse in={listCollapsed.indexOf(`${l1Index}`) !== -1} timeout="auto" unmountOnExit>
                <List>
                  {level02List.map((level02Category, l2Index) => {
                    const { id, tenNhom: name, dsChiTietLoai: level03List } = level02Category;
                    return (
                      <>
                        <ListItemButton key={id} sx={{ pl: 5 }} onClick={() => handleListOnClick([`${l1Index}`, `${l1Index}${l2Index}`])}>
                          <ListItemText primary={name} />
                          <IconButton
                            color="info"
                            onClick={() => {
                              setFormDialogOpen(true);
                              setUpdatedCategory({ level: "02", data: { id, tenChiTiet: name } });
                            }}>
                            <EditRounded />
                          </IconButton>
                          <IconButton color="error" onClick={() => dispatch(deleteCategorySendRequest("level02", id))}>
                            <DeleteRounded />
                          </IconButton>
                          {level03List.length > 0 &&
                            (listCollapsed.indexOf(`${l1Index}${l2Index}`) !== -1 ? <ExpandLessRounded /> : <ExpandMoreRounded />)}
                        </ListItemButton>
                        <Collapse in={listCollapsed.indexOf(`${l1Index}${l2Index}`) !== -1} timeout="auto" unmountOnExit>
                          <List>
                            {level03List.map((level03Category, l3Index) => {
                              const { id, tenChiTiet: name } = level03Category;
                              return (
                                <>
                                  <ListItemButton key={id} sx={{ pl: 8 }}>
                                    <ListItemText primary={name} />
                                    <IconButton color="info">
                                      <EditRounded />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => dispatch(deleteCategorySendRequest("level03", id))}>
                                      <DeleteRounded />
                                    </IconButton>
                                  </ListItemButton>
                                </>
                              );
                            })}
                          </List>
                        </Collapse>
                      </>
                    );
                  })}
                  <List sx={{ pl: 5 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        setFormDialogOpen(true);
                        setUpdatedCategory({ level: "02", data: null, maLoaiCongViec: l1Id });
                      }}>
                      <AddRounded />
                      ADD
                    </Button>
                  </List>
                </List>
              </Collapse>
              {l1Index === data.length - 1 && (
                <List>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      setFormDialogOpen(true);
                      setUpdatedCategory({ level: "01", data: null });
                    }}>
                    <AddRounded />
                    ADD
                  </Button>
                </List>
              )}
            </>
          );
        })}
      </List>

      <FormDialog open={formDialogOpen} handleClose={handleFormDialogClose} updatedCategory={updatedCategory} />
    </>
  );
};

export default CategoryList;
