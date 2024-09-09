import React from "react"
import { RenderPropsComponent } from "./RendererProp"

export class ParentRenderProp extends React.Component { 
    renderFunc = () => { 
        return ( 
          <div> 
            <h3>  
             I am coming from parent render props  
            </h3> 
          </div> 
        ) 
    };

    render() { 
      return ( 
        <RenderPropsComponent 
          // Passing render props to the child component 
          render={this.renderFunc} 
        /> 
      ) 
    } 
  } 