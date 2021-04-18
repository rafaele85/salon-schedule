import {Checkbox, makeStyles, Theme, Typography} from "@material-ui/core";
import {IntervalList} from "./interval-list";
import {useDispatch, useSelector} from "react-redux";
import {selectEntity, updateEntity} from "../state/entity-list";

const useStyles = makeStyles((_theme: Theme) => {
    return {
        container: {
            display: "flex",
            background: "white",
        },
        container1: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid lightgray",
            marginLeft: "10px",
            marginRight: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
        },
        entity: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight: "16px",
        },
        interval: {

        },
        checkboxChecked: {
            marginRight: "10px",
            color: "green !important",
        },
        checkboxUnchecked: {
            marginRight: "10px",
        }

    }
})

export interface IEntityProps {
    dayEntityId: number;
}

export const Entity = (props: IEntityProps) => {

    const entity = useSelector(selectEntity(props.dayEntityId));

    const dispatch = useDispatch();
    const handleToggle = () => {
        updateEntity(dispatch, entity.id, !entity.active);
    };

    const classes = useStyles();

    const checked = entity?.active||false;
    console.log(`${entity?.label} checked=${checked}`)

    let jsxIntervals;
    let cbClass=classes.checkboxUnchecked;
    if(checked) {
        cbClass=classes.checkboxChecked;
        jsxIntervals = (
            <div className={classes.interval}>
                <IntervalList dayEntityId={props.dayEntityId} />
            </div>
        )
    }

    return (
        <div className={classes.container}>
            <div className={classes.container1}>
                <div className={classes.entity}>
                    <Checkbox
                              onChange={handleToggle}
                              checked={checked}
                              className={cbClass}
                    />
                    <Typography>{entity?.label}</Typography>
                </div>
                {jsxIntervals}
            </div>
        </div>
    );
}

