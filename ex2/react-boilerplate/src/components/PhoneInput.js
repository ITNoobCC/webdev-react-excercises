import React from 'react';
export default class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
  }

  render() {
    const {
      liked
    } = this.state;
    return React.createElement(
      'div', {
        onClick: () => this.setState({
          liked: !liked
        })
      },
      `${liked ? 'liked' : 'unliked'}`
    );
  }
}