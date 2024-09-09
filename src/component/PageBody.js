import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppData } from "../context/appContext";
import { AddEmployee } from "../pages/AddEmployee"
// import { EmployeeList } from "../pages/EmployeeList";
import "./PageBody.css";
import { EmployeePage } from "../pages/EmployeePage";
import { checkMounting } from "./HigherOrderComp";
import { lazy, Suspense } from "react";

export const PageBody = () => {
    // const { updateTitle } = useAppData();

    // const handleClick = () => {
    //     console.log("Clicked 'Click me'");

    //     updateTitle("New Title");
    // };

    // Enhance the component with the HOC
    const EnhancedComponent = checkMounting(EmployeePage);

    // lazy loading components 
    const EmployeeList = lazy(() => import("../pages/EmployeeList"));

    return <>
    <div className="container mt-5">
    <BrowserRouter>
      <Routes>        
          <Route exact path="/" element={
            <Suspense fallback={<h1>Loading Employee List...</h1>}>
              <EmployeeList />
            </Suspense>
            } />
          <Route exact path="add" element={<AddEmployee />} />
          <Route exact path="view/:id" element={<EnhancedComponent></EnhancedComponent>} />
          {/* <Route exact path="view/:id" element={<EmployeePage />} />         */}
      </Routes>
    </BrowserRouter>
    </div>
    </>

}