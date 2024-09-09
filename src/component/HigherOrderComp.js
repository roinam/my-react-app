import React from 'react';
 
// Define the Higher-Order Component
export const checkMounting = (WrappedComponent) => {
    return (props) => { 
        React.useEffect(() => {
            console.log("Component is mounted");
 
            return () => {
                console.log("Component is unmounted");
            };
        }, []);
        
        return <WrappedComponent  {...props}/>;
    };
};