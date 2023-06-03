import React from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  Icon: IconDefinition;
  Text: string;
  SubText?: string;
}

const FeatureRow = (props: Props) => {
  return (
    <div className='flex flex-row items-center'>
      <div className="flex flex-col mr-4">
        <FontAwesomeIcon icon={props.Icon} className="text-black w-8 h-8 " />
      </div>
      <div className="flex flex-col">
        <span className='text-lg'>{props.Text}</span>
        {props.SubText && (
          <span className='text-sm font-light'>{props.SubText}</span>
        )}
      </div>
    </div>
  )
}

export default FeatureRow