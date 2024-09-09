import React from "react";

export const ErrorTest = () => {

    throw new Error("This Error test");

    return <>
        <div>Error Test</div>
    </>;
};