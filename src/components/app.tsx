import {SalonSchedule} from "./salon-schedule";
import {createMuiTheme, CssBaseline, makeStyles, MuiThemeProvider, Theme} from "@material-ui/core";
import {GlobalStyles} from "./global-styles";
import {Provider} from "react-redux";
import {store} from "../state/store";

const useStyle = makeStyles((_theme: Theme) => {
    return {
        app: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            //height: "100%",
        }
    }
});

export const App = () => {
    const theme = createMuiTheme({palette: {type: "light"}})
    const classes = useStyle();
    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                <div className={classes.app}>
                    <SalonSchedule />
                </div>
            </MuiThemeProvider>
        </Provider>
    )
}
