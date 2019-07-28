import React, { Component } from "react";
import api from "./config/api";

import Navigation from "./components/Navigation";
import Signin from "./components/Signin";
import Register from "./components/Register";
import Rank from "./components/Rank";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import Particles from "react-particles-js";
import { particlesConfig } from "./particlesjs-config";

const initialState = {
  error: "",
  inputUrl: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  user: {
    id: null,
    name: null,
    email: null,
    entries: null,
    joined: null
  }
};

export class App extends Component {
  state = initialState;

  componentDidMount = () => {
    const storage = localStorage.getItem("@smart_brain:user");

    if (storage) {
      this.loadUser(JSON.parse(storage));
    }
  };

  loadUser = async user => {
    this.setState(
      {
        route: "home",
        user: { ...user }
      },
      () => {
        this.saveUser();
      }
    );
  };

  saveUser = () => {
    localStorage.setItem("@smart_brain:user", JSON.stringify(this.state.user));
  };

  calculateFaceLocation = regions => {
    const faces = regions.map(region => {
      return region.region_info.bounding_box;
    });

    // buscando o tamanho da imagem
    const inputImg = document.getElementById("input-img");
    const width = Number(inputImg.width);
    const height = Number(inputImg.height);

    // definindo as posições das faces
    const boxes = faces.map(face => {
      return {
        top: height * face.top_row,
        right: width * (1 - face.right_col),
        bottom: height * (1 - face.bottom_row),
        left: width * face.left_col
      };
    });

    this.setState({ boxes });
  };

  onBtnClear = () => {
    // document.querySelector(".input_text").value = "";
    this.setState({ inputUrl: "", error: "" });
  };

  onInputChange = event => {
    this.setState({
      inputUrl: event.target.value,
      error: ""
    });
  };

  onSubmit = async e => {
    e.preventDefault();

    await this.setState({ imageUrl: this.state.inputUrl, boxes: [] });

    try {
      const response = await api.post("image", {
        input: this.state.inputUrl,
        id: this.state.user.id
      });

      this.calculateFaceLocation(response.data.regions);
      this.setState(
        {
          user: {
            ...this.state.user,
            entries: response.data.entries
          }
        },
        () => this.saveUser()
      );
    } catch (err) {
      this.setState({ error: "Erro ao processar imagem" });
    }
  };

  onRouteChange = route => {
    if (route !== "home") {
      this.setState(initialState);
      localStorage.clear("@smart_brain:user");
    }

    this.setState({ route });
  };

  render() {
    const { route, user, inputUrl, imageUrl, boxes, error } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesConfig} />

        <Navigation route={route} onRouteChange={this.onRouteChange} />

        {route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : route === "register" ? (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        ) : (
          <div className="wrapper">
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              value={inputUrl}
              onBtnClear={this.onBtnClear}
              onInputChange={this.onInputChange}
              onBtnSubmit={this.onSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} error={error} />
          </div>
        )}
      </div>
    );
  }
}
