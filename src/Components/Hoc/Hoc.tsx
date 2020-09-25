import React from 'react';
import Context from '../../Context/Context';
import Service from '../../Service/Service';

const Hoc = () => (View: any) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    return (
      <Context.Consumer>
        {(service: Service) => {
          return <View {...props} service={service} />;
        }}
      </Context.Consumer>
    );
  };
};

export default Hoc;
