import { memo } from "react";

export const MyComp = (prop) => {

    console.log(`Rendered for ${prop.name} on ${new Date().toLocaleTimeString()}`);
    return <>
    <div>Rendered for {prop.name} on {new Date().toLocaleTimeString()}</div>
    </>;
};

export const PureComp = memo(MyComp);