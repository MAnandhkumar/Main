-- schema.sql

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: categories
create table public.categories (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    slug text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: products
create table public.products (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    description text,
    image_url text,
    category_id uuid references public.categories(id) on delete set null,
    slug text not null unique,
    affiliate_url text,
    store_name text default 'Amazon',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: affiliate_links
create table public.affiliate_links (
    id uuid default uuid_generate_v4() primary key,
    product_id uuid not null references public.products(id) on delete cascade,
    platform text not null,
    affiliate_url text not null,
    slug text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: clicks
create table public.clicks (
    id uuid default uuid_generate_v4() primary key,
    affiliate_link_id uuid not null references public.affiliate_links(id) on delete cascade,
    timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
    user_agent text,
    referrer text
);

-- Table: admins
create table public.admins (
    id uuid references auth.users not null primary key,
    email text not null unique,
    role text default 'admin'
);

-- Enable Row Level Security (RLS)
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.affiliate_links enable row level security;
alter table public.clicks enable row level security;
alter table public.admins enable row level security;

-- RLS Policies
create policy "Allow public read access to categories" on public.categories for select using (true);
create policy "Allow admin full access to categories" on public.categories for all using (auth.uid() in (select id from public.admins));

create policy "Allow public read access to products" on public.products for select using (true);
create policy "Allow admin full access to products" on public.products for all using (auth.uid() in (select id from public.admins));

create policy "Allow public read access to affiliate_links" on public.affiliate_links for select using (true);
create policy "Allow admin full access to affiliate_links" on public.affiliate_links for all using (auth.uid() in (select id from public.admins));

create policy "Allow public insert to clicks" on public.clicks for insert with check (true);
create policy "Allow admin read access to clicks" on public.clicks for select using (auth.uid() in (select id from public.admins));

create policy "Allow admin read access to admins" on public.admins for select using (auth.uid() in (select id from public.admins));

-- Table: banners
create table public.banners (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    subtitle text,
    image_url text not null,
    link_url text,
    button_text text default 'Shop Now',
    active boolean default true,
    priority integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for banners
alter table public.banners enable row level security;

-- Banners policies
create policy "Allow public read access to banners" on public.banners for select using (true);
create policy "Allow admin full access to banners" on public.banners for all using (auth.uid() in (select id from public.admins));
