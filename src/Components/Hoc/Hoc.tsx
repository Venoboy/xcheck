import React from 'react';
import Context from '../../Context/Context';

const Hoc = () => (View: any) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    return (
      <Context.Consumer>
        {(Service: any) => {
          return <View {...props} service={Service} />;
        }}
      </Context.Consumer>
    );
  };
};

export default Hoc;
