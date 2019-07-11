var moment = require("moment");
require('moment/locale/fa')
moment.locale("fa")


const DateFormatter = props => {
  const { date, format } = props;
  return format ? moment(date).fromNow() : moment(date).fromNow();
};
export default DateFormatter;
