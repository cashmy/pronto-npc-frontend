/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormattedMessage, injectIntl } from "react-intl";

const InjectMassage = (props: any) => <FormattedMessage {...props} />;
export default injectIntl(InjectMassage, {
  forwardRef: false,
});
