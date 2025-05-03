if exists( select name from sys.procedures where name = 'getPersons')
begin
	drop proc getPersons
end
go

create proc getPersons
as 
	
	select 
		id,
		first_name,
		last_name,
		middle_name,
		username,
		password,
		created,
		is_active
	from person
go