import {IDayEntity} from "../types/schedule";
import {Checkbox, makeStyles, Theme, Typography} from "@material-ui/core";
import {IntervalList} from "./interval-list";
import {useEffect, useState} from "react";
import {EntityService} from "../service/entity";
import {IEvent, NotificationService} from "../service/notification";

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
    const [entity, setEntity] = useState<IDayEntity|undefined>();

    useEffect(() => {
        const refreshEntity = () => {
            const ent = EntityService.instance().getEntity(props.dayEntityId);
            console.log("refreshEntity ent=", ent)
            setEntity({...ent});
        };

        const handleUpdateEntity = (_event: IEvent, id: number) => {
            if(id===props.dayEntityId) {
                refreshEntity();
            }
        };

        refreshEntity();

        NotificationService.instance().subscribe(IEvent.UPDATEEENTITY, handleUpdateEntity);

        return () => {
            NotificationService.instance().unsubscribe(IEvent.UPDATEEENTITY, handleUpdateEntity);
        };
    },[props.dayEntityId]);


    const classes = useStyles();

    const handleToggle = () => {
        console.log('handleToggle')
        if(!entity) {
            console.error("Entity is not set");
            return;
        }
        EntityService.instance().updateEntity(entity.id, !entity.active);
    };

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

