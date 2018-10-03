import React, { Component } from 'react';

import { LandingPage } from './LandingPage';
import { BlogPage } from './BlogPage';
import { AllBlogs } from './AllBlogs';
import { Projects } from './Projects';

import { BrowserRouter, Route } from 'react-router-dom';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        blogs : []
    }
  }

  componentDidMount() {
    var sites = ['http://localhost:3000/', 'https://jessicaprt.github.io/personal-website-react/', 'https://test.jessica.prieto.ca/'];
    
    if ( !sites.includes(window.location.href) ) {
      axios.get('./blogs.json')
          .then ((response) => {
              const blogs = response.data.blogs;
              this.setState({ blogs }) })

          .catch((error) => {
            // Error
            if (error.response) {
              console.log("blogs.json shouldn't load here");
            }
          } );
    }
    
  }
  
  render() {
    return (
      <BrowserRouter>
      <div>
        <Route exact={true} path='/' render={() => (
          <div className="App">
            <LandingPage />
          </div>
        )}/>

        <Route exact={true} path='/blogs/all_blogs' render={() => (
          <div className="App">
            <AllBlogs />
          </div>
        )}/>

        <Route exact={true} path='/projects' render={() => (
          <div className="App">
            <Projects />
          </div>
        )}/>

        { this.state.blogs.map((blog) => 
          <Route exact={true} path={'/blogs/' + blog.url} render={() => (
            <div className="App">
              <BlogPage blog={ blog }/>
            </div> )}/>
          ) }

      </div>
    </BrowserRouter>
    );
  }
}

export default App;
