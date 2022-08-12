import "./App.css";
import React, { Component } from "react";
import Axios from "axios";
const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: [],
  };
  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await Axios.post(apiEndPoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };
  handleUpdate = post => {
    console.log("Updated", post);
  };
  handleDelete = post => {
    console.log("Deleted", post);
  };
  async componentDidMount() {
    const { data: posts } = await Axios.get(apiEndPoint);
    this.setState({ posts });
  }
  render() {
    return (
      <React.Fragment>
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
