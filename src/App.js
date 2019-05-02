import React, { Component } from "react";
import Navigation from "./components/Navigation";
import Signin from "./components/Signin";
import Register from "./components/Register";
import Rank from "./components/Rank";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import Particles from "react-particles-js";
import { particlesConfig } from "./particlesjs-config";
import { base_url } from "./config/baseUrl";

const initialState = {
  error: false,
  inputUrl: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

export class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount = () => {
    const storage = localStorage.getItem("user");
    console.log("Storage no compMount: ", storage);

    if (storage) {
      this.loadUser(JSON.parse(storage));
      console.log("Chamando loadUser passando a data: ", storage);
    }
  };

  loadUser = async userData => {
    console.log("loadUser iniciando recebendo a data: ", userData);
    await this.setState({
      route: "home",
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.joined
      }
    });
    console.log("State after set state do loadUser: ", this.state.user);

    this.saveUser();
  };

  saveUser = () => {
    localStorage.setItem("user", JSON.stringify(this.state.user));
    console.log("Salvando no storage o user: ", this.state.user);
  };

  calculateFaceLocation = data => {
    // regioes encontradas pela API
    const regions = data.outputs[0].data.regions;

    // array das faces localizadas
    const clarifaiFaces = regions.map(reg => {
      return reg.region_info.bounding_box;
    });

    // buscando o tamanho da imagem
    const inputImg = document.getElementById("input-img");
    const width = Number(inputImg.width);
    const height = Number(inputImg.height);

    // definindo as posições das faces
    const boxes = clarifaiFaces.map(face => {
      return {
        top: height * face.top_row,
        right: width * (1 - face.right_col),
        bottom: height * (1 - face.bottom_row),
        left: width * face.left_col
      };
    });

    this.setState({ boxes: boxes });
  };

  onBtnClear = e => {
    document.querySelector(".input_text").value = "";
    this.setState({ inputUrl: "", imageUrl: "", boxes: [], error: false });
  };

  onInputChange = event => {
    this.setState({
      inputUrl: event.target.value,
      imageUrl: event.target.value,
      boxes: [],
      error: false
    });
  };

  onSubmit = async e => {
    e.preventDefault();

    if (!this.state.inputUrl) {
      return;
    }

    this.setState({ error: false });

    //  chamando a promise da api com o modelo de detecção de face
    console.log(this.state.imageUrl);
    fetch(`${base_url}/image`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.inputUrl
      })
    })
      .then(response => {
        console.log("1ª resposta do post: ", response);
        return response.json();
      })
      .then(response => {
        console.log("2ª resposta do post: ", response);

        if (response.error) {
          console.log("erro no post: ", response.error);
        }

        this.calculateFaceLocation(response);

        fetch(`${base_url}/image`, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => {
            console.log("1ª resposta do PUT: ", response);
            return response.json();
          })
          .then(response => {
            console.log("2ª resposta do PUT ", response);

            if (response.error) {
              console.log("erro no PUT: ", response.error);
            }

            this.setState({ user: { ...this.state.user, entries: response } });

            this.saveUser();
          })
          .catch(err => {
            this.setState({ error: true });
            console.log("erro setado pelo PUT");
          });
      })
      .catch(err => {
        this.setState({ error: true });
        console.log("erro setado pelo POST");
      });
  };

  // função para mudar de rota
  onRouteChange = route => {
    if (route !== "home") {
      this.setState(initialState);
      localStorage.clear("user");
      console.log("Limpando storage");
    }

    this.setState({ route: route });
  };

  render() {
    const { route } = this.state;
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
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onBtnClear={this.onBtnClear}
              onInputChange={this.onInputChange}
              onBtnSubmit={this.onSubmit}
            />
            <FaceRecognition
              boxes={this.state.boxes}
              imageUrl={this.state.imageUrl}
              error={this.state.error}
            />
          </div>
        )}
      </div>
    );
  }
}
