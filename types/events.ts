export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: EventCategory;
  thumbnail: string;
  images: EventImage[];
}

export interface EventImage {
  id: string;
  src: string;
  alt: string;
  title: string;
}

export interface EventCategory {
  name: string;
  icon: string;
  color: string;
}
