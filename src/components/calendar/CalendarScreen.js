import React, { useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-messages-es";
import "moment/locale/es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";
moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch])
  
  const {events, activeEvent } = useSelector( state => state.calendar );
  const {uid} = useSelector( state => state.auth );

  const onSelectEvent = (e) => {

    dispatch(eventSetActive(e));
  };
  const onDoubleClick=(e)=>{
    dispatch(eventSetActive(e));
    dispatch(uiOpenModal());
  }
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };
  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: (uid===event.user._id) ? "#367CF7" : '#465660',
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  const onSelectSlot=(e)=>{
    dispatch(eventClearActiveEvent());
  }

  console.log('LLEGO ACA CALENDAR')
  console.log(events)
  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />

      {
        activeEvent &&
        <DeleteEventFab/>
      }
      

      <AddNewFab/>

      <CalendarModal />
    </div>
  );
};
