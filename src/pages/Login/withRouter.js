import { useNavigate, useLocation, usePara, useParams } from "react-router-dom";

export function withRouter(Component) {
    function ComponentWithRouterprop(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();


        return (
            <Component 
            {...props}
            routers={{ location, navigate, params}}
            />

        )
    }
    return ComponentWithRouterprop;
}