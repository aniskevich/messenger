import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Sidebar} from '../components/Sidebar/Sidebar'
import {ChatPage} from '../pages/ChatPage'
import {ProfilePage} from '../pages/ProfilePage'
import {Content} from '../components/Content/Content'

export const App: React.FC = () => {
    return (
        <Router>
            <Sidebar />
            <Content>
                <Switch>
                    <Route path ='/' component={ChatPage} exact/>
                    <Route path ='/profile' component={ProfilePage}/>
                </Switch>
            </Content>
        </Router>
    )
}
