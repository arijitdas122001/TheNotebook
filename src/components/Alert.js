import React from 'react'

const Alert = (props) => {
    // const {alert}=props;
  return (
    <div>
      <div className={`alert alert-${props.alert.type}`}role="alert">
        {props.alert.msg}
</div>
    </div>
  )
}

export default Alert
