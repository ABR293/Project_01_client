import React from "react";
import connect from "react-redux/es/connect/connect";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const WithAuthRedirect = (Component:React.Component) => {


    class RedirectComponent extends React.Component {
        const {isAuth} = useTypedSelector(state => state.auth)

        render() {
            if (isAuth) return <Redirect to={'/login'}/>;

            return (<Component {...this.props}/>)
        }
    }

    let ConnectedAuthredirectComponent = connect(mapStateToPropsFoRedirect)(RedirectComponent);

    return ConnectedAuthredirectComponent
};