import React from 'react'
import { connect } from 'react-redux'
import CardsList from '../Components/CardsList'
import SearchBox from '../Components/SearchBox'
import Scroll from '../Components/Scroll'
import ErrorBoundary from '../Components/ErrorBoundary'
import './App.css'

import { setSearchField, requestRobots } from '../actions'

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends React.Component {
    componentDidMount() {
        this.props.onRequestRobots()
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props
        const filteredRobots = robots.filter(robot => {
                return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return isPending ?
            <h1 className="tc">Loading</h1> :         
        (
            <div className = 'tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardsList robots = {filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)