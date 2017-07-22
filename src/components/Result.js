import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Result(props) {

  return (
    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        Your love language is <strong>{props.quizResult[0].name}</strong>!
      </div>
    </ReactCSSTransitionGroup>
  );

}

Result.propTypes = {
  quizResult: React.PropTypes.array.isRequired,
};

export default Result;
