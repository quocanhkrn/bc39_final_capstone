import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddUserFail, actAddUserSuccess, addUserSendRequest, updateUserSendRequest } from "../../_duck/actions";
import { AddRounded } from "@mui/icons-material";

const FormDialog = (props) => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.Admin.AddAndUpdateUser);
  const { user: propUser, open, handleClose } = props;
  const [user, setUser] = useState();
  const [skillAndCertification, setSkillAndCertification] = useState({ skill: "", certification: "" });
  const skillInput = useRef();
  const certificationInput = useRef();
  const [skillList, setSkillList] = useState([]);
  const [certificationList, setCertificationList] = useState([]);

  useEffect(() => {
    dispatch(actAddUserSuccess(null));
    setUser({ ...propUser });
    setSkillList(propUser?.skill || []);
    setCertificationList(propUser?.certification || []);
    // if (!propUser?.certification) {
    //   setUser((prevUser) => {
    //     return { ...prevUser, certification: [] };
    //   });
    // }
    setSkillAndCertification({ skill: "", certification: "" });
  }, [propUser]);

  const generateCurrentDate = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const result = `${year}-${month > 10 ? `${month}` : `0${month}`}-${day > 10 ? `${day}` : `0${day}`}`;
    setUser((prevUser) => {
      return { ...prevUser, birthday: result };
    });
    return result;
  }, []);

  const handleOnChange = (e) => {
    dispatch(actAddUserSuccess(null));

    const { name, value } = e.target;

    switch (name) {
      case "skill":
      case "certification":
        setSkillAndCertification((prevVal) => {
          return { ...prevVal, [name]: value };
        });
        break;

      default:
        setUser((prevUser) => {
          return { ...prevUser, [name]: value };
        });
        break;
    }
  };

  const handleAddSkillAndCertification = (name, value) => {
    if (value.trim()) {
      switch (name) {
        case "skill":
          if (skillList.findIndex((skill) => skill.toUpperCase() === value.toUpperCase()) === -1) {
            setSkillList((prevList) => {
              let newList = [...prevList];
              newList.push(value);
              return [...newList];
            });
            setSkillAndCertification((prevValue) => {
              return { ...prevValue, skill: "" };
            });
          } else {
            dispatch(actAddUserFail(`Skill "${value}" is already existed!`));
          }
          break;

        case "certification":
          if (certificationList.findIndex((certification) => certification.toUpperCase() === value.toUpperCase()) === -1) {
            setCertificationList((prevList) => {
              let newList = [...prevList];
              newList.push(value);
              return [...newList];
            });
            setSkillAndCertification((prevValue) => {
              return { ...prevValue, skill: "" };
            });
          } else {
            dispatch(actAddUserFail(`Certification "${value}" is already existed!`));
          }
          break;

        default:
          break;
      }
    }
  };

  const handleDeleteSkillAndCertification = (name, value) => {
    switch (name) {
      case "skill":
        setSkillList((prevList) => {
          let newList = [...prevList];
          newList = newList.filter((skill) => skill.toUpperCase() !== value.toUpperCase());
          return [...newList];
        });
        break;

      case "certification":
        setCertificationList((prevList) => {
          let newList = [...prevList];
          newList = newList.filter((certification) => certification.toUpperCase() !== value.toUpperCase());
          return [...newList];
        });
        break;

      default:
        break;
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (propUser) {
      dispatch(updateUserSendRequest({ ...user, skill: skillList, certification: certificationList }, setUser));
    } else {
      dispatch(addUserSendRequest({ ...user, skill: skillList, certification: certificationList }, setUser));
    }
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={() => {
        handleClose(setUser);
      }}>
      <Box component={"form"} onSubmit={handleOnSubmit}>
        <DialogTitle>{propUser ? "UPDATE USER" : "ADD USER"}</DialogTitle>
        <DialogContent sx={{ overflow: "initial" }}>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {error || data ? (
            <Alert severity={error ? "error" : "success"} sx={{ mb: 2 }}>
              {error || data}
            </Alert>
          ) : (
            ""
          )}
          <Grid container spacing={2} alignItems={"flex-end"}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                type="text"
                name="name"
                value={user?.name || ""}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={user?.email || ""}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                name="password"
                value={user?.password || ""}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                type="tel"
                name="phone"
                value={user?.phone || ""}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Birthday"
                type="date"
                name="birthday"
                value={user?.birthday || generateCurrentDate}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="role-select-lable">Role</InputLabel>
                <Select
                  labelId="role-select-lable"
                  name="role"
                  value={user?.role || ""}
                  required
                  label="Role"
                  onChange={handleOnChange}
                  margin="none">
                  <MenuItem value={"USER"}>User</MenuItem>
                  <MenuItem value={"ADMIN"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                ref={skillInput}
                label="Skills"
                type="text"
                name="skill"
                value={skillAndCertification.skill}
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
                sx={{ mb: 1 }}
                InputProps={{
                  endAdornment: (
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleAddSkillAndCertification("skill", skillInput.current.querySelector("input").value.trim())}>
                      <AddRounded />
                      Add
                    </Button>
                  ),
                }}
              />
              {skillList?.map((skill) => {
                return (
                  <Chip
                    key={skill}
                    label={skill}
                    variant="filled"
                    sx={{ mr: 1 }}
                    onDelete={() => handleDeleteSkillAndCertification("skill", skill)}
                  />
                );
              })}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                ref={certificationInput}
                label="Certifications"
                type="text"
                name="certification"
                value={skillAndCertification.certification}
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
                sx={{ mb: 1 }}
                InputProps={{
                  endAdornment: (
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleAddSkillAndCertification("certification", certificationInput.current.querySelector("input").value.trim())}>
                      <AddRounded />
                      Add
                    </Button>
                  ),
                }}
              />
              {certificationList?.map((certification) => {
                return (
                  <Chip
                    key={certification}
                    label={certification}
                    variant="filled"
                    sx={{ mr: 1 }}
                    onDelete={() => handleDeleteSkillAndCertification("certification", certification)}
                  />
                );
              })}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(setUser)}>Cancel</Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default FormDialog;
