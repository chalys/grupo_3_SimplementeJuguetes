import React from "react";
import PropTypes from "prop-types";

export const Spinner = ({containerClassName}) => {
  return (
    <div className={`spinner-grow text-danger ${containerClassName}`} role="status">

    </div>
  );
};

Spinner.propTypes = {};

export default Spinner;
