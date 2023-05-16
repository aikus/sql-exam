import React, {useEffect, useState} from 'react';
import * as C from './Nav/MainMenu/styles'
import { MainMenu } from "./Nav/MainMenu";
import { Loader } from "../components/Loader";
import { Container, Toolbar } from "@mui/material";

export const TextPageTemplate = ({children}) => {
    const [loader, setLoader] = useState(true)

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { setLoader });
        }
        return child;
    });

    return (
        <>
            <Loader show={loader}/>
            <MainMenu setLoader={setLoader} loader={loader} />
            <C.Wrapper>
                <Toolbar />
                <Container maxWidth={'lg'} sx={{ mt: 3 }}>
                    { childrenWithProps }
                </Container>
            </C.Wrapper>
        </>
    )
}
