import React from "react";
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import "./Map.css";
import ImageIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";

function TheListItem( {
  data,
  onClick,
  onDelete,
}: {
  data: any;
  onClick: Function;
  onDelete: Function;
}) {
  return (
    <div>
      <ListItem
      key={data.id}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={onDelete.bind(data,data)}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemButton
          component="a"
          href="#simple-list"
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary={`Lang:${data.lng}, Lat:${data.lat}`}
            onClick={onClick.bind(data,data)}
          />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

export default TheListItem;
