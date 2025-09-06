create table navbar_config (
id uuid primary key default uuid_generate_v4(),
logo text,
menu_items jsonb, -- [{ "name": "Home", "path": "/" }]
created_at timestamp default now()
);
