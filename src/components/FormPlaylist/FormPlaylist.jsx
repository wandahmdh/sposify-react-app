import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addTracksToPlaylist, createPlaylist } from '../../utils/fetchApi';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import './FormPlaylist.css';


export default function FormPlaylist({ uris }) {
  const [playlist, setPlaylist] = useState({
    title: "",
    description: "",
  });

  const accessToken = useSelector((state) => state.auth.accessToken);
  const client_id = useSelector((state) => state.auth.client_id);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPlaylist({ ...playlist, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (playlist.title.length > 10) {
      try {
        const responsePlaylist = await createPlaylist(accessToken, client_id, {
          name: playlist.title,
          description: playlist.description,
        });

        await addTracksToPlaylist(accessToken, responsePlaylist.id, uris);

        setPlaylist({
          title: "",
          description: "",
        });

        alert("Playlist created successfully!");
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Title must be at least 10 characters long.");
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <div className="createPlaylistBtn">
        <Button variant="outlined" onClick={handleClickOpen}>
          Create Playlist
        </Button>
      </div>
      <div className="formDialog">
        <Dialog 
          open={open} 
          onClose={handleClose}  
          style={{backgroundColor: 'transparent'}}
          PaperProps={{
            style: { borderRadius: 2 }   }}>
          <DialogContent 
            style={{backgroundColor: 'rgb(18, 18, 18)'}}>
            <form className="form" onSubmit={handleSubmit}>
              <div className="title">Welcome</div>
              <div className="subtitle">Let's create your playlist!</div>

              <div className="input-container ic1">
                <input 
                  type="text"
                  name="title"
                  id="title"
                  className="input" 
                  defaultValue={playlist.title}
                  onChange={handleChange}
                  required
                  placeholder="Playlist name" />
                <div className="cut"></div>
                <label className="placeholder">Playlist name</label>
              </div>

              <div className="input-container ic2">
                <input 
                  id="desc"
                  className="input" 
                  type="text" 
                  name="description"
                  defaultValue={playlist.description}
                  onChange={handleChange}
                  required
                  placeholder="Description" />
                <div className="cut"></div>
                <label className="placeholder">Description</label>
              </div>
              <Button 
                  class="submit"
                  variant="contained" 
                  type='submit'>
                    Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>

      </div>
    </div>
   
  );
}