import { ArrowRight, CalendarDays, Clock3, Mountain, X } from 'lucide-react';
import type { EventItem } from '../types';

type EventModalProps = {
  event: EventItem;
  onClose: () => void;
  onRegister: () => void;
};

export function EventModal({ event, onClose, onRegister }: EventModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="event-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>
        <div className="eyebrow">Próximo encontro</div>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <div className="event-modal-meta">
          <span><CalendarDays size={17} /> {event.date}</span>
          <span><Clock3 size={17} /> {event.time}</span>
          <span><Mountain size={17} /> {event.place}</span>
        </div>
        <button className="button button-primary" onClick={onRegister}>
          Quero participar <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
