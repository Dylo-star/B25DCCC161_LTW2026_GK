import { useParams, useNavigate } from "react-router-dom";

const EventDetail = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === Number(id));

  return (
    <div>
      {event ? (
        <div>
          <p>{`Tên sự kiện: ${event.name}`}</p>
          <p>{`Địa điểm: ${event.location}`}</p>
          <p>{`Ngày: ${event.date}`}</p>
          <p>{`Số chỗ: ${event.registered}/${event.capacity}`}</p>
        </div>
      ) : (
        <p>Không tìm thấy sự kiện</p>
      )}
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default EventDetail;
