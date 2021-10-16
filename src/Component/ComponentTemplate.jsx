import React from "react";
import PropTypes from "prop-types";

const ComponentTemplate = ({ items, title, refresh, clear }) => (<article>
    <h1>{title}</h1>
    <div>
        <button onClick={refresh}>Refresh</button>
        <button onClick={() => clear()}>Clear</button>
    </div>
    <ul>
        {items.map((item) => (<li key={item}>{item}</li>))}
    </ul>
</article>);

ComponentTemplate.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    refresh: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired
}

export default ComponentTemplate;