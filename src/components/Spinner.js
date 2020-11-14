import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export const Spinner = () => {
	return(
    <div className="awesome-spinner">
      <FontAwesomeIcon  icon={faSpinner} size="2x" spin />
    </div>
	)
}