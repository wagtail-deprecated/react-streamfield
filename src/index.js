import React  from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import StreamField from './StreamField';


export const store = createStore(reducer, applyMiddleware(thunk));


window.addEventListener('load', () => {
  for (let streamfieldNode of document.querySelectorAll('script[data-streamfield]')) {
    const newNode = streamfieldNode.parentNode.insertBefore(
      document.createElement('div'), streamfieldNode);
    ReactDOM.render((
      <Provider store={store}>
        <StreamField {...JSON.parse(streamfieldNode.innerHTML)}
                     id={streamfieldNode.getAttribute('data-streamfield')}/>
      </Provider>
    ), newNode);
  }
});
