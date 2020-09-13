import React from 'react';
import Context from '../../Context/Context';

const Hoc = () => (View: any) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    return (
      <Context.Consumer>
        {(service: any) => {
          return <View {...props} service={service} />;
        }}
      </Context.Consumer>
    );
  };
};

export default Hoc;
