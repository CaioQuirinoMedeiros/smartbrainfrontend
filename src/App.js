import React, { Component } from 'react';
import Navigation from './components/Navigation'
import Signin from './components/Signin'
import Register from './components/Register'
import Rank from './components/Rank'
import ImageLinkForm from './components/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition'
import Particles from 'react-particles-js';
import { particlesConfig } from './particlesjs-config';

 // Estado inicial do app
 const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
 }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = userData => {
    this.setState({ user: 
      {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.joined
      }
    })
  }

  calculateFaceLocation = data => {
    // regioes encontradas pela API
    const regions = data.outputs[0].data.regions;

    // array das faces localizadas
    const clarifaiFaces = regions.map(reg => {
      return reg.region_info.bounding_box;
    });

    // buscando o tamanho da imagem
    const inputImg = document.getElementById('input-img');
    const width = Number(inputImg.width);
    const height = Number(inputImg.height);

    // definindo as posições das faces
    const boxes = clarifaiFaces.map(face => {
      return {
        top: height * face.top_row,
        right: width * (1 - face.right_col),
        bottom: height * (1 - face.bottom_row),
        left: width * face.left_col,
      }
    })

    return boxes
  }

  displayFaceBox = boxes => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    // atualizando a url no state
    this.setState({imageUrl: this.state.input});

    //  chamando a promise da api com o modelo de detecção de face
    fetch('https://evening-coast-16509.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://evening-coast-16509.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })})
          .then(response => response.json())
          .then(count => {
            this.setState({user: { ...this.state.user, entries: count }});
          })
          .catch(err => console.log(err));
        };
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(err => console.log(err));
  };

  // função para mudar de rota
  onRouteChange = (route) => {
    route === 'home' ? this.setState({isSignedIn: true}) : this.setState(initialState);
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesConfig} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'signin' ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> :
          (
            route === 'register' ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> :
            <div className="wrapper">
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onSubmit}/>
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
