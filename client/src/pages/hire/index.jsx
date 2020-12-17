import { Fragment } from "react";
import HirePost from "../../components/molecules/hired";
import Navbar from "../../components/molecules/navbar";

export default function HirePage() {
    return (
        <Fragment>
            <Navbar />
            <HirePost/>
        </Fragment>
    )
}