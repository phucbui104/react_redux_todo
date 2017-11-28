import React from 'react'
import Header from '../containers/Header' // eslint-disable-line
import VisibleTodoList from '../containers/VisibleTodoList' // eslint-disable-line
import Footer from '../containers/FooterNav' // eslint-disable-line

const App = () => (
  <div>
    <Header />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
