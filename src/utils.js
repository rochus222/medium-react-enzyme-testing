let propsStorage = {};

export const mockComponent = (id) => (props) => {
  if (!propsStorage[id]) {
    propsStorage[id] = {};
  }
  const propId = `${Object.keys(propsStorage[id]).length + 1}`;
  propsStorage[id][propId] = { ...props };

  const propsWithOnlyStringsAndNumbers = Object.keys(props).reduce(
    (acc, key) => {
      if (typeof props[key] === "string" || typeof props[key] === "number") {
        return { ...acc, [key]: props[key] };
      }
      return acc;
    },
    {}
  );

  return (
    <div
      data-testid={id}
      data-propid={propId}
      {...propsWithOnlyStringsAndNumbers}
    >
      {props.children}
    </div>
  );
};
export const clearPropsStorage = () => {
  propsStorage = {};
};

export const getPropForComponent = (el, componentType, propName) => {
  const propId = el.getAttribute("data-propid");
  return propsStorage[componentType][propId][propName];
};

export const wait = () => new Promise((resolve) => setTimeout(resolve));
