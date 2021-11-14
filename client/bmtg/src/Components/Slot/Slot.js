import React, {useState} from "react";
import SlotModal from "../SlotModal/SlotModal";

function Slot({id, timing, date}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="guideDashboard__slot">
            {timing.start.slice(0,5)}
            {open && <SlotModal key={id} open={open} handleClose={handleClose} id={id} timingId={timing.id}
                                startTime={timing.start.slice(0, 5)} date={date}/>}
            <i className="fa fa-angle-right" onClick={handleOpen}></i>
        </div>
    );
}

export default Slot;