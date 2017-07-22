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
        <h1>Your primary love language is <strong>{props.quizResult[0].name}</strong>!</h1>
        <p>Learn more about {props.quizResult[0].name}: {props.quizResult[0].description}.</p>
      </div>
      <div>
        <h2>Your secondary love language is <strong>{props.quizResult[1].name}</strong>!</h2>
        <p>Learn more about {props.quizResult[1].name}: {props.quizResult[1].description}.</p>
      </div>
      <div>
        <h3>Your next highest love language is <strong>{props.quizResult[2].name}</strong>!</h3>
        <p>Learn more about {props.quizResult[2].name}: {props.quizResult[2].description}.</p>
      </div>
    </ReactCSSTransitionGroup>
  );

}

Result.propTypes = {
  quizResult: React.PropTypes.array.isRequired,
};

export default Result;
