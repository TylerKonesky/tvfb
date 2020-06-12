import React from 'react';
import Moment from 'moment';

function DateFormat(props) {
    return(
        <div>
            {Moment(props.date).format('MMMM Do YYYY')}
        </div>
    )
}

export default DateFormat;

