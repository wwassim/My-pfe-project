import React from "react";

const Loading = ({ loading, error, children }) => {
 const elementType=children?.type?.render?.displayName;

  const renderHandler = () => {
 
    if (elementType === "MaterialTailwind.Button") {
      const cloneButton = React.cloneElement(
        children,
        { disabled: true   , className: "rounded-lg p-2 w-full bg-violet-200  text-white cursor-not-allowed"},
        "Loading..."
      );
      return (
        <>
          {loading ? (
            cloneButton
          ) : error ? (
            <>
              {children}
              <p>
                <br />
                {error}
              </p>
            </>
          ) : (
            children
          )}
        </>
      );
    }
    return (
      <>
        {loading ? (
          <p>loading please wait...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          children
        )}
      </>
    );
  };

  return renderHandler();
};

export default Loading;