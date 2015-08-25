import React from 'react';
import { PropTypes as Type } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Landing from './Base';
import fetchData from '../../decorators/fetchData';
import * as AuthActions from '../../actions/AuthActions';
import * as DummyActions from '../../actions/LandingActions';


@fetchData(({ apiHost, auth, dispatch }) => {
  return dispatch(DummyActions.loadDummy({ apiHost, auth }));
})

@connect(state => ({
  auth : state.auth,
  dummy: state.dummy
}))

export default class DummyContainer extends React.Component {

  static propTypes = {
    auth    : Type.object.isRequired,
    dummy   : Type.object.isRequired,
    dispatch: Type.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { auth, dummy, dispatch } = this.props;

    return (
      <Landing
        auth={auth}
        authActions={bindActionCreators(AuthActions, dispatch)}
        dummy={dummy}
        dummyActions={bindActionCreators(DummyActions, dispatch)}
        {...this.props}
      />
    );
  }
}
