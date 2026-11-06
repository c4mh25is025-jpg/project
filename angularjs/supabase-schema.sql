create sequence if not exists public.employee_code_seq start 1;

create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  employee_code text not null default (
    'EMP-' || lpad(nextval('public.employee_code_seq')::text, 3, '0')
  ),
  name text not null,
  title text not null,
  department text not null,
  team text not null,
  email text not null unique,
  location text not null,
  timezone text not null default 'Not specified',
  manager_name text,
  status text not null default 'Active'
    check (status in ('Active', 'On Leave', 'Pending Review', 'Inactive')),
  employment_type text not null default 'Full-time',
  hire_date date not null default current_date,
  created_at timestamptz not null default now()
);

alter table public.employees
  alter column id set default gen_random_uuid();

alter table public.employees
  add column if not exists employee_code text;

update public.employees
set employee_code = 'EMP-' || lpad(nextval('public.employee_code_seq')::text, 3, '0')
where employee_code is null;

select setval(
  'public.employee_code_seq',
  greatest(
    coalesce(max(substring(employee_code from 5)::bigint), 0) + 1,
    1
  ),
  false
)
from public.employees
where employee_code ~ '^EMP-[0-9]+$';

alter table public.employees
  alter column employee_code set default (
    'EMP-' || lpad(nextval('public.employee_code_seq')::text, 3, '0')
  ),
  alter column employee_code set not null;

create unique index if not exists employees_employee_code_idx
  on public.employees (employee_code);

alter table public.employees enable row level security;

grant select on public.employees to anon, authenticated;
grant insert on public.employees to authenticated;
grant usage, select on sequence public.employee_code_seq to authenticated;

drop policy if exists "Employees are readable by everyone" on public.employees;
create policy "Employees are readable by everyone"
  on public.employees for select
  to anon, authenticated
  using (true);

drop policy if exists "Signed-in users can add employees" on public.employees;
drop policy if exists "Directory editors can add employees" on public.employees;
create policy "Signed-in users can add employees"
  on public.employees for insert
  to authenticated
  with check (true);
