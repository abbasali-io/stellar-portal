import { connect } from 'react-redux';

import Balances from './component';
import { getKeypair, canSign, getBalances } from '../../../selectors/account';
import { getAssets } from '../../../selectors/stellarData';
import { isCreatingTrustline } from '../../../selectors/ui';
import { createTrustline, deleteTrustline } from '../../../actions-creators/stellar';

const mapStateToProps = state => ({
  assets: getAssets(state),
  balances: getBalances(state),
  keypair: getKeypair(state),
  canSign: canSign(state),
  creatingTrustline: isCreatingTrustline(state),
});

const mapDispatchToProps = {
  createTrustline,
  deleteTrustline,
};

export default connect(mapStateToProps, mapDispatchToProps)(Balances);
