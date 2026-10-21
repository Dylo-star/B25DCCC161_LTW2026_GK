import EventTable from "../components/EventTable";

const EventList = ({ events, onDelete, onRegister }) => (
  <div>
    <h1>Danh sách sự kiện</h1>
    <EventTable events={events} onDelete={onDelete} onRegister={onRegister} />
  </div>
);

export default EventList;
