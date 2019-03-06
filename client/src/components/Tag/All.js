import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TagService from '../../services/tag';

class AllTags extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: null };
  }

  componentDidMount() {
    const tagService = new TagService();
    if (this.props.user) {
      tagService.getAll().then(body => {
      if (body.success) {
        this.setState({ tags: body.tags });
        this.props.toast.success(body.message);
      } else {
        this.props.toast.error(body.message);
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
    }
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
        <div className="col-md-6">
          <h1>All tags</h1>
          {
            this.state.tags && this.state.tags.length > 0 ?
              this.state.tags.map(tag => (
                <p key={tag._id}>{tag.name}</p>
              )) :
              null
          }
        </div>
      </div>
    );
  }
}

export default AllTags;