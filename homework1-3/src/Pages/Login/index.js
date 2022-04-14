import React, { useEffect } from "react";
import { getUserProfile } from "./../../utils/fetchApi";
import { useDispatch } from "react-redux";
import { login } from "../../utils/authSlice";
import { useHistory } from "react-router-dom";
import config from './../../utils/config';
import { Button } from '@mui/material';


export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const accessTokenParams = params.get("#access_token");

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const response = await getUserProfile(accessTokenParams);
          dispatch(
            login({
              accessToken: accessTokenParams,
              user: response,
            })
          );
          history.push("/create-playlist");
        } catch (e) {
          alert(e);
        }
      };
      setUserProfile();
    }
  }, [dispatch, history]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  };

  return (
    <div className="login-wrapper">
      <p>
        Please Login before using SPosify.
      </p>
      <Button 
            variant="contained" 
            type='submit' 
            href={getSpotifyLinkAuthorize()} 
            className="btn btnLogin">
        Login
      </Button>
    </div>
  );
} 