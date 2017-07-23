import _ from 'lodash';
import React, { Component } from 'react';
import update from 'react-addons-update';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './images/GAB_transparent_web.png';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        wordsOfAffirmation: 0,
        qualityTime: 0,
        receivingGifts: 0,
        actsOfService: 0,
        physicalTouch: 0,
      },
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
    } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });

    this.setState({
        answersCount: updatedAnswersCount,
        answer: answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestions[counter].question,
        answerOptions: quizQuestions[counter].answers,
        answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answers = [
      {
        name: "Words of Affirmation",
        description: "People whose love language is words of affi rmation like for others to use words to tell them that they are special and that they do a good job.",
        count: answersCount.wordsOfAffirmation
      },
      {
        name: "Quality Time",
        description: "People with the love language of quality time like it when others do things with them like play a game, watch television, or go to a ballgame.",
        count: answersCount.qualityTime
      },
      {
        name: "Receiving Gifts",
        description: "People with the love language of gifts feel good when someone gives them a special present or surprise.",
        count: answersCount.receivingGifts
      },
      {
        name: "Acts Of Service",
        description: "A person whose love language is acts of service likes it when others do nice things for them such as helping with chores, helping with school projects, or driving them places.",
        count: answersCount.actsOfService
      },
      {
        name: "Physical Touch",
        description: "People whose love language is physical touch like to receive hugs, kisses, and high-fives.",
        count: answersCount.physicalTouch
      }
    ]
    const sortedAnswers = _.sortBy(answers, function(el) {
      return el.count;
    }).reverse();

    let topThree = _.take(sortedAnswers, 3);
    return topThree;
  }
  setResults(result) {
    if (result.length) {
      this.setState({ result: result });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2></h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }

}

export default App;
