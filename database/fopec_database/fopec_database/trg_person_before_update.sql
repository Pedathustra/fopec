if exists(select * from sys.triggers where name = 'trg_person_before_update')
begin
	drop trigger trg_person_before_update;
end
go

create trigger trg_person_before_update
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
