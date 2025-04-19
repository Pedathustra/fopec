if exists( select name from sys.procedures where name = 'getPersonAuditById')
begin
	drop proc getPersonAuditById
end
go

create proc getPersonAuditById
	@person_id int
as 
	
	select 
		first_name,
		last_name,
		middle_name,
		username,
		password,
		audit_datetime,
		is_active
	from person_audit
	where person_id = @person_id
	order by audit_datetime desc
go