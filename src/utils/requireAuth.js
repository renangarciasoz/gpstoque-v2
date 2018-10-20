import React from 'react';
import { connect } from 'react-redux';
import history from '../routes/history';

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                history.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                history.push('/');
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps, {})(Authenticate);
}