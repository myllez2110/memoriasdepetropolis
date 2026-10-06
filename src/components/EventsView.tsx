import { ArrowRight } from 'lucide-react';
import type { EventItem } from '../types';
import { events } from '../data';

type EventsViewProps = {
  onEvent: (event: EventItem) => void;
};

export function EventsView({ onEvent }: EventsViewProps) {
  return (
    <main className="inner-page">
      <div className="container page-heading split-heading">
        <div>
          <div className="eyebrow">Agenda comunitária</div>
          <h1>Vem com a<br /><em>gente.</em></h1>
        </div>
        <p>Encontros, mutirões e conversas para construir uma serra cada vez mais viva.</p>
      </div>

      <div className="container full-event-list">
        {events.map((event) => (
          <button className="large-event-card" key={event.title} onClick={() => onEvent(event)}>
            <div className="large-date">
              <strong>{event.day}</strong>
              <span>{event.month}<br />2026</span>
            </div>
            <div className="large-event-copy">
              <div className="event-tag">{event.time} · {event.place}</div>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </div>
            <span className="circle-arrow"><ArrowRight size={19} /></span>
          </button>
        ))}
      </div>
    </main>
  );
}
