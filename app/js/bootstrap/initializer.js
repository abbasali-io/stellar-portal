import React from 'react';
import { connect } from 'react-redux';

import { setAccount } from '../actions-creators/account';
import { getExchangeAssets } from '../actions-creators/stellar';
import Loader from 'js/components/Loader';

const mapDispatchToProps = {
  setAccount,
  getExchangeAssets,
};

class InitializerComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      error: null,
    };
  }
  componentWillMount() {
    Promise.all([
      // this.props.setAccount({
      //   secretSeed: 'SANC7G7ERSG3VWUHHG3RCLSS54ERQ7WO4VI2HUHQCWYFAMQKZQKXJTTV'
        // secretSeed: 'SAQHSZFSQIIVWH4DL2D5PRF6BARWUVDELSM5RZMRGYFDQA2P2QMNGPF7'
      // }),
      this.props.getExchangeAssets(),
    ])
      .then(() => {
        this.setState(() => ({ ready: true }));
      })
      .catch(error => {
        this.setState(() => ({ error }));
      })
  }

  render() {
    if(this.state.error) {
      return (
        <p style={{textAlign: 'center'}}>
          There was an error while loading the application.
        </p>
      );
    }
    return this.state.ready ? this.props.children : <Loader />;
  }
}

InitializerComponent.propTypes = {
  setAccount: React.PropTypes.func.isRequired,
  getExchangeAssets: React.PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(InitializerComponent);
