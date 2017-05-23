import BptLanguage from './BptLanguage';

import { translate } from 'react-i18next';

let waitLoading = false; // try true after refactored to i18next.addResources
if (typeof window === 'undefined') {
  waitLoading = false; // waiting is not needed on server side
}

export default translate(['common'], { wait: waitLoading })(BptLanguage);