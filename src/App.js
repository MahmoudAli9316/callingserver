import "./App.css";
import React, { Component } from "react";
import httpServices from "./services/httpServices";
import config from "./config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  state = {
    posts: [],
  };
  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await httpServices.post(config.apiEndPoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };
  handleUpdate = async post => {
    post.title = "UPDATED";
    await httpServices.put(`${config.apiEndPoint}/${post.id}`, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
    //httpServices.patch(`${config.apiEndPoint}/${post.id}`, { title: post.title });
  };
  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try {
      await httpServices.delete(`s${config.apiEndPoint}/${post.id}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("This post has already been deleted.");
      }
      this.setState({ posts: originalPosts });
    }
  };
  async componentDidMount() {
    const { data: posts } = await httpServices.get(config.apiEndPoint);
    this.setState({ posts });
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button onClick={this.handleAdd} className="btn btn-primary m-3">
          Add
        </button>
        <table className="table mx-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button onClick={() => this.handleUpdate(post)} className="btn btn-primary">
                    Update
                  </button>
                </td>
                <td>
                  <button onClick={() => this.handleDelete(post)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
