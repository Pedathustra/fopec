if exists(select * from sys.triggers where name = 'trg_person_audit')
begin
	drop trigger trg_person_audit;
end
go

create trigger trg_person_audit
on person
after update
as
begin
	set nocount on;

	insert into person_audit (
		person_id,
		first_name,
		middle_name,
		last_name,
		username,
		password,
		audit_datetime,
		is_active
	)
	select 
		id,
		first_name,
		middle_name,
		last_name,
		username,
		password,
		getdate(),
		is_active
	from deleted;
end
go

